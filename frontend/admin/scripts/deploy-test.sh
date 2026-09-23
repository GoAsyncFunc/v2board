#!/usr/bin/env bash
set -euo pipefail

app_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
deploy_host=${DEPLOY_HOST:-root@5.104.86.24}
site=${DEPLOY_SITE:-/data/v2board-legacy-dev/www/v2board}
backup_root=${DEPLOY_BACKUP_ROOT:-/data/v2board-legacy-dev/ui-backups}
admin_path=${ADMIN_PATH:-/4434144c}
site_url=${DEPLOY_SITE_URL:-http://127.0.0.1:7003}
archive=$(mktemp /tmp/v2board-admin-ui.XXXXXX)
stamp=$(date -u +%Y%m%d-%H%M%S)-$$
remote_archive=/tmp/v2board-admin-ui-$stamp.tar.gz
local_stage=$(mktemp -d /tmp/v2board-admin-stage.XXXXXX)
git_commit=$(git rev-parse HEAD)
trap 'rm -f "$archive"; rm -rf "$local_stage"' EXIT

cd "$app_root"
npm run build
cp -R dist "$local_stage/dist"
cp "$app_root/../../resources/views/admin.blade.php" "$local_stage/admin.blade.php"
node scripts/rewrite-admin-template.mjs \
  "$local_stage/admin.blade.php" \
  "/assets/restored-$stamp/admin/"
tar -czf "$archive" -C "$local_stage" dist admin.blade.php
scp "$archive" "$deploy_host:$remote_archive"

ssh "$deploy_host" bash -s -- "$remote_archive" "$site" "$admin_path" "$site_url" "$backup_root" "$git_commit" "$stamp" <<'REMOTE'
set -euo pipefail
artifact=$1
site=$2
admin_path=$3
site_url=$4
backup_root=$5
git_commit=$6
stamp=$7
backup=$backup_root/admin-$stamp
stage=$(mktemp -d /tmp/v2board-admin-ui.XXXXXX)
deployment_active=0
rollback_on_error() {
  status=$?
  trap - ERR
  if [ "$deployment_active" = 1 ]; then
    if ! bash "$backup/rollback.sh"; then
      echo "Automatic rollback failed; run $backup/rollback.sh manually" >&2
      exit 2
    fi
    echo "Deployment failed; restored the previous Admin template" >&2
  fi
  exit "$status"
}
trap 'rm -f "$artifact"; rm -rf "$stage"' EXIT
trap rollback_on_error ERR
template=resources/views/admin.blade.php
staged_template=$site/$template.source-build-$stamp.tmp
release=$site/public/assets/restored-$stamp/admin

mkdir -p "$backup" "$release"
tar -czf "$backup/template.tar.gz" -C "$site" "$template"
tar -xzf "$artifact" -C "$stage"
cp -R "$stage/dist/." "$release/"
app_sha256=$(sha256sum "$release/app.js" | cut -d' ' -f1)
ui_version=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["uiVersion"])' "$release/source-build.json")
deployed_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)
cat > "$release/deployment.json" <<EOF
{
  "application": "admin",
  "deployed_at": "$deployed_at",
  "ui_version": "$ui_version",
  "git_commit": "$git_commit",
  "app_sha256": "$app_sha256"
}
EOF

chown -R --reference="$site/public/assets" "$release"
chown --reference="$site/resources/views" "$site/$template"
cat > "$backup/rollback.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
tar -xzf '$backup/template.tar.gz' -C '$site'
docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear
EOF
chmod 700 "$backup/rollback.sh"
cp "$stage/admin.blade.php" "$staged_template"
chown --reference="$site/resources/views" "$staged_template"
mv "$staged_template" "$site/$template"
deployment_active=1

rollback_release() {
  reason=$1
  if ! bash "$backup/rollback.sh"; then
    echo "Rollback failed after: $reason" >&2
    exit 2
  fi
  echo "Rolled back: $reason" >&2
  exit 1
}

if ! docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear; then
  rollback_release "Laravel view cache could not be cleared"
fi
if ! code=$(curl --max-time 30 -s -o /dev/null -w '%{http_code}' "$site_url$admin_path"); then
  rollback_release "admin endpoint request failed"
fi
if [ "$code" != 200 ]; then
  rollback_release "admin endpoint returned $code"
fi
if ! page=$(curl --max-time 30 -fsS "$site_url$admin_path"); then
  rollback_release "admin HTML could not be fetched"
fi
for resource in \
  assets/admin/antd.css \
  assets/admin/vendor/fontawesome.css \
  assets/admin/vendor/simple-line-icons.css \
  assets/admin/markdown-editor.css \
  assets/admin/umi.css \
  settings.js \
  app.js; do
  asset_url=$site_url/assets/restored-$stamp/admin/$resource
  if ! grep -Fq "/assets/restored-$stamp/admin/$resource" <<<"$page"; then
    rollback_release "admin HTML does not reference $resource"
  fi
  if ! headers=$(curl --max-time 30 -fsSI "$asset_url"); then
    rollback_release "admin resource $resource could not be fetched"
  fi
  content_type=$(tr -d '\r' <<<"$headers" | awk -F ': ' '$1 == "Content-Type" {split($2, parts, ";"); print parts[1]; exit}')
  case "$resource:$content_type" in
    *.css:text/css|*.js:application/javascript|*.js:text/javascript) ;;
    *) rollback_release "admin resource $resource has unexpected content type $content_type" ;;
  esac
  code=$(tr -d '\r' <<<"$headers" | awk '/^HTTP\// {status=$2} END{print status}')
  if [ "$code" != 200 ]; then
    rollback_release "admin resource $resource returned $code"
  fi
done
printf 'APPLICATION=admin\nRELEASE=%s\nBACKUP=%s\nROLLBACK=%s\nGIT_COMMIT=%s\nUI_VERSION=%s\nAPP_SHA256=%s\n' \
  "$release" "$backup" "$backup/rollback.sh" "$git_commit" "$ui_version" "$app_sha256"
REMOTE
