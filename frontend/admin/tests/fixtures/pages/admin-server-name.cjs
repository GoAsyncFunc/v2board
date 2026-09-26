// Original column unchanged; React binding only supports fixture JSX compilation.
module.exports = function (y, u, h, m, D) {
    const React = y.a;
    return {
        title: (
            <span>
                {y.a.createElement(
                    u['a'],
                    {
                        placement: 'top',
                        title: (
                            <div>
                                {y.a.createElement(h['a'], {
                                    status: 'error',
                                })}
                                {' 未运行'}
                                <br></br>
                                {y.a.createElement(h['a'], {
                                    status: 'warning',
                                })}
                                {' 无人使用或服务端上报异常'}
                                <br></br>
                                {y.a.createElement(h['a'], {
                                    status: 'processing',
                                })}
                                {' 运行正常'}
                                <br></br>
                            </div>
                        ),
                    },
                    '节点 ',
                    y.a.createElement(m['a'], {
                        type: 'question-circle',
                    }),
                )}
            </span>
        ),
        dataIndex: 'name',
        key: 'name',
        render: (e, t) => {
            return y.a.createElement(
                y.a.Fragment,
                null,
                y.a.createElement(h['a'], {
                    status: D[t.available_status],
                }),
                <span>{e}</span>,
            );
        },
    };
};
