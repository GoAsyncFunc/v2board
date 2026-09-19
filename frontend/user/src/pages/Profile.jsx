import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Switch } from '../vendor/ui.js';
import { Button } from '../vendor/ui.js';
import { Modal } from '../vendor/Modal.js';
import { message } from '../vendor/ui.js';
import TelegramBindModal from '../components/TelegramBindModal.jsx';
import MainLayout from '../layouts/MainLayout';
import { get } from '../services/request.js';
import { formatMessage } from '../vendor/i18n.js';
import { formatMoney } from '../components/MoneyDisplay.ts';

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.giftcardRef = React.createRef();
    this.oldPasswordRef = React.createRef();
    this.newPasswordRef = React.createRef();
    this.repeatPasswordRef = React.createRef();
  }

  componentDidMount() {
    this.refreshProfile();
    this.props.dispatch({ type: 'comm/config' });
  }

  refreshProfile() {
    this.props.dispatch({ type: 'user/getUserInfo' });
  }

  changePassword() {
    const oldPassword = this.oldPasswordRef.current.value;
    const newPassword = this.newPasswordRef.current.value;
    const repeatPassword = this.repeatPasswordRef.current.value;
    if (repeatPassword !== newPassword) {
      message.error(formatMessage({ id: '两次新密码输入不同' }));
      return;
    }
    this.props.dispatch({ type: 'user/changePassword', oldPassword, newPassword });
  }

  redeemGiftcard() {
    const giftcard = this.giftcardRef.current.value;
    if (!giftcard.length) {
      message.error(formatMessage({ id: '请输入礼品卡' }));
      return;
    }
    this.props.dispatch({ type: 'user/redeemgiftcard', giftcard });
  }

  update(key, value) {
    this.props.dispatch({ type: 'user/update', key, value });
  }

  resetSecurity() {
    Modal.confirm({
      title: formatMessage({ id: '确定要重置订阅信息？' }),
      content: formatMessage({ id: '如果你的订阅地址或信息泄露可以进行此操作。重置后你的UUID及订阅将会变更，需要重新进行订阅。' }),
      onOk: async () => {
        const response = await get('/user/resetSecurity');
        if (response.code !== 200) return;
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
      content: formatMessage({ id: '如果你的Telegram ID已失效可以进行此操作。重置后你需要重新进行绑定。' }),
      onOk: async () => {
        const response = await get('/user/unbindTelegram');
        if (response.code !== 200) return;
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
          placeholder={formatMessage({ id: `请输入充值金额${this.props.comm.config.currency}` })}
          onChange={event => { this.depositAmount = event.target.value * 100; }}
          autoComplete="one-time-code"
        />
      ),
      onOk: () => this.props.dispatch({
        type: 'order/save',
        params: { period: 'deposit', deposit_amount: this.depositAmount, plan_id: 0 },
      }),
      okText: formatMessage({ id: '确认' }),
      cancelText: formatMessage({ id: '取消' }),
    });
  }

  renderWallet(userInfo, userState, config) {
    return (
      <div className="row mb-3 mb-md-0">
        <div className="col-lg-12">
          <div className="block">
            <div className="block-content pb-3">
              <i className="fa fa-wallet fa-2x text-gray-light float-right" />
              <div className="pb-sm-3">
                <p className="text-muted w-75">{formatMessage({ id: '我的钱包(仅消费)' })}</p>
                <p className="display-4 text-black font-w300 mb-2">
                  {formatMoney(userInfo.balance)}
                  <span className="font-size-h5 text-muted ml-4">{config.currency}</span>
                </p>
                <span className="text-muted" style={{ cursor: 'pointer' }}>
                  {formatMessage({ id: '自动续费' })}{' '}
                  <Switch
                    loading={userState.auto_renewal_loading}
                    checked={userInfo.auto_renewal}
                    onChange={enabled => this.update('auto_renewal', enabled ? 1 : 0)}
                  />
                </span>
                <div className="pt-3"><Button type="primary" onClick={() => this.deposit()}>{formatMessage({ id: '充值' })}</Button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderGiftcard(userState) {
    return (
      <div className="row mb-3 mb-md-0">
        <div className="col-md-12">
          <div className="block block-rounded">
            <div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '礼品卡' })}</h3></div>
            <div className="block-content">
              <div className="row push"><div className="col-lg-8 col-xl-5">
                <div className="form-group">
                  <input ref={this.giftcardRef} className="form-control" placeholder={formatMessage({ id: '请输入礼品卡' })} autoComplete="one-time-code" />
                </div>
                <Button type="primary" onClick={() => this.redeemGiftcard()} loading={userState.redeemgiftcardLoading}>{formatMessage({ id: '兑换' })}</Button>
              </div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPassword(userState) {
    return (
      <div className="row mb-3 mb-md-0">
        <div className="col-md-12"><div className="block block-rounded">
          <div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '修改密码' })}</h3></div>
          <div className="block-content"><div className="row push"><div className="col-lg-8 col-xl-5">
            <div className="form-group"><label>{formatMessage({ id: '旧密码' })}</label><input ref={this.oldPasswordRef} type="password" className="form-control" placeholder={formatMessage({ id: '请输入旧密码' })} /></div>
            <div className="form-group"><label>{formatMessage({ id: '新密码' })}</label><input ref={this.newPasswordRef} type="password" className="form-control" placeholder={formatMessage({ id: '请输入新密码' })} /></div>
            <div className="form-group"><label>{formatMessage({ id: '新密码' })}</label><input ref={this.repeatPasswordRef} type="password" className="form-control" placeholder={formatMessage({ id: '请输入新密码' })} /></div>
            <Button type="primary" onClick={() => this.changePassword()} loading={userState.changePasswordLoading}>{formatMessage({ id: '保存' })}</Button>
          </div></div></div>
        </div></div>
      </div>
    );
  }

  renderNotifications(userInfo, userState) {
    return (
      <div className="row mb-3 mb-md-0"><div className="col-md-12"><div className="block block-rounded">
        <div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '通知' })}</h3></div>
        <div className="block-content"><div className="row"><div className="col-lg-8 col-xl-5">
          <div className="form-group"><label>{formatMessage({ id: '到期邮件提醒' })}</label><div><Switch loading={userState.remind_expire_loading} checked={userInfo.remind_expire} onChange={enabled => this.update('remind_expire', enabled ? 1 : 0)} /></div></div>
          <div className="form-group"><label>{formatMessage({ id: '流量邮件提醒' })}</label><div><Switch loading={userState.remind_traffic_loading} checked={userInfo.remind_traffic} onChange={enabled => this.update('remind_traffic', enabled ? 1 : 0)} /></div></div>
        </div></div></div>
      </div></div></div>
    );
  }

  renderTelegram(userInfo, config) {
    if (!config.is_telegram) return null;
    return userInfo.telegram_id ? (
      <div className="block block-rounded unbind_telegram">
        <div className="block-header block-header-default">
          <h3 className="block-title">{formatMessage({ id: '绑定Telegram' })}</h3>
          <div className="block-options"><Button type="danger" onClick={() => this.unbindTelegram()}>{formatMessage({ id: '解除绑定' })}</Button></div>
        </div>
        <div className="block-options">{formatMessage({ id: `Telegram ID: ${String(userInfo.telegram_id)}` })}</div>
      </div>
    ) : (
      <div className="block block-rounded bind_telegram">
        <div className="block-header block-header-default">
          <h3 className="block-title">{formatMessage({ id: '绑定Telegram' })}</h3>
          <div className="block-options"><TelegramBindModal><button type="button" className="btn btn-primary btn-sm btn-primary btn-rounded px-3">{formatMessage({ id: '立即开始' })}</button></TelegramBindModal></div>
        </div>
      </div>
    );
  }

  render() {
    const userState = this.props.user;
    const { userInfo } = userState;
    const { config } = this.props.comm;
    return (
      <MainLayout {...this.props} title={formatMessage({ id: '个人中心' })}>
        <main id="main-container"><div className="content content-full">
          {this.renderWallet(userInfo, userState, config)}
          {this.renderGiftcard(userState)}
          {this.renderPassword(userState)}
          {this.renderNotifications(userInfo, userState)}
          <div className="row mb-3 mb-md-0"><div className="col-md-12">
            {this.renderTelegram(userInfo, config)}
            {config.telegram_discuss_link && (
              <div className="block block-rounded join_telegram_disscuss"><div className="block-header block-header-default">
                <h3 className="block-title">{formatMessage({ id: 'Telegram 讨论组' })}</h3>
                <div className="block-options"><a href={config.telegram_discuss_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm btn-primary btn-rounded px-3">{formatMessage({ id: '立即加入' })}</a></div>
              </div></div>
            )}
            <div className="block block-rounded">
              <div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '重置订阅信息' })}</h3></div>
              <div className="block-content"><div className="row push"><div className="col-md-12">
                <div className="alert alert-warning mb-3" role="alert">{formatMessage({ id: '重置订阅提示信息' })}</div>
                <Button type="danger" onClick={() => this.resetSecurity()}>{formatMessage({ id: '重置' })}</Button>
              </div></div></div>
            </div>
          </div></div>
        </div></main>
      </MainLayout>
    );
  }
}

export default connect(state => ({ user: state.user, comm: state.comm }))(ProfilePage);
