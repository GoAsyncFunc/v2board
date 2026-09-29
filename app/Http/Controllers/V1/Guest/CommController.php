<?php

namespace App\Http\Controllers\V1\Guest;

use App\Http\Controllers\Controller;
use App\Utils\Dict;
use Illuminate\Support\Facades\Http;

class CommController extends Controller
{
    public function config()
    {
        $activeTheme = config('v2board.frontend_theme', 'default');
        $themeConfig = config("theme.{$activeTheme}", []);
        return response([
            'data' => [
                'title' => config('v2board.app_name', 'V2Board'),
                'tos_url' => config('v2board.tos_url'),
                'is_email_verify' => (int)config('v2board.email_verify', 0) ? 1 : 0,
                'is_invite_force' => (int)config('v2board.invite_force', 0) ? 1 : 0,
                'email_whitelist_suffix' => (int)config('v2board.email_whitelist_enable', 0)
                    ? $this->getEmailSuffix()
                    : 0,
                'is_recaptcha' => (int)config('v2board.recaptcha_enable', 0) ? 1 : 0,
                'recaptcha_site_key' => config('v2board.recaptcha_site_key'),
                'app_description' => config('v2board.app_description'),
                'app_url' => config('v2board.app_url'),
                'logo' => config('v2board.logo'),
                'background_url' => $themeConfig['background_url'] ?? config('v2board.frontend_background_url'),
                'custom_html' => $themeConfig['custom_html'] ?? '',
                'user_theme' => [
                    'mode' => $themeConfig['user_theme_mode'] ?? config('v2board.user_theme_mode', 'system'),
                    'preset' => $themeConfig['user_theme_preset'] ?? config('v2board.user_theme_preset', 'default'),
                    'sidebar' => $themeConfig['user_theme_sidebar'] ?? config('v2board.user_theme_sidebar', 'standard'),
                    'density' => $themeConfig['user_theme_density'] ?? config('v2board.user_theme_density', 'comfortable'),
                ],
            ]
        ]);
    }

    private function getEmailSuffix()
    {
        $suffix = config('v2board.email_whitelist_suffix', Dict::EMAIL_WHITELIST_SUFFIX_DEFAULT);
        if (!is_array($suffix)) {
            return preg_split('/,/', $suffix);
        }
        return $suffix;
    }
}
