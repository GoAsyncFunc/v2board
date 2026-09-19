# V2Board User

V2Board 用户端的可维护 React 源码工程。此目录是独立 npm 包，依赖、锁文件、开发命令和构建命令均不与管理端混用。

## 环境要求

- Node.js 18 或更高版本
- npm 9 或更高版本
- 可访问的 V2Board 后端（仅联调时需要）

## 安装

```sh
cd frontend/user
npm ci
```

## 本地开发

```sh
API_PROXY=http://127.0.0.1:7003 npm run dev
```

默认访问地址为 `http://127.0.0.1:3200`。运行时站点配置位于 `public/settings.js`；不要直接修改 `../dist/user`，该目录会在构建时覆盖。

## 构建

```sh
npm run build
```

产物输出到本目录的 `dist/`，入口为 `app.js`，并生成 source map。构建器会拒绝加载本目录之外的源码或依赖。

## 目录结构

```text
src/
  app/          路由、状态容器与启动逻辑
  components/   用户端组件
  config/       导航等界面配置
  layouts/      用户端布局
  locales/      翻译消息
  models/       用户端状态模型
  pages/        用户端页面
  services/     API 请求与下载服务
  vendor/       尚待继续语义化的已恢复源码
```

`dependency-map.json` 用于记录当前入口可达的源码依赖。`modules.json` 和 `routes.json` 是逆向恢复追踪文件，不参与正常构建。

依赖图可通过 `npm run check:dependencies` 检查。回归测试正在按用户端归属迁入本目录，迁移完成前仍需执行仓库现有测试门禁。
