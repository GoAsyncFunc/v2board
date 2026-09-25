import React from 'react';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import DashboardAlerts from '../../components/dashboard/DashboardAlerts';
import DashboardNoticeSection from '../../components/dashboard/DashboardNoticeSection';
import DashboardShortcuts from '../../components/dashboard/DashboardShortcuts';
import DashboardSubscription from '../../components/dashboard/DashboardSubscription';
import MainLayout from '../../layouts/MainLayout';
import history from '../../app/history';
import { formatMessage } from '../../locales/i18n';
import {
    hasSubscriptionUsage,
    subscribePercent,
} from '../../components/subscription/SubscribeUsage';
import type { UserNotice } from '../../types/subscriptionContracts';
import type { UserDispatch, UserRootState } from '../../types/storeContracts';

type DashboardStateProps = Pick<UserRootState, 'user' | 'notice' | 'order' | 'comm' | 'knowledge'>;
interface DashboardState {
    visible: boolean;
    notice?: Partial<UserNotice>;
}

const NEW_PERIOD_CONFIRMATION_MESSAGE = [
    '点击「确定」将会扣除当前流量周期剩余订阅时长（按月重置时扣除本周期剩余订阅时长，',
    '每月1号重置时扣除整月时间30天，年周期同理），',
    '系统将会重置您的已使用流量。',
].join('');

export class DashboardPage extends React.Component<
    DashboardStateProps & { dispatch: UserDispatch },
    DashboardState
> {
    state: DashboardState = { visible: false, notice: undefined };

    componentDidMount() {
        this.props.dispatch({ type: 'user/getSubscribe' });
        this.props.dispatch({ type: 'user/getStat' });
        this.props.dispatch({
            type: 'notice/fetch',
            complete: () => {
                const popupNotice = (this.props.notice?.notices || []).find((notice) =>
                    notice.tags.includes('弹窗'),
                );
                if (popupNotice) this.modalVisible(popupNotice);
            },
        });
        this.props.dispatch({ type: 'comm/config' });
    }

    modalVisible(notice?: UserNotice) {
        this.setState((state) => ({ visible: !state.visible, notice: notice || {} }));
    }

    resetPackage() {
        const { subscribe } = this.props.user;
        Modal.confirm({
            maskClosable: true,
            title: formatMessage({ id: '确定重置当前已用流量？' }),
            content: formatMessage({
                id: '点击「确定」将会跳转到收银台，支付订单后系统将会清空您当月已使用流量。',
            }),
            onOk: () =>
                this.props.dispatch({
                    type: 'order/save',
                    params: { period: 'reset_price', plan_id: subscribe.plan_id },
                }),
            okText: this.props.order.saveLoading ? (
                <Icon type="loading" />
            ) : (
                formatMessage({ id: '确定' })
            ),
            cancelText: formatMessage({ id: '取消' }),
            okButtonProps: { disabled: this.props.order.saveLoading },
        });
    }

    newPeriod() {
        Modal.confirm({
            maskClosable: true,
            title: formatMessage({ id: '确定开启下一个流量周期？' }),
            content: formatMessage({
                id: NEW_PERIOD_CONFIRMATION_MESSAGE,
            }),
            onOk: () =>
                this.props.dispatch({
                    type: 'user/newPeriod',
                    complete: () => message.success(formatMessage({ id: '提前开启流量周期成功' })),
                }),
            okText: formatMessage({ id: '确定' }),
            cancelText: formatMessage({ id: '取消' }),
        });
    }

    render() {
        const { subscribe } = this.props.user;
        const notices = this.props.notice.notices;
        const usagePercent = hasSubscriptionUsage(subscribe) ? subscribePercent(subscribe) : 0;
        return (
            <MainLayout {...this.props} title={formatMessage({ id: '仪表盘' })}>
                <main id="main-container">
                    <div className="content content-full">
                        <DashboardAlerts
                            stat={this.props.user.stat}
                            subscribe={subscribe}
                            usagePercent={usagePercent}
                            onNavigate={(path) => history.push(path)}
                            onResetPackage={() => this.resetPackage()}
                        />
                        <DashboardNoticeSection
                            notices={notices}
                            onOpen={(selectedNotice) => this.modalVisible(selectedNotice)}
                        />
                        <div className="row mb-3 mb-md-0">
                            <div className="col-xl-12">
                                <div className="block block-rounded js-appear-enabled">
                                    <div className="block-header block-header-default">
                                        <h3 className="block-title">
                                            {formatMessage({ id: '我的订阅' })}
                                        </h3>
                                    </div>
                                    <div className="block-content">
                                        <DashboardSubscription
                                            subscribe={subscribe}
                                            usagePercent={usagePercent}
                                            onNavigate={(path) => history.push(path)}
                                            onNewPeriod={() => this.newPeriod()}
                                            onResetPackage={() => this.resetPackage()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3 mb-md-0">
                            <div className="col-xl-12">
                                <div className="block block-rounded js-appear-enabled">
                                    <div className="block-header block-header-default">
                                        <h3 className="block-title">
                                            {formatMessage({ id: '捷径' })}
                                        </h3>
                                    </div>
                                    <div className="block-content p-0">
                                        <div className="justify-content-md-between align-items-md-center">
                                            <DashboardShortcuts
                                                subscribe={subscribe}
                                                onNavigate={(path) => history.push(path)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {this.state.notice && (
                    <Modal
                        title={this.state.notice.title}
                        visible={this.state.visible}
                        maskClosable
                        footer={false}
                        onCancel={() => this.modalVisible()}
                    >
                        {this.state.notice.content && (
                            <div
                                className="notice-content"
                                dangerouslySetInnerHTML={{ __html: this.state.notice.content }}
                            />
                        )}
                    </Modal>
                )}
            </MainLayout>
        );
    }
}

export default connect((state: UserRootState) => ({
    notice: state.notice,
    user: state.user,
    comm: state.comm,
    knowledge: state.knowledge,
    order: state.order,
}))(DashboardPage);
