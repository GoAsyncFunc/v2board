import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

async function loadComponents() {
    const React = {
        Component: class {
            constructor(props) {
                this.props = props;
            }
            setState(update) {
                this.state = { ...this.state, ...update };
            }
        },
        createElement: (type, props, ...children) => ({ type, props: props || {}, children }),
        Children: { only: (children) => children },
        cloneElement: (element, props) => ({ ...element, props: { ...element.props, ...props } }),
    };
    const classNames = (...values) =>
        values
            .filter(Boolean)
            .map((value) =>
                typeof value === 'object' ? Object.keys(value).filter((key) => value[key]) : value,
            )
            .flat()
            .join(' ');
    const modules = new Map();
    async function loadModule(fileUrl) {
        const source = await fs.readFile(fileUrl, 'utf8');
        const { code } = await transform(source, { format: 'cjs', loader: 'tsx' });
        const module = { exports: {} };
        vm.runInNewContext(code, {
            module,
            exports: module.exports,
            require(id) {
                if (id === 'react') return React;
                if (id === 'classnames') return classNames;
                if (id === './MobileListItem') return modules.get('MobileListItem');
                throw new Error(id);
            },
        });
        return module.exports;
    }
    modules.set(
        'MobileListItem',
        await loadModule(new URL('../src/components/common/MobileListItem.tsx', import.meta.url)),
    );
    return loadModule(new URL('../src/components/common/MobileList.tsx', import.meta.url));
}

test('MobileList renders header, body and footer through semantic class names', async () => {
    const { default: MobileList } = await loadComponents();
    const list = new MobileList({
        prefixCls: 'am-list',
        renderHeader: 'Header',
        renderFooter: () => 'Footer',
        children: 'Body',
        className: 'custom-list',
    });
    const tree = list.render();
    assert.equal(tree.type, 'div');
    assert.equal(tree.props.className, 'am-list custom-list');
    assert.deepEqual(
        tree.children.map((child) => child.props.className),
        ['am-list-header', 'am-list-body', 'am-list-footer'],
    );
});

test('MobileListItem builds content, extra, thumb and arrow classes', async () => {
    const { MobileListItem } = await loadComponents();
    const item = new MobileListItem({
        prefixCls: 'am-list',
        align: 'top',
        multipleLine: true,
        thumb: '/thumb.png',
        extra: 'Extra',
        arrow: 'horizontal',
        onClick() {},
        children: 'Title',
    });
    const wrapper = item.render();
    const row = wrapper.children[0];
    assert.equal(row.props.className, 'am-list-item am-list-item-top');
    assert.equal(row.children[0].props.className, 'am-list-thumb');
    assert.equal(row.children[1].props.className, 'am-list-line am-list-line-multiple');
    assert.equal(
        row.children[1].children[2].props.className,
        'am-list-arrow am-list-arrow-horizontal',
    );
    assert.equal(row.children[2].props.className, 'am-list-ripple');
});

test('MobileList keeps list item behavior in a dedicated source module', async () => {
    const listSource = await fs.readFile(
        new URL('../src/components/common/MobileList.tsx', import.meta.url),
        'utf8',
    );
    const itemSource = await fs.readFile(
        new URL('../src/components/common/MobileListItem.tsx', import.meta.url),
        'utf8',
    );
    assert.match(listSource, /from ['"]\.\/MobileListItem['"]/);
    assert.match(itemSource, /export class MobileListItem/);
});
