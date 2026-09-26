# Goal: 从编译产物恢复 V2Board admin / user 前端源码

## 一句话

把已丢失源码的 V2Board 管理端与用户端前端，从仅存的 Webpack 编译产物逆向恢复为两个独立、可长期维护的 TypeScript + React 工程。行为与产物的一致性必须有**可验证的证据**，而不是「能跑就行」。

## 保真度分级（本项目的核心判据）

判断恢复质量时，「有测试」和「证明与产物一致」是两件不同的事。本项目明确区分三级：

| 等级 | 含义 | 能证明什么 |
|---|---|---|
| L0 能跑 | 构建成功、页面能打开 | 无证据 |
| L1 有测试 | 有断言覆盖该模块 | 能防止**以后**改坏；**不能**证明当初恢复对了 |
| L2a 原样提取 | 基线是从 bundle 提取的**未改写**原始模块（`fixtures/pages/*.cjs`，标注 `extracted unchanged`） | **能证明与产物一致**（最高置信） |
| L2b 原码重组 | 基线是原始模块内容，但 require 路径经改写、格式经重排（`fixtures/models/*.cjs`、`fixtures/layouts/admin.jsx`） | **能证明逻辑一致**；存在人工转写引入误差的残余风险 |

L2 的实现形式：

```js
for (const original of [true, false]) {
    const columns = await load(original); // true = 原始编译模块，false = 恢复源码
    results.push({ value, error });
}
assert.deepEqual(results[1], results[0]);
```

在无 source map 的前提下，L2 是能取得的最强保真证明。

## 背景与约束事实

原始前端源码已丢失，仅存编译产物：

| 端 | 产物位置 | 文件 |
|---|---|---|
| admin | `public/assets/admin/` | `umi.js` (4.5 MB)、`components.async.js`、`vendors.async.js` |
| user | `public/theme/default/assets/` | 同结构 |

已核实的事实（决定了方案边界）：

- **无 source map**：`sourceMappingURL` 在全部 bundle 中出现 0 次。
- **仓库历史中从未有过前端源码**：3452 次提交里，`.umirc`、`config/routes`、`src/app.tsx`、`src/default.ts`、`typings.d.ts`、`global.less` 各出现 0 次。
- **参考项目 `v2board-admin1` / `v2board-user` 是不同版本，不可照抄**：
  - 产物有 `giftcard` / `queue` 页面，`v2board-admin1` 没有。
  - 产物是 React 16 + antd 3 + dva-core + redux-saga；`v2board-admin1` 是 React 17 + pro-layout + antd charts + ahooks。
  - 产物无 i18n（`module.dashboard` 出现 0 次）；`v2board-admin1` 有 47 KB 的 `zh-CN.ts`。
  - 产物无 `/403` / `/404` 路由；`v2board-admin1` 有对应页面。
  - 结论：照抄参考项目会**引入产物中不存在的功能**，违反行为兼容要求。
- 后端版本：`1.7.5.2685.2333`（`config/app.php:240`）。
- 授权范围：逆向重写，**变量名可与原始不同**。

## 目标（逐条可判定）

1. `frontend/admin` 与 `frontend/user` 是两个**完全独立**的工程，各自可安装、开发、类型检查、测试、构建、部署；不共享包管理文件、依赖目录、运行时源码、测试代码、fixture、构建入口。
2. 业务源码 **100% 为 `.ts` / `.tsx`**；启用 `strict`；**0 个 `any`、0 个 `@ts-ignore` / `@ts-nocheck` / `@ts-expect-error`**。
3. **编译产物特征清零**：0 个 `.js` / `.jsx` / `.less` 业务源码、0 个业务组件直接调用 `React.createElement`、0 个 webpack 模块 ID 或 `__webpack_require__`、0 个哈希类名（`___[A-Za-z0-9]{5}`）、0 个上级相对导入（`../`）。
4. **行为保真度达到 L2**：关键业务模块具备差分对照测试（见上文定义）。
5. 两端测试体系独立；不得通过删除、跳过、屏蔽、降低断言强度或修改预期来换取通过。
6. 每个阶段产出**边界清晰、可单独 revert** 的 Git 提交，精确暂存当前阶段文件。
7. 部署具备：时间戳版本目录、`deployment.json`（含 git commit / ui_version / sha256）、原版本备份、**可执行且已实测的回滚脚本**。

