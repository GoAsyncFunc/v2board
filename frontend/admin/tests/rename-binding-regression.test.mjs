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
  'admin/src/components/ShadowsocksEditor.tsx',
  'admin/src/components/AnyTlsEditor.tsx',
  'admin/src/components/AssignOrderEditor.tsx',
  'admin/src/components/FilterDrawer.tsx',
  'admin/src/components/HysteriaEditor.tsx',
  'admin/src/components/PermissionGroupEditor.tsx',
  'admin/src/components/SendMailEditor.tsx',
  'admin/src/components/ServerSecuritySettings.tsx',
  'admin/src/components/Sortable.tsx',
  'admin/src/components/TrojanEditor.tsx',
  'admin/src/components/TuicEditor.tsx',
  'admin/src/components/UserGenerator.tsx',
  'admin/src/components/UserEditor.tsx',
  'admin/src/components/V2NodeEditor.tsx',
  'admin/src/components/VlessEditor.tsx',
  'admin/src/components/VmessEditor.tsx',
  'admin/src/pages/ConfigPayment.tsx',
  'admin/src/pages/ConfigTheme.tsx',
  'admin/src/pages/ConfigSystem.tsx',
  'admin/src/pages/Dashboard.tsx',
  'admin/src/pages/Coupon.tsx',
  'admin/src/pages/Giftcard.tsx',
  'admin/src/pages/Knowledge.tsx',
  'admin/src/pages/Index.tsx',
  'admin/src/pages/Notice.tsx',
  'admin/src/pages/Order.tsx',
  'admin/src/pages/Queue.tsx',
  'admin/src/pages/ServerGroup.tsx',
  'admin/src/pages/ServerRoute.tsx',
  'admin/src/pages/ServerManage.tsx',
  'admin/src/pages/Ticket.tsx',
  'admin/src/pages/TicketDetail.tsx',
  'admin/src/pages/User.tsx',
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
