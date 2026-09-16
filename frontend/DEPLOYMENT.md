# 测试站部署记录

## 最新本地验证（未部署）

用户端邀请只读列提取 checkpoint（基于 ebb00782）：Invite.jsx 两表提取为 InviteDisplayColumns.jsx（邀请码日期列 + 佣金记录列，28新增差分/1098测试、两端build、用户邀请6局部截图0差异）。1000*value日期格式与(value/100).toFixed(2)不变，邀请码复制链接列保留在页面，无controller/action/request/server或部署操作。

用户端工单只读列提取 checkpoint（基于 f00d55af）：Ticket.jsx 工单列表表提取为 TicketReadonlyColumns.jsx（id/主题/级别/状态Badge/创建时间/最后回复，65新增差分/1070测试、两端build、用户工单6局部截图0差异、横向滚动通过）。级别数组索引/parseInt真值/1000*value日期格式不变，查看操作列保留在页面，无controller/action/request/server或部署操作。

队列只读列提取 checkpoint（基于 88e2eeb0）：Queue.jsx 队列详情表提取为 QueueDisplayColumns.jsx（31新增差分/1005测试、两端build、队列6局部截图0差异、分页/横向滚动通过）。未知名称→undefined与 `e+"s"` 转换语义不变，控制器/轮询/dataSource过滤不变，无controller/action/request/server或部署操作。

公告/工单 renderer 命名 checkpoint（提交 88e2eeb0）：formatNoticeCreatedAt、renderTicketLevel、formatTicketCreatedAt、formatTicketUpdatedAt（9新增差分/974测试、两端build）。原转换trace/索引/日期格式不变，无controller/action/request/server或部署操作。

Giftcard limit renderer命名checkpoint：7新增差分/965测试、两端build、Giftcard14局部截图及既有页面/通知/checkout回归通过。原null/truthiness/Tag语义不变，无controller/action/request/server或部署操作。

以下为前轮记录：

Coupon类型/次数renderer命名checkpoint：14新增差分/958测试、两端build、优惠券6局部截图及既有页面/通知/checkout回归通过。原null/类型/Tag语义不变，无controller/action/request、服务器或部署操作。

以下为前轮记录：

订单类型/周期renderer命名checkpoint：17新增差分/944测试、两端build、相关局部/页面/通知/checkout通过。原映射/Tag求值和异常语义不变，无业务/服务器或部署操作。

以下为前轮记录：

订单金额/创建时间formatter命名checkpoint：10新增差分/927测试、两端build、相关局部/页面/通知/checkout通过。原数值转换与格式/异常不变，无controller或服务器操作，未部署。

以下为前轮记录：

佣金金额只读formatter checkpoint：917测试、两端build、订单列/详情局部/页面/通知/checkout通过。原fixture、状态短路及转换异常不变，无佣金状态菜单或业务操作，未连接服务器或部署。

以下为前轮记录：

节点状态说明命名checkpoint：911测试、两端build、名称8局部及相关既有回归通过。新增Tooltip展开文案截图，移动legend6像素在原10阈值内，未放宽。同步只读helper，无业务/服务器操作，未部署。

以下为前轮记录：

倍率Tooltip标题命名checkpoint：2新增测试/910单测、两端build、相关局部/页面/通知/checkout回归通过。原文案/元素创建语义不变，无业务或服务器操作，未部署。

以下为前轮记录：

倍率renderer命名checkpoint：3隐式转换差分/908测试、两端build、受影响局部/页面/通知/checkout全部通过。原加法转换和异常语义保留，未连接服务器、未部署或访问真实数据。

以下为前轮记录：

节点名称renderer命名checkpoint：3新增测试/905单测、两端build、相关局部/页面/通知/checkout回归通过。原映射求值、children及异常不变；无事件/action/request修改，无服务器连接或部署。

以下为前轮记录：

PlanGroup匹配helper命名checkpoint：新增3求值顺序差分，902测试、两端build、相关局部/页面/通知/checkout通过。原映射/异常/children语义不变，无服务器连接、业务操作或部署。

以下为前轮记录：

