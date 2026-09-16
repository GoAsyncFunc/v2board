# V2Board React 源码工程

## 当前状态（请先读）

**已实现独立构建，尚未完成全部源码清理及页面验收。**

- `frontend/` 可单独复制、安装依赖、构建，无需 PHP、`public/`、`recovered-ui/` 或旧 bundle。
- 不再使用原 Webpack 启动器、模块注册表、数字/哈希 ID 动态加载或 `@legacy/runtime`。
- React/ReactDOM 已改用 npm 的 16.14.0（与原版一致），使用一个 React 实例。
- 依赖通过普通相对 `require`/`import` 连接，由 esbuild 构建，并生成 source map。
- 两端 Login.jsx 和 services/request.js 已人工整理为具名组件、标准 ES import、async/await 请求代码。
- 两端 passport/layout、用户端 guest、管理端 auth 共 6 个状态模型已改为标准 ES module 和具名 generator，49 项旧/新行为对照测试通过（`npm test`）。
- 两端主布局已拆分为 `layouts/MainLayout.jsx`、`Sidebar.jsx`、`Header.jsx`，使用标准 import 和具名组件；渲染结构及导航、主题开关、头像菜单等行为与拆分前对照通过。组件内部分短变量和历史写法仍需继续整理。
- 两端 `models/sessionEffects.js` 已整理登录检查和资料获取，用户端还包含退出及客服信息同步；`models/user.js` 通过普通文件引用接入，用户端 `models/user.js` 的订阅、统计、资料更新、密码、礼品卡、流量周期、安全重置、余额转入已进一步改为标准 generator，管理端用户查询/筛选/分页逻辑已提取到 `models/userQueryEffects.js`，更新、发邮件、封禁、删除和密钥重置逻辑已进一步提取到 `models/userMutationEffects.js`（写入操作仅离线验证）；生成用户和 CSV 导出已提取到 `models/userExportEffects.js`，后台 `models/user.js` 现在只负责状态、reducers 和逻辑组装。上述改动已部署为 `restored-20260911-010759`。新增 45 项原/新会话行为对照覆盖 token 缺失、权限、失败、跳转、客服联动及网络异常。
- 其他页面/models 仍有短变量名、CommonJS 导出及编译后的 generator 状态机，需要继续人工清理。
- 尚未识别并替换的库、Umi/Dva 内部模块保留在 `src/vendor/modules`，使用普通源文件引用，不是运行时 Webpack 模块表。**这部分尚不符合“全部整理完毕”的交付标准。**

## 目录

```
user/ 或 admin/
  index.html
  public/                  # 独立静态资源、settings.js
  src/
    main.js                # 应用入口
    app/routes.js          # 实际路由注册，可以修改/新增
    app/Router.jsx         # 路由/国际化容器，待进一步整理
    app/store.js           # 状态模型注册
    pages/                 # 用户端 16 / 后台 19 路由页面
    components/
    config/navigation.jsx  # 侧边栏文字、图标、分组、顺序及路径
    layouts/
    models/
    services/request.js
    vendor/modules/        # 尚未命名/替换的依赖源文件
```

`modules.json`、`routes.json`、`dependency-map.json` 仅用于迁移追踪，正常构建不读取前两者来定位模块，新增页面不需要申请模块 ID。

## 安装与构建

在 frontend 目录运行：

```sh
npm ci
npm run build
```

输出为 `dist/user`、`dist/admin`，入口脚本 `app.js`，调试映射 `app.js.map`。构建元数据检查所有输入必须在 frontend 内。已在不含原仓库/recovered-ui/public 的独立临时目录构建两端成功。

固定使用 React 16.14.0 是为了显示和旧组件兼容，并非声称依赖已更新为最新版本。升级 React、Ant Design 等需单独回归。

## 开发与测试后端

```sh
API_PROXY=http://5.104.86.24:7003 npm run dev:user
API_PROXY=http://5.104.86.24:7003 npm run dev:admin
```

访问 http://127.0.0.1:3200 和 http://127.0.0.1:3201 。只监听本机。src/public 修改后自动重新构建，手动刷新查看，不是 HMR。

配置源文件为 `user/public/settings.js` 和 `admin/public/settings.js`，不要编辑 dist，构建会覆盖它。后台 secure_path 设置为测试站路径（7003 当前为 `4434144c`）。使用代理时 host 保持空字符串。API 操作会真实写入测试站，不要连接生产站。

## 新增页面/组件

正常使用 React ES module：

```jsx
import React from 'react';
export default function ExamplePage() {
  return <main className="content"><h1>示例页面</h1></main>;
}
```

保存为 `src/pages/Example.jsx`，在 **`src/app/routes.js`** 的数组中增加：

```js
// 在文件顶部：import ExamplePage from '../pages/Example.jsx';
{ path: '/example', exact: true, component: ExamplePage }
```

访问 `/#/example`。普通组件可以相对 import 引入。`src/app/store.js` 管理状态模型注册；侧边栏导航在 `src/config/navigation.jsx` 的 `navigationItems` 数组中（用户端 12 项、后台 21 项，含分组标题）。`title` 是文字/翻译 ID、`iconClass` 是图标 class、`href` 是路径、`type` 是 item/heading/href。用户端在创建菜单时翻译标题。新增路由不自动增加菜单，需要同步编辑此配置。

请不要同时重写未清理模块的所有导出名称；其他源文件可能仍使用 `a/b/c` 等出口。request.js 保留 a/b 别名以兼容旧 models，同时提供 get/post/request/encodeForm 具名 API。

## 验证

在原仓库中：

```sh
npx playwright install chromium
node scripts/check-browser.mjs
```

此对照测试读取仓库中的 `recovered-ui/dist` 原版，不是生产构建依赖。两端登录页在相同 Chromium、1440×1000、zh-CN、固定未登录 API fixture 下检查无未捕获异常、DOM 完全相同，并比较 PNG 像素。测试禁用动画并等待字体；允许最多 10 个像素的光栅化差异（总 1,440,000 像素），明确输出实际差异，不再将容差结果描述为字节一致。最近一次用户端差异 5 像素，后台 0 像素。通过不等于所有页面/移动端已经 100% 验收。

尚未完成：登录后全页面浏览器回归、各接口边界测试、所有库的版本及许可证清单梳理。

