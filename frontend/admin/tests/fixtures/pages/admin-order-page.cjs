// Reconstructed from the original OrderPage class in webpack module 70693341
// (class $): lifecycle dispatch order, the update/tableOnChange helpers and the
// connect mapping. The render body is covered by the order list columns and
// filter keys baselines, so only behavior is transcribed here.
module.exports = function makeOriginalOrderPage(deps) {
    var Component = deps.Component;
    var createElement = deps.createElement;
    var MainLayout = deps.MainLayout;
    var LoadingContainer = deps.LoadingContainer;
    var ButtonGroup = deps.ButtonGroup;
    var FilterDrawer = deps.FilterDrawer;
    var AssignOrderEditor = deps.AssignOrderEditor;
    var Table = deps.Table;
    var Button = deps.Button;
    var Icon = deps.Icon;

    class OrderPage extends Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentWillUnmount() {
            this.props.dispatch({ type: 'order/empty' });
            this.props.dispatch({ type: 'order/setState', payload: { filter: [] } });
        }
        componentDidMount() {
            this.props.dispatch({ type: 'order/fetch' });
            this.props.dispatch({ type: 'plan/fetch' });
        }
        update(tradeNo, key, value) {
            this.props.dispatch({ type: 'order/update', tradeNo, key, value });
        }
        tableOnChange(pagination) {
            this.props.dispatch({ type: 'order/changeTable', pagination });
        }
        render() {
            var order = this.props.order;
            var self = this;
            return createElement(
                MainLayout,
                Object.assign({}, this.props, { title: '订单管理' }),
                createElement('div', {
                    className: 'd-flex justify-content-between align-items-center',
                }),
                createElement(
                    LoadingContainer,
                    { loading: order.fetchLoading },
                    createElement(
                        'div',
                        { className: 'block block-rounded' },
                        createElement(
                            'div',
                            { className: 'bg-white' },
                            createElement(
                                'div',
                                { style: { padding: 15 } },
                                createElement(
                                    ButtonGroup,
                                    null,
                                    createElement(
                                        FilterDrawer,
                                        {
                                            value: order.filter,
                                            onOk: (filter) =>
                                                self.props.dispatch({
                                                    type: 'order/filter',
                                                    filter,
                                                }),
                                        },
                                        createElement(
                                            Button,
                                            { type: order.filter.length > 0 ? 'primary' : '' },
                                            createElement(Icon, { type: 'filter' }),
                                            ' 过滤器',
                                        ),
                                    ),
                                ),
                                createElement(
                                    AssignOrderEditor,
                                    null,
                                    createElement(
                                        Button,
                                        { style: { marginLeft: 10 } },
                                        createElement(Icon, { type: 'plus' }),
                                        ' 添加订单',
                                    ),
                                ),
                            ),
                        ),
                    ),
                ),
            );
        }
    }
    return OrderPage;
};