Plan资源renderer命名checkpoint：新增3差分边界，899测试、两端build、资源/价格/权限组局部及页面/通知/checkout全部通过。原fixture/children/null语义不变，无controller/action/request改动，未连接服务器或部署。

以下为前轮记录：

权限组计数helper命名checkpoint：原fixture不变，896测试、两端build、权限组/相关页面/通知/checkout回归通过。仅同步只读元素构造cleanup，参数/列位置/异常不变，无controller/request/server或部署操作。

以下为前轮记录：

路由动作文本列checkpoint：14差分/894测试、两端build、新6局部截图及受影响既有回归通过。只读查表，无路由动作执行或controller/request变化，无服务器连接或部署。

以下为前轮记录：

套餐权限组Tag只读checkpoint：28差分/880测试、两端build、新6局部截图及受影响既有回归通过。原匹配/重复/null语义不变，无事件/action/request修改，无服务器连接或部署，7003保持不变。

以下为前轮记录：

只读formatter命名checkpoint：Coupon/Giftcard日期与套餐名称helper，852测试、两端build、受影响20局部截图/既有页面/通知/checkout通过。字段求值和异常语义不变，无业务/服务器操作，7003发布不变。

以下为前轮记录：

支付通知地址列checkpoint：6差分，850测试、两端build、新6局部截图及受影响支付列/既有页面/通知/checkout通过。URL只作fixture文本，未访问，无controller/action/request修改或部署。

以下为前轮记录：

支付配置纯文本列checkpoint：仅name/payment两列，844测试、两端build、新6局部截图/既有页面/通知/checkout通过。无开关/编辑/controller/request变化，无服务器访问或重新部署。

以下为前轮记录：

Plan资源只读列checkpoint：4列/13差分，837测试、两端build、新6局部截图及受影响既有回归通过。没有controller/action/request或写入变化，无服务器连接或重新部署。7003仍为20260911-065410。

以下为前轮记录：

bd22b5cd 后 Giftcard 边界补强：只改测试/文档，生产源码未改。824测试、两端build、14礼品卡局部截图0差异、60页面/受影响admin局部/通知/checkout回归通过。无服务器连接或业务请求，现有部署不变。

## 当前部署：20260911-065410

- 源码 checkpoint：`2697d75e`，本次重新构建两端成功。
- 测试容器：`v2board-legacy-dev`，端口 7003；其他站点/容器未修改。
- 版本目录：`/data/v2board-legacy-dev/www/v2board/public/assets/restored-20260911-065410/`
- 备份及回滚：`bash /data/v2board-legacy-dev/ui-backups/standalone-20260911-065410/rollback.sh`
- 用户端：`http://5.104.86.24:7003/`；后台：`http://5.104.86.24:7003/4434144c`。
- 更新两端 app.js 和 Blade 版本路径，保留原配置/CSS/字体/语言包，清理 Blade 视图缓存。未修改数据库、账号或业务配置。
- 公网两端脚本与本地构建逐字节一致；Chromium 两端登录页可渲染，无未捕获 JS 异常。本次没有登录账号或执行业务操作，登录后全部页面仍需人工验收。

以下“未部署”段落是各轮开发时的历史状态；截至 2697d75e 的成果已随本次发布部署。

## 最新本地工作（未部署）

礼品卡只读列checkpoint：7列/49差分；811测试、两端build、新6礼品卡截图及既有回归通过。长批次工具超时后通知/checkout完整补跑；既有server-name一例6像素差异仍在未改阈值内。复制/编辑/删除/controller/request未动，无服务器连接、部署或真实数据访问。

以下为前轮记录：

Ticket只读列checkpoint：5列/35差分；762测试、两端build、新6局部截图及全部既有回归通过。状态筛选/操作/controller/request不变，level/time语义保留。未连接服务器、部署或真实数据访问。

以下为前轮记录：

协议Tag只读checkpoint：纯getTypeTag委托至ServerTypeTag，39差分；727测试、两端build、新6局部截图及全部既有回归通过。测试导入命名错误修复后全量重跑。没有controller/request/事件语义变化，无服务器连接、部署或真实数据访问。