独立工程已经部署到服务器 7003，真实登录及用户端 5 个、后台 6 个页面检查通过，详细版本和回滚信息见 [DEPLOYMENT.md](DEPLOYMENT.md)。部署之后，本地又完成 22 个依赖源文件重命名和两端路由 ES import 整理；这些改动已随 `restored-20260911-003852` 部署。当前 `npm test` 共 1260 项通过（新增 64 项后台收入/实时计数/时间戳差分测试）（新增价格展示差分测试）（新增 11 项秒级时间戳差分测试）（新增 34 项共享日期展示差分/转换测试）（新增 13 项共享时间戳展示差分/转换测试）（新增 20 项共享余额展示差分/转换测试）（新增 19 项后台用户邮箱列差分/时钟测试）（新增 28 项用户邀请只读列差分/转换测试）（新增 65 项用户端工单只读列差分/转换测试）（新增 31 项队列只读列差分/转换测试）（新增 9 项公告/工单 renderer 命名差分测试）（新增 7 项礼品卡剩余次数 renderer 差分测试）（新增 14 项优惠券类型/次数 renderer 差分测试）（新增 17 项订单类型/周期差分测试）（新增 10 项订单金额/创建时间转换差分测试）（新增 6 项佣金金额短路/转换差分测试）（新增 1 项状态说明children顺序差分测试）（新增 2 项倍率标题结构/元素独立性测试）（新增 3 项倍率隐式转换契约差分测试）（新增 3 项节点名称renderer求值/映射测试）（新增 3 项权限组匹配求值顺序差分测试）（新增 3 项Plan资源原值身份/不转换测试）（新增 2 项计数children身份/不转换验证）（新增 14 项路由动作文本差分测试）（新增 28 项套餐权限组展示差分测试）（新增 2 项日期字段访问顺序差分测试）（新增 6 项支付通知地址列差分测试）（新增 7 项支付配置纯文本列差分测试）（新增 13 项套餐资源只读列差分测试）（新增 13 项 Giftcard lookup/空行边界差分测试）（新增 49 项礼品卡只读列差分测试）（新增 35 项后台工单只读列差分测试）（新增 39 项协议Tag差分测试）（新增 18 项节点名称/状态列差分测试）（新增 12 项节点倍率列差分测试）（新增 13 项权限组只读列差分测试）（新增 12 项路由只读列差分测试）（新增 14 项知识库只读列差分测试）（新增 14 项后台套餐价格列差分/异常测试）（新增 12 项公告只读列差分测试）（新增 24 项优惠券只读列差分测试）（新增 11 项后台详情极端/短路差分测试）（新增 25 项后台详情只读内容差分测试）（新增 15 项后台只读订单列差分测试）（新增 19 项后台订单查询差分测试）（新增 7 项页面控制器/模型/request 离线集成测试）（新增 66 项支付 mutation 原/新差分测试）（新增 52 项用户订单查询模型差分测试）（新增 3 项重复/迟到回调与计时器交错差分测试）（新增 5 项真实请求封装模拟错误测试、3 项关闭/回调顺序与空响应差分测试）（新增 5 项迟到回调/缺失支付方式差分测试）（新增 10 项 OrderDetail 控制器差分测试）（新增 3 项订单页生命周期/取消确认测试）（新增 38 项套餐详情/下单确认差分测试）（新增 37 项套餐列表页面对照测试）（新增 11 项节点页结构、导航和列渲染对照测试）（新增 7 项流量页面结构/列渲染对照测试）（含 18 项用户端、34 项后台套餐模型差分测试）（包含 2 项下载 DOM/URL 清理测试和 16 项生成/导出业务分支测试）：49 项模型测试、45 项会话测试、37 项用户账户操作测试、17 项后台用户查询测试、32 项后台用户写入逻辑离线测试、2 项包含多组渲染/行为断言的布局测试。截至 200 项测试的版本已部署为 `restored-20260911-010759`，见 DEPLOYMENT.md。账户操作测试全部使用离线桩，没有实际兑换、转账或修改密码；它们验证迁移前后等价，不等于对旧业务行为做安全性或输入合法性背书。

## 当前测试部署

经用户授权，源码 `2697d75e` 已部署到 7003，发布版本 `restored-20260911-065410`。两端脚本字节核对及未登录页面浏览器检查通过；本次未执行登录后业务操作。回滚与细节见 DEPLOYMENT.md。下文“未部署”描述是对应开发轮次的历史记录，不代表当前部署状态。

## 最新本地进度

基于502cc546：后台 Dashboard 收入卡片4处 (value/100).toFixed(2) 与实时注册计数提取为 `admin/src/components/MoneyDisplay.jsx` 的 formatIncome/formatLiveCount；后台 TicketDetail 聊天时间戳提取为 `admin/src/components/DateTimeDisplay.jsx` 的 formatDateTime。无事件/请求。

新增64项原/新差分覆盖收入回退、计数与时间戳转换/边界；1260测试、两端build、admin收入/时间戳8组桌面/移动截图0像素差异。无controller/action/request/server或部署变化。

基于29cae551：价格表达式 (value/100).toFixed(2) 提取为 `user/src/components/MoneyDisplay.jsx` 的 formatPrice，用于 Order.jsx 移动端金额、OrderColumns.jsx 订单金额与 PlanCard.jsx 价格；plan-page 测试 mock 补充 MoneyDisplay stub，页面截图脚本改用系统 Chrome。无事件/请求。

新增价格差分测试；1196测试、两端build、money/datetime 8组局部截图与全站页面截图0像素差异。无controller/action/request/server或部署变化。

基于0ff30935：秒级时间戳 YYYY-MM-DD HH:mm:ss 提取为 `user/src/components/DateTimeDisplay.jsx` 的 formatDateTimeSeconds，用于 Order.jsx 移动端与 checkout OrderInfo.jsx 创建时间；OrderColumns.jsx 桌面端创建时间复用 formatDateTime（移除已无用的 moment import）。无事件/请求。

新增11项原/新差分覆盖秒级转换与边界；1195测试、两端build、时间戳4组桌面/移动截图0像素差异。无controller/action/request/server或部署变化。

基于abfc8691：Knowledge 更新时间与 Dashboard 创建/到期日期提取为 `user/src/components/DateTimeDisplay.jsx` 的 formatDate/formatDateDash/formatDaysRemaining，保留 moment().format('X') 天数计算与 1000*value 转换。无事件/请求。

