# 测试站部署记录

## 最新本地工作（未部署）

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
