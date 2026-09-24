# 客户端与协议接口

## 订阅

| 方法 | 路径 | 鉴权 | 说明 |
| --- | --- | --- | --- |
| `GET` | `/api/v1/client/subscribe?token=...` | 订阅 token | 根据 `flag` / User-Agent 输出 General、Clash、Sing-box、V2Ray、Shadowrocket、Surge、Loon 等协议内容 |
| `GET` | `/api/v1/client/app/getConfig` | 订阅 token | 返回 YAML 格式 Clash App 配置 |
| `GET` | `/api/v1/client/app/getVersion` | 订阅 token | 返回 Windows、macOS、Android 客户端版本及下载地址 |

订阅中间件支持三种 `show_subscribe_method` 模式，具体由后台配置决定；主题不要自行生成订阅 token。

## V2 节点接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `ANY` | `/api/v2/server/config` | 节点服务端拉取配置，认证与字段由 `app/Http/Controllers/V2/Server/ServerController.php` 决定 |

## 支付回调和其他公共回调

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET/POST` | `/api/v1/guest/payment/notify/{method}/{uuid}` | 支付插件异步回调，供支付平台调用，不由主题调用 |
| `POST` | `/api/v1/guest/telegram/webhook` | Telegram Webhook，要求 `access_token=md5(telegram_bot_token)`，不由主题调用 |
| `GET` | `/api/v1/guest/comm/config` | 注册/登录页面公共配置 |
