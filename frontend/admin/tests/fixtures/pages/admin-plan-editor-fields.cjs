// Reconstructed from the original PlanEditor render branches in webpack module
// 69683863 (admin plan page). The original module renders these branches inline;
// dependencies are injected so each branch can serve as a stable differential
// baseline. Branch code mirrors the bundle's createElement calls unchanged.
module.exports = {
    renderBasicFields: function (React, ui, props) {
        var record = props.record;
        var onChange = props.onChange;
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { for: 'example-text-input-alt' }, '套餐名称'),
                React.createElement(ui.Input, {
                    placeholder: '请输入套餐名称',
                    value: record.name,
                    onChange: function (event) {
                        return onChange('name', event.target.value);
                    },
                }),
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { for: 'example-text-input-alt' }, '套餐描述'),
                React.createElement(ui.Input.TextArea, {
                    rows: 4,
                    value: record.content,
                    placeholder: '请输入套餐描述，支持HTML',
                    onChange: function (event) {
                        return onChange('content', event.target.value);
                    },
                }),
            ),
        );
    },
    renderResourceFields: function (React, ui, props) {
        var record = props.record;
        var onChange = props.onChange;
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { for: 'example-text-input-alt' }, '套餐流量'),
                React.createElement(ui.Input, {
                    addonAfter: 'GB',
                    placeholder: '请输入套餐流量',
                    value: record.transfer_enable,
                    onChange: function (event) {
                        return onChange('transfer_enable', event.target.value);
                    },
                }),
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { for: 'example-text-input-alt' }, '设备数限制'),
                React.createElement(ui.Input, {
                    placeholder: '留空则不限制',
                    value: record.device_limit,
                    onChange: function (event) {
                        return onChange('device_limit', event.target.value);
                    },
                }),
            ),
        );
    },
    renderAccessFields: function (React, ui, props) {
        var record = props.record;
        var groups = props.groups;
        var onChange = props.onChange;
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { for: 'example-text-input-alt' },
                    '权限组 ',
                    React.createElement(
                        ui.PermissionGroupEditor,
                        null,
                        React.createElement(
                            'a',
                            { href: 'javascript:(0);' },
                            '添加权限组',
                        ),
                    ),
                ),
                React.createElement(
                    ui.Select,
                    {
                        placeholder: '请选择权限组',
                        style: { width: '100%' },
                        value: record.group_id,
                        onChange: function (groupId) {
                            return onChange('group_id', groupId);
                        },
                    },
                    groups.map(function (group) {
                        return React.createElement(
                            ui.Option,
                            { key: group.id, value: group.id },
                            group.name,
                        );
                    }),
                ),
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { htmlFor: 'example-text-input-alt' },
                    '流量重置方式',
                ),
                React.createElement(
                    ui.Select,
                    {
                        placeholder: '请选择权限组',
                        style: { width: '100%' },
                        value: record.reset_traffic_method,
                        onChange: function (method) {
                            return onChange('reset_traffic_method', method);
                        },
                    },
                    React.createElement(ui.Option, { key: null, value: null }, '跟随系统设置'),
                    React.createElement(ui.Option, { key: 0, value: 0 }, '每月1号'),
                    React.createElement(ui.Option, { key: 1, value: 1 }, '按月重置'),
                    React.createElement(ui.Option, { key: 2, value: 2 }, '不重置'),
                    React.createElement(ui.Option, { key: 3, value: 3 }, '每年1月1日'),
                    React.createElement(ui.Option, { key: 4, value: 4 }, '按年重置'),
                ),
            ),
        );
    },
    renderLimitFields: function (React, ui, props) {
        var record = props.record;
        var onChange = props.onChange;
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { for: 'example-text-input-alt' },
                    '最大容纳用户量',
                ),
                React.createElement(ui.Input, {
                    placeholder: '留空则不限制',
                    value: record.capacity_limit,
                    onChange: function (event) {
                        return onChange('capacity_limit', event.target.value);
                    },
                }),
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { for: 'example-text-input-alt' }, '限速'),
                React.createElement(ui.Input, {
                    addonAfter: 'Mbps',
                    placeholder: '留空则不限制',
                    value: record.speed_limit,
                    onChange: function (event) {
                        return onChange('speed_limit', event.target.value);
                    },
                }),
            ),
        );
    },
    renderActions: function (React, ui, props) {
        var saveLoading = props.saveLoading;
        return React.createElement(
            'div',
            { className: 'v2board-drawer-action' },
            React.createElement(
                'div',
                { style: { float: 'left', marginTop: 5 } },
                React.createElement(
                    ui.Tooltip,
                    {
                        title: '勾选后变更的流量、限速、权限组将应用到该套餐下的用户',
                        placement: 'top',
                    },
                    React.createElement(
                        ui.Checkbox,
                        {
                            onChange: function (event) {
                                return props.onForceUpdateChange(event.target.checked);
                            },
                        },
                        '强制更新到用户',
                    ),
                ),
            ),
            React.createElement(
                ui.Button,
                { style: { marginRight: 8 }, onClick: props.onCancel },
                '取消',
            ),
            React.createElement(
                ui.Button,
                { loading: saveLoading, onClick: props.onSubmit, type: 'primary' },
                '提交',
            ),
        );
    },
};
