# V2Board Frontend

本目录包含两个完全独立的 React + TypeScript 项目：

- [`user/`](user/)：用户端
- [`admin/`](admin/)：管理端

两个项目分别维护依赖、锁文件、源码、静态资源、测试、开发脚本、构建产物和部署脚本。请进入对应目录执行 npm 命令；`frontend/` 根目录不提供共享包管理、运行时源码或构建入口。

详细说明：

- [User README](user/README.md)
- [Admin README](admin/README.md)

## 与仓库其他部分的边界

- **后端接口契约**：两个前端都通过 `/api/v1` 下的既有接口与 PHP 后端通信，请求方法、参数编码（`application/x-www-form-urlencoded`）和响应处理保持不变。后端路由定义在 `app/Http/Routes/V1/`。
- **源码构建的托管方式**：`docker/Dockerfile` 为两个项目注册了 Apache alias，`/admin-build/` 指向 `frontend/admin/dist/`，`/user-build/` 指向 `frontend/user/dist/`。Blade 入口通过 `v2board.admin_source_build` 和 `v2board.user_source_build` 在源码构建与历史编译资源之间切换。
- **历史编译资源**：`public/assets/admin/` 和 `public/theme/default/assets/` 下仍保留原始 Umi/Webpack 产物（`umi.js`、`vendors.async.js`、`components.async.js` 等）。它们只服务于 Laravel 回退分支，不属于前端源码工程，也不会被任一源码构建引用。确认不再需要回退能力后，可以单独删除。
- **逆向恢复工具**：`tools/ui-recovery/` 保留了拆分、重建和校验原始 bundle 的工具链，仅用于追溯来源，不参与构建。它产出的中间工作区 `recovered-ui/` 不属于交付内容，已移出仓库，并在根 `.gitignore` 中登记以避免误提交。
- **测试独立性**：Admin 与 User 各自维护测试、fixture、检查脚本和部署脚本，必须分别执行，不能把其中一边的测试并入另一边。