以下为前轮记录：

ServerManage name/status只读列checkpoint：原状态映射以参数注入，18差分；688测试、两端build、新6局部截图与全部既有回归通过。过滤/排序/复制/写入/controller/request不变，无语义风险修复。未连接服务器、部署或访问真实数据。

以下为前轮记录：

ServerManage倍率只读列checkpoint：单列提取/12差分；670测试、两端build、新6局部截图和全部既有回归通过。排序/过滤/复制/开关/操作/controller/request不动，保留隐式类型及异常。未连接服务器、部署或访问真实业务数据。

以下为前轮记录：

ServerGroup只读列checkpoint：4列提取/13差分；658测试、两端build、新6组局部截图与全部既有回归通过。计数字面值/样式保留，编辑/删除/新增/controller/request未改。分页/横滚仅测试容器，非生产新功能。无服务器连接、部署或真实数据访问。

以下为前轮记录：

ServerRoute只读列checkpoint：ID/备注/匹配数量，12差分；645单测、两端build、新6局部截图/分页/横滚、既有全部回归通过。动作/操作/controller/request未变。保留null异常与length隐式类型语义。无服务器连接、部署或真实数据访问。

以下为前轮记录：

Knowledge只读列checkpoint：4列提取、14差分；633单测、两端build、新6知识库局部截图/分页/横滚与既有全部回归通过。拖拽/开关/写入/controller不变。仅本地fixture/mock，无服务器连接、部署或真实数据访问。

以下为前轮记录：

Plan价格纯展示checkpoint：8价格列提取，14差分/异常用例；619测试、两端build、新6价格截图/分页/横滚及既有页面/admin全部局部/通知/checkout回归通过。harness括号错误修复重跑；没有改变任何controller/写入/空值风险。未连接服务器、部署或真实数据访问。

以下为前轮记录：

公告只读列 checkpoint：ID/标题/时间3列，12差分，605测试、两端build、新6公告截图/分页/横滚及既有页面/admin局部/通知/checkout全部通过。仅局部表格，显示开关和所有写入/controller不变。无服务器连接、部署或真实数据访问。

以下为前轮记录：

优惠券只读列 checkpoint：5 列提取、24差分；593测试、两端构建、新6优惠券局部截图及既有页面/admin局部/通知/checkout回归通过。列顺序/文案/格式/null语义保留；启用/复制/编辑/删除未迁移或触发。未连接服务器、部署或访问真实数据。

以下为前轮记录：

只读详情可读性 checkpoint：命名变量、同步行 helper、金额/时间 formatter；原 fixture 不变。569 单测（详情36差分）、两端build、60页面/6后台列/6详情/4通知/8checkout回归通过。原 null/NaN/loading 和邮箱筛选参数保留，无写入菜单或业务action变化。未连接服务器、部署或读写真实数据。

以下为前轮记录：

admin 订单详情只读内容 checkpoint：OrderDetailBody 提取，modal 控制器/写入菜单未动。558 单测、两端构建、6详情局部截图、6只读列截图、60既有页面/4通知/8checkout trace 全通过。fixture JSX 编译/React 注入错误已定位修正重跑。未连接服务器、部署或读写真实数据。

以下为前轮记录：

后台订单只读列 checkpoint：5 列提取，15 差分测试；533 单测、两端 build、6 只读表格截图/分页交互、现有 60 页面/4 通知/8 checkout 回归通过。状态写入菜单和详情未迁移，无业务 action 改动。测试为局部表格，不是完整管理页验收。未连接服务器、部署或读写真实业务数据。

以下为前轮记录：

后台订单查询切片（基于 7dc529b1）：提取 fetch/filter/addFilter/changeTable，19 差分用例。518 测试、两端 build、60 页面截图、4 通知回归、8 checkout trace 全绿。无后台页面渲染变化，保留缺 type action 等继承风险。首次 null 断言定位问题已修复并重跑。未连接服务器、部署或访问任何真实数据。

以下为前轮记录：