## 当前基线（已实测）

| 判据 | admin | user |
|---|---|---|
| 源码文件数 | 299（280 个 `.ts`/`.tsx`） | 141 |
| 最大业务文件行数 | 248 | — |
| 测试 | **1165 / 0 失败 / 0 跳过** | **777 / 0 失败 / 0 跳过** |
| 测试套件数 | 85 | 57 |
| `tsc --noEmit` | 0 错误 | 0 错误 |
| 依赖图可达性 | 822 边 | 501 边 |
| 生产构建 | 1610 输入 | 852 输入 |
| 浏览器验证 | 通过 | 通过 |
| 编译产物残留 | 全 0 | 全 0 |

## 尚未达标项（本 goal 的核心缺口）

| 判据 | admin 现状 | 目标 |
|---|---|---|
| 差分对照覆盖（L2，代码模块） | **49 / 257 = 19.1%**（L2a 24 个 + L2b 25 个） | 关键业务模块全覆盖 |
| 有任意测试的代码模块（L1 以上） | **257 / 257 = 100%** | 100% |
| 完全无测试的代码模块 | **0 个** | **0 个** |

**2026-09-26 进展**：无测试模块已清零。本轮按页面分组为 47 个此前无测试的模块补齐了行为测试（coupon 5、giftcard 5、config/system 6、payment 4、dashboard 3、knowledge 2、notice 2、queue 2、ticket 1、user 6、server manage/route 12、components 1），并以「补测前后构建 SHA256 完全一致（a4f12990…）」证明全部补测为行为中性。ESLint（typescript-eslint + react + prettier，0 告警）与 GitHub Actions CI（两工程独立流水线：lint/typecheck/format/依赖图/import 门禁/test/build）已建立，react-intl 死依赖已移除。

**注意**：L1 已达标，但真正能证明与产物一致的 L2 差分只有 19.1%。这是当前最大的未知。

L2 覆盖的 49 个模块集中在风险最高处：金额与日期格式化（`MoneyDisplay.ts`、`dateTimeFormatter.ts`、`PriceFields.tsx`）、全部展示列（`CouponColumns`、`OrderColumns`、`GiftCardColumns`、`UserDisplayColumns`、`ServerRateColumn`、`OrderListColumns` 等）、有副作用的模型（全部 21 个 model 均有 L1 测试，其中 `orderManagementEffects`、`planModel`、`userModel`、`adminAuthenticationModel`、`adminPassportModel`、`layoutModel` 达到 L2）、order 页（`OrderFilterDrawer`、`OrderDetailModal`、`OrderListColumns`、`OrderPage` 生命周期）、以及 `DashboardPage`、`KnowledgePage`、`TicketList`、`JsonEditor`、`MainLayout`/`SidebarLayout`/`HeaderLayout` 三个布局、plan 编辑器的全部字段分支（`PlanBasicFields`、`PlanResourceFields`、`PlanAccessFields`、`PlanLimitFields`、`PlanEditorActions`）。

差分对照不是摆设：对齐 plan 编辑器时，它揪出了三处恢复偏差并已修正——最大容纳用户量/限速两个字段在原产物中位于权限组选择**之后**且在包裹 div **之外**；「添加权限组」链接的 href 原产物是 `javascript:(0);`；字段标签使用旧式 `for` 属性（React 的 htmlFor 映射之前的写法），且「流量重置方式」标签在原产物中混用了 `htmlFor`。对齐 order 详情弹窗时又修正了两处：原产物的弹窗可见性是 **toggle**（`onShow`），而非置 true；订单无邀请人时原产物**不会重置**上一次的邀请人数据。

