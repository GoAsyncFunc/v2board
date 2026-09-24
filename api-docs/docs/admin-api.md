# 管理端 API 索引

管理端 Base URL 为 `/api/v1/<secure_path>`，默认安全路径由 `config('v2board.secure_path')` 或应用 key 派生；所有接口需要 Admin 鉴权。管理端源码位于 `frontend/admin/src/models/`，路由定义位于 `app/Http/Routes/V1/AdminRoute.php`。

下表列出当前已注册路径。除特别说明外，`fetch` 为 GET，其余为 POST；请求字段应以对应 controller/form request 为准。

| 模块 | 路径 |
| --- | --- |
| Config | `/config/fetch`、`/config/save`、`/config/getEmailTemplate`、`/config/getThemeTemplate`、`/config/setTelegramWebhook`、`/config/testSendMail` |
| Plan | `/plan/fetch`、`/plan/save`、`/plan/drop`、`/plan/update`、`/plan/sort` |
| Server group/route | `/server/group/fetch|save|drop`、`/server/route/fetch|save|drop`、`/server/manage/getNodes`、`/server/manage/sort` |
| Server protocols | `/server/{trojan,vmess,shadowsocks,tuic,hysteria,vless,anytls,v2node}/{save,drop,update,copy}` |
| Order | `/order/fetch`、`/order/update`、`/order/assign`、`/order/paid`、`/order/cancel`、`/order/detail` |
| User | `/user/fetch`、`/user/update`、`/user/getUserInfoById`、`/user/generate`、`/user/dumpCSV`、`/user/sendMail`、`/user/ban`、`/user/resetSecret`、`/user/delUser`、`/user/allDel`、`/user/setInviteUser` |
| Stat | `/stat/getStat`、`/stat/getOverride`、`/stat/getServerLastRank`、`/stat/getServerTodayRank`、`/stat/getUserLastRank`、`/stat/getUserTodayRank`、`/stat/getOrder`、`/stat/getStatUser`、`/stat/getRanking`、`/stat/getStatRecord` |
| Notice | `/notice/fetch`、`/notice/save`、`/notice/update`、`/notice/drop`、`/notice/show` |
| Ticket | `/ticket/fetch`、`/ticket/reply`、`/ticket/close` |
| Coupon/Giftcard | `/coupon/fetch|generate|drop|show`、`/giftcard/fetch|generate|drop` |
| Knowledge | `/knowledge/fetch`、`/knowledge/getCategory`、`/knowledge/save`、`/knowledge/show`、`/knowledge/drop`、`/knowledge/sort` |
| Payment | `/payment/fetch`、`/payment/getPaymentMethods`、`/payment/getPaymentForm`、`/payment/save`、`/payment/drop`、`/payment/show`、`/payment/sort` |
| System | `/system/getSystemStatus`、`/system/getQueueStats`、`/system/getQueueWorkload`、`/system/getQueueMasters`、`/system/getSystemLog` |
| Theme | `/theme/getThemes`、`/theme/saveThemeConfig`、`/theme/getThemeConfig` |

Staff 接口位于 `/api/v1/staff`，权限低于 Admin，包含工单、用户、套餐和公告的有限操作；Passport 接口位于 `/api/v1/passport`，属于用户端公共认证接口。
