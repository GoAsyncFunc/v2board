// Reconstructed from the original OrderPage render (webpack module 70693341,
// class $). The bundle builds the order table columns inline as `m`; the
// transcription below keeps every column, render closure and dispatch call
// unchanged. Dependencies are injected so it can serve as a differential
// baseline for the recovered OrderListColumns module.
module.exports = function createOriginalOrderListColumns(React, deps, dispatch) {
    var settings = deps.settings;
    var moment = deps.moment;
    var Tag = deps.Tag;
    var Tooltip = deps.Tooltip;
    var Icon = deps.Icon;
    var Badge = deps.Badge;
    var Dropdown = deps.Dropdown;
    var Menu = deps.Menu;
    var OrderDetailModal = deps.OrderDetailModal;
    var update = function (tradeNo, key, value) {
        dispatch({ type: 'order/update', tradeNo, key, value });
    };
    return [
        {
            title: '# 订单号',
            dataIndex: 'trade_no',
            key: 'trade_no',
            render: (tradeNo, order) => {
                return React.createElement(
                    OrderDetailModal,
                    { orderId: order.id },
                    React.createElement(
                        'a',
                        { href: 'javascript:void(0);' },
                        tradeNo.substr(0, 3),
                        '...',
                        tradeNo.substr(-3),
                    ),
                );
            },
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (value) => {
                var labels = { 1: '新购', 2: '续费', 3: '变更', 4: '流量包', 9: '充值' };
                return labels[value];
            },
        },
        {
            title: '订阅计划',
            dataIndex: 'plan_name',
            key: 'plan_name',
        },
        {
            title: '周期',
            dataIndex: 'period',
            key: 'period',
            align: 'center',
            render: (value, order) => {
                return React.createElement(Tag, null, settings.periodText[order.period]);
            },
        },
        {
            title: '支付金额',
            dataIndex: 'total_amount',
            key: 'total_amount',
            align: 'right',
            render: (value) => {
                return (value / 100).toFixed(2);
            },
        },
        {
            title: React.createElement(
                'span',
                null,
                React.createElement(
                    Tooltip,
                    {
                        placement: 'top',
                        title: '标记为[已支付]后将会由系统进行开通后并完成',
                    },
                    '订单状态 ',
                    React.createElement(Icon, { type: 'question-circle' }),
                ),
            ),
            dataIndex: 'status',
            key: 'status',
            render: (status, order) => {
                var badgeStatuses = ['error', 'processing', 'default', 'success', 'default'];
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        Dropdown,
                        {
                            disabled: 0 !== status,
                            trigger: ['click'],
                            overlay: React.createElement(
                                Menu,
                                null,
                                React.createElement(
                                    Menu.Item,
                                    {
                                        key: '1',
                                        onClick: () => {
                                            dispatch({
                                                type: 'order/paid',
                                                tradeNo: order.trade_no,
                                            });
                                        },
                                    },
                                    '已支付',
                                ),
                                React.createElement(
                                    Menu.Item,
                                    {
                                        key: '2',
                                        onClick: () => {
                                            dispatch({
                                                type: 'order/cancel',
                                                tradeNo: order.trade_no,
                                            });
                                        },
                                    },
                                    '取消',
                                ),
                            ),
                        },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(Badge, { status: badgeStatuses[status] }),
                            React.createElement(
                                'span',
                                null,
                                settings.orderStatusText[status],
                                ' ',
                            ),
                            0 === status &&
                                React.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    '标记为 ',
                                    React.createElement(Icon, { type: 'caret-down' }),
                                ),
                        ),
                    ),
                );
            },
        },
        {
            title: '佣金金额',
            dataIndex: 'commission_balance',
            key: 'commission_balance',
            align: 'right',
            render: (value, order) => {
                return 0 === order.status || 2 === order.status
                    ? '-'
                    : value
                      ? (value / 100).toFixed(2)
                      : '-';
            },
        },
        {
            title: React.createElement(
                'span',
                null,
                '佣金状态 ',
                React.createElement(
                    Tooltip,
                    {
                        placement: 'top',
                        title: '标记为[有效]后将会由系统处理后发放到用户并完成',
                    },
                    React.createElement(Icon, { type: 'question-circle' }),
                ),
            ),
            dataIndex: 'commission_status',
            key: 'commission_status',
            render: (status, order) => {
                if (0 === order.status || 2 === order.status) return '-';
                if (!order.commission_balance) return '-';
                var badgeStatuses = ['default', 'processing', 'success', 'error'];
                return 2 === order.commission_status
                    ? React.createElement(
                          'div',
                          null,
                          React.createElement(Badge, { status: badgeStatuses[status] }),
                          React.createElement(
                              'span',
                              null,
                              settings.commissionStatusText[status],
                              ' ',
                          ),
                      )
                    : React.createElement(
                          'div',
                          null,
                          React.createElement(
                              Dropdown,
                              {
                                  trigger: ['click'],
                                  overlay: React.createElement(
                                      Menu,
                                      null,
                                      React.createElement(
                                          Menu.Item,
                                          {
                                              key: '0',
                                              disabled: 0 === status,
                                              onClick: (event) => {
                                                  update(
                                                      order.trade_no,
                                                      'commission_status',
                                                      event.key,
                                                  );
                                              },
                                          },
                                          '待确认',
                                      ),
                                      React.createElement(
                                          Menu.Item,
                                          {
                                              key: '1',
                                              disabled: 1 === status,
                                              onClick: (event) => {
                                                  update(
                                                      order.trade_no,
                                                      'commission_status',
                                                      event.key,
                                                  );
                                              },
                                          },
                                          '有效',
                                      ),
                                      React.createElement(
                                          Menu.Item,
                                          {
                                              key: '3',
                                              disabled: 3 === status,
                                              onClick: (event) => {
                                                  update(
                                                      order.trade_no,
                                                      'commission_status',
                                                      event.key,
                                                  );
                                              },
                                          },
                                          '无效',
                                      ),
                                  ),
                              },
                              React.createElement(
                                  'div',
                                  null,
                                  React.createElement(Badge, { status: badgeStatuses[status] }),
                                  React.createElement(
                                      'span',
                                      null,
                                      settings.commissionStatusText[status],
                                      ' ',
                                  ),
                                  React.createElement(
                                      'a',
                                      { href: 'javascript:void(0);' },
                                      '标记为 ',
                                      React.createElement(Icon, { type: 'caret-down' }),
                                  ),
                              ),
                          ),
                      );
            },
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'right',
            render: (value) => {
                return moment(1000 * value).format('YYYY/MM/DD HH:mm');
            },
        },
    ];
};
