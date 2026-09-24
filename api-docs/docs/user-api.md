# 用户端 API

Base URL：`/api/v1`。除“公共接口”外，均需要 `Authorization: <auth_data>`。

## 响应格式

```json
{ "data": {}, "total": 0 }
```

成功通常为 HTTP `200`。常见失败：`403` 未登录或登录过期、`404` 资源不存在、`429` 请求过于频繁、`500` 业务校验失败。

## 公共接口

| 方法 | 路径 | 参数 | 返回 |
| --- | --- | --- | --- |
| `GET` | `/guest/comm/config` | 无 | `app_description`、`app_url`、`logo`、`tos_url`、`is_email_verify`、`is_invite_force`、`is_recaptcha`、`recaptcha_site_key`、`email_whitelist_suffix` |
| `POST` | `/passport/auth/login` | `email`、`password` | `auth_data`、`token`、`is_admin` |
| `POST` | `/passport/auth/register` | `email`、`password`；可选 `invite_code`、`email_code`、`recaptcha_data` | 注册成功返回同登录鉴权数据 |
| `POST` | `/passport/auth/forget` | `email`、`password`、`email_code` | `data: true` |
| `POST` | `/passport/comm/sendEmailVerify` | `email`；可选 `recaptcha_data`、`isforget` | `data: true` |
| `GET` | `/passport/auth/token2Login` | `verify`、`redirect` | `auth_data`；带 `token` 时会重定向到前端登录页 |

校验：登录/注册密码最少 8 位；邮箱必须为严格邮箱格式；找回密码和注册在开启邮箱验证时要求 6 位 `email_code`。

## 会话与账户

| 方法 | 路径 | 参数 | 返回/说明 |
| --- | --- | --- | --- |
| `GET` | `/user/checkLogin` | 无 | `{ is_login, is_admin? }` |
| `GET` | `/user/info` | 无 | 用户资料、余额、佣金、套餐 ID、提醒设置、Telegram 绑定状态 |
| `POST` | `/user/update` | `auto_renewal`、`remind_expire`、`remind_traffic` 之一，值为 `0/1` | `true` |
| `POST` | `/user/changePassword` | `old_password`、`new_password` | `true`；修改后旧会话失效 |
| `GET` | `/user/resetSecurity` | 无 | 新的订阅安全 token |
| `GET` | `/user/unbindTelegram` | 无 | `true` |
| `GET` | `/user/getActiveSession` | 无 | 会话字典，含 IP、登录时间、UA、auth_data |
| `POST` | `/user/removeActiveSession` | `session_id` | `true` |
| `POST` | `/user/transfer` | `transfer_amount`，整数，单位为分 | 将佣金转入余额 |
| `POST` | `/user/redeemgiftcard` | `giftcard` | `true`，并返回 `type`、`value` |
| `POST` | `/user/newPeriod` | 无 | `true`；需后台开启续期且满足流量/时间条件 |

## 订阅与节点

| 方法 | 路径 | 参数 | 返回 |
| --- | --- | --- | --- |
| `GET` | `/user/getSubscribe` | 无 | `plan`、`expired_at`、`u`、`d`、`transfer_enable`、`device_limit`、`reset_day`、`subscribe_url` 等 |
| `GET` | `/user/getStat` | 无 | 数字数组，用户流量统计 |
| `GET` | `/user/server/fetch` | 无；支持 `If-None-Match` | 可用节点数组；`304` 表示未变化 |
| `GET` | `/user/comm/config` | 无 | 货币、提现方式、Telegram、佣金分配、Stripe 公钥等前端配置 |
| `POST` | `/user/comm/getStripePublicKey` | `id` | 指定 StripeCredit 支付方式的公钥 |
| `GET` | `/user/telegram/getBotInfo` | 无 | `{ username }` |

节点字段依协议可能变化，至少应按 `name`、`type`、`host/server`、`port`、`rate`、`tags` 等可选字段处理，不要假设所有协议字段一致。

## 套餐、订单与支付

套餐价格字段：`month_price`、`quarter_price`、`half_year_price`、`year_price`、`two_year_price`、`three_year_price`、`onetime_price`、`reset_price`、`deposit`。

| 方法 | 路径 | 参数 | 返回/说明 |
| --- | --- | --- | --- |
| `GET` | `/user/plan/fetch` | 可选 `id` | 不带 ID 返回套餐列表，带 ID 返回套餐详情 |
| `POST` | `/user/order/save` | `plan_id`、`period`；可选 `coupon_code`、`deposit_amount` | `data` 为订单号 `trade_no` |
| `GET` | `/user/order/fetch` | 可选 `status` | 当前用户订单列表 |
| `GET` | `/user/order/detail` | `trade_no` | 订单、套餐及可能的 `surplus_orders` |
| `GET` | `/user/order/check` | `trade_no` | 订单状态数字 |
| `GET` | `/user/order/getPaymentMethod` | 无 | 支付方式、手续费、货币信息 |
| `POST` | `/user/order/checkout` | `trade_no`、`method`；Stripe 可加 `token` | `type=0` 返回二维码/支付内容，`type=1` 返回跳转 URL，具体由支付插件决定 |
| `POST` | `/user/order/cancel` | `trade_no` | `true` |
| `POST` | `/user/coupon/check` | `code`、`plan_id` | 优惠券名称、类型、面值 |

订单状态和支付方式属于后端业务枚举，主题应显示未知值的兜底文案。金额字段不要直接当作元展示，现有用户端按分转换。

## 邀请与佣金

| 方法 | 路径 | 参数 | 返回 |
| --- | --- | --- | --- |
| `GET` | `/user/invite/fetch` | 无 | `codes`、`stat` |
| `GET` | `/user/invite/details` | `current`、`page_size` | 佣金记录及 `total` |
| `GET` | `/user/invite/save` | 无 | 创建邀请码并返回结果 |

## 公告、知识库与帮助

| 方法 | 路径 | 参数 | 返回 |
| --- | --- | --- | --- |
| `GET` | `/user/notice/fetch` | 可选 `id`；列表可用 `current`、`pageSize` | 公告详情，或公告列表 + `total` |
| `GET` | `/user/knowledge/fetch` | 列表可用 `language`、`keyword`；详情用 `id`、`language` | 按分类分组的文章，或文章 `title/body` |
| `GET` | `/user/tutorial/*` | - | 旧版遗留接口，当前后端未注册；教程内容请使用 `/user/knowledge/fetch` |

知识库正文可能包含订阅链接模板，后端会替换 `{{siteName}}`、`{{subscribeUrl}}`、`{{urlEncodeSubscribeUrl}}`、`{{safeBase64SubscribeUrl}}`、`{{subscribeToken}}`。

## 工单

| 方法 | 路径 | 参数 | 返回 |
| --- | --- | --- | --- |
| `GET` | `/user/ticket/fetch` | 可选 `id` | 工单列表，或带消息的工单详情 |
| `POST` | `/user/ticket/save` | `subject`、`level`（`0/1/2`）、`message` | `true` |
| `POST` | `/user/ticket/reply` | `id`、`message` | `true` |
| `POST` | `/user/ticket/close` | `id` | `true` |
| `POST` | `/user/ticket/withdraw` | `withdraw_method`、`withdraw_account` | 创建佣金提现工单，返回 `true` |

## 订阅链接

用户资料里的 `subscribe_url` 可直接使用，也可拼接：

```text
GET /api/v1/client/subscribe?token=<user_token>
```

支持通过 `flag` 或 User-Agent 选择协议格式。该接口返回 YAML、JSON、Base64 或纯文本，`Content-Type` 由协议实现决定，不要按统一 JSON 解析。
