// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function (u, l) {
    return [
        {
            title: '组ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '组名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用户数量',
            dataIndex: 'user_count',
            key: 'user_count',
            render: (e) => {
                return u.a.createElement(
                    u.a.Fragment,
                    null,
                    u.a.createElement(l['a'], {
                        type: 'user',
                        style: {
                            cursor: 'move',
                        },
                    }),
                    ' ',
                    e,
                );
            },
        },
        {
            title: '节点数量',
            dataIndex: 'server_count',
            key: 'server_count',
            render: (e) => {
                return u.a.createElement(
                    u.a.Fragment,
                    null,
                    u.a.createElement(l['a'], {
                        type: 'database',
                        style: {
                            cursor: 'move',
                        },
                    }),
                    ' ',
                    e,
                );
            },
        },
    ];
};
