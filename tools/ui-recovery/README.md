# 原样 UI 构建与预览

目标是保留现存两套 UI 的渲染行为和资源，不重新设计页面。可编辑的模块在 `recovered-ui/{user,admin}`，仍为编译后的 JavaScript。

## 构建

```sh
npm ci --prefix tools/ui-recovery --ignore-scripts
npm --prefix tools/ui-recovery run build:site
```

输出：

- `recovered-ui/dist/user/`：用户端静态预览包。
- `recovered-ui/dist/admin/`：管理端静态预览包。
- `recovered-ui/dist/laravel/`：保留项目相对路径的两端静态资源及原始 Blade 模板，可供原 Laravel 项目的测试部署使用；不是完整后端。

构建从恢复模块生成 JS，然后复制现有 CSS、字体、图片和语言包。`asset-manifest.json` 记录每个资源的 SHA-256 和与原资源的一致性。初次构建用户端 51 个、管理端 30 个资源全部逐字节一致。

## 本地预览

分别在两个终端运行：

```sh
npm --prefix tools/ui-recovery run preview:user
npm --prefix tools/ui-recovery run preview:admin
```

访问 http://127.0.0.1:3100 和 http://127.0.0.1:3101 。服务器只监听本机。可用 PORT 环境变量覆盖端口。

分别编辑 `dist/user/settings.js` 和 `dist/admin/settings.js`：

- `host`：测试后端地址（需要后端允许对应预览 origin 的 CORS）。不要填写管理员密码或 API 密钥。
- `secure_path`：原后端管理接口所使用的安全路径。
- 标题、主题、背景、logo、语言等必须与实际站点配置一致。

settings.js 在重复构建时保留。未配置后端时 `/api/` 返回明确的 503，不使用虚假业务数据冒充恢复结果。独立预览入口不自动执行数据库配置中的 `custom_html`；如原站点有此配置，优先使用 Laravel 版本验证。

## 与原站点一致的推荐验证方式

将 dist/laravel 中的文件部署到**备份后的测试副本**对应位置，保持原后端、数据库、主题配置和 Blade 的动态参数。原模板按原路径加载重建 JS，从而保留 custom_html 等运行时配置。工具不会自动覆盖项目的 public/resources。

资源字节一致不等于已经完成所有页面的截图验收：应在相同浏览器、分辨率、语言、字体、主题、数据和权限下，对登录、用户端及管理端页面、弹窗、移动端布局进行比对。远程背景图、logo、自定义脚本和后端数据也会影响显示。

已验证六个 bundle 逐字节重建、81 个静态资源一致、两套预览 HTML 和抽查 JS/CSS HTTP 200。当前环境没有 PHP/vendor，也未安装浏览器测试工具，尚未完成真实后端登录或截图回归。因此不能宣称所有页面已经通过 100% 视觉一致性验收。
