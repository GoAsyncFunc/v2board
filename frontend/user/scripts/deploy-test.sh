#!/usr/bin/env bash
set -euo pipefail

app_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
deploy_host=${DEPLOY_HOST:-root@5.104.86.24}
site=${DEPLOY_SITE:-/data/v2board-legacy-dev/www/v2board}
backup_root=${DEPLOY_BACKUP_ROOT:-/data/v2board-legacy-dev/ui-backups}
site_url=${DEPLOY_SITE_URL:-http://127.0.0.1:7003}
archive=$(mktemp /tmp/v2board-user-ui.XXXXXX)
stamp=$(date -u +%Y%m%d-%H%M%S)-$$
remote_archive=/tmp/v2board-user-ui-$stamp.tar.gz
git_commit=$(git rev-parse HEAD)
trap 'rm -f "$archive"' EXIT

cd "$app_root"
npm run build
tar -czf "$archive" -C dist app.js app.js.map source-build.json settings.js theme
scp "$archive" "$deploy_host:$remote_archive"

ssh "$deploy_host" bash -s -- "$remote_archive" "$site" "$site_url" "$backup_root" "$git_commit" "$stamp" <<'REMOTE'
set -euo pipefail
artifact=$1
site=$2
site_url=$3
backup_root=$4
git_commit=$5
stamp=$6
backup=$backup_root/user-$stamp
stage=$(mktemp -d /tmp/v2board-user-ui.XXXXXX)
trap 'rm -f "$artifact"; rm -rf "$stage"' EXIT
template=public/theme/default/dashboard.blade.php
release=$site/public/assets/restored-$stamp/user

mkdir -p "$backup" "$release"
tar -czf "$backup/template.tar.gz" -C "$site" "$template"
tar -xzf "$artifact" -C "$stage"
cp "$stage/app.js" "$stage/app.js.map" "$stage/source-build.json" "$release/"
cp -R "$stage/theme" "$release/"
cp "$stage/settings.js" "$release/"
app_sha256=$(sha256sum "$release/app.js" | cut -d' ' -f1)
ui_version=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["uiVersion"])' "$release/source-build.json")
deployed_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)
cat > "$release/deployment.json" <<EOF
{
  "application": "user",
  "deployed_at": "$deployed_at",
  "ui_version": "$ui_version",
  "git_commit": "$git_commit",
  "app_sha256": "$app_sha256"
}
EOF

python3 - "$site/$template" "$stamp" <<'PY'
import re
import sys
from pathlib import Path

path = Path(sys.argv[1])
stamp = sys.argv[2]
source = path.read_text()
old_pattern = r'<script\s+src="[^\"]*/(?:umi|vendors\.async|components\.async)\.js[^\"]*"\s*></script>'
restored_pattern = r'<script\s+src="/assets/restored-[^\"]+/user/app\.js"\s*></script>'
old_matches = list(re.finditer(old_pattern, source))
restored_matches = list(re.finditer(restored_pattern, source))

if len(restored_matches) == 1:
    source = re.sub(restored_pattern, f'<script src="/assets/restored-{stamp}/user/app.js"></script>', source)
elif len(old_matches) == 3:
    source = re.sub(
        old_pattern,
        lambda match: f'<script src="/assets/restored-{stamp}/user/app.js"></script>' if '/umi.js' in match.group() else '',
        source,
    )
else:
    raise RuntimeError(f'Unexpected user entry: restored={len(restored_matches)}, old={len(old_matches)}')

source = source.replace(
    '/theme/{{$theme}}/assets',
    f'/assets/restored-{stamp}/user/theme/default/assets',
)

path.write_text(source)
PY

chown -R --reference="$site/public/assets" "$(dirname "$release")"
chown --reference="$site/public/theme/default" "$site/$template"
cat > "$backup/rollback.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
tar -xzf '$backup/template.tar.gz' -C '$site'
rm -rf '$release'
docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear
EOF
chmod 700 "$backup/rollback.sh"

if ! docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear; then
  bash "$backup/rollback.sh"
  exit 1
fi
code=$(curl -s -o /dev/null -w '%{http_code}' "$site_url/")
if [ "$code" != 200 ]; then
  bash "$backup/rollback.sh"
  echo "Rolled back: user endpoint returned $code"
  exit 1
fi
if ! page=$(curl --max-time 30 -fsS "$site_url/"); then
  bash "$backup/rollback.sh"
  echo "Rolled back: user HTML could not be fetched"
  exit 1
fi
for resource in \
  theme/default/assets/antd.css \
  theme/default/assets/umi.css \
  theme/default/assets/theme/default.css \
  theme/default/assets/i18n/zh-CN.js \
  app.js; do
  resource_url=$site_url/assets/restored-$stamp/user/$resource
  if ! grep -Fq "/assets/restored-$stamp/user/$resource" <<<"$page"; then
    bash "$backup/rollback.sh"
    echo "Rolled back: user HTML does not reference $resource"
    exit 1
  fi
  if ! headers=$(curl --max-time 30 -fsSI "$resource_url"); then
    bash "$backup/rollback.sh"
    echo "Rolled back: user resource $resource could not be fetched"
    exit 1
  fi
  code=$(tr -d '\r' <<<"$headers" | awk '/^HTTP\// {status=$2} END{print status}')
  if [ "$code" != 200 ]; then
    bash "$backup/rollback.sh"
    echo "Rolled back: user resource $resource returned $code"
    exit 1
  fi
done
printf 'APPLICATION=user\nRELEASE=%s\nBACKUP=%s\nROLLBACK=%s\nGIT_COMMIT=%s\nUI_VERSION=%s\nAPP_SHA256=%s\n' \
  "$release" "$backup" "$backup/rollback.sh" "$git_commit" "$ui_version" "$app_sha256"
REMOTE
