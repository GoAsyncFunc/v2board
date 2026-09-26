// Original readonly columns, extracted unchanged; write menus deliberately excluded.
module.exports = function (b) {
    return [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'right',
            render: (e) => {
                return b()(1e3 * e).format('YYYY/MM/DD HH:mm');
            },
        },
    ];
};
