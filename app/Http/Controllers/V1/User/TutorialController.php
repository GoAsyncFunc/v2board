<?php

namespace App\Http\Controllers\V1\User;

use App\Http\Controllers\Controller;
use App\Models\Tutorial;
use App\Models\User;
use App\Utils\Helper;
use Illuminate\Http\Request;

class TutorialController extends Controller
{
    public function getSubscribeUrl(Request $request)
    {
        $user = $this->user($request);
        return response([
            'data' => [
                'subscribe_url' => Helper::getSubscribeUrl($user->token)
            ]
        ]);
    }

    public function getAppleID(Request $request)
    {
        $user = $this->user($request);
        if ($user->expired_at !== null && $user->expired_at <= time()) {
            return response(['data' => []]);
        }
        return response([
            'data' => [
                'apple_id' => config('v2board.apple_id'),
                'apple_id_password' => config('v2board.apple_id_password')
            ]
        ]);
    }

    public function fetch(Request $request)
    {
        $user = $this->user($request);
        if ($request->filled('id')) {
            $tutorial = Tutorial::where('show', 1)
                ->where('id', $request->input('id'))
                ->first();
            if (!$tutorial) abort(404, '教程不存在');
            return response(['data' => $tutorial]);
        }

        $tutorials = Tutorial::select(['id', 'category_id', 'title'])
            ->where('show', 1)
            ->orderBy('sort', 'ASC')
            ->get()
            ->groupBy('category_id');
        $subscribeUrl = Helper::getSubscribeUrl($user->token);
        $safeArea = [
            'subscribe_url' => $subscribeUrl,
            'app_name' => config('v2board.app_name', 'V2Board'),
            'apple_id' => $this->safeAppleValue($user, 'apple_id'),
            'apple_id_password' => $this->safeAppleValue($user, 'apple_id_password')
        ];
        $safeArea['b64_subscribe_url'] = Helper::base64EncodeUrlSafe($subscribeUrl);
        $safeArea['ue_subscribe_url'] = urlencode($subscribeUrl);

        return response([
            'data' => [
                'tutorials' => $tutorials,
                'safe_area_var' => $safeArea
            ]
        ]);
    }

    private function user(Request $request): User
    {
        $user = User::find($request->user['id']);
        if (!$user) abort(404, __('The user does not exist'));
        return $user;
    }

    private function safeAppleValue(User $user, string $key): string
    {
        if ($user->expired_at !== null && $user->expired_at <= time()) {
            return '账号过期或未订阅';
        }
        return (string) config("v2board.{$key}", '本站暂无提供AppleID信息');
    }
}