新增34项原/新差分覆盖日期转换、undefined/边界及 ToPrimitive trace；1184测试、两端build、时间戳4组桌面/移动截图0像素差异。无controller/action/request/server或部署变化。

基于943040ee：TicketDetail 聊天时间戳（is_me 两分支相同表达式）提取为 `user/src/components/DateTimeDisplay.jsx` 的 formatDateTime，保留 1000*value 转换与 YYYY/MM/DD HH:mm 格式。无事件/请求。

新增13项原/新差分覆盖时间戳转换、undefined/边界及 ToPrimitive trace；1150测试、两端build、时间戳4组桌面/移动截图0像素差异。无controller/action/request/server或部署变化。

基于0ba76e31：Profile 钱包余额与 Invite 佣金余额两处相同表达式提取为 `user/src/components/MoneyDisplay.jsx` 的 formatMoney，保留 `void 0 !== value ? (parseInt(value)/100).toFixed(2) : '--.--'`（parseInt 转换与 undefined 哨兵）。无事件/请求。

新增20项原/新差分覆盖余额转换、undefined/边界及异常；1137测试、两端build、余额4组桌面/移动截图0像素差异。无controller/action/request/server或部署变化。

基于d453f38d：后台 User.jsx 邮箱/在线列提取为 `admin/src/components/UserDisplayColumns.jsx`，命名 formatUserLastOnline/renderUserOnlineStatus，保留 1000*value 日期格式（YYYY-MM-DD HH:mm:ss）、new Date().getTime() 时钟与 lastSeen 真值判定（600 秒阈值）。sorter/筛选/操作列保留在页面。无事件/请求/排序列边界。

新增19项原/新差分覆盖最后在线、在线状态、固定时钟及列结构；1117测试、两端build、后台用户8组桌面/移动截图0像素差异（含 Tooltip 悬停）。无controller/action/request/server或部署变化。

基于ebb00782：用户端 Invite.jsx 两表提取为 `user/src/components/InviteDisplayColumns.jsx`（邀请码日期列 + 佣金发放记录列 发放时间/佣金），命名 formatInviteCreatedAt/formatCommissionAmount，保留 1000*value 日期格式与 (value/100).toFixed(2)。邀请码列（复制链接 onClick）保留在页面。无事件/请求/排序列边界。

新增28项原/新差分覆盖日期转换、佣金金额、空表及列结构；1098测试、两端build、用户邀请6组桌面/移动截图0像素差异。无controller/action/request/server或部署变化。

基于f00d55af：用户端 Ticket.jsx 工单列表表提取为 `user/src/components/TicketReadonlyColumns.jsx`，命名 renderTicketLevel/renderTicketReplyStatus/formatTicketCreatedAt/formatTicketUpdatedAt，保留级别数组索引、parseInt 真值判定（状态 Badge 已关闭/已答复/待处理）、1000*value 日期格式。查看操作列（导航/关闭事件）保留在页面。无事件/请求/排序列边界。

新增65项原/新差分覆盖级别转换、回复状态、日期转换及空表；1070测试、两端build、用户工单6组桌面/移动截图0像素差异、横向滚动通过。无controller/action/request/server或部署变化。

基于88e2eeb0：后台 Queue.jsx 队列详情表提取为 `admin/src/components/QueueDisplayColumns.jsx`，命名 formatQueueName/formatQueueWait，保留未知队列名返回 undefined、`e + "s"` 隐式转换（default hint、valueOf/toString 顺序与抛错）。控制器、轮询与 dataSource 过滤不变，原fixture为原列提取。无事件/请求/排序列边界。

新增31项原/新差分覆盖名称映射、wait coercion、空表及分页；1005测试、两端build、队列6组桌面/移动截图0像素差异、分页与横向滚动通过，git diff检查通过。无controller/action/request/server或部署变化。

基于ddd677ab（提交 88e2eeb0）：NoticeDisplayColumns.created_at 命名为 formatNoticeCreatedAt；TicketDisplayColumns 的级别/创建时间/最后回复命名为 renderTicketLevel/formatTicketCreatedAt/formatTicketUpdatedAt，保留 1000*value 转换 trace、级别数组索引与日期格式。原fixture不改，无controller/action/request/服务器或部署变化。

新增9项边界差分；974测试、两端build通过。

基于ddd677ab：GiftcardDisplayColumns剩余次数inline renderer命名为renderGiftcardLimit，保留仅null为无限、原Tag children/样式和异常。原fixture不改，无controller/action/request/服务器或部署变化。

新增7项null/undefined/数字/字符串/对象/Symbol边界差分；965测试、两端build、Giftcard14局部截图0差异、优惠券/60页面/通知/checkout回归通过，git diff检查通过。


基于fc438519：CouponDisplayColumns的类型和剩余次数inline renderer命名为formatCouponType/renderCouponLimit，保留类型严格等于1、未知归比例、limit仅null为无限、Tag children及异常行为。原fixture不改，无controller/action/request/服务器或部署变化。

新增14项边界差分覆盖null/undefined/数字/字符串/对象/Symbol；958测试、两端build、优惠券6局部截图0差异、既有页面/通知/checkout回归通过，git diff检查通过。


基于90a857e8：OrderDisplay类型/周期内联renderer命名为formatOrderType/renderOrderPeriod，保留每次普通对象映射查找（含继承属性行为）、settings.periodText先读再order.period再索引、忽略首值参数、Tag原children/null props。原fixture未改，17新增差分覆盖类型文案/未知值/属性coercion/映射getter/空记录异常。944测试、两端build、订单列6局部截图0差异、详情/60页面/4通知/8checkout通过。未合并详情格式，无controller/action/request/server或部署变化。


基于722ad493：OrderDisplay支付金额/创建时间内联renderer命名为formatOrderPaymentAmount/formatOrderCreatedAt，原fixture不改，不合并详情页不同格式。10新增差分覆盖number hint/转换抛错及undefined/NaN/Infinity/负数/字符串/Symbol，927测试、两端build、订单列6局部截图0差异、详情/60页面/4通知/8checkout通过。无默认文案/缓存/事件/controller/action/request或服务器部署变化。


