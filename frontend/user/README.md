# V2Board User

V2Board 用户端 React 源码工程。本目录可独立安装、开发、测试、构建和部署，不读取 `frontend/admin` 的源码、依赖或工具。

## 环境要求

- Node.js 18 或更高版本
- npm 9 或更高版本
- 本地开发联调时可访问的 V2Board 后端
- 部署时可通过 SSH 登录测试服务器

## 安装

```sh
cd frontend/user
npm ci
```

## 配置

运行时站点配置位于 `public/settings.js`。生产 Blade 入口通过 `v2board.user_source_build` 选择源码构建或历史 Umi 回退资源；不要直接编辑 `dist/`，该目录每次构建都会重建。

## 本地开发

```sh
API_PROXY=http://127.0.0.1:7003 npm run dev
```

默认地址为 `http://127.0.0.1:3200`。开发服务器只监听本机，并将 `/api/` 请求代理到 `API_PROXY`。

## 构建

```sh
npm run build
```

输出位于 `dist/`：

- `app.js`：浏览器入口
- `app.js.map`：source map
- `source-build.json`：本次构建输入清单
- 从 `public/` 复制的静态资源

源码构建从锁定版本的 `antd` 依赖生成 `theme/default/assets/antd.css`，不会把历史 `components.chunk.css` 带入源码构建；后者只在 Laravel fallback 分支使用。

与 Admin 不同，User 构建不会改写 `settings.js` 中的 `version` 字段，而是保持其原值；构建版本记录在 `source-build.json` 的 `uiVersion` 中，部署时由 Blade 入口通过 `ui_version` 生成资源缓存参数。

构建器会拒绝读取本项目目录之外的输入。

## 格式化

```sh
npm run format
npm run check:format
```

格式化范围仅包含本项目的 `src/**/*.ts` 和 `src/**/*.tsx`，规则由 `.prettierrc.json` 固定。

## 测试

```sh
npm run check:dependencies
npm run check:format
npm test
npm run check:types
npm run build
npm run check:visual
```

当前用户端回归基线为 777 项。测试、fixture 和检查工具均在本目录内。`scripts/check-user-*.mjs` 用于局部视觉或行为对照；实际页面回归使用生产构建和内置浏览器完成，部分局部对照脚本需要本机 Chrome。`npm run check:visual` 会并行执行全部 User 局部检查，默认并发数为 3；可使用 `VISUAL_CHECK_CONCURRENCY=1` 调低资源占用，也可以追加检查名称，例如 `npm run check:visual -- ticket-display`。

测试数量以实际执行为准，可用以下命令复现（循环生成的用例会被计入）：

```sh
node --test --test-reporter=spec tests/*.test.mjs | grep -E '^ℹ (tests|pass|fail|skipped)'
```

User 与 Admin 的测试完全独立，必须分别执行；Admin 项目当前独立维护 1165 项，两个项目合计 1942 项。

## 目录结构

```text
public/          独立静态资源和 settings.js
scripts/         构建、开发、对照检查、部署和线上验证工具
src/app/         启动和状态容器
src/components/  按业务域组织的用户端组件
src/config/      导航等界面配置
src/layouts/     用户端布局
src/locales/     翻译消息
src/models/      用户端状态模型
src/pages/       按业务域组织的用户端页面
src/routes/      用户端路由表和路由类型
src/runtime/     DVA、插件和路由运行时
src/services/    API 请求服务
src/styles/      页面级样式常量
src/types/       API、状态和业务实体类型
src/utils/       日期、设备和显示工具
tests/           独立回归测试与 fixture
dist/            本地构建产物，不提交 Git
.releases/       本地部署的版本目录与备份，不提交 Git
```

`dependency-map.json` 是当前入口可达的项目内依赖基线，由 `npm run check:dependencies` 校验。项目不再保留 Webpack 模块 ID、旧 `.jsx` 路由清单或嵌套包边界。

目录按业务职责划分，各概念的归属位置如下：

| 概念 | 位置 |
| --- | --- |
| 组件 | `src/components/`（按 `account`、`auth`、`commerce`、`common`、`dashboard`、`subscription`、`support` 分域） |
| 布局 | `src/layouts/` |
| 页面 | `src/pages/`（与组件同名的业务域） |
| 服务 / API | `src/services/apiClient.ts` |
| 模型 / 状态 | `src/models/` 与 `src/app/applicationStore.tsx` |
| 路由 | `src/routes/` |
| 配置 | `src/config/`（导航与语言设置） |
| 多语言 | `src/locales/`（`catalog.ts`、`i18n.ts`） |
| 工具 | `src/utils/` |
| 类型 | `src/types/` |
| 样式 | `src/styles/`（页面级样式常量） |
| 静态资源 | `public/`，构建时复制到 `dist/` |
| 常量 | 当前集中在 `src/config/`；出现独立常量模块时再建 `src/constants/` |
| hooks | 当前无自定义 hook；出现第一个真实 hook 时再建 `src/hooks/` |

为避免不可达源码破坏 `check:dependencies`，上述保留目录在出现真实模块前不会创建空目录。

`src/pages/` 按职责分为 `auth`、`dashboard`、`subscription`、`commerce`、`support` 和 `account`。新增页面应放入对应业务域，不再直接平铺到 `src/pages/` 根目录。