离线逻辑集成 checkpoint（基于 c45c8c4f）：7 项真实页面控制器/order+comm effects/request wrapper 集成，mock 网络/通知/React及简化 effect runner。499 测试、两端 build、60 页面截图、4 通知回归、8 checkout trace 通过。保留 details 未解析、网络 loading 和迟到轮询风险。生产源码未改，未连接服务器、部署或访问真实业务数据。

以下为前轮记录：

支付 mutation 源码迁移（基于 34eeab26）：orderPaymentEffects.js + 简化 order 模型；492 单测、两端构建、60 页面截图、4 通知回归、8 checkout trace 通过。保持原 details action、token/空响应/loading 语义。测试跳转记录不导航，无服务器连接、部署、真实订单创建/取消或支付数据访问。

以下为前轮记录：

支付边界覆盖 checkpoint：生产代码未改。426 单测、两端构建、60 组页面截图、4 组真实通知截图以及 8 项浏览器 checkout effect trace 对照通过。Stripe 表单/key、网络均模拟；支付跳转在测试构建中记录而不导航。无服务器连接、部署或真实数据读写。原风险仅记录，未修复。

以下为前轮记录：

用户订单查询 checkpoint（基于 5efe8238）：提取 detail/check/getPaymentMethod/fetch。426 项测试、两端构建、52 组页面及 4 组错误通知回归通过。支付写入/取消模型未改动，无语义修复。全程 local fixtures/mocks，未连接服务器或部署；服务器版本不变。

以下为前轮记录：

ProductInfo/OrderInfo checkpoint：374 项测试、两端构建、52 组页面截图与 4 组真实通知组件 mocked 响应截图通过。新增异步交错差分仅记录风险，无生命周期修复。QR portal 截图增加可见性等待并全量重跑通过。所有验证均本地模拟；无服务器连接、真实业务请求或部署，线上版本保持不变。

以下为前轮记录：

摘要/状态组件 checkpoint：OrderPaymentSummary、OrderStatusResult；371 项测试、两端构建、52 组截图 DOM 相同/0 差异像素通过。新增真实请求封装配合 mocked response 的错误通知参数/重定向/reject 测试，以及 QR 关闭/轮询完成顺序与空响应差分。未做业务修复，原断网不通知、空轮询响应被视为完成等风险仍在。全程本地，无服务器连接、部署或真实数据读写。

以下为前轮记录：

支付组件拆分 checkpoint：PaymentMethods/PaymentQrModal，新增迟到回调/缺失支付方法差分测试和二维码关闭/加载/异常状态模拟浏览器覆盖。363 项测试、两端构建、52 组 DOM 一致/0 像素差异截图通过。仅记录原风险，没有修复共享计时器或缺失方法行为。无服务器连接、真实 API 请求或部署，线上版本保持不变。

以下为前轮记录：

OrderDetail checkpoint：标准 import/JSX/具名页面，模拟测试覆盖支付方式/Stripe token、公钥请求、取消确认、完成跳转和轮询生命周期。358 项单元测试、两端构建、44 组截图（DOM 一致、0 像素差异）通过。Stripe/二维码/图片探测使用替身；没有真实支付验证、服务器连接或业务数据访问。当前服务器版本不变，仍为 restored-20260911-010759。

以下为前轮记录：

- 本轮恢复用户端 Order 页面，提取 OrderColumns，隔离内嵌 MobileList 依赖（该依赖未完全清理）。
- 本地测试 348 项通过、两端构建通过；模拟截图扩展至 28 组，DOM 相同、0 差异像素，含桌面取消确认与移动端订单导航交互。
- 未连接服务器、未部署、未调用真实业务 API。`recovered-ui/` 和 `tools/` 继续保持未跟踪参考目录，不纳入提交。

以下为前一轮本地验证记录：

