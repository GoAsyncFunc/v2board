#!/usr/bin/env bash
set -euo pipefail

app_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
deploy_host=${DEPLOY_HOST:-root@5.104.86.24}
site=${DEPLOY_SITE:-/data/v2board-legacy-dev/www/v2board}
backup_root=${DEPLOY_BACKUP_ROOT:-/data/v2board-legacy-dev/ui-backups}
site_url=${DEPLOY_SITE_URL:-http://127.0.0.1:7003}
archive=$(mktemp /tmp/v2board-user-ui.XXXXXX)
remote_archive=/tmp/v2board-user-ui.tar.gz
trap 'rm -f "$archive"' EXIT

cd "$app_root"
npm run build
tar -czf "$archive" -C dist app.js app.js.map source-build.json
scp "$archive" "$deploy_host:$remote_archive"

ssh "$deploy_host" bash -s -- "$remote_archive" "$site" "$site_url" "$backup_root" <<'REMOTE'
set -euo pipefail
artifact=$1
site=$2
site_url=$3
backup_root=$4
stamp=$(date +%Y%m%d-%H%M%S)
backup=$backup_root/user-$stamp
stage=$(mktemp -d /tmp/v2board-user-ui.XXXXXX)
trap 'rm -f "$artifact"; rm -rf "$stage"' EXIT
template=public/theme/default/dashboard.blade.php
release=$site/public/assets/restored-$stamp/user

mkdir -p "$backup" "$release"
tar -czf "$backup/template.tar.gz" -C "$site" "$template"
tar -xzf "$artifact" -C "$stage"
cp "$stage/app.js" "$release/app.js"

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

path.write_text(source)
PY

chown -R --reference="$site/public/assets" "$(dirname "$release")"
chown --reference="$site/public/theme/default" "$site/$template"
cat > "$backup/rollback.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
tar -xzf '$backup/template.tar.gz' -C '$site'
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
printf 'APPLICATION=user\nRELEASE=%s\nBACKUP=%s\nROLLBACK=%s\n' "$release" "$backup" "$backup/rollback.sh"
REMOTE