`src/components/` 按职责分为 `auth`、`common`、`subscription`、`commerce`、`support` 和 `account`，结算流程组件集中在 `commerce/checkout`。新增组件应放入对应业务域，不再直接平铺到 `src/components/` 根目录。

## 本地部署

测试环境的 Docker 栈（容器 `v2board-app`）把本仓库挂载到 `/var/www/html`，并通过 Apache alias `/user-build/` 直接指向 `frontend/user/dist/`。因此 `npm run build` 之后构建产物即刻生效，无需拷贝文件。

`npm run deploy:local` 在此基础上补齐版本记录与回滚能力：

```sh
npm run deploy:local
```

脚本按以下顺序执行：备份当前 `dist/`（构建会先清空该目录，因此备份必须先于构建）→ 构建 → 快照到 `.releases/<时间戳>/` → 写入 `deployment.json` → 生成可执行的回滚脚本 → 检查首页和 `/user-build/app.js` → 按 `KEEP_RELEASES` 清理旧版本。它不会修改任何 Blade 模板，也不会改动 `scripts/deploy-test.sh`。

可选变量：

- `DEPLOY_SITE_URL`：健康检查地址，默认 `http://127.0.0.1:7003`
- `DEPLOY_BUILD_PREFIX`：构建资源前缀，默认 `/user-build`
- `DEPLOY_HEALTH_PATH`：健康检查页面，默认 `/`
- `KEEP_RELEASES`：保留的版本数量，默认 `5`

成功后输出 `APPLICATION`、`RELEASE`、`BACKUP`、`ROLLBACK`、`GIT_COMMIT`、`UI_VERSION` 和 `APP_SHA256`。需要回滚时执行输出的 `ROLLBACK` 脚本，它会用备份恢复上一版 `dist/`。

部署后做浏览器验证：

```sh
TEST_BASE=http://127.0.0.1:7003 \
  TEST_EMAIL=user@example.com TEST_PASSWORD=user123456 \
  npm run check:deployed
```

该检查覆盖未登录访问 Dashboard 必须回落到登录页、登录页渲染、Dashboard 与主要列表页渲染、工单弹窗开关、静态资源不得 4xx、同源 API 不得 5xx，以及浏览器控制台无未捕获错误。未提供 `TEST_EMAIL`/`TEST_PASSWORD` 时只做未登录与登录页检查。

## 测试服务器部署

部署脚本会先构建 User，将 `app.js`、source map、构建清单和 `theme/` 静态资源一起发布到独立时间戳目录，备份用户端 Blade 入口，切换页面中的 CSS、i18n 和脚本资源路径，清理 Laravel 视图缓存并检查首页及关键静态资源 HTTP 状态。它不会修改 Admin 入口。

```sh
DEPLOY_HOST=root@5.104.86.24 npm run deploy:test
```

可选变量：

- `DEPLOY_SITE`：服务器项目目录，默认 `/data/v2board-legacy-dev/www/v2board`
- `DEPLOY_BACKUP_ROOT`：备份目录，默认 `/data/v2board-legacy-dev/ui-backups`
- `DEPLOY_SITE_URL`：服务器本机健康检查地址，默认 `http://127.0.0.1:7003`

成功后终端会输出 `RELEASE`、`BACKUP`、`ROLLBACK`、`GIT_COMMIT`、`UI_VERSION` 和 `APP_SHA256`，并在版本目录写入包含 `ui_version` 的 `deployment.json`。发生模板、缓存或 HTTP 检查失败时脚本会自动执行回滚；需要手动回滚时，在服务器运行输出的 `ROLLBACK` 脚本。

部署后检查登录页：

```sh
npm run check:deployed
```

提供 `TEST_EMAIL` 和 `TEST_PASSWORD` 时，还会登录并检查 Dashboard、套餐、订单、个人资料和工单页面。账号密码只从环境变量读取，不写入源码。

## 常见问题

- 页面请求后端失败：确认 `API_PROXY` 指向可访问的 V2Board 实例，并重新启动开发服务器。
- 依赖图检查失败：源码引用已经变化，先确认改动符合项目边界，再运行 `node scripts/generate-dependency-map.mjs` 更新基线。
- 部署后仍显示旧页面：确认终端输出的 `RELEASE` 与服务器 `deployment.json` 一致，并清理浏览器缓存后重新访问。
- 需要回滚：在服务器执行当前部署输出的 `ROLLBACK` 脚本，该脚本会恢复 Blade 入口并清理 Laravel 视图缓存。
- 本地部署后仍是旧页面：确认 `.releases/` 下最新时间戳目录的 `deployment.json` 与终端输出的 `RELEASE` 一致，并强制刷新浏览器。
- 本地部署健康检查失败：脚本会自动回滚。检查 `DEPLOY_SITE_URL` 是否指向运行中的 Docker 栈，以及 `DEPLOY_HEALTH_PATH` 是否与后端首页路由一致。
- 测试账号被锁定：后端 `password_limit_enable` 默认开启（5 次错误 / 60 分钟）。本地测试账号应先用后端命令设置密码，不要在浏览器里反复试错。
