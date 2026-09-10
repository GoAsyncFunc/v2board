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

独立工程已经部署到服务器 7003，真实登录及用户端 5 个、后台 6 个页面检查通过，详细版本和回滚信息见 [DEPLOYMENT.md](DEPLOYMENT.md)。部署之后，本地又完成 22 个依赖源文件重命名和两端路由 ES import 整理；这些改动已随 `restored-20260911-003852` 部署。当前 `npm test` 共 345 项通过（新增 38 项套餐详情/下单确认差分测试）（新增 37 项套餐列表页面对照测试）（新增 11 项节点页结构、导航和列渲染对照测试）（新增 7 项流量页面结构/列渲染对照测试）（含 18 项用户端、34 项后台套餐模型差分测试）（包含 2 项下载 DOM/URL 清理测试和 16 项生成/导出业务分支测试）：49 项模型测试、45 项会话测试、37 项用户账户操作测试、17 项后台用户查询测试、32 项后台用户写入逻辑离线测试、2 项包含多组渲染/行为断言的布局测试。截至 200 项测试的版本已部署为 `restored-20260911-010759`，见 DEPLOYMENT.md。账户操作测试全部使用离线桩，没有实际兑换、转账或修改密码；它们验证迁移前后等价，不等于对旧业务行为做安全性或输入合法性背书。

## 最新本地进度

用户端 `pages/PlanDetail.jsx` 已改为标准 import/具名类和 JSX，主要局部变量已命名为 plan/coupon/period/config 等；现已拆出 `components/checkout/Pricing.jsx`（周期选择及金额计算）、`Coupon.jsx`（输入及折扣行）、`OrderSummary.jsx`（总额与下单按钮）；页面保留下单确认/取消决策，优惠券输入已改用 React.createRef，主要逗号表达式已清理。38 项对照测试覆盖加载、续费限制、固定/比例优惠券、金额归零、生命周期派发、变更套餐提示和未完成订单取消确认。没有实际创建/取消订单。详情页已完成下述模拟浏览器回归，尚未部署。

用户端 `pages/Plan.jsx` 已整理，套餐卡片、周期筛选与价格标签提取到 `components/PlanCard.jsx`。37 项页面差分测试覆盖全部/周期/流量筛选、零价格、容量、售罄阻止跳转、功能列表/HTML 内容及空列表；原 `class` prop 明确修正为 `className`。套餐页已完成下述模拟浏览器回归，尚未部署。

用户端 `pages/Node.jsx` 已整理为标准 JSX，列定义提取到 `components/NodeColumns.jsx`。11 项差分测试覆盖首次派发、加载/有节点/空状态、订阅/续费跳转、在线状态、倍率和标签；节点页已完成下述模拟浏览器回归，尚未部署。

用户端 `pages/Traffic.jsx` 已人工整理为标准 JSX，表格列与日期/倍率/合计渲染提取到 `components/TrafficColumns.jsx`。7 项差分测试验证加载/非加载结构、初次请求和不同倍率的显示行为；流量页已完成下述模拟浏览器回归，尚未部署。

用户端 `models/plan.js` 已整理为标准 ES module/generator，包含列表、详情及默认周期选择。18 项对照测试覆盖零价格、null、已有选择、属性顺序、失败/网络异常。此项尚未部署；服务器仍为 `restored-20260911-010759`（200 项测试版本）。后台 `models/plan.js` 也已改为标准 ES module/generator，34 项原/新差分测试覆盖价格转换、保存回调、上下架/删除参数、排序及网络异常；同样尚未部署。套餐页面组件尚未整理完成。保留旧逻辑中的输入原地修改、缺失价格转为 NaN、排序失败不回滚等行为，改善这些行为应作为独立修改，不能把差分通过视为业务行为全部合理。

## 模拟页面浏览器回归

在 frontend 目录执行 `node scripts/check-page-screenshots.mjs`。它独立构建保存的改写前页面和当前源码，以 Chromium 对 Traffic/Node/Plan/PlanDetail 的 11 个状态分别在 1440px、390px 宽度下比较，共 22 组。覆盖列表、加载、无节点、续费入口、套餐卡片、空列表、详情优惠券及不可续费状态。

最近一次完整运行：22 组 DOM 均相同，实际像素差异全部为 0（失败阈值明确设为 10 像素）。输出位于 `test-results/pages/`，包含两版截图、红色差异图及 `report.json`。测试使用 UTC、固定数据、等待字体并禁用动画；不重新录制基准冒充通过。

布局容器、Redux、国际化、部分辅助函数和路由是模拟依赖，真实表格/Radio/Tag 等组件及 CSS/字体参与渲染。因此这是页面级回归，不代表真实后端数据、完整应用布局或所有主题已验收。所有非本地测试 origin 的请求均被拦截，service worker 禁用。

额外在两种宽度、两版页面上验证周期点击、优惠券输入与下单按钮的模拟 action。dispatch 仅记录，不会驱动状态变化或发送订单请求。初次交互测试因图标影响 accessible name 的精确匹配而超时，改用按钮文本定位后完整重跑通过。

## 下载修复与验证

发现并修复早期 JSX 自动转换误将 `document.createElement('a')` 变为 React 元素的问题：涉及后台用户生成/导出、优惠券及礼品卡导出。`services/download.js` 使用真实 DOM 并通过 finally 回收 URL；历史迁移脚本也排除了 document 接收者。Chromium 实际下载测试 `node scripts/check-download.mjs` 已验证文件名和内容，不连接后端。另有 16 项测试核对生成/导出的数量分支、成功、接口失败、网络异常、回调及调用顺序；这些是指定预期测试，不是全部原/新差分或线上端到端测试。下载修复已部署。网络异常时旧逻辑未复位 loading 的行为暂时保留，需作为单独的行为改进处理。

## 迁移工具

`scripts/migrate.mjs`、`standalone-migrate.mjs`、`organize-source.mjs` 是历史一次性迁移工具，不是日常开发命令。不要对人工编辑后的源码重新执行。它们读取的历史工作区不影响 `npm run build` / `dev:*` 独立运行。
