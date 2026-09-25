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
```

当前用户端回归基线为 770 项。测试、fixture 和检查工具均在本目录内。`scripts/check-user-*.mjs` 用于局部视觉或行为对照；实际页面回归使用生产构建和内置浏览器完成，部分局部对照脚本需要本机 Chrome。

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
```

`dependency-map.json` 是当前入口可达的项目内依赖基线，由 `npm run check:dependencies` 校验。项目不再保留 Webpack 模块 ID、旧 `.jsx` 路由清单或嵌套包边界。

`src/pages/` 按职责分为 `auth`、`dashboard`、`subscription`、`commerce`、`support` 和 `account`。新增页面应放入对应业务域，不再直接平铺到 `src/pages/` 根目录。

`src/components/` 按职责分为 `auth`、`common`、`subscription`、`commerce`、`support` 和 `account`，结算流程组件集中在 `commerce/checkout`。新增组件应放入对应业务域，不再直接平铺到 `src/components/` 根目录。

## 测试服务器部署

部署脚本会先构建 User，将 `app.js`、source map、构建清单和 `theme/` 静态资源一起发布到独立时间戳目录，备份用户端 Blade 入口，切换页面中的 CSS、i18n 和脚本资源路径，清理 Laravel 视图缓存并检查首页及关键静态资源 HTTP 状态。它不会修改 Admin 入口。

```sh
DEPLOY_HOST=root@5.104.86.24 npm run deploy:test
```

可选变量：

- `DEPLOY_SITE`：服务器项目目录，默认 `/data/v2board-legacy-dev/www/v2board`
- `DEPLOY_BACKUP_ROOT`：备份目录，默认 `/data/v2board-legacy-dev/ui-backups`
- `DEPLOY_SITE_URL`：服务器本机健康检查地址，默认 `http://127.0.0.1:7003`

成功后终端会输出 `RELEASE`、`BACKUP`、`ROLLBACK`、`GIT_COMMIT` 和 `APP_SHA256`，并在版本目录写入 `deployment.json`。发生模板、缓存或 HTTP 检查失败时脚本会自动执行回滚；需要手动回滚时，在服务器运行输出的 `ROLLBACK` 脚本。

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
