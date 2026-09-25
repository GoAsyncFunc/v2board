#!/usr/bin/env bash
# Local deployment for the Admin source build.
#
# The Docker test stack (container `v2board-app`) bind-mounts this repository at
# /var/www/html and exposes an Apache alias `/admin-build/` that points straight at
# `frontend/admin/dist/`. A successful `npm run build` is therefore already live.
#
# This script adds the release bookkeeping the remote deploy requires: a versioned
# timestamp directory, the previous build kept as a backup, a deployment record and
# an executable rollback script. It never touches the Laravel Blade templates and
# never modifies `scripts/deploy-test.sh`.
set -euo pipefail

app_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
application=admin
site_url=${DEPLOY_SITE_URL:-http://127.0.0.1:7003}
build_prefix=${DEPLOY_BUILD_PREFIX:-/admin-build}
health_path=${DEPLOY_HEALTH_PATH:-/admin}
entry_path=$build_prefix/app.js
releases_root=$app_root/.releases
keep=${KEEP_RELEASES:-5}
stamp=$(date -u +%Y%m%d-%H%M%S)-$$
release=$releases_root/$stamp
backup=$releases_root/backup-$stamp

sha256_of() {
    if command -v sha256sum >/dev/null 2>&1; then
        sha256sum "$1" | cut -d' ' -f1
    else
        shasum -a 256 "$1" | cut -d' ' -f1
    fi
}

prune_old() {
    local glob=$1
    local -a entries=()
    local dir
    local index=0
    shopt -s nullglob
    entries=("$releases_root"/$glob)
    shopt -u nullglob
    [ ${#entries[@]} -eq 0 ] && return 0
    while IFS= read -r dir; do
        index=$((index + 1))
        if [ "$index" -gt "$keep" ]; then
            rm -rf "$dir"
        fi
    done < <(ls -1dt "${entries[@]}")
}

git_commit=$(git -C "$app_root" rev-parse HEAD)

# Resolve the release that is currently live, before the new one is created.
previous_release=""
if [ -d "$releases_root" ]; then
    for candidate in "$releases_root"/*/; do
        [ -d "$candidate" ] || continue
        name=$(basename "$candidate")
        case "$name" in
        backup-* | "$stamp") continue ;;
        esac
        previous_release=$name
        break
    done
fi

mkdir -p "$backup"
if [ -f "$app_root/dist/app.js" ]; then
    tar -czf "$backup/previous-dist.tar.gz" -C "$app_root" dist
fi

cd "$app_root"
npm run build

mkdir -p "$release"
cp -R "$app_root/dist/." "$release/"

app_sha256=$(sha256_of "$release/app.js")
ui_version=$(node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1], "utf8")).uiVersion)' "$release/source-build.json")
deployed_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)

cat > "$release/deployment.json" <<EOF
{
  "application": "$application",
  "deployed_at": "$deployed_at",
  "ui_version": "$ui_version",
  "git_commit": "$git_commit",
  "app_sha256": "$app_sha256",
  "previous_release": "$previous_release"
}
EOF

cat > "$release/rollback.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
app_root='$app_root'
backup='$backup'
rm -rf "\$app_root/dist"
if [ -f "\$backup/previous-dist.tar.gz" ]; then
    tar -xzf "\$backup/previous-dist.tar.gz" -C "\$app_root"
    echo "Rolled back $application to the previous dist build"
else
    echo "No previous dist snapshot; removed \$app_root/dist"
fi
EOF
chmod 700 "$release/rollback.sh"

if ! page=$(curl --max-time 30 -fsS "$site_url$health_path"); then
    echo "Health check failed: $site_url$health_path could not be fetched" >&2
    bash "$release/rollback.sh"
    exit 1
fi
if ! grep -Fq "$entry_path" <<<"$page"; then
    echo "Health check failed: $health_path does not reference $entry_path" >&2
    bash "$release/rollback.sh"
    exit 1
fi
code=$(curl --max-time 30 -s -o /dev/null -w '%{http_code}' "$site_url$entry_path")
if [ "$code" != 200 ]; then
    echo "Health check failed: $entry_path returned $code" >&2
    bash "$release/rollback.sh"
    exit 1
fi

prune_old '[0-9]*-[0-9]*-[0-9]*-*'
prune_old 'backup-*'

printf 'APPLICATION=%s\nRELEASE=%s\nBACKUP=%s\nROLLBACK=%s\nGIT_COMMIT=%s\nUI_VERSION=%s\nAPP_SHA256=%s\n' \
    "$application" "$release" "$backup" "$release/rollback.sh" "$git_commit" "$ui_version" "$app_sha256"
