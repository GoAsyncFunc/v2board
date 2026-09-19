const MODULE_BY_EXPORT = {
  Button: 'antdButton.js',
  Input: 'antdInput.js',
  Tooltip: 'antdTooltip.js',
  Select: 'antdSelect.js',
  LoadingContainer: '76333265.js',
  Spin: '76333265.js',
  LoadingIndicator: '76333265.js',
  message: 'antdMessage.js',
  notification: 'antdMessage.js',
  Table: 'antdTable.js',
  Drawer: 'antdDrawer.js',
  Modal: 'antdDrawer.js',
  Tag: 'antdTag.js',
  PermissionGroupEditor: '387a4e6a.js',
  GroupEditor: '387a4e6a.js',
  Switch: 'antdSwitch.js',
  Badge: 'antdBadge.js',
  Dropdown: 'antdDropdown.js',
  Menu: 'antdMenu.js',
  DatePicker: 'antdDatePicker.js',
  Sortable: '71716f75.js',
  JsonEditor: '6c633544.js',
  Radio: 'antdRadio.js',
  Row: 'antdRow.js',
  Col: 'antdCol.js',
  ButtonGroup: 'antdButtonGroup.js',
  List: 'antdList.js',
  ConfigProvider: 'antdConfigProvider.js',
  Checkbox: 'antdCheckbox.js',
  Tabs: 'antdTabs.js',
  Carousel: 'antdCarousel.js',
};

