import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import ProfileGiftcard from '../../components/account/profile/ProfileGiftcard';
import ProfileNotificationSettings from '../../components/account/profile/ProfileNotificationSettings';
import ProfilePasswordForm from '../../components/account/profile/ProfilePasswordForm';
import ProfileSecurityReset from '../../components/account/profile/ProfileSecurityReset';
import ProfileTelegram, {
    ProfileTelegramCommunity,
} from '../../components/account/profile/ProfileTelegram';
import ProfileWallet from '../../components/account/profile/ProfileWallet';
import MainLayout from '../../layouts/MainLayout';
import { get } from '../../services/request';
import { isSuccessfulResponse } from '../../types/apiContracts';
import { formatMessage } from '../../locales/i18n';
import { describeGiftcardRedemption } from '../../utils/giftcard';
import type { GiftcardRedemptionResponse, UserSetting } from '../../types/userContracts';
import type { UserDispatch, UserRootState } from '../../types/storeContracts';

type ProfileStateProps = Pick<UserRootState, 'user' | 'comm'>;

function readInputValue(ref: React.RefObject<HTMLInputElement>, fieldName: string): string {
    if (!ref.current) throw new TypeError(`${fieldName} input was not mounted`);
    return ref.current.value;
}

export class ProfilePage extends React.Component<ProfileStateProps & { dispatch: UserDispatch }> {
    giftcardRef = React.createRef<HTMLInputElement>();
    oldPasswordRef = React.createRef<HTMLInputElement>();
    newPasswordRef = React.createRef<HTMLInputElement>();
    repeatPasswordRef = React.createRef<HTMLInputElement>();
    depositAmount?: number;

    componentDidMount() {
        this.refreshProfile();
        this.props.dispatch({ type: 'comm/config' });
    }

    refreshProfile() {
        this.props.dispatch({ type: 'user/getUserInfo' });
    }

    changePassword() {
        const oldPassword = readInputValue(this.oldPasswordRef, 'Old password');
        const newPassword = readInputValue(this.newPasswordRef, 'New password');
        const repeatPassword = readInputValue(this.repeatPasswordRef, 'Repeated password');
        if (repeatPassword !== newPassword) {
            message.error(formatMessage({ id: '两次新密码输入不同' }));
            return;
        }
        this.props.dispatch({
            type: 'user/changePassword',
            oldPassword,
            newPassword,
            complete: () => message.success(formatMessage({ id: '修改成功，请重新登陆' })),
        });
    }

    redeemGiftcard() {
        const giftcard = readInputValue(this.giftcardRef, 'Giftcard');
        if (!giftcard.length) {
            message.error(formatMessage({ id: '请输入礼品卡' }));
            return;
        }
        this.props.dispatch({
            type: 'user/redeemgiftcard',
            giftcard,
            complete: (redemption: GiftcardRedemptionResponse) =>
                message.success(
                    `${formatMessage({ id: '兑换成功' })}: ${describeGiftcardRedemption(redemption)}`,
                ),
        });
    }

    update(key: UserSetting, value: 0 | 1) {
        this.props.dispatch({ type: 'user/update', key, value });
    }

    resetSecurity() {
        Modal.confirm({
            title: formatMessage({ id: '确定要重置订阅信息？' }),
            content: formatMessage({
                id: '如果你的订阅地址或信息泄露可以进行此操作。重置后你的UUID及订阅将会变更，需要重新进行订阅。',
            }),
            onOk: async () => {
                const response = await get('/user/resetSecurity');
                if (!isSuccessfulResponse(response)) return;
                message.success(formatMessage({ id: '重置成功' }));
                this.props.dispatch({ type: 'user/getUserInfo' });
                this.props.dispatch({ type: 'user/getSubscribe' });
            },
            okText: formatMessage({ id: '确认' }),
            cancelText: formatMessage({ id: '取消' }),
        });
    }

    unbindTelegram() {
        Modal.confirm({
            title: formatMessage({ id: '确定要解除绑定Telegram？' }),
            content: formatMessage({
                id: '如果你的Telegram ID已失效可以进行此操作。重置后你需要重新进行绑定。',
            }),
            onOk: async () => {
                const response = await get('/user/unbindTelegram');
                if (!isSuccessfulResponse(response)) return;
                message.success(formatMessage({ id: '重置成功' }));
                this.props.dispatch({ type: 'user/getUserInfo' });
                this.props.dispatch({ type: 'user/getSubscribe' });
            },
            okText: formatMessage({ id: '确认' }),
            cancelText: formatMessage({ id: '取消' }),
        });
    }

    deposit() {
        Modal.confirm({
            title: (
                <input
                    className="form-control"
                    placeholder={formatMessage({
                        id: `请输入充值金额${this.props.comm.config.currency}`,
                    })}
                    onChange={(event) => {
                        this.depositAmount = Number(event.target.value) * 100;
                    }}
                    autoComplete="one-time-code"
                />
            ),
            onOk: () =>
                this.props.dispatch({
                    type: 'order/save',
                    params: { period: 'deposit', deposit_amount: this.depositAmount, plan_id: 0 },
                }),
            okText: formatMessage({ id: '确认' }),
            cancelText: formatMessage({ id: '取消' }),
        });
    }

    render() {
        const userState = this.props.user;
        const { userInfo } = userState;
        const { config } = this.props.comm;
        return (
            <MainLayout {...this.props} title={formatMessage({ id: '个人中心' })}>
                <main id="main-container">
                    <div className="content content-full">
                        <ProfileWallet
                            config={config}
                            userInfo={userInfo}
                            userState={userState}
                            onDeposit={() => this.deposit()}
                            onSettingChange={(key, value) => this.update(key, value)}
                        />
                        <ProfileGiftcard
                            giftcardRef={this.giftcardRef}
                            loading={userState.redeemgiftcardLoading}
                            onRedeem={() => this.redeemGiftcard()}
                        />
                        <ProfilePasswordForm
                            oldPasswordRef={this.oldPasswordRef}
                            newPasswordRef={this.newPasswordRef}
                            repeatPasswordRef={this.repeatPasswordRef}
                            loading={userState.changePasswordLoading}
                            onSubmit={() => this.changePassword()}
                        />
                        <ProfileNotificationSettings
                            userInfo={userInfo}
                            userState={userState}
                            onSettingChange={(key, value) => this.update(key, value)}
                        />
                        <div className="row mb-3 mb-md-0">
                            <div className="col-md-12">
                                <ProfileTelegram
                                    userInfo={userInfo}
                                    config={config}
                                    onUnbind={() => this.unbindTelegram()}
                                />
                                <ProfileTelegramCommunity config={config} />
                                <ProfileSecurityReset onReset={() => this.resetSecurity()} />
                            </div>
                        </div>
                    </div>
                </main>
            </MainLayout>
        );
    }
}

export default connect((state: UserRootState) => ({ user: state.user, comm: state.comm }))(
    ProfilePage,
);
