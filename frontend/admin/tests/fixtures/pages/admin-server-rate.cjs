// Original readonly column unchanged, dependencies injected.
module.exports = function (y, u, m, g) {
    return {
        title: y.a.createElement(
            u['a'],
            {
                placement: 'top',
                title: '使用的流量将乘以倍率进行扣除',
            },
            '倍率 ',
            y.a.createElement(m['a'], {
                type: 'question-circle',
            }),
        ),
        dataIndex: 'rate',
        key: 'rate',
        align: 'center',
        render: (e) => {
            return y.a.createElement(
                g['a'],
                {
                    style: {
                        minWidth: 60,
                    },
                },
                e + ' x',
            );
        },
    };
};