基于77f0e04b：已提取OrderDisplayColumns的佣金金额renderer命名为formatOrderCommission，原fixture不变。保留status两次读取的短路、先判状态后金额truthiness/转换、异常行为。新增6项getter/valueOf顺序及抛错差分，917测试、两端build、订单列6截图0差异、详情/60页面/4通知/8checkout回归通过。不触碰佣金状态菜单/controller/action/request，无服务器连接或部署。


基于68023048：ServerName Tooltip三态说明命名为同步renderServerStatusLegend，原Badge/文本/空格/br顺序不变，不缓存、不增加组件生命周期。新增原fixture说明顺序测试；局部截图6→8，增加两宽度Tooltip展开/文案检查（移动宽度用鼠标hover，并非触屏手势验收）。911测试、两端build、名称8局部（桌面legend0、移动legend6像素差异，原10阈值不变）、相关rate/60页面/4通知/8checkout通过。无controller/action/request/server或部署变化。


基于4fd567a8：倍率Tooltip标题同步命名为renderServerRateTitle，每次创建列仍生成新元素，不缓存、不增加生命周期。原fixture不改，新增2项文案/Icon/props及同工厂多次调用元素独立性对照；910测试、两端build、倍率6局部截图0差异、相关name/60页面/4通知/8checkout通过。无事件/默认值/controller/action/request/server或部署变化。


基于958da742：ServerRate内联Tag输出命名为同步renderServerRate，保留value+' x'的default hint、valueOf/toString顺序与抛错。原fixture/列位置/Tooltip/样式不变，无默认文案或事件。新增3差分，908测试、两端build、倍率6局部截图0差异、相关name/60页面/4通知/8checkout回归通过。无controller/action/request/server或部署变化。


基于b461f70e：ServerNameColumn标题/名称状态输出命名为同步renderServerNameTitle/renderServerName，原fixture和调用点不变，未增加组件生命周期。3新增差分/断言验证先读取available_status再查映射、getter异常、原始name身份和映射创建后可变行为；905测试、两端build、名称6局部截图0差异、相关倍率/60页面/4通知/8checkout回归通过。无默认值/事件/controller/request/server或部署变化。


基于9b942783：PlanGroup内联匹配命名为同步renderPlanGroupTags，原fixture不改；保留每条记录先读id再parseInt、匹配后读name、重复Tag、空列表不转换输入以及中途抛错语义。新增3项getter/toString追踪测试，902测试、两端build、权限组6局部截图0差异、相关资源/60页面/4通知/8checkout回归通过。无控制器/action/request/服务器或部署变化。


基于2ce08be4：PlanResourceColumns内联renderer命名为renderPlanCount/renderPlanTraffic/displayDeviceLimit，同步元素helper不增加包装或生命周期。保留原Fragment/图标样式/GB独立child、null-only设备限制，fixture未改。新增3项opaque对象身份、不coerce、undefined与null区分验证；899测试、两端build、资源6局部截图0差异、相关Plan价格/权限组及60页面/4通知/8checkout回归通过，无controller/action/request/服务器或部署变化。


基于51615f8a：ServerGroup已提取计数列做局部命名cleanup，重复Fragment/Icon/空格/原值提取为同步renderGroupCount，不新增组件包装或事件。原fixture不变；新增2项opaque children身份及无coercion断言，保留对象等无效React child风险而不修。896测试、两端build、6权限组局部截图0差异、相关PlanGroup/60页面/4通知/8checkout回归通过，无服务器连接或部署。


基于27a9030e：提取ServerRoute动作文本列至RouteActionColumn.jsx，传入原routeActionText映射，原位置、直接属性访问及未知/null行为不变。此列仅显示文本，不是操作菜单，不执行动作。14差分覆盖已知/未知/空值及null映射异常；新6局部截图0差异，894测试、两端build、受影响路由展示与60页面/4通知/8checkout回归通过。无controller/action/request修改，无服务器访问或部署。


基于531872e3：提取Plan权限组纯展示列至PlanGroupColumn.jsx，传入原render的groups；保留map遍历、循环内parseInt、严格ID比较、重复匹配多个Tag与原null异常。没有筛选/排序/事件/controller/request变化。28差分覆盖空/null列表、null条目、字符串ID、重复ID及缺值；新6局部截图0差异，880测试、两端build、受影响Plan/Group与60页面/4通知/8checkout回归通过。未连接服务器或部署。


基于aecc1019：只做已提取Coupon/Giftcard组件命名cleanup，分别新增formatCouponValidity、formatGiftcardValidity、findGiftcardPlanName。保留两组件独立依赖，未引入共享模块或默认值；开始字段格式化后才读取结束字段，严格plan ID/异常语义不变，原fixture未改。新增2项getter顺序/抛错短路差分；852测试、两端build、Coupon6/Giftcard14局部截图0差异、60页面/4通知/8checkout回归通过。无controller/action/request变化，无服务器连接或部署。


基于b9ab0ac5：提取支付配置 notify_url 只读列为PaymentNotifyColumn.jsx，原Tooltip文案、图标和文本直出不变，没有URL点击/复制/访问。6差分覆盖虚构URL/空/null/undefined/数字/字面HTML，列位置及控制器不变。

850单测、两端build、新6局部桌面/移动截图0差异、受影响支付文本列及60页面/4通知/8checkout回归通过。所有地址仅fixture文本，无服务器连接或部署；不代表完整支付配置页验收。


基于f9df2451：ConfigPayment的显示名称/支付接口两列提取至PaymentDisplayColumns.jsx，保留文本直出和位置，无render/过滤/排序新增。ID拖拽图标、启用、编辑和controller/request不动。7差分覆盖空/null/undefined/数字/字面HTML/长文本；新6局部桌面/移动截图0差异。844单测、两端build、60既有页面/4通知/8checkout回归通过；局部表格分页/滚动仅harness。无服务器连接或部署。


基于857bddfd：跳过User排序列，提取Plan名称/统计/流量/设备数限制至PlanResourceColumns.jsx。原图标cursor样式、Fragment、空格、GB文本及null-only '-'不变；无控制器/操作/请求变化。13差分覆盖正常/零/负数/null/undefined/字符串/非有限数/非标准children（仅比较传递结构，不保证React可渲染对象）。

837测试、两端build、新6资源局部截图0差异；60页面及受影响Plan价格/Giftcard/Group局部、4通知/8checkout回归通过。分页/滚动仅测试容器，生产配置不变。未连接服务器、未部署，7003保持先前发布。


