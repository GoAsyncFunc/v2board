import React from 'react';
import { connect } from 'react-redux';
import message from 'antd/lib/message';
import copy from 'copy-to-clipboard';
import InviteCodeManager from '@/components/account/invite/InviteCodeManager';
import InviteCommissionHistory from '@/components/account/invite/InviteCommissionHistory';
import InviteCommissionWallet from '@/components/account/invite/InviteCommissionWallet';
import InviteStatistics from '@/components/account/invite/InviteStatistics';
import MainLayout from '@/layouts/MainLayout';
import { formatMessage } from '@/locales/i18n';
import type { InviteConfig, InviteState } from '@/types/invitationContracts';
import type { UserDispatch, UserRootState } from '@/types/storeContracts';

interface InviteStateProps {
    invite: InviteState;
    comm: { config: InviteConfig };
    user: { userInfo: { commission_balance?: number } };
}

export class InvitePage extends React.Component<InviteStateProps & { dispatch: UserDispatch }> {
    componentDidMount() {
        this.props.dispatch({ type: 'user/getUserInfo' });
        this.getCommissionDetails();
        this.fetchData();
        this.props.dispatch({ type: 'comm/config' });
    }

    getCommissionDetails() {
        this.props.dispatch({ type: 'invite/details' });
    }

    fetchData() {
        this.props.dispatch({ type: 'invite/fetch' });
    }

    save() {
        this.props.dispatch({
            type: 'invite/save',
            complete: () => message.success(formatMessage({ id: '已生成' })),
        });
    }

    copyInviteLink(code: string) {
        copy(`${window.location.origin}${window.location.pathname}#/register?code=${code}`);
        message.success(formatMessage({ id: '复制成功' }));
    }

    render() {
        const {
            stat,
            codes,
            invites,
            detailsLoading,
            fetchLoading,
            saveLoading,
            detailsPagination,
        } = this.props.invite;
        const { config } = this.props.comm;
        const { userInfo } = this.props.user;
        const blockClassName = `block block-rounded js-appear-enabled ${fetchLoading ? 'block-mode-loading' : ''}`;

        return (
            <MainLayout {...this.props} title={formatMessage({ id: '我的邀请' })}>
                <main id="main-container">
                    <div className="content content-full">
                        <InviteCommissionWallet
                            blockClassName={blockClassName}
                            commissionBalance={userInfo.commission_balance}
                            config={config}
                        />
                        <InviteStatistics
                            blockClassName={blockClassName}
                            config={config}
                            stat={stat}
                        />
                        <InviteCodeManager
                            blockClassName={blockClassName}
                            codes={codes}
                            saveLoading={saveLoading}
                            onCopyLink={(code) => this.copyInviteLink(code)}
                            onGenerate={() => this.save()}
                        />
                        <InviteCommissionHistory
                            blockClassName={blockClassName}
                            detailsLoading={detailsLoading}
                            pagination={detailsPagination}
                            records={invites}
                            onPageChange={(current, pageSize) =>
                                this.props.dispatch({ type: 'invite/details', current, pageSize })
                            }
                        />
                    </div>
                </main>
            </MainLayout>
        );
    }
}

export default connect((state: UserRootState) => ({
    invite: state.invite,
    comm: state.comm,
    user: state.user,
}))(InvitePage);
