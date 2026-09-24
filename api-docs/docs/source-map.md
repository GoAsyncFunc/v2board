# 接口与源码索引

## 用户端前端调用

| 业务 | 调用源码 | 类型源码 |
| --- | --- | --- |
| 登录注册 | `frontend/user/src/models/passport.ts` | `src/types/auth.ts` |
| 会话/账户 | `src/models/sessionEffects.ts`、`userAccountEffects.ts` | `src/types/user.ts` |
| 订阅统计 | `src/models/userSubscriptionEffects.ts`、`stat.ts` | `src/types/subscription.ts`、`commerce.ts` |
| 套餐 | `src/models/plan.ts` | `src/types/plan.ts`、`commonModels.ts` |
| 订单支付 | `src/models/orderQueryEffects.ts`、`orderPaymentEffects.ts` | `src/types/payment.ts`、`checkout.ts` |
| 邀请 | `src/models/invite.ts` | `src/types/invite.ts` |
| 工单 | `src/models/ticket.ts` | `src/types/ticket.ts` |
| 公告/知识库 | `src/models/notice.ts`、`knowledge.ts` | `src/types/subscription.ts`、`knowledge.ts` |
| 节点/Telegram/通信配置 | `src/models/server.ts`、`telegram.ts`、`comm.ts` | `src/types/commerce.ts`、`commonModels.ts` |
| 请求封装 | `src/services/request.ts` | `src/types/api.ts` |

## 后端路由

- 用户路由：`app/Http/Routes/V1/UserRoute.php`
- Passport 路由：`app/Http/Routes/V1/PassportRoute.php`
- Guest 路由：`app/Http/Routes/V1/GuestRoute.php`
- Client 路由：`app/Http/Routes/V1/ClientRoute.php`
- Admin 路由：`app/Http/Routes/V1/AdminRoute.php`
- API 前缀：`app/Providers/RouteServiceProvider.php`
- 用户鉴权：`app/Http/Middleware/User.php`、`app/Services/AuthService.php`
- 订阅 token 鉴权：`app/Http/Middleware/Client.php`

## 已知不一致

- `frontend/user/src/models/tutorial.ts` 是旧版遗留模型；当前教程入口已并入 `frontend/user/src/models/knowledge.ts`，不要为旧模型重新注册 `/user/tutorial/*` 路由。
- `frontend/user/src/models/telegram.ts` 只使用 `/user/telegram/getBotInfo`；后端同目录存在 `unbind` 方法，但 `UserRoute.php` 没有注册 `/user/telegram/unbind`，实际解绑走 `/user/unbindTelegram`。
- 用户端部分类型是兼容旧版本的宽类型；节点、支付表单和订单状态字段应允许后端扩展。
