import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { transform } from 'esbuild';

const cases = [
  ['AnyTlsEditor', 'serverAnyTLS', 'serverAnyTLS/save'],
  ['HysteriaEditor', 'serverHysteria', 'serverHysteria/save'],
  ['ShadowsocksEditor', 'serverShadowsocks', 'serverShadowsocks/save'],
  ['TrojanEditor', 'serverTrojan', 'serverTrojan/save'],
  ['TuicEditor', 'serverTuic', 'serverTuic/save'],
];

function createReact() {
  return {
    Component: class {
      constructor(props) { this.props = props; }
      setState(update, callback) { this.state = { ...this.state, ...update }; callback?.(); }
    },
    Fragment: 'Fragment',
    cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
  };
}

async function loadEditor(file) {
  const source = await fs.readFile(new URL(`../src/pages/server/manage/editors/${file}.tsx`, import.meta.url), 'utf8');
  const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
  const module = { exports: {} };
  const React = createReact();
  vm.runInNewContext(code, {
    module, exports: module.exports, React,
    require(id) {
      if (id === 'react') return React;
      if (id === 'react-redux') return { connect: () => Component => Component };
      if (id === 'antd/lib/select') return Object.assign('Select', { Option: 'Select.Option' });
      if (id === 'antd/lib/input') return Object.assign('Input', { TextArea: 'Input.TextArea' });
      if (id.startsWith('antd/')) return id;
      return { __esModule: true, default: id };
    },
  });
  return module.exports[file];
}

for (const [file, modelKey, actionType] of cases) {
  test(`${file} preserves record updates and save dispatch`, async () => {
    const Editor = await loadEditor(file);
    const actions = [];
    const editor = new Editor({
      children: { props: {} },
      dispatch: action => actions.push(action),
      record: { id: 9, type: file.replace('Editor', '').toLowerCase(), name: 'Old', network_settings: '{}' },
      [modelKey]: { saveLoading: false },
      serverGroup: { groups: [] },
      serverManage: { servers: [], fetchLoading: false, sortMode: false },
      serverRoute: { routes: [] },
    });
    editor.updateServer('name', 'Updated');
    editor.setState({ visible: true });
    editor.save();
    assert.equal(actions[0].type, actionType);
    assert.equal(actions[0].params.name, 'Updated');
    actions[0].callback();
    assert.equal(editor.state.visible, false);
  });
}