## 范围边界

### 做

- 为无测试的 52 个页面模块与 17 个模型模块补差分对照测试，把 L2 覆盖从 14.0% 提升到关键业务全覆盖。
- 补 ESLint + CI 门禁。参考工程 `v2board-admin1` / `v2board-user` 均具备 eslint + stylelint + prettier + husky + commitlint + lint-staged + `test:coverage`，当前恢复工程只有 prettier，属于相对参考实现的退步。
- 清理：删除 admin 的死依赖 `react-intl@2.4.0`（0 处引用）；消除 admin 与 user 页面组织约定互相矛盾的问题（admin README 明确禁用 `auth` / `commerce` 目录，而 user 正在使用）。

### 不做

- **不升级 React 16 / antd 3 / dva-core / redux-saga**。版本冻结是为与产物行为对齐；升级会改变行为，属独立立项。
- **不照抄 `v2board-admin1` / `v2board-user` 的结构**。版本不同，照抄会引入产物中不存在的 i18n 与 403/404 页面。
- **不把现有工程改造成 UmiJS 形态**。那是重写而非恢复，会推翻已验证的 1942 项测试与字节对齐的构建，且 UmiJS 3 已停止维护，长期可维护性下降。

## 过程

每个阶段固定执行顺序：

1. 更新并检查依赖图
2. 执行该项目**独立**的完整测试
3. 执行独立 TypeScript 类型检查
4. 执行独立生产构建
5. `git diff --check`
6. 审计构建产物：空白页、缺失资源、错误路径、旧哈希引用
7. 部署到测试环境并用内置浏览器验证
8. 全部通过后，精确暂存本阶段文件，创建**一个**边界清晰的独立提交

浏览器验证至少覆盖：登录页、首页 / Dashboard、主要列表页、主要编辑页、路由跳转、API 请求、权限控制、静态资源加载、控制台无新增错误。

**失败处理**：发现空白页、资源 404、路由错误、接口错误或控制台异常时，必须定位原因、修复、重新测试、重新构建、重新部署。**不得以「本地编译成功」作为通过标准。**

## 约束

- 不修改、不回退、不删除工作区中与当前阶段无关的既有改动。
- 源码可读性重构、TypeScript 类型迁移、业务行为修改必须**分开提交**，便于定位问题。
- 若发现历史编译代码本身存在行为问题，单独记录并在测试验证后修改，不得混入普通还原提交。
- 测试执行、构建产物、部署必须两端分别进行，不得混成无法判断归属的单一入口。

## 已知风险

1. **差分覆盖率仅 14.0%**：大量模块与产物行为的一致性尚无证据。这是首要风险，也是「能否把这份恢复当作唯一源码」的决定性因素。
2. **测试替身的 React 是最小实现**：仅支持 class 组件与 `setState`，不支持 hooks、真实 reconciliation 与 effect；antd 被 mock 为字符串；无 jsdom。当前代码全部是 class 组件，机制可用；**若将来改写为函数组件 + hooks，现有测试机制失效**，需先升级替身。
3. **`src/styles/themes/*.css` 是生成物**：4 个主题共约 47k 行，为 antd 主题产物，不应手工编辑。同理 `third-party/` 下的 bootstrap、fontawesome 为 vendor 样式。
4. **旧 bundle 保留在 `public/`**：作为 Laravel 回退路径存在，不被任一源码构建引用。在差分覆盖补全之前，保留它是必要的回退能力。

## 完成条件

1. 两端差分对照覆盖关键业务模块，且无测试模块数归零。
2. 两端各自通过：依赖图检查、格式化检查、类型检查、完整测试、生产构建。
3. 两端均已部署到测试环境并通过内置浏览器验证。
4. 每个阶段有对应 Git 提交，内容准确、可追踪、可回滚。
5. 文档、部署方式、版本记录与回滚方式完整。
