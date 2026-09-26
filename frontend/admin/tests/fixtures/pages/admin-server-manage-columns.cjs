// Reconstructed from the original server manage page render in webpack
// module 757a5844. The bundle builds the `$` column array inline inside a
// class whose `update`, `getTypeTag` and host-copy helpers close over the
// component; those closures are injected here unchanged in behavior.
// The name/rate columns of the recovered sources delegate to the L2-covered
// ServerNameColumn / ServerRateColumn modules, so this baseline focuses on
// the columns the page itself owns.
module.exports = function createOriginalServerColumns(React, deps) {
    var Switch = deps.Switch;
    var Tooltip = deps.Tooltip;
    var Icon = deps.Icon;
    var Badge = deps.Badge;
    var Tag = deps.Tag;
    var message = deps.message;
    var copyText = deps.copyText;
    var getTypeTag = deps.getTypeTag;
    var renderActions = deps.renderActions;
    var groups = deps.groups;
    var update = function (server, key, value) {
        deps.updates.push([server.id, key, value]);
    };
    var TYPE_LABELS = ['V2node', 'Shadowsocks', 'Vmess', 'Trojan', 'Hysteria', 'Tuic', 'Vless', 'AnyTLS'];
    var STATUS_BADGES = { 0: 'error', 1: 'warning', 2: 'processing' };
    return [
        {
            title: '节点ID',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            filters: TYPE_LABELS.map((label) => ({ text: label, value: label })),
            onFilter: (label, server) => server.type === label.toLowerCase(),
            render: (id, server) =>
                React.createElement(
                    'span',
                    null,
                    getTypeTag(server.type, server.parent_id ? id + ' => ' + server.parent_id : id),
                ),
        },
        {
            title: '显隐',
            dataIndex: 'show',
            key: 'show',
            render: (shown, server) =>
                React.createElement(Switch, {
                    size: 'small',
                    checked: parseInt(shown),
                    onClick: () => update(server, 'show', parseInt(shown) ? 0 : 1),
                }),
        },
        {
            title: React.createElement(
                'span',
                null,
                React.createElement(
                    Tooltip,
                    {
                        placement: 'top',
                        title: React.createElement(
                            'div',
                            null,
                            React.createElement(Badge, { status: 'error' }),
                            ' 未运行',
                            React.createElement('br', null),
                            React.createElement(Badge, { status: 'warning' }),
                            ' 无人使用或服务端上报异常',
                            React.createElement('br', null),
                            React.createElement(Badge, { status: 'processing' }),
                            ' 运行正常',
                            React.createElement('br', null),
                        ),
                    },
                    '节点 ',
                    React.createElement(Icon, { type: 'question-circle' }),
                ),
            ),
            dataIndex: 'name',
            key: 'name',
            render: (name, server) =>
                React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Badge, { status: STATUS_BADGES[server.available_status] }),
                    React.createElement('span', null, name),
                ),
        },
        {
            title: '地址',
            dataIndex: 'host',
            key: 'host',
            render: (host, server) =>
                React.createElement(
                    'span',
                    {
                        style: { cursor: 'pointer' },
                        onClick: () => {
                            copyText(server.host);
                            message.success('复制成功');
                        },
                    },
                    server.host + ':' + server.port,
                ),
        },
        {
            title: React.createElement(
                'span',
                null,
                React.createElement(
                    Tooltip,
                    { placement: 'top', title: '根据服务端上报频率而定' },
                    '人数 ',
                    React.createElement(Icon, { type: 'question-circle' }),
                ),
            ),
            dataIndex: 'online',
            key: 'online',
            align: 'left',
            width: 130,
            sorter: (left, right) => left.online - right.online,
            render: (online) =>
                React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Icon, { type: 'user' }),
                    ' ',
                    online || 0,
                ),
        },
        {
            title: React.createElement(
                Tooltip,
                {
                    placement: 'top',
                    title: '使用的流量将乘以倍率进行扣除',
                },
                '倍率 ',
                React.createElement(Icon, { type: 'question-circle' }),
            ),
            dataIndex: 'rate',
            key: 'rate',
            align: 'center',
            render: (rate) =>
                React.createElement(Tag, { style: { minWidth: 60 } }, rate + ' x'),
        },
        {
            title: '权限组',
            dataIndex: 'group_id',
            key: 'group_id',
            filters: groups.map((group) => ({ text: group.name, value: group.id })),
            onFilter: (id, server) => -1 !== server.group_id.indexOf(''.concat(id)),
            render: (value, server) => {
                var nodes = [];
                server.group_id.map((groupId) => {
                    var group = groups.find((candidate) => candidate.id === parseInt(groupId));
                    group && nodes.push(React.createElement(Tag, null, group.name));
                });
                return React.createElement(React.Fragment, null, nodes);
            },
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
            fixed: 'right',
            width: 100,
            render: (value, server) => React.createElement('div', null, renderActions(server)),
        },
    ];
};
