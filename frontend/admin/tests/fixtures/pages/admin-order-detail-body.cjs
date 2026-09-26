// Unmodified original render expression; injected dependencies, no API calls.
module.exports = function (g, E, S, y, w, _, f, d) {
    const React = g.a;
    var e,
        t = this.props.plan.plans,
        n = { marginBottom: 0 };
    return this.state.user.email ? (
        <div>
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '邮箱',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    <a
                        onClick={() => this.jumpUserFilter('email', '模糊', this.state.user.email)}
                        href={'javascript:void(0);'}
                    >
                        {this.state.user.email}
                    </a>,
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '订单号',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    this.state.order.trade_no,
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '订单周期',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    y['a'].periodText[this.state.order.period],
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '订单状态',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    y['a'].orderStatusText[this.state.order.status],
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '订阅计划',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    null === (e = t.find((e) => e.id === this.state.order.plan_id)) || void 0 === e
                        ? void 0
                        : e.name,
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '回调单号',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    this.state.order.callback_no ? this.state.order.callback_no : '-',
                ),
            )}
            {g.a.createElement(_['a'], null)}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '支付金额',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    (this.state.order.total_amount / 100).toFixed(2),
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '余额支付',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    (this.state.order.balance_amount / 100).toFixed(2),
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '优惠金额',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    (this.state.order.discount_amount / 100).toFixed(2),
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '退回金额',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    (this.state.order.refund_amount / 100).toFixed(2),
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '折抵金额',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    (this.state.order.surplus_amount / 100).toFixed(2),
                ),
            )}
            {g.a.createElement(_['a'], null)}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '创建时间',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    w()(1e3 * this.state.order.created_at).format('YYYY-MM-DD HH:mm:ss'),
                ),
            )}
            {g.a.createElement(
                E['a'],
                {
                    gutter: [16, 16],
                    style: n,
                },
                g.a.createElement(
                    S['a'],
                    {
                        span: 6,
                    },
                    '更新时间',
                ),
                g.a.createElement(
                    S['a'],
                    {
                        span: 18,
                    },
                    w()(1e3 * this.state.order.updated_at).format('YYYY-MM-DD HH:mm:ss'),
                ),
            )}
            {this.state.order.invite_user_id && 3 === this.state.order.status ? (
                <div>
                    {g.a.createElement(_['a'], null)}
                    {g.a.createElement(
                        E['a'],
                        {
                            gutter: [16, 16],
                            style: n,
                        },
                        g.a.createElement(
                            S['a'],
                            {
                                span: 6,
                            },
                            '邀请人',
                        ),
                        g.a.createElement(
                            S['a'],
                            {
                                span: 18,
                            },
                            g.a.createElement(
                                f['a'],
                                {
                                    title: '查看TA邀请的人',
                                },
                                <a
                                    onClick={() =>
                                        this.jumpUserFilter(
                                            'invite_by_email',
                                            '模糊',
                                            this.state.invite_user.email,
                                        )
                                    }
                                    href={'javascript:void(0);'}
                                >
                                    {this.state.invite_user.email}
                                </a>,
                            ),
                        ),
                    )}
                    {g.a.createElement(
                        E['a'],
                        {
                            gutter: [16, 16],
                            style: n,
                        },
                        g.a.createElement(
                            S['a'],
                            {
                                span: 6,
                            },
                            '佣金金额',
                        ),
                        g.a.createElement(
                            S['a'],
                            {
                                span: 18,
                            },
                            (this.state.order.commission_balance / 100).toFixed(2),
                        ),
                    )}
                    {this.state.order.actual_commission_balance &&
                        g.a.createElement(
                            E['a'],
                            {
                                gutter: [16, 16],
                                style: n,
                            },
                            g.a.createElement(
                                S['a'],
                                {
                                    span: 6,
                                },
                                '实际发放',
                            ),
                            g.a.createElement(
                                S['a'],
                                {
                                    span: 18,
                                },
                                (this.state.order.actual_commission_balance / 100).toFixed(2),
                            ),
                        )}
                    {g.a.createElement(
                        E['a'],
                        {
                            gutter: [16, 16],
                            style: n,
                        },
                        g.a.createElement(
                            S['a'],
                            {
                                span: 6,
                            },
                            '佣金状态',
                        ),
                        g.a.createElement(
                            S['a'],
                            {
                                span: 18,
                            },
                            y['a'].commissionStatusText[this.state.order.commission_status],
                        ),
                    )}
                </div>
            ) : (
                ''
            )}
        </div>
    ) : (
        g.a.createElement(d['a'], {
            type: 'loading',
            style: {
                fontSize: 24,
                color: '#415A94',
            },
        })
    );
};
