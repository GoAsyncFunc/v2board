import React from 'react';
import { createInviteCodeDateColumn, createReadonlyCommissionColumns } from '../components/InviteDisplayColumns';
import { formatMoney } from '../components/MoneyDisplay';
import MainLayout from '../layouts/MainLayout';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Table from 'antd/lib/table';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';
import copy from 'copy-to-clipboard';
import { formatMessage } from '../vendor/i18n.js';
import TransferModal from '../components/TransferCommissionModal';
import WithdrawModal from '../components/WithdrawModal';
import type { ColumnProps } from 'antd/lib/table';
import type { InviteCode, InviteConfig, InviteState } from '../types/invite';
import type { UserDispatch } from '../types/store';

import '../vendor/localeSettings.js';

const translate = (id: string): string => formatMessage({ id });

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
    this.props.dispatch({ type: 'invite/save' });
  }

  copyInviteLink(code: string) {
    copy(`${window.location.origin}${window.location.pathname}#/register?code=${code}`);
    message.success(translate('复制成功'));
  }

  render() {
    const {
      stat: stats,
      codes: inviteCodes,
      invites: commissionRecords,
      detailsLoading,
      fetchLoading,
      saveLoading,
      detailsPagination,
    } = this.props.invite;
    const [registeredUsers, totalCommission, pendingCommission, commissionRate] = stats;
    const { config } = this.props.comm;
    const { userInfo } = this.props.user;
    const blockClassName = `block block-rounded js-appear-enabled ${fetchLoading ? 'block-mode-loading' : ''}`;
    const inviteCodeColumns: ColumnProps<InviteCode>[] = [
      {
        title: translate('邀请码'),
        dataIndex: 'code',
        key: 'code',
        render: (code: string) => (
          <>
            <span>{code}</span>
            <a style={{ marginLeft: 5 }} href="javascript:void(0);" onClick={() => this.copyInviteLink(code)}>
              {translate('复制链接')}
            </a>
          </>
        ),
      },
      createInviteCodeDateColumn(),
    ];
    const commissionColumns = createReadonlyCommissionColumns();

    return (
      <MainLayout {...this.props} title={translate('我的邀请')}>
        <main id="main-container">
          <div className="content content-full">
            <div className="row mb-3 mb-md-0">
              <div className="col-md-12">
                <div className={blockClassName}>
                  <div className="block-content pb-3">
                    <i className="fa fa-user-plus fa-2x text-gray-light float-right" />
                    <div className="pb-sm-3">
                      <p className="text-muted w-75">{translate('我的邀请')}</p>
                      <p className="display-4 text-black font-w300 mb-2">
                        {formatMoney(userInfo.commission_balance)}
                        <span className="font-size-h5 text-muted ml-4">{config.currency}</span>
                      </p>
                      <span className="text-muted" style={{ cursor: 'pointer' }}>
                        {translate('当前剩余佣金')}
                      </span>
                      <div className="pt-3">
                        <TransferModal>
                          <Button type="primary" className="mr-2">
                            <Icon type="transaction" /> {translate('划转')}
                          </Button>
                        </TransferModal>
                        {!config.withdraw_close && (
                          <WithdrawModal>
                            <Button><Icon type="pay-circle" /> {translate('推广佣金提现')}</Button>
                          </WithdrawModal>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 mb-md-0">
              <div className="col-md-12">
                <div className={blockClassName}>
                  <div className="block-content pb-3">
                    <div style={{ display: 'flex', padding: '5px 0' }}>
                      <div style={{ flex: 1 }}>{translate('已注册用户数')}</div>
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        {registeredUsers !== undefined ? registeredUsers : <Icon type="loading" />}
                        {'人'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', padding: '5px 0' }}>
                      <div style={{ flex: 1 }}>
                        {config.commission_distribution_enable ? (
                          <>
                            {translate('三级分销比例')}{' '}
                            <Tooltip placement="top" title={translate('您邀请的用户再次邀请用户将按照订单金额乘以分销等级的比例进行分成。')}>
                              <Icon type="question-circle" />
                            </Tooltip>
                          </>
                        ) : translate('佣金比例')}
                      </div>
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        {config.commission_distribution_enable
                          ? `${Number(config.commission_distribution_l1) * (Number(commissionRate) / 100)}%,${Number(config.commission_distribution_l2) * (Number(commissionRate) / 100)}%,${Number(config.commission_distribution_l3) * (Number(commissionRate) / 100)}%`
                          : commissionRate !== undefined ? `${commissionRate}%` : <Icon type="loading" />}
                      </div>
                    </div>
                    <div style={{ display: 'flex', padding: '5px 0' }}>
                      <div style={{ flex: 1 }}>
                        {translate('确认中的佣金')}{' '}
                        <Tooltip title={translate('佣金将会在确认后会到达你的佣金账户。')}>
                          <Icon type="question-circle" />
                        </Tooltip>
                      </div>
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        {pendingCommission !== undefined
                          ? `${config.currency_symbol} ${pendingCommission / 100}`
                          : <Icon type="loading" />}
                      </div>
                    </div>
                    <div style={{ display: 'flex', padding: '5px 0' }}>
                      <div style={{ flex: 1 }}>{translate('累计获得佣金')}</div>
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        {totalCommission !== undefined
                          ? `${config.currency_symbol} ${totalCommission / 100}`
                          : <Icon type="loading" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 mb-md-0">
              <div className="col-md-12">
                <div className={blockClassName}>
                  <div className="block-header block-header-default">
                    <h3 className="block-title">{translate('邀请码管理')}</h3>
                    <div className="block-options">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
                        onClick={() => { if (!saveLoading) this.save(); }}
                      >
                        {saveLoading ? <Icon type="loading" /> : translate('生成邀请码')}
                      </button>
                    </div>
                  </div>
                  <div className="block-content p-0">
                    <Table tableLayout="auto" columns={inviteCodeColumns} dataSource={inviteCodes} pagination={false} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 mb-md-0">
              <div className="col-md-12">
                <div className={blockClassName}>
                  <div className="block-header block-header-default">
                    <h3 className="block-title">{translate('佣金发放记录')}</h3>
                  </div>
                  <div className="block-content p-0">
                    <Table
                      tableLayout="auto"
                      columns={commissionColumns}
                      dataSource={commissionRecords}
                      loading={detailsLoading}
                      pagination={{
                        ...detailsPagination,
                        pageSize: detailsPagination.page_size,
                        size: 'small',
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '50', '100', '150'],
                      }}
                      onChange={pagination => this.props.dispatch({
                        type: 'invite/details',
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    );
  }
}

export default connect((state: InviteStateProps) => ({ invite: state.invite, comm: state.comm, user: state.user }))(InvitePage);
