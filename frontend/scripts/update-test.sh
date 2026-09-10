#!/usr/bin/env bash
set -euo pipefail
site=/data/v2board-legacy-dev/www/v2board
stamp=$(date +%Y%m%d-%H%M%S)
backup=/data/v2board-legacy-dev/ui-backups/standalone-$stamp
stage=$(mktemp -d /tmp/ui-update.XXXXXX)
trap 'rm -rf "$stage"' EXIT
mkdir -p "$backup"
tar -czf "$backup/templates.tar.gz" -C "$site" resources/views/admin.blade.php public/theme/default/dashboard.blade.php
tar -xzf /tmp/v2board-standalone-ui.tar.gz -C "$stage"
release="$site/public/assets/restored-$stamp"
mkdir -p "$release/admin" "$release/user"
cp "$stage/admin/app.js" "$release/admin/app.js"
cp "$stage/user/app.js" "$release/user/app.js"
cat > "$backup/rollback.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
tar -xzf '$backup/templates.tar.gz' -C '$site'
docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear
EOF
chmod 700 "$backup/rollback.sh"
# Validate both templates before modifying either of them.
python3 - "$site" "$stamp" <<'PY'
from pathlib import Path
import re,sys
root=Path(sys.argv[1]);stamp=sys.argv[2];changes=[]
for target,name in [('admin','resources/views/admin.blade.php'),('user','public/theme/default/dashboard.blade.php')]:
 p=root/name;s=p.read_text()
 pattern=r'/assets/restored-[0-9-]+/'+target+r'/app\.js'
 if len(re.findall(pattern,s))!=1:raise RuntimeError('Unexpected entry template: '+name)
 changes.append((p,re.sub(pattern,'/assets/restored-'+stamp+'/'+target+'/app.js',s)))
for p,s in changes:p.write_text(s)
PY
chown -R --reference="$site/public/assets" "$release"
if ! docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear; then bash "$backup/rollback.sh"; exit 1; fi
for endpoint in / /4434144c; do
 code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:7003$endpoint")
 if [ "$code" != 200 ]; then bash "$backup/rollback.sh"; echo "Rolled back: $endpoint returned $code"; exit 1; fi
done
printf 'RELEASE=%s\nBACKUP=%s\n' "$release" "$backup"
