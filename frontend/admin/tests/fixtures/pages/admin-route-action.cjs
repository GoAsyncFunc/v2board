// Original readonly column unchanged, dependencies injected.
module.exports = function (b) {
    return {
        title: '动作',
        dataIndex: 'action',
        key: 'action',
        render: (e) => {
            return b['a'].routeActionText[e];
        },
    };
};
