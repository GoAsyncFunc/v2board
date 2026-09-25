#!/usr/bin/env bash
set -euo pipefail
site=/data/v2board-legacy-dev/www/v2board
stamp=$(date +%Y%m%d-%H%M%S)
backup=/data/v2board-legacy-dev/ui-backups/$stamp
stage=$(mktemp -d /tmp/v2board-ui-stage.XXXXXX)
trap 'rm -rf "$stage"' EXIT
mkdir -p "$backup"
tar -czf "$backup/original-ui.tar.gz" -C "$site" public/assets/admin public/theme/default resources/views/admin.blade.php
tar -xzf /tmp/v2board-recovered-ui.tar.gz -C "$stage"
# Keep theme metadata/configuration unchanged; replace only renderer and assets.
cp -a "$stage/public/assets/admin/." "$site/public/assets/admin/"
cp -a "$stage/public/theme/default/assets/." "$site/public/theme/default/assets/"
cp "$stage/public/theme/default/dashboard.blade.php" "$site/public/theme/default/dashboard.blade.php"
cp "$stage/resources/views/admin.blade.php" "$site/resources/views/admin.blade.php"
# Existing installations may have custom CSS/JS; keep these intact.
python3 - "$site" "$stamp" <<'PY'
from pathlib import Path
import sys
root=Path(sys.argv[1]); stamp=sys.argv[2]
for name in ['resources/views/admin.blade.php','public/theme/default/dashboard.blade.php']:
 p=root/name
 text=p.read_text().replace('?v={{$version}}', '?v={{$version}}&ui='+stamp)
 if name.startswith('resources/') and not (root/'public/assets/admin/custom.css').exists():
  text=text.replace('    <link rel="stylesheet" href="/assets/admin/custom.css?v={{$version}}&ui='+stamp+'">\n','')
 p.write_text(text)
PY
chown -R --reference="$site/public/assets" "$site/public/assets/admin"
chown -R --reference="$site/public/theme" "$site/public/theme/default"
chown --reference="$site/resources/views" "$site/resources/views/admin.blade.php"
docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear
cat > "$backup/rollback.sh" <<EOF
#!/usr/bin/env bash
set -euo pipefail
tar -xzf '$backup/original-ui.tar.gz' -C '$site'
docker exec -w /www/v2board v2board-legacy-dev php artisan view:clear
EOF
chmod 700 "$backup/rollback.sh"
echo "BACKUP=$backup"
docker exec -w /www/v2board v2board-legacy-dev php artisan route:list --path= --columns=uri --compact | head -25 || true