export function expandVendorUiImports(source) {
  return source.replace(
    /import\s+\{([^}]+)\}\s+from\s+(['"])([^'"]*vendor\/)ui\.js\2;?/g,
    (statement, specifierList, quote, vendorPrefix) => specifierList
      .split(',')
      .map(specifier => specifier.trim())
      .filter(Boolean)
      .map(specifier => {
        const [exportName, localName = exportName] = specifier.split(/\s+as\s+/);
        const moduleName = MODULE_BY_EXPORT[exportName];
        if (!moduleName) throw new Error(`Unknown vendor UI export: ${exportName}`);
        if (exportName === 'JsonEditor') return `import ${localName} from ${quote}${vendorPrefix}modules/${moduleName}${quote};`;
        return `import { a as ${localName} } from ${quote}${vendorPrefix}modules/${moduleName}${quote};`;
      })
      .join('\n'),
  )
    .replace(/from\s+(['"])([^'"]*vendor\/)dateTime\.js\1/g, 'from $1$2modules/77642f52.js$1')
    .replace(/import\s+(['"])([^'"]*vendor\/)dateTime\.js\1;?/g, 'import $1$2modules/77642f52.js$1;')
    .replace(/import\s+\{\s*settings\s*\}\s+from\s+(['"])([^'"]*vendor\/)adminSettings\.js\1;?/g, 'import { a as settings } from $1$2modules/adminSettingsRuntime.js$1;')
    .replace(/from\s+(['"])([^'"]*vendor\/)adminSettings\.js\1/g, 'from $1$2modules/adminSettingsRuntime.js$1')
    .replace(/import\s+(['"])([^'"]*vendor\/)adminSettings\.js\1;?/g, 'import $1$2modules/adminSettingsRuntime.js$1;')
    .replace(/from\s+(['"])([^'"]*vendor\/)clipboard\.js\1/g, 'from $1$2modules/clipboardRuntime.js$1')
    .replace(/import\s+\*\s+as\s+(\w+)\s+from\s+(['"])([^'"]*vendor\/)appRuntime\.js\2;?/g, 'import * as $1 from $2$3modules/50737a47.js$2;')
    .replace(/import\s+\{\s*mergeConfig\s*\}\s+from\s+(['"])([^'"]*vendor\/)appRuntime\.js\1;?/g, 'import { mergeConfig } from $1$2modules/50737a47.js$1;')
    .replace(/import\s+\{\s*appDvaConfig\s*\}\s+from\s+(['"])([^'"]*vendor\/)appRuntime\.js\1;?/g, 'import { dva as appDvaConfig } from $1$2modules/45524968.js$1;')
    .replace(/import\s+\{\s*createHistory\s*\}\s+from\s+(['"])([^'"]*vendor\/)appRuntime\.js\1;?/g, 'import createHistory from $1$2modules/45513731.js$1;')
    .replace(/import\s+\{\s*loadingPlugin\s*\}\s+from\s+(['"])([^'"]*vendor\/)appRuntime\.js\1;?/g, 'import loadingPlugin from $1$2modules/30576135.js$1;')
    .replace(/import\s+\{\s*routeRenderer\s*\}\s+from\s+(['"])([^'"]*vendor\/)appRuntime\.js\1;?/g, 'import routeRenderer from $1$2modules/43727734.js$1;')
    .replace(/import\s+\{\s*router\s*\}\s+from\s+(['"])([^'"]*vendor\/)appRuntime\.js\1;?/g, 'import { router } from $1$2modules/4172412b.js$1;')
    .replace(/import\s+\{\s*loadable\s*\}\s+from\s+(['"])([^'"]*vendor\/)utilities\.js\1;?/g, 'import loadable from $1$2modules/reactLoadableRuntime.js$1;')
    .replace(/import\s+\{\s*MarkdownIt\s*\}\s+from\s+(['"])([^'"]*vendor\/)utilities\.js\1;?/g, 'import MarkdownIt from $1$2modules/markdownItRuntime.js$1;')
    .replace(/import\s+\{\s*(mergeProps|objectSpread)\s*\}\s+from\s+(['"])([^'"]*vendor\/)utilities\.js\2;?/g, 'import { a as $1 } from $2$3modules/70307045.js$2;')
    .replace(/import\s+\{\s*(AssignOrderEditor|TrafficPanel|SendMailEditor|UserGenerator)\s*\}\s+from\s+(['"])([^'"]*vendor\/)features\.js\2;?/g, (statement, exportName, quote, vendorPrefix) => {
      const modules = { AssignOrderEditor: '6d43642f.js', TrafficPanel: '58307135.js', SendMailEditor: '6d615643.js', UserGenerator: '51673471.js' };
      return `import { a as ${exportName} } from ${quote}${vendorPrefix}modules/${modules[exportName]}${quote};`;
    })
    .replace(/import\s+\{\s*(Result|Recaptcha|TelegramBindModal|SubscribeImporter)\s*\}\s+from\s+(['"])([^'"]*vendor\/)features\.js\2;?/g, (statement, exportName, quote, vendorPrefix) => {
      const modules = { Result: '4d6f5257.js', Recaptcha: '464f4151.js', TelegramBindModal: '79786e6e.js', SubscribeImporter: '2f497261.js' };
      return `import { a as ${exportName} } from ${quote}${vendorPrefix}modules/${modules[exportName]}${quote};`;
    })
    .replace(/from\s+(['"])([^'"]*vendor\/)theme\.js\1/g, 'from $1$2modules/6e444349.js$1')
    .replace(/import\s+\{\s*chineseLocale\s*\}\s+from\s+(['"])([^'"]*vendor\/)content\.js\1;?/g, 'import { a as chineseLocale } from $1$2modules/antdZhCnLocale.js$1;')
    .replace(/import\s+\{\s*withLocale\s*\}\s+from\s+(['"])([^'"]*vendor\/)content\.js\1;?/g, 'import withLocale from $1$2modules/withLocaleRuntime.js$1;')
    .replace(/import\s+(['"])([^'"]*vendor\/)(?:features|codeEditorRuntime|featureRuntime)\.js\1;?/g, '');
}

const NAMED_COMPONENTS = new Set([
  'Button', 'Tooltip', 'Select', 'LoadingContainer', 'Spin', 'LoadingIndicator',
  'Table', 'Drawer', 'Tag', 'PermissionGroupEditor', 'GroupEditor', 'Switch',
  'Badge', 'Dropdown', 'DatePicker', 'Sortable', 'JsonEditor', 'Radio', 'Row',
  'Col', 'ButtonGroup', 'List',
]);

function component(name, children = {}) {
  return Object.assign(name, children);
}

const COMPONENTS = {
  Input: component('Input', { TextArea: 'TextArea', Search: 'Search', Group: 'InputGroup' }),
  Menu: component('Menu', { Item: 'MenuItem', SubMenu: 'SubMenu', Divider: 'MenuDivider' }),
  Select: component('Select', { Option: 'Option', OptGroup: 'OptGroup' }),
  Radio: component('Radio', { Group: 'RadioGroup', Button: 'RadioButton' }),
  Button: component('Button', { Group: 'ButtonGroup' }),
  List: component('List', { Item: component('ListItem', { Meta: 'ListItemMeta' }) }),
};

const SERVICES = {
  message: { success() {}, error() {}, info() {}, warning() {}, loading() {} },
  notification: { success() {}, error() {}, info() {}, warning() {}, open() {} },
  Modal: { confirm() {}, info() {}, success() {}, error() {}, warning() {} },
};

export function createVendorUiMock(id) {
  if (!id.endsWith('/vendor/ui.js')) return null;
  return new Proxy({}, {
    get(target, exportName) {
      if (COMPONENTS[exportName]) return COMPONENTS[exportName];
      if (SERVICES[exportName]) return SERVICES[exportName];
      if (NAMED_COMPONENTS.has(exportName)) return exportName;
      return MODULE_BY_EXPORT[exportName] ? exportName : undefined;
    },
  });
}