部署记录 bd22b5cd 后本轮仅补测试，生产源码未改。Giftcard 新13项边界覆盖严格ID、重复ID取首项、无名称/null名称、空/null/undefined列表及null/undefined/缺字段行；原fixture不改，异常按原语义比较。局部截图由6增至14组（新增空列表/ID不匹配/重复ID/缺名称 × 桌面移动），均0像素差异。

824测试、两端build、60页面及受影响Coupon/Plan价格局部、4通知/8checkout回归通过。未重新连接服务器、部署或访问真实数据；本轮测试改动仅本地。


基于d5f4b571：提取Giftcard的ID/名称/类型/数值/套餐/剩余次数/有效期七个纯展示列到GiftcardDisplayColumns.jsx，plans沿用当前render参数。49差分覆盖类型严格匹配、数值toFixed异常、字符串拼接、null/undefined/NaN、套餐ID严格比较；原异常和无默认值语义保持。复制卡密、编辑/删除、请求/controller不变。

811测试、两端build、新6礼品卡局部截图0像素差异通过。全套回归长命令达到420秒工具时限，之前页面/admin脚本已完成，随后通知和checkout完整单独重跑通过；既有server-name移动rows本次6像素差异，在原10像素阈值内（未放宽）。本轮无服务器访问/部署/真实数据操作。


基于b1056e96：ServerManage剩余列仍混有交互，改选admin Ticket的ID/主题/工单级别/创建时间/最后回复五个纯展示列，提取TicketDisplayColumns.jsx。level映射数组f作为参数传入，索引严格属性访问行为和时间转换不变。状态列含filter不动，操作/controller/request不动。

35差分覆盖level 0/1/2/未知/字符串/null/undefined与多类时间；新6局部桌面/移动表格截图0差异，分页/横滚仅harness。762单测、两端build、60页面及全部既有admin局部/4通知/8checkout回归通过，无服务器连接或部署。


基于302e3b54：剩余ServerManage列存在过滤/排序/复制，改选纯getTypeTag函数，提取ServerTypeTag.jsx。原方法保留为委托，所有调用点不变；8协议颜色和未知类型undefined、label直出不变，无事件/controller/action/request改变。

39差分验证已知/未知/大小写/null类型及文本/0/null标签；新6局部Tag表格桌面/移动截图0差异，分页/滚动仅测试容器。harness首次导入命名错误已修复并全量重跑，727测试、两端build、60页面、全部admin局部/4通知/8checkout回归通过。无服务器连接或部署。


基于 275a7ef3：ServerManage 的 name/available_status 纯展示列提取到 ServerNameColumn.jsx，原局部状态映射 D 作为参数传入（其他引用不变）；Tooltip三条说明、Badge和名称结构原样保留。18差分覆盖状态0/1/2/未知/字符串/null/缺字段和空名称/null行异常，没有新增默认状态。所有筛选/排序/复制/写入/controller/request未动。

新check-admin-server-name.mjs 6局部桌面/移动截图0像素差异，测试容器分页/横滚通过；688单测、两端build、60页面及全部既有admin局部/4通知/8checkout回归通过。非完整ServerManage页验收，无服务器连接或部署。


基于 cbc23dba：ServerManage盘点后跳过ID实例方法/筛选、地址复制、人数sorter和权限组过滤，仅提取倍率纯展示列到 ServerRateColumn.jsx。原列位置、Tooltip/Icon/Tag及value+' x'语义不变，null/undefined直接字符串化、Symbol异常保留。12原fixture差分通过；无controller/action/request/写入变更。

新check-admin-server-rate.mjs 6局部桌面/移动表格截图0像素差异，分页/横滚为测试容器配置。670单测、两端build、60页面及全部既有admin局部/4通知/8checkout回归通过，未连接服务器或部署。只是单列恢复，ServerManage大部分仍未整理。


基于 e27479cf：ServerGroup 四列组ID/名称/用户数量/节点数量提取为 ServerGroupDisplayColumns.jsx；计数图标、空格、Fragment 和 cursor:move 样式保留（无新增拖拽事件），值直接渲染不格式化。编辑/删除/新增/controller/action/request完全不动。原fixture保存，13差分覆盖0/负数/null/undefined/字符串/NaN/Infinity及非标准children；对象children仍直接传递，测试不声称React可成功渲染对象。

新增check-admin-server-group-display.mjs 6局部桌面/移动截图0像素差异，测试容器分页/横滚通过；原生产表格仍pagination:false。658单测、两端build、60既有页面及全部admin局部/通知/checkout回归通过，全程本地无部署。


基于 1bf7089a：盘点 server/group/route，选 ServerRoute 的 ID/备注/匹配数量3列，提取 ServerRouteDisplayColumns.jsx 与 formatRouteMatchCount；动作文本、操作列/controller/request不动。原fixture保留，12差分覆盖字符串逗号过滤（不trim空格）、数组、null/undefined异常及非标准length隐式比较，无默认值/风险修复。

新check-admin-server-route-display.mjs 6局部桌面/移动截图0像素差异，分页/横滚测试通过；不是完整路由管理页验收。645单测、两端build、60页面、全部既有admin局部、4通知/8checkout回归通过，无服务器连接、部署或真实数据操作。


基于 483beff9：选择 Knowledge 的文章ID/标题/分类/更新时间四个纯展示列，提取 KnowledgeDisplayColumns.jsx，原位置/顺序保留。拖拽、显示开关、编辑/删除和请求控制器未动；分类不新增映射或默认值，时间仍使用原秒→毫秒与格式。

14项原列fixture差分覆盖长标题/分类、null/缺字段、极端日期、未知分类与字面HTML标题。check-admin-knowledge-display.mjs 6局部桌面/移动截图0像素差异，测试容器分页/横滚通过，不代表完整知识库页验收。633单测、两端build、60页面、全部既有admin局部、4通知/8checkout回归通过，无服务器连接或部署。


基于 e755de6e：Plan 的月/季/半年/年/两年/三年/一次性/重置包8个纯价格列提取到 PlanPriceColumns.jsx，共用 formatPlanPrice，保留原顺序与 value!==null?value.toFixed(2):'-'。undefined/字符串/boolean 原样 TypeError，NaN/Infinity、负数及0格式不新增兜底；缺字段/空行在单测断言继承异常。show/renew/sort/action/controller及所有写入未动。

