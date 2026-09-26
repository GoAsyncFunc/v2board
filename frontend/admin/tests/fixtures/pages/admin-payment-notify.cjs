// Original readonly column unchanged, dependencies injected.
module.exports = function (d, c, h) {
    const React = d.a;
    return {
        title: (
            <span>
                {'通知地址 '}
                {d.a.createElement(
                    c['a'],
                    {
                        placement: 'top',
                        title: '支付网关将会把数据通知到本地址，请通过防火墙放行本地址。',
                    },
                    d.a.createElement(h['a'], {
                        type: 'question-circle',
                    }),
                )}
            </span>
        ),
        dataIndex: 'notify_url',
        key: 'notify_url',
    };
};
