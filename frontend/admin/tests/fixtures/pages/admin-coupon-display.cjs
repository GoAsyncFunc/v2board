// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function (b, d, _) {
    return [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '券名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (e) => {
                return 1 === e ? '金额' : '比例';
            },
        },
        {
            title: '剩余次数',
            dataIndex: 'limit_use',
            key: 'limit_use',
            render: (e) => {
                return b.a.createElement(d['a'], null, null !== e ? e : '无限');
            },
        },
        {
            title: '有效期',
            dataIndex: 'started_at',
            key: 'started_at',
            align: 'left',
            render: (e, t) => {
                return ''
                    .concat(_()(1e3 * t.started_at).format('YYYY/MM/DD HH:mm'), ' ~ ')
                    .concat(_()(1e3 * t.ended_at).format('YYYY/MM/DD HH:mm'));
            },
        },
    ];
};
