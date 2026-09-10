#!/usr/bin/env bash
set -euo pipefail
site=/data/v2board-legacy-dev/www/v2board
stamp=$(date +%Y%m%d-%H%M%S)
backup=/data/v2board-legacy-dev/ui-backups/standalone-$stamp
stage=$(mktemp -d /tmp/ui-standalone.XXXXXX)
trap 'rm -rf "$stage"' EXIT
mkdir -p "$backup"
tar -czf "$backup/templates.tar.gz" -C "$site" resources/views/admin.blade.php public/theme/default/dashboard.blade.php
tar -xzf /tmp/v2board-standalone-ui.tar.gz -C "$stage"
release="$site/public/assets/restored-$stamp"
mkdir -p "$release/admin" "$release/user"
cp "$stage/admin/app.js" "$release/admin/app.js"
cp "$stage/user/app.js" "$release/user/app.js"
# Preserve the site's Blade-generated settings, CSS, fonts, locales and custom HTML.
python3 - "$site" "$stamp" <<'PY'
import sys,re
from pathlib import Path
root=Path(sys.argv[1]);stamp=sys.argv[2]
for target,name in [('admin','resources/views/admin.blade.php'),('user','public/theme/default/dashboard.blade.php')]:
 p=root/name;s=p.read_text()
 pattern=r'<script\s+src="[^\"]*/(?:umi|vendors\.async|components\.async)\.js[^\"]*"\s*></script>'
 matches=list(re.finditer(pattern,s))
 if len(matches)!=3:raise RuntimeError(f'{name}: expected three old script tags; found {len(matches)}')
 # Insert at the umi entry position, preserving any custom.js script that follows.
 s=re.sub(pattern,lambda m:f'<script src="/assets/restored-{stamp}/{target}/app.js"></script>' if '/umi.js' in m.group() else '',s)
 p.write_text(s)
PY
chown -R --reference="$site/public/assets" "$release"
chown --reference="$site/resources/views" "$site/resources/views/admin.blade.php"
chown --reference="$site/public/theme/default" "$site/public/theme/default/dashboard.blade.php"
cat > "$backup/rollback.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
tar -xzf '$backup/templates.tar.gz' -C '$site'
docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear
EOF
chmod 700 "$backup/rollback.sh"
docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear
for endpoint in / /4434144c; do
 code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:7003$endpoint")
 if [ "$code" != 200 ]; then bash "$backup/rollback.sh"; echo "Rolled back: $endpoint returned $code"; exit 1; fi
done
printf 'RELEASE=%s\nBACKUP=%s\n' "$release" "$backup"
