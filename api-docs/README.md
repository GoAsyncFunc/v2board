# V2Board API 文档项目

这是一份面向新用户主题开发的 API 文档。V2Board 用户端是 SPA，后端通过 `/api/v1` 提供接口；主题只需要实现页面、状态管理和请求适配，不需要修改后端。

## 文档入口

- [用户端 API 手册](docs/user-api.md)：登录、用户资料、订阅、套餐、订单支付、邀请、工单、公告、知识库、节点和流量。
- [管理端 API 索引](docs/admin-api.md)：管理端接口按模块列出，参数以现有 Admin 源码为准。
- [客户端与协议接口](docs/client-api.md)：订阅链接、客户端配置、版本信息和 `/api/v2` 节点接口。
- [接口状态与源码索引](docs/source-map.md)：前端调用、后端路由、控制器、类型文件之间的对应关系。
- [OpenAPI 3](openapi/v2board-user.yaml)：可导入 Swagger UI、Apifox、Postman 等工具。

## 快速开始

```ts
const API = `${location.origin}/api/v1`;

async function request(path: string, init: RequestInit = {}) {
  const token = localStorage.getItem('auth_data');
  const headers = new Headers(init.headers);
  headers.set('Content-Language', 'zh-CN');
  if (token) headers.set('authorization', token);
  return fetch(`${API}${path}`, {
    credentials: 'include',
    ...init,
    headers,
  }).then((res) => res.json());
}
```

用户端现有实现使用 `application/x-www-form-urlencoded`，不是 JSON：见 [`frontend/user/src/services/request.ts`](../frontend/user/src/services/request.ts)。请求成功时 HTTP 状态通常为 `200`，业务数据位于 `data`；分页接口可能同时返回 `total`。

## 重要约定

1. 用户鉴权使用登录返回的 `data.auth_data`，放在 `Authorization` 请求头；后端也兼容表单字段 `auth_data`。
2. 订阅链接不是用户鉴权 JWT，而是用户的订阅 `token`，放在 `/api/v1/client/subscribe?token=...`。
3. 金额通常以分为单位，流量通常以字节为单位，时间戳通常为 Unix 秒。
4. 失败响应不是统一的业务 `code`：需要同时检查 HTTP 状态和 `message` / `errors`。现有前端将非 200 视为失败。
5. `frontend/user/src/models/tutorial.ts` 是旧版遗留模型；当前教程内容已经并入知识库，应使用 `/user/knowledge/fetch`，不要依赖旧的 `/user/tutorial/*` 接口。

## 校验

从仓库根目录运行：

```sh
node api-docs/scripts/check-contract.mjs
```

脚本会检查用户端源码引用的相对 API 是否能在后端 V1 路由中找到，并把未注册调用列出来。它不会修改源码。

文档基于当前工作区源码整理，生成日期：2026-09-22。
