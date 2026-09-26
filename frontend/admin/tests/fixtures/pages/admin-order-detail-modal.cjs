// Reconstructed from the original OrderDetailModal class in webpack module
// 70693341 (admin order page). The bundle's generator-based getOrderInfo is
// transcribed as async/await with the control flow, guard order, state keys
// (order/user/invite_user/visible) and toggle semantics kept unchanged.
module.exports = function makeOriginalOrderDetailModal(deps) {
    var Component = deps.Component;
    var Modal = deps.Modal;
    var Body = deps.Body;
    var post = deps.post;
    var get = deps.get;
    var history = deps.history;
    var createElement = deps.createElement;
    var settings = deps.window.settings;

    class OrderDetailModal extends Component {
        constructor(props) {
            super(props);
            this.state = { order: {}, user: {}, invite_user: {}, visible: false };
        }
        onShow() {
            this.setState({ visible: !this.state.visible });
        }
        getOrderInfo() {
            var self = this;
            self.onShow();
            return post('/' + settings.secure_path + '/order/detail', {
                id: self.props.orderId,
            }).then(function (orderResponse) {
                if (orderResponse.code !== 200) return;
                return get('/' + settings.secure_path + '/user/getUserInfoById', {
                    id: orderResponse.data.user_id,
                }).then(function (userResponse) {
                    if (userResponse.code !== 200) return;
                    if (!orderResponse.data.invite_user_id) {
                        self.setState({ order: orderResponse.data, user: userResponse.data });
                        return;
                    }
                    return get('/' + settings.secure_path + '/user/getUserInfoById', {
                        id: orderResponse.data.invite_user_id,
                    }).then(function (inviteResponse) {
                        if (inviteResponse.code !== 200) return;
                        self.setState({ invite_user: inviteResponse.data });
                        self.setState({ order: orderResponse.data, user: userResponse.data });
                    });
                });
            });
        }
        jumpUserFilter(key, condition, value) {
            this.props.dispatch({ type: 'user/addFilter', key, condition, value });
            history.push('/user');
        }
        render() {
            var plans = this.props.plan.plans;
            var self = this;
            return createElement(
                'div',
                null,
                createElement(
                    'div',
                    {
                        onClick: function () {
                            return self.getOrderInfo();
                        },
                    },
                    self.props.children,
                ),
                createElement(
                    Modal,
                    {
                        visible: self.state.visible,
                        title: '订单信息',
                        onCancel: function () {
                            return self.onShow();
                        },
                        footer: false,
                    },
                    createElement(Body, {
                        order: self.state.order,
                        user: self.state.user,
                        inviteUser: self.state.invite_user,
                        plans: plans,
                        onUserFilter: function () {
                            return self.jumpUserFilter.apply(self, arguments);
                        },
                    }),
                ),
            );
        }
    }
    return OrderDetailModal;
};
