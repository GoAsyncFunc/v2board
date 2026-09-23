# V2Board Admin

V2Board 管理端 React 源码工程。本目录可独立安装、开发、测试、构建和部署，不读取 `frontend/user` 的源码、依赖或工具。

## 环境要求

- Node.js 18 或更高版本
- npm 9 或更高版本
- 本地开发联调时可访问的 V2Board 后端
- 部署时可通过 SSH 登录测试服务器

## 安装

```sh
cd frontend/admin
npm ci
```

## 配置

运行时站点配置位于 `public/settings.js`。测试环境的后台入口默认是 `/4434144c`，可通过 `ADMIN_PATH` 覆盖。不要直接编辑 `dist/`，该目录每次构建都会重建。

## 本地开发

```sh
API_PROXY=http://127.0.0.1:7003 npm run dev
```

默认地址为 `http://127.0.0.1:3201`。开发服务器只监听本机，并将 `/api/` 请求代理到 `API_PROXY`。

## 构建

```sh
npm run build
```

输出位于 `dist/`：

- `app.js`：浏览器入口
- `app.js.map`：source map
- `source-build.json`：本次构建输入清单
- 从锁定版本 `antd` 依赖发布的 `assets/admin/antd.css`
- 从源码 vendor 样式发布的 Bootstrap 兼容基础层、Font Awesome、Simple Line Icons、动画库、SimpleBar 核心样式和日期/编辑器/表格等插件适配样式
- 从 `src/styles/` 发布的全局和主题样式
- `assets/admin/markdown-editor.css`：由锁定版本 `react-markdown-editor-lite` 的官方样式生成，并按项目 Browserslist 目标补齐浏览器前缀
- `assets/admin/pages/ticket-detail.css`：工单详情页专属布局样式
- `assets/admin/framework/core.css`：Admin 框架排版、表单、按钮和基础组件样式
- `assets/admin/framework/layout.css`：页面容器、Header、Sidebar、Overlay 和响应式主布局样式
- `assets/admin/framework/components.css`：Block、主导航、列表、时间线和 Ribbon 等通用 UI 组件样式
- `assets/admin/framework/utilities.css`：颜色、背景、边框、字重和文本等框架工具类
- `assets/admin/framework/accessibility.css`：屏幕阅读器和键盘焦点辅助样式
- `assets/admin/framework/scrollbars.css`：Admin 框架滚动条外观覆盖
- `assets/admin/framework/rtl.css`：从右到左布局和导航方向适配

构建器会拒绝读取本项目目录之外的输入。源码样式发布到 `assets/admin/umi.css` 和 `assets/admin/theme/`，第三方 Ant Design 样式发布到 `assets/admin/antd.css`。通用第三方库和插件适配样式按职责发布到 `assets/admin/vendor/`，Markdown 编辑器样式由其固定 npm 依赖单独提供。旧版回退所用 `public/assets/admin/components.chunk.css` 保持不变，不会被新源码构建引用。

## 格式化

```sh
npm run format
npm run check:format
```

格式化范围包含本项目的 `src/**/*.ts`、`src/**/*.tsx`、`src/**/*.css`、`public/assets/admin/**/*.css` 和 `scripts/**/*.mjs`，规则由 `.prettierrc.json` 与根目录 `.editorconfig` 共同决定。脚本也纳入检查，避免浏览器验收工具继续保留编译产物式的单行短变量结构。

## 测试

```sh
npm run check:dependencies
npm run check:format
npm test
npm run check:types
npm run build
```

当前管理端回归测试为 1140 项，包含从历史编译实现提取的行为对照和源码结构检查。测试、fixture 和检查工具均在本目录内。User 项目当前独立维护 763 项测试，两个项目合计 1903 项；两边必须分别执行，不能把其中一边的测试并入另一边。`scripts/check-admin-*.mjs` 用于局部视觉或行为对照；部分脚本需要本机 Chrome。

## 目录结构