14项单测覆盖全部8列的正常/极端/异常值。check-admin-plan-price.mjs 新6局部桌面/移动截图0像素差异、分页/横滚通过（仅测试容器配置）。首次脚本生成多余括号导致构建报错，已修复 harness 并完整重跑。619单测、两端build、60既有页面、全部admin局部、4通知/8checkout回归通过，无服务器连接或部署。


基于 966e7b8b：Notice 只有 ID/标题/创建时间为纯展示，提取到 NoticeDisplayColumns.jsx；原显示开关、编辑/删除/controller不变。原列fixture保留，12差分覆盖长标题、null/缺字段/极端日期与无关未知类型字段（原版没有类型列，不新增）。时间单位、格式和隐式转换保持原样。

新增 check-admin-notice-display.mjs：真实Table局部桌面/移动×完整/空/加载6组截图0像素差异，验证分页及390px横向滚动。局部测试人为提供分页/900px滚动容器，不声称原页面有新增功能，生产表格配置未改。605单测、两端build、既有60页面和全部admin局部/通知/checkout回归通过，未部署。


基于 af1d7583：inventory 对比 Plan/Coupon/Notice，选择 Coupon 的 id/name/type/limit_use/started_at 五个只读列，提取 `CouponDisplayColumns.jsx`，原位置/顺序不变。启用、券码复制、编辑/删除列与 controller 未动。原列 fixture 保存为 admin-coupon-display.cjs；24 差分覆盖类型严格比较（字符串 1 仍为比例）、null 无限/undefined 空值、负次数、缺字段/空行、极端日期。没有新增兜底或修风险。

新增 `check-admin-coupon-display.mjs`：局部真实 Table/Tag 桌面/移动 × 完整/空/加载 6 组0像素差异，分页交互通过，不是完整优惠券页/业务API验收。593 单测、两端build、现有60页面、admin订单列/详情及新优惠券局部、4通知/8checkout trace 全绿；无服务器访问或部署。


基于 9c44fda2：OrderDetailBody 的短变量与重复 Row/Col 改为具名 props、rowStyle、同步 detailRow helper；提取 formatOrderAmount/formatOrderTime。原 fixture 未变，helper 不增加 DOM wrapper；保留 email 门控短路、严格计划 ID 比较、金额隐式转换、零实际佣金的原表达式行为及两种邮箱筛选参数。新增 undefined/NaN/Infinity/字符串金额、无邮箱且其他对象 null、缺邀请人、字符串 ID 不匹配等 11 例，原 25 例加新例共 36 差分通过。

569 单测、两端 build、既有 60 页面、6后台列/6详情局部截图、4通知/8checkout trace 全通过，详情截图 0 像素差异。仅可读性变化，无 controller/action/写入菜单修改，无服务器连接或部署。


基于 ffdba18f：提取 `admin/components/OrderDetailBody.jsx`，仅详情内容（邮箱/订单/套餐/状态/金额/时间/佣金及加载图标），原 modal 标题、开关、请求控制器、写入菜单不变。邮箱筛选链接通过 onUserFilter 保持原参数；没有执行业务 action。

25 项差分覆盖完整/null/缺字段/无计划/极端金额与时间/各状态；user/order/plans 为 null 时原有异常保留，缺金额显示 NaN、无邮箱显示加载均未改语义。新增 `check-admin-order-detail.mjs`：只读内容及标题容器 desktop/mobile × 完整/缺字段/加载 6 组局部截图 0 差异像素，模拟邮箱点击参数通过，不是完整 modal/API 集成。

初次 fixture 含 JSX 未转译、随后浏览器 fixture 缺 React 绑定，已分别修正测试编译和依赖注入，原 render 表达式不变，完整重跑通过：558 单测、两端 build、60 页面、两套 admin 各6局部截图、4通知、8checkout trace。无部署/服务器连接。


基于 eda29af5：本轮仅提取 admin 订单的 5 个只读列至 `components/OrderDisplayColumns.jsx`：类型、周期、支付金额、佣金金额、创建时间。原位置引用列对象，顺序和 render 格式保持一致；订单状态/佣金状态包含写入菜单，未迁移；详情弹窗本轮尚未拆分。保存原列 fixture `admin-order-display.cjs`。

15 项差分验证 5 种状态下金额/佣金/时间；新增 `node scripts/check-admin-order-display.mjs` 使用真实 Table/Tag 和静态字体样式，desktop/mobile × rows/empty/loading 6 组截图 0 差异像素，测试只读表格分页。它不是完整后台订单页截图（不含状态写入菜单/详情），不能代替这些部分的验收。422/500/网络拒绝和筛选依然由上一轮查询模型差分覆盖。本轮 533 单测、两端 build、现有 60 页面/4 通知/8 checkout 回归通过，无服务器访问或部署。


基于 7dc529b1：admin inventory 发现订单模型约 33KB、订单页约 31KB，选择低风险查询切片。`admin/src/models/orderQueryEffects.js` 提取 fetch/filter/addFilter/changeTable；原 API 安全路径、参数合并顺序、分页原地变更、两次 setState 顺序均保留。原版选定 effects 和 runtime 保存为 `tests/fixtures/models/admin-order-query.cjs`。

19 项差分覆盖成功/空数组/null/422/500/网络拒绝、分页筛选及严格 runner 下缺失 type 错误。addFilter(clear) 原 `put({filter:[]})` 缺 type 风险保留，未修；金额/状态/时间字段原样传递，页面列/文案未修改，本轮不增加后台页面截图也不声称渲染已清理。首次测试因真值查找漏掉 orders:null 而失败，已改为属性存在检查并全量重跑。

当前 518 单测、两端 build、60 页面截图、4 通知回归、8 checkout trace 通过，无服务器连接或部署。下一步可整理后台订单状态列和详情展示，写入操作仍待迁移。


基于 c45c8c4f：新增 `tests/order-integration.test.mjs`，esbuild 将真实 OrderDetail 控制器、order/comm 模型和 request wrapper 组合到隔离 VM；使用最小 generator/put/select/reducer runner、可控 Promise 和计时器。覆盖 key HTTP 500、QR checkout→check→详情刷新、422/500 通知调用、网络拒绝、cancel→fetch/details→complete、卸载后迟到响应。通知/React/网络为替身，因此这是逻辑集成，不是完整 Dva 调度器或浏览器渲染集成；真实通知 UI 由现有独立浏览器测试覆盖。

