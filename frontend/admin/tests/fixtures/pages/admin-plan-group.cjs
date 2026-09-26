// Original readonly column unchanged, dependencies injected.
module.exports = function (f, m, l) {
    return {
        title: '权限组',
        dataIndex: 'group_id',
        key: 'group_id',
        render: (e, t) => {
            var n = [];
            return (
                f.map((t) => {
                    t.id === parseInt(e) && n.push(m.a.createElement(l['a'], null, t.name));
                }),
                n
            );
        },
    };
};