- PlanDetail 已拆分 Pricing、Coupon、OrderSummary 子组件，使用 React.createRef，保留下单/取消确认控制逻辑。
- Traffic、Node、Plan、PlanDetail 共 22 组模拟 Chromium 桌面/移动端对照：DOM 相同、0 差异像素；另有周期选择、优惠券输入、下单按钮的模拟派发检查通过。
- `npm test` 345 项通过，两端构建成功。结果文件在 `frontend/test-results/pages/report.json`，测试命令见 README。
- 测试采用模拟数据/布局/状态，外部请求阻断；不是线上业务验收。没有 SSH、部署、真实 API 读写或服务器数据变更。
- 当前服务器仍为下面的 `restored-20260911-010759`，不包含这些本地改动。

## 当前部署：20260911-010759

- 版本：`/data/v2board-legacy-dev/www/v2board/public/assets/restored-20260911-010759/`
- 回滚：`bash /data/v2board-legacy-dev/ui-backups/standalone-20260911-010759/rollback.sh`
- 包含截至 200 项测试的源码：后台用户写入、生成及导出逻辑整理，用户/优惠券/礼品卡下载 DOM 修复。
- 公网两端脚本与本地构建逐字节一致；真实登录和用户端 5 个/后台 6 个主要页面检查通过，无未捕获 JS 异常。
- 本地 Chromium 下载 helper 测试确认文件名与内容。没有在服务器实际执行批量创建、邮件、删除、封禁或真实数据导出，不能据此声称这些业务已完成线上端到端验收。

## 历史部署：20260911-003852

- 版本：`/data/v2board-legacy-dev/www/v2board/public/assets/restored-20260911-003852/`
- 回滚：`bash /data/v2board-legacy-dev/ui-backups/standalone-20260911-003852/rollback.sh`
- 已包含导航、布局、会话、用户端用户模型和后台用户查询整理（部署前 150 项测试通过）。
- 两端公网 app.js 与部署时本地构建逐字节一致；真实登录及用户端 5 个/后台 6 个页面检查通过，无未捕获 pageerror。
- 部署后本地新增的 `userMutationEffects.js` 尚未部署；新增 32 项离线测试后本地共 182 项通过。未在服务器执行删除、封禁、重置、发邮件等写入操作。

以下为历史部署记录。

## 独立构建首次部署

- 容器：`v2board-legacy-dev`，端口 7003。
- 用户端：`http://5.104.86.24:7003/`
- 后台：`http://5.104.86.24:7003/4434144c`
- 版本目录：`/data/v2board-legacy-dev/www/v2board/public/assets/restored-20260910-235531/`
- 模板备份：`/data/v2board-legacy-dev/ui-backups/standalone-20260910-235531/`

本次上传的是独立 React 工程构建的 `user/app.js` 和 `admin/app.js`，不是之前的 umi.js 重组包。原 Blade 中的三个 bundle 标签换成单个对应 app.js，保留动态站点配置、CSS、字体、语言包和 custom_html。旧静态目录未删除；源码及 source map 没有公开上传。服务器 PHP、数据库、账号、其他容器未修改。

部署后从公网读取两端 app.js，与当时本地构建结果逐字节一致。后续本地依赖重命名和路由整理产生的新构建尚未覆盖此版本。

## 实际浏览器检查

Chromium 真实后端登录成功，以下页面渲染、有内容、未跳回登录页、无未捕获 pageerror：

- 用户端：dashboard、plan、order、profile、ticket。
- 管理端：dashboard、plan、order、user、notice、ticket。

仅执行登录与页面访问，没有新增/修改套餐、订单、用户等业务数据。登录自身会按后端逻辑产生会话/登录记录。这不是全接口成功率检查，也不是视觉一致性验收；其他页面和编辑弹窗尚待测试。

测试脚本：`scripts/check-deployed.mjs`。可用 TEST_BASE、TEST_EMAIL、TEST_PASSWORD 环境变量指定测试环境及账号，不将密码写入源码。

## 回滚

在服务器执行：

```sh
bash /data/v2board-legacy-dev/ui-backups/standalone-20260910-235531/rollback.sh
```

恢复上一个版本的 Blade 并清理视图缓存，不影响数据库。

`scripts/deploy-test.sh` 为本次首次部署脚本，要求入口含三个旧脚本标签；再次部署前必须针对当前模板更新并检查，不能直接重复执行。