```text
public/          独立静态资源和 settings.js
public/assets/   第三方组件样式及按字体家族整理的字体资源
scripts/         构建、开发、对照检查、部署和线上验证工具
src/app/         启动和状态容器
src/components/  跨页面复用的管理端组件
src/config/      导航等界面配置
src/layouts/     管理端布局
src/models/      管理端状态模型
src/pages/       按业务域组织的管理端页面
src/routes/      管理端路由表和路由类型
src/runtime/     DVA、插件和路由运行时
src/services/    API 请求与下载服务
src/styles/      Admin 自有全局样式、第三方 vendor 样式、主题样式和样式常量
src/types/       API、状态和业务实体类型
src/utils/       浏览器、日期和站点工具
tests/           独立回归测试与 fixture
dist/            本地构建产物，不提交 Git
```

`dependency-map.json` 是当前入口可达的项目内依赖基线，由 `npm run check:dependencies` 校验。项目不再保留 Webpack 模块 ID、旧 `.jsx` 路由清单或嵌套包边界。

`src/pages/` 参考 `v2board-admin1` 按业务路由组织：`login`、`dashboard`、`config/payment`、`config/system`、`config/theme`、`server/group`、`server/manage`、`server/route`、`plan`、`order`、`coupon`、`giftcard`、`user`、`notice`、`ticket`、`knowledge` 和 `queue`。页面入口统一使用小写目录下的 `index.tsx`，工单详情使用 `ticket/[id].tsx`；复杂页面的页面专属组件统一放在对应目录的 `components/` 下，列表、筛选、编辑器、展示列和字段模块使用语义化文件名。新增页面应放入对应业务域，不再使用 `auth`、`commerce`、`promotion`、`content` 等混合目录，也不再直接平铺业务页面文件。

`src/components/` 只保留跨页面复用的 `common`、`order` 和 `user` 组件。订单分配编辑器位于 `src/components/order/`；Server 管理编辑器位于 `src/pages/server/manage/editors/`，Server 列表展示和操作位于 `src/pages/server/manage/components/`；系统配置组件位于 `src/pages/config/system/components/`，支付、订单、计划、优惠券、礼品卡、用户、公告和知识库组件也分别位于各自页面的 `components/` 下。只服务单一页面的列表列定义、编辑器和操作逻辑应放在对应页面目录内。

## 测试服务器部署

部署脚本会先构建 Admin，将完整 `dist/`（入口脚本、运行时设置、CSS、字体和构建清单）发布到独立时间戳目录，并把管理端 Blade 的源码构建资源引用切换到该目录。部署前会备份 Blade 入口，发布后检查管理端页面及关键静态资源；失败时自动恢复模板并清理 Laravel 视图缓存。它不会修改 User 入口。

```sh
DEPLOY_HOST=root@5.104.86.24 npm run deploy:test
```

可选变量：

- `DEPLOY_SITE`：服务器项目目录，默认 `/data/v2board-legacy-dev/www/v2board`
- `DEPLOY_BACKUP_ROOT`：备份目录，默认 `/data/v2board-legacy-dev/ui-backups`
- `DEPLOY_SITE_URL`：服务器本机健康检查地址，默认 `http://127.0.0.1:7003`
- `ADMIN_PATH`：后台入口，默认 `/4434144c`

成功后终端会输出 `RELEASE`、`BACKUP`、`ROLLBACK`、`GIT_COMMIT`、`UI_VERSION` 和 `APP_SHA256`，并在版本目录写入 `deployment.json`。发生模板、缓存、页面或静态资源检查失败时脚本会自动执行回滚；需要手动回滚时，在服务器运行输出的 `ROLLBACK` 脚本。

部署后检查登录页：

```sh
npm run check:deployed
```

提供 `TEST_EMAIL` 和 `TEST_PASSWORD` 时，还会登录并检查 Dashboard、套餐、订单、用户、公告和工单页面。账号密码只从环境变量读取，不写入源码。

## 常见问题

- 页面请求后端失败：确认 `API_PROXY` 指向可访问的 V2Board 实例，并重新启动开发服务器。
- 依赖图检查失败：源码引用已经变化，先确认改动符合项目边界，再运行 `node scripts/generate-dependency-map.mjs` 更新基线。
- 后台地址返回 404：确认本地或部署环境使用的 `ADMIN_PATH` 与后端 `secure_path` 一致。
- 部署后仍显示旧页面：确认终端输出的 `RELEASE` 与服务器 `deployment.json` 一致，并清理浏览器缓存后重新访问。
- 需要回滚：在服务器执行当前部署输出的 `ROLLBACK` 脚本，该脚本会恢复 Blade 入口并清理 Laravel 视图缓存。