runner 明确记录未解析 `order/details`，没有改成 detail；网络拒绝 loading 保持 true、迟到响应重启轮询均以风险断言记录。window.location 使用记录 setter，所有依赖都本地，没有 socket 或服务器访问。生产文件未修改；499 测试、两端 build、60 页面截图、4 通知回归、8 checkout trace 通过。未部署。


基于 34eeab26：用户 `order.js` 的 save/checkout/checkoutByStripe/cancel 已迁移到 `orderPaymentEffects.js`，模型入口改为状态/reducer/具名 effects 组装。基线使用已提交的 recovered 原样 factory（未改动），66 项差分覆盖成功、422/500、网络拒绝、空对象/null、QR/跳转/type=2、token/method 缺失或畸形、回调和取消 fetch→details 顺序。保留 details 拼写、直接转发 undefined token、网络失败 loading 不复位等语义，未修复风险。

当前本地 492 测试、两端 build、60 页面截图、4 通知截图及 8 browser checkout trace 全通过。浏览器 trace 的跳转拦截同时覆盖新 orderPaymentEffects 文件，原版/新版均只记录不导航；单测使用隔离 VM location setter。尚未部署。


本轮仅扩展支付覆盖，未改生产源码。新增 key 未返回、模拟 Stripe token 错误/畸形 token、零元无支付方式 4 个场景，两种宽度下页面/按钮行为均与原版页面 fixture 一致。模拟 Stripe 表单不是 Stripe SDK，也没有模拟 HTTP 公钥接口完整流程；key failure 表示 key 没有回调成功的 UI 状态。

`node scripts/check-checkout-effects.mjs` 在隔离浏览器执行从 recovered-ui 原样保存的订单 factory 和当前模型，共 8 个 checkout 分支（422/500/网络拒绝/二维码/跳转/零元未选方式/Stripe/token 缺失）trace 对照通过。跳转赋值在两版测试构建中一致重定向为记录变量，绝不导航支付地址。422/500 错误 UI 由独立真实通知回归覆盖，不宣称此 effect harness 是完整端到端支付测试。零元返回 type=2 保持原无额外派发；畸形 token 可派发 undefined、key/token 错误无新增文案等继承风险未修。


基于 5efe8238 的本地 inventory：用户端尚有 11 个编译式模型，后台尚有 22 个；本轮选择用户订单查询这一低风险切片。`models/orderQueryEffects.js` 提取 detail/check/getPaymentMethod/fetch，原 order.js 通过普通文件引用接入，save/checkout/Stripe/cancel 尚未改写。52 项对照验证成功、422/500、空数组/null/0/1 数据、回调缺失及网络异常。getPaymentMethod 的 complete 缺失抛错、网络异常不重置 loading 等保持原语义。

本轮 426 项单测、两端构建、52 组页面截图和 4 组真实通知 mocked 回归通过；无服务器访问或部署。剩余支付 form/key failure 浏览器覆盖尚未扩展，不能将查询模型测试当作实际支付表单验收。


OrderDetail 商品信息与订单信息（含原取消确认）已提取至 `checkout/ProductInfo.jsx`、`OrderInfo.jsx`，保持原展示及派发逻辑。无业务语义修复。新增差分记录迟到完成仍刷新、重复待支付回调产生双计时器、连续 check 后卸载只清理最后计时器；原风险未解决。

新增 `node scripts/check-error-notifications.mjs`：真实 request.js + 真实通知/message 组件，mock 422/500 响应，比较预期直接通知与请求错误产生的通知；桌面/移动共 4 组 0 像素差异，验证桌面关闭和移动自动消失。国际化/网络是替身，不是原版错误页面或完整业务集成测试。输出在 `test-results/notifications/`，所有外部请求阻断。

页面截图曾出现 QR portal 遮罩采样时序差异，已显式等待弹窗和 mock QR 可见后完整重跑；52 组对照通过，未增大阈值。首次重跑被工具 240 秒时限终止，延长执行时限后的完整运行通过。这些本地改动尚未部署。


OrderDetail 继续提取 `OrderPaymentSummary.jsx`（原列包装、金额明细、手续费和结账按钮）与 `OrderStatusResult.jsx`（状态结果及教程入口），保持计算和 JSX 结构。页面仍有商品信息/订单信息待拆。

错误测试调用真实 services/request.js，模拟 422 字段错误、500 消息、403 清 token/跳转以及断网/非法 JSON。前两者确认通知参数；后两种异常按原行为直接 reject、没有通知，并非已补上网络错误 UI。没有真实网络调用，通知为记录桩，尚不是错误通知截图测试。

QR 关闭与完成回调两种顺序通过控制器差分验证；关闭使用与组件相同的派发，浏览器遮罩关闭另有现存测试。空轮询响应 `{}` 仍被原逻辑视为完成；该风险仅记录不修复。52 组模拟桌面/移动截图 DOM 相同、0 像素差异；本轮未部署。


OrderDetail 进一步拆出 `checkout/PaymentMethods.jsx` 和 `PaymentQrModal.jsx`，保留布局和派发契约；订单摘要/状态结果已在下一轮提取，见上文。本轮无业务语义修复。新增差分测试明确记录：卸载后迟到 poll/detail callback 仍会重新启动计时器，付费订单选择缺失方式仍抛 TypeError，免费订单/checkout 缺失方式保持原行为。这些是继承风险的证据，不是健壮性验收。

模拟浏览器增加空支付列表、提交加载、取消加载和未知状态两种宽度场景；二维码遮罩关闭派发及提交加载禁用检查通过。所谓未知状态是错误/异常展示分支，不代表网络错误提示全覆盖。当前 52 组截图 DOM 一致、0 像素差异，尚未部署。


OrderDetail 已从旧模块工厂改为标准 import、具名 OrderDetailPage 和 JSX，主要支付/渲染变量已命名；尚未拆成小组件，部分逗号表达式仍待清理。保留原 3 秒轮询、详情回调、首支付方式选择、手续费计算和 Stripe token 分支。10 项差分测试覆盖挂载、选择、Stripe 公钥/token、支付提交、待支付/完成轮询、卸载定时器清理和结果状态。

