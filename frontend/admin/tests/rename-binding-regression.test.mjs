import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parse} from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse = traverseModule.default || traverseModule;
const globals = new Set([
  'module', 'exports', 'require', 'Object', 'Array', 'Math', 'undefined', 'console',
  'window', 'document', 'Element', 'HTMLElement', 'Node', 'URL', 'setTimeout', 'clearTimeout',
]);
for (const file of [
  'admin/src/components/config/AppConfigTab.tsx',
  'admin/src/components/config/ConfigRow.tsx',
  'admin/src/components/config/DepositConfigTab.tsx',
  'admin/src/components/config/EmailConfigTab.tsx',
  'admin/src/components/config/FrontendConfigTab.tsx',
  'admin/src/components/config/InviteConfigTab.tsx',
  'admin/src/components/config/SafeConfigTab.tsx',
  'admin/src/components/config/ServerConfigTab.tsx',
  'admin/src/components/config/SiteConfigTab.tsx',
  'admin/src/components/config/SubscribeConfigTab.tsx',
  'admin/src/components/config/TelegramConfigTab.tsx',
  'admin/src/components/config/TicketConfigTab.tsx',
  'admin/src/components/server/ShadowsocksEditor.tsx',
  'admin/src/components/server/AnyTlsEditor.tsx',
  'admin/src/components/commerce/AssignOrderEditor.tsx',
  'admin/src/components/common/FilterDrawer.tsx',
  'admin/src/components/common/NullableSelectOption.tsx',
  'admin/src/components/server/HysteriaEditor.tsx',
  'admin/src/components/server/ServerEditorRegistry.tsx',
  'admin/src/components/server/ServerManageColumns.tsx',
  'admin/src/components/server/ServerManageMobileList.tsx',
  'admin/src/components/common/PermissionGroupEditor.tsx',
  'admin/src/components/user/SendMailEditor.tsx',
  'admin/src/components/server/ServerSecuritySettings.tsx',
  'admin/src/components/common/Sortable.tsx',
  'admin/src/components/server/TrojanEditor.tsx',
  'admin/src/components/server/TuicEditor.tsx',
  'admin/src/components/user/UserGenerator.tsx',
  'admin/src/components/user/UserEditor.tsx',
  'admin/src/components/server/V2NodeEditor.tsx',
  'admin/src/components/server/VlessEditor.tsx',
  'admin/src/components/server/VmessEditor.tsx',
  'admin/src/app/Router.tsx',
  'admin/src/config/navigation.tsx',
  'admin/src/layouts/Header.tsx',
  'admin/src/layouts/MainLayout.tsx',
  'admin/src/layouts/Sidebar.tsx',
  'admin/src/pages/config/payment/index.tsx',
  'admin/src/pages/config/theme/index.tsx',
  'admin/src/pages/config/system/index.tsx',
  'admin/src/pages/dashboard/index.tsx',
  'admin/src/pages/coupon/index.tsx',
  'admin/src/pages/coupon/_List/index.tsx',
  'admin/src/pages/coupon/_List/columns.tsx',
  'admin/src/pages/coupon/_Modal/index.tsx',
  'admin/src/pages/giftcard/index.tsx',
  'admin/src/pages/giftcard/_List/index.tsx',
  'admin/src/pages/giftcard/_List/columns.tsx',
  'admin/src/pages/giftcard/_Modal/index.tsx',
  'admin/src/pages/knowledge/index.tsx',
  'admin/src/pages/knowledge/_List/index.tsx',
  'admin/src/pages/knowledge/_Drawer/index.tsx',
  'admin/src/pages/index.tsx',
  'admin/src/pages/notice/index.tsx',
  'admin/src/pages/notice/_List/index.tsx',
  'admin/src/pages/notice/_List/columns.ts',
  'admin/src/pages/notice/_Modal/index.tsx',
  'admin/src/pages/order/index.tsx',
  'admin/src/pages/queue/index.tsx',
  'admin/src/pages/server/group/index.tsx',
  'admin/src/pages/server/route/index.tsx',
  'admin/src/pages/server/manage/index.tsx',
  'admin/src/pages/ticket/index.tsx',
  'admin/src/pages/ticket/[id].tsx',
  'admin/src/pages/user/index.tsx',
]) {
  const localFile = file.replace(/^admin\//, '');
  test(`${localFile}: references resolve in their lexical scope`, () => {
    const source = readFileSync(new URL('../' + localFile, import.meta.url), 'utf8');
    const ast = parse(source, {sourceType: 'module', plugins: ['jsx', 'typescript']});
    const missing = [];
    traverse(ast, {
      ReferencedIdentifier(path) {
        if (path.findParent(parent => parent.node.type.startsWith('TS'))) return;
        if (!globals.has(path.node.name) && !path.scope.hasBinding(path.node.name)) {
          missing.push(`${path.node.name}:${path.node.loc.start.line}`);
        }
      },
      AssignmentExpression(path) {
        const left = path.node.left;
        if (left.type === 'Identifier' && !path.scope.hasBinding(left.name) && !globals.has(left.name)) missing.push(left.name);
      },
    });
    assert.deepEqual(missing, []);
    if (localFile.includes('FilterDrawer')) {
      assert.match(source, /\badd\(\)\s*\{/);
      assert.match(source, /this\.add\(\)/);
      assert.doesNotMatch(source, /adobjectAssign/);
    }
  });
}
