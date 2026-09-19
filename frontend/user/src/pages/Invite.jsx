import React from 'react';
import { createInviteCodeDateColumn, createReadonlyCommissionColumns } from '../components/InviteDisplayColumns.jsx';
import { formatMoney } from '../components/MoneyDisplay.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import { c as connect } from '../vendor/reactRedux.js';
import { Table } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Tooltip } from '../vendor/ui.js';
import { a as Icon } from '../vendor/Icon.js';
import { message } from '../vendor/ui.js';
import copy from '../vendor/clipboard.js';
import { formatMessage } from '../vendor/i18n.js';
import TransferModal from '../components/TransferCommissionModal.jsx';
import WithdrawModal from '../components/WithdrawModal.jsx';
import { objectSpread } from '../vendor/utilities.js';

import '../vendor/iconStyles.js';

import '../vendor/localeSettings.js';
import '../vendor/dateTime.js';
import '../vendor/features.js';

import '../vendor/componentStyles.js';
class InvitePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "user/getUserInfo"
    }), this.getCommissionDetails(), this.fetchData(), this.props.dispatch({
      type: "comm/config"
    });
  }
  getCommissionDetails() {
    this.props.dispatch({
      type: "invite/details"
    });
  }
  fetchData() {
    this.props.dispatch({
      type: "invite/fetch"
    });
  }
  save() {
    this.props.dispatch({
      type: "invite/save"
    });
  }
  render() {
    var inviteState = this.props.invite,
      stats = inviteStatinviteState.stat,
      inviteCodes = inviteStatinviteCodes,
      commissionRecords = inviteStatcommissionRecords,
      detailsLoading = inviteState.detailsLoading,
      fetchLoading = inviteState.fetchLoading,
      saveLoading = inviteState.saveLoading,
      detailsPagination = inviteState.detailsPagination,
      config = this.props.comm.config,
      userInfo = this.props.user.userInfo,
      inviteCodeColumns = [{
        title: formatMessage({
          id: "邀请码"
        }),
        dataIndex: "code",
        key: "code",
        render: e => {
          return React.createElement(React.Fragment, null, <span>{e}</span>, <a style={{
            marginLeft: 5
          }} href={"javascript:void(0);"} onClick={() => {
            copy()(window.location.origin + window.location.pathname + "#/register?code=" + e), message.success(formatMessage({
              id: "复制成功"
            }));
          }}>
                                {formatMessage({
              id: "复制链接"
            })}
                            </a>);
        }
      }, createInviteCodeDateColumn()],
      commissionColumns = createReadonlyCommissionColumns();
    return React.createElement(MainLayout, o()({}, this.props, {
      title: formatMessage({
        id: "我的邀请"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(fetchLoading ? "block-mode-loading" : "")}>
                                <div className={"block-content pb-3"}>
                                    <i className={"fa fa-user-plus fa-2x text-gray-light float-right"}></i>
                                    <div className={"pb-sm-3"}>
                                        <p className={"text-muted w-75"}>
                                            {formatMessage({
                      id: "我的邀请"
                    })}
                                        </p>
                                        <p className={"display-4 text-black font-w300 mb-2"}>
                                            {formatMoney(userInfo.commission_balance)}
                                            <span className={"font-size-h5 text-muted ml-4"}>
                                                {config.currency}
                                            </span>
                                        </p>
                                        <span className={"text-muted"} style={{
                    cursor: "pointer"
                  }}>
                                            {formatMessage({
                      id: "当前剩余佣金"
                    })}
                                        </span>
                                        <div className={"pt-3"}>
                                            {React.createElement(TransferModal, null, React.createElement(Button, {
                      type: "primary mr-2"
                    }, React.createElement(Icon, {
                      type: "transaction"
                    }), " ", formatMessage({
                      id: "划转"
                    })))}
                                            {!config.withdraw_close && React.createElement(WithdrawModal, null, React.createElement(Button, null, React.createElement(Icon, {
                      type: "pay-circle"
                    }), " ", formatMessage({
                      id: "推广佣金提现"
                    })))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(fetchLoading ? "block-mode-loading" : "")}>
                                <div className={"block-content pb-3"}>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {formatMessage({
                      id: "已注册用户数"
                    })}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {void 0 !== stats[0] ? stats[0] : React.createElement(Icon, {
                      type: "loading"
                    })}
                                            {"人"}
                                        </div>
                                    </div>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {config.commission_distribution_enable ? React.createElement(React.Fragment, null, formatMessage({
                      id: "三级分销比例"
                    }), " ", React.createElement(Tooltip, {
                      placement: "top",
                      title: formatMessage({
                        id: "您邀请的用户再次邀请用户将按照订单金额乘以分销等级的比例进行分成。"
                      })
                    }, React.createElement(Icon, {
                      type: "question-circle"
                    }))) : formatMessage({
                      id: "佣金比例"
                    })}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {config.commission_distribution_enable ? "".concat(config.commission_distribution_l1 * (stats[3] / 100), "%,").concat(config.commission_distribution_l2 * (stats[3] / 100), "%,").concat(config.commission_distribution_l3 * (stats[3] / 100), "%") : void 0 !== stats[3] ? stats[3] + "%" : React.createElement(Icon, {
                      type: "loading"
                    })}
                                        </div>
                                    </div>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {formatMessage({
                      id: "确认中的佣金"
                    })}{" "}
                                            {React.createElement(Tooltip, {
                      placement: "top",
                      title: formatMessage({
                        id: "佣金将会在确认后会到达你的佣金账户。"
                      })
                    }, React.createElement(Icon, {
                      type: "question-circle"
                    }))}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {void 0 !== stats[2] ? "".concat(config.currency_symbol, " ").concat(stats[2] / 100) : React.createElement(Icon, {
                      type: "loading"
                    })}
                                        </div>
                                    </div>
                                    <div style={{
                  display: "flex",
                  padding: "5px 0"
                }}>
                                        <div style={{
                    flex: 1
                  }}>
                                            {formatMessage({
                      id: "累计获得佣金"
                    })}
                                        </div>
                                        <div style={{
                    flex: 1,
                    textAlign: "right"
                  }}>
                                            {void 0 !== stats[1] ? "".concat(config.currency_symbol, " ").concat(stats[1] / 100) : React.createElement(Icon, {
                      type: "loading"
                    })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(fetchLoading ? "block-mode-loading" : "")}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {formatMessage({
                    id: "邀请码管理"
                  })}
                                    </h3>
                                    <div className={"block-options"}>
                                <button type={"button"} className={"btn btn-primary btn-sm btn-primary btn-rounded px-3"} onClick={() => saveLoading || this.save()}>
                                            {saveLoading ? React.createElement(Icon, {
                      type: "loading"
                    }) : formatMessage({
                      id: "生成邀请码"
                    })}
                                        </button>
                                    </div>
                                </div>
                                <div className={"block-content p-0"}>
                                    {React.createElement(Table, {
                  tableLayout: "auto",
                  columns: inviteCodeColumns,
                  dataSource: inviteCodes,
                  pagination: !1
                })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"row mb-3 mb-md-0"}>
                        <div className={"col-md-12"}>
                            <div className={"block block-rounded js-appear-enabled ".concat(fetchLoading ? "block-mode-loading" : "")}>
                                <div className={"block-header block-header-default"}>
                                    <h3 className={"block-title"}>
                                        {formatMessage({
                    id: "佣金发放记录"
                  })}
                                    </h3>
                                </div>
                                <div className={"block-content p-0"}>
                                    {React.createElement(Table, {
                  tableLayout: "auto",
                  columns: commissionColumns,
                  dataSource: commissionRecords,
                  loading: detailsLoading,
                  pagination: objectSpread({}, detailsPagination, {
                    pageSize: detailsPagination.page_size,
                    size: "small",
                    showSizeChanger: !0,
                    pageSizeOptions: [10, 50, 100, 150]
                  }),
                  onChange: (e, t, n) => {
                    this.props.dispatch({
                      type: "invite/details",
                      current: e.current,
                      pageSize: e.pageSize
                    });
                  }
                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>);
  }
}
export default connect(state => ({ invite: state.invite, comm: state.comm, user: state.user }))(InvitePage);
