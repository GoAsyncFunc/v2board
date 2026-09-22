#!/bin/sh
set -eu

cd /var/www/html

if [ ! -f .env ]; then
  cp .env.example .env
fi

set_env() {
  key="$1"
  value="$2"
  if grep -q "^${key}=" .env; then
    sed -i "s#^${key}=.*#${key}=${value}#" .env
  else
    printf '\n%s=%s\n' "$key" "$value" >> .env
  fi
}

set_env APP_ENV "${APP_ENV:-local}"
set_env APP_DEBUG "${APP_DEBUG:-true}"
set_env APP_URL "${APP_URL:-http://127.0.0.1:7003}"
set_env DB_CONNECTION "${DB_CONNECTION:-mysql}"
set_env DB_HOST "${DB_HOST:-mysql}"
set_env DB_PORT "${DB_PORT:-3306}"
set_env DB_DATABASE "${DB_DATABASE:-v2board}"
set_env DB_USERNAME "${DB_USERNAME:-v2board}"
set_env DB_PASSWORD "${DB_PASSWORD:-v2board}"
set_env REDIS_HOST "${REDIS_HOST:-redis}"
set_env REDIS_PORT "${REDIS_PORT:-6379}"
set_env CACHE_DRIVER "${CACHE_DRIVER:-redis}"
set_env SESSION_DRIVER "${SESSION_DRIVER:-redis}"
set_env QUEUE_CONNECTION "${QUEUE_CONNECTION:-redis}"
set_env SECURE_PATH "${V2BOARD_SECURE_PATH:-admin}"
set_env ADMIN_SOURCE_BUILD "${V2BOARD_ADMIN_SOURCE_BUILD:-true}"
set_env UI_VERSION "${V2BOARD_UI_VERSION:-admin-source-20260922.1326}"

if [ ! -d vendor ]; then
  composer install --no-interaction --prefer-dist
fi

if ! grep -q '^APP_KEY=base64:' .env; then
  php artisan key:generate --force
fi

until php -r '$f=@fsockopen(getenv("DB_HOST") ?: "mysql", (int)(getenv("DB_PORT") ?: 3306), $e, $s, 2); exit($f ? 0 : 1);'; do
  echo "Waiting for MySQL..."
  sleep 2
done

if ! php -r 'require "vendor/autoload.php"; $app=require "bootstrap/app.php"; $kernel=$app->make(Illuminate\Contracts\Console\Kernel::class); $kernel->bootstrap(); try { exit(Illuminate\Support\Facades\Schema::hasTable("v2_user") ? 0 : 1); } catch (Throwable $e) { exit(1); }'; then
  php -r '$sql=file_get_contents("database/install.sql"); $pdo=new PDO("mysql:host=".getenv("DB_HOST").";port=".getenv("DB_PORT").";dbname=".getenv("DB_DATABASE"), getenv("DB_USERNAME"), getenv("DB_PASSWORD"), [PDO::MYSQL_ATTR_MULTI_STATEMENTS => true]); $pdo->exec($sql);'
fi

cat > config/v2board.php <<PHP
<?php
return [
    'app_name' => 'V2Board Local',
    'app_url' => '${APP_URL:-http://127.0.0.1:7003}',
    'frontend_theme' => 'default',
    'secure_path' => '${V2BOARD_SECURE_PATH:-admin}',
    'admin_source_build' => filter_var('${V2BOARD_ADMIN_SOURCE_BUILD:-true}', FILTER_VALIDATE_BOOLEAN),
    'ui_version' => '${V2BOARD_UI_VERSION:-admin-source-20260922.1326}',
    'subscribe_path' => '/api/v1/client/subscribe',
];
PHP

php -r 'require "vendor/autoload.php"; $app=require "bootstrap/app.php"; $kernel=$app->make(Illuminate\Contracts\Console\Kernel::class); $kernel->bootstrap(); $email=getenv("V2BOARD_ADMIN_EMAIL") ?: "admin@example.com"; $password=getenv("V2BOARD_ADMIN_PASSWORD") ?: "admin123456"; $user=App\Models\User::firstOrNew(["email"=>$email]); $user->password=password_hash($password, PASSWORD_DEFAULT); $user->uuid=$user->uuid ?: App\Utils\Helper::guid(true); $user->token=$user->token ?: App\Utils\Helper::guid(); $user->is_admin=1; $user->save();'

php artisan config:clear >/dev/null
php artisan view:clear >/dev/null || true

exec "$@"