原版共享计时器 S、卸载后迟到 callback 可重新启动轮询、同步图片 HEAD 探测等历史设计尚未修复；需另开行为改进测试，不能声称轮询已全面健壮化。浏览器仅模拟支付公钥派发，Stripe loader 和二维码替身不加载外部支付服务。


用户端 `pages/Order.jsx` 已重写为具名 JSX 页面，表格列拆到 `components/OrderColumns.jsx`。原文件内嵌的移动 List 被原样隔离到 `vendor/MobileList.js`，尚未替换成已确认版本的 npm 依赖。保留原桌面 disabled 属性及移动端导航行为；未偷偷新增权限/状态判断。订单详情 OrderDetail 已进入本轮整理，见下文。

新增订单有数据（5 种状态）、空列表、加载中桌面/移动对照；桌面验证订单链接及取消确认前不派发、确认后派发 tradeNo，移动端验证卡片跳转。3 项离线控制器测试验证首次/显式刷新及 cancelLoading。测试中修复了订单 fixture 污染其他页面、固定列隐藏重复链接定位问题，并已全量重跑；没有真实订单操作。


用户端 `pages/PlanDetail.jsx` 已改为标准 import/具名类和 JSX，主要局部变量已命名为 plan/coupon/period/config 等；现已拆出 `components/checkout/Pricing.jsx`（周期选择及金额计算）、`Coupon.jsx`（输入及折扣行）、`OrderSummary.jsx`（总额与下单按钮）；页面保留下单确认/取消决策，优惠券输入已改用 React.createRef，主要逗号表达式已清理。38 项对照测试覆盖加载、续费限制、固定/比例优惠券、金额归零、生命周期派发、变更套餐提示和未完成订单取消确认。没有实际创建/取消订单。详情页已完成下述模拟浏览器回归，尚未部署。

用户端 `pages/Plan.jsx` 已整理，套餐卡片、周期筛选与价格标签提取到 `components/PlanCard.jsx`。37 项页面差分测试覆盖全部/周期/流量筛选、零价格、容量、售罄阻止跳转、功能列表/HTML 内容及空列表；原 `class` prop 明确修正为 `className`。套餐页已完成下述模拟浏览器回归，尚未部署。

用户端 `pages/Node.jsx` 已整理为标准 JSX，列定义提取到 `components/NodeColumns.jsx`。11 项差分测试覆盖首次派发、加载/有节点/空状态、订阅/续费跳转、在线状态、倍率和标签；节点页已完成下述模拟浏览器回归，尚未部署。

用户端 `pages/Traffic.jsx` 已人工整理为标准 JSX，表格列与日期/倍率/合计渲染提取到 `components/TrafficColumns.jsx`。7 项差分测试验证加载/非加载结构、初次请求和不同倍率的显示行为；流量页已完成下述模拟浏览器回归，尚未部署。

用户端 `models/plan.js` 已整理为标准 ES module/generator，包含列表、详情及默认周期选择。18 项对照测试覆盖零价格、null、已有选择、属性顺序、失败/网络异常。此项尚未部署；服务器仍为 `restored-20260911-010759`（200 项测试版本）。后台 `models/plan.js` 也已改为标准 ES module/generator，34 项原/新差分测试覆盖价格转换、保存回调、上下架/删除参数、排序及网络异常；同样尚未部署。套餐页面组件尚未整理完成。保留旧逻辑中的输入原地修改、缺失价格转为 NaN、排序失败不回滚等行为，改善这些行为应作为独立修改，不能把差分通过视为业务行为全部合理。

## 模拟页面浏览器回归

在 frontend 目录执行 `node scripts/check-page-screenshots.mjs`。它独立构建保存的改写前页面和当前源码，以 Chromium 对 Traffic/Node/Plan/PlanDetail/Order/OrderDetail 的 30 个状态分别在 1440px、390px 宽度下比较，共 60 组。OrderDetail 覆盖待支付、处理中、取消、完成、折抵、加载、Stripe 选择和二维码状态。覆盖列表、加载、无节点、续费入口、套餐卡片、空列表、详情优惠券及不可续费状态。

最近一次完整运行：60 组 DOM 均相同，实际像素差异全部为 0（失败阈值明确设为 10 像素）。输出位于 `test-results/pages/`，包含两版截图、红色差异图及 `report.json`。测试使用 UTC、固定数据、等待字体并禁用动画；不重新录制基准冒充通过。

布局容器、Redux、国际化、部分辅助函数和路由是模拟依赖，真实表格/Radio/Tag 等组件及 CSS/字体参与渲染。因此这是页面级回归，不代表真实后端数据、完整应用布局或所有主题已验收。所有非本地测试 origin 的请求均被拦截，service worker 禁用。

OrderDetail 额外验证支付方式选择/公钥请求派发、关闭订单确认后才派发取消、完成后教程跳转；3 秒轮询通过假计时器单元测试而非浏览器真实轮询验证。XMLHttpRequest 图片探测使用本地替身，所有外部请求仍阻断。

额外在两种宽度、两版页面上验证周期点击、优惠券输入与下单按钮的模拟 action。dispatch 仅记录，不会驱动状态变化或发送订单请求。初次交互测试因图标影响 accessible name 的精确匹配而超时，改用按钮文本定位后完整重跑通过。

## 下载修复与验证

发现并修复早期 JSX 自动转换误将 `document.createElement('a')` 变为 React 元素的问题：涉及后台用户生成/导出、优惠券及礼品卡导出。`services/download.js` 使用真实 DOM 并通过 finally 回收 URL；历史迁移脚本也排除了 document 接收者。Chromium 实际下载测试 `node scripts/check-download.mjs` 已验证文件名和内容，不连接后端。另有 16 项测试核对生成/导出的数量分支、成功、接口失败、网络异常、回调及调用顺序；这些是指定预期测试，不是全部原/新差分或线上端到端测试。下载修复已部署。网络异常时旧逻辑未复位 loading 的行为暂时保留，需作为单独的行为改进处理。

## 迁移工具

`scripts/migrate.mjs`、`standalone-migrate.mjs`、`organize-source.mjs` 是历史一次性迁移工具，不是日常开发命令。不要对人工编辑后的源码重新执行。它们读取的历史工作区不影响 `npm run build` / `dev:*` 独立运行。
