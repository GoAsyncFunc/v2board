import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import { Button } from '../vendor/ui.js';
import { Carousel } from '../vendor/ui.js';
import { Icon } from '../vendor/Icon.js';
import { Modal } from '../vendor/Modal.js';
import { SubscribeImporter } from '../vendor/features.js';
import { LoadingIndicator } from '../vendor/ui.js';
import MainLayout from '../layouts/MainLayout.jsx';
import history from '../vendor/routerHistory.js';
import { formatBytes, calculateUsage, isExpired, canRenew } from '../vendor/siteHelpers.js';
import { formatMessage } from '../vendor/i18n.js';
import { formatDate, formatDateDash, formatDaysRemaining } from '../components/DateTimeDisplay.jsx';
import { subscribePercent, progressBarColor, formatDeviceLimit } from '../components/SubscribeUsage.jsx';

import '../vendor/iconStyles.js';

export class DashboardPage extends React.Component {
  state = { visible: false, notice: undefined };

  componentDidMount() {
    this.props.dispatch({ type: 'user/getSubscribe' });
    this.props.dispatch({ type: 'user/getStat' });
    this.props.dispatch({
      type: 'notice/fetch',
      complete: () => {
        const popupNotice = (this.props.notice?.notices || []).find(notice => notice.tags.includes('弹窗'));
        if (popupNotice) this.modalVisible(popupNotice);
      },
    });
    this.props.dispatch({ type: 'comm/config' });
  }

  modalVisible(notice) {
    this.setState(state => ({ visible: !state.visible, notice: notice || {} }));
  }

  renderNotice(notice) {
    const background = notice.img_url ? { backgroundImage: `url(${notice.img_url})`, backgroundSize: 'cover' } : {};
    return (
      <a className="block block-rounded bg-image mb-0 v2board-bg-pixels" style={background} href="javascript:void(0)" onClick={() => this.modalVisible(notice)}>
        <div className="block-content bg-black-50">
          <div className="mb-5 mb-sm-7 d-sm-flex justify-content-sm-between align-items-sm-center">
            <p><span className="badge badge-danger p-2 text-uppercase">{formatMessage({ id: '公告' })}</span></p>
          </div>
          <p className="font-size-lg text-white mb-1">{notice.title}</p>
          <p className="font-w600 text-white-75">{formatDateDash(notice.created_at)}</p>
        </div>
      </a>
    );
  }

  resetPackage() {
    const { subscribe } = this.props.user;
    Modal.confirm({
      maskClosable: true,
      title: formatMessage({ id: '确定重置当前已用流量？' }),
      content: formatMessage({ id: '点击「确定」将会跳转到收银台，支付订单后系统将会清空您当月已使用流量。' }),
      onOk: () => this.props.dispatch({ type: 'order/save', params: { period: 'reset_price', plan_id: subscribe.plan_id } }),
      okText: this.props.order.saveLoading ? <Icon type="loading" /> : formatMessage({ id: '确定' }),
      cancelText: formatMessage({ id: '取消' }),
      okButtonProps: { disabled: this.props.order.saveLoading },
    });
  }

  newPeriod() {
    Modal.confirm({
      maskClosable: true,
      title: formatMessage({ id: '确定开启下一个流量周期？' }),
      content: formatMessage({ id: '点击「确定」将会扣除当前流量周期剩余订阅时长（按月重置时扣除本周期剩余订阅时长，每月1号重置时扣除整月时间30天，年周期同理），系统将会重置您的已使用流量。' }),
      onOk: () => this.props.dispatch({ type: 'user/newPeriod' }),
      okText: formatMessage({ id: '确定' }),
      cancelText: formatMessage({ id: '取消' }),
    });
  }

  renderAlerts(subscribe, usagePercent) {
    const { stat } = this.props.user;
    const alerts = [];
    if (stat[0]) {
      alerts.push(<div key="order" className="alert alert-danger" role="alert"><p className="mb-0">{formatMessage({ id: '还有没支付的订单' })}{' '}<a className="alert-link" href="javascript:void(0)" onClick={() => history.push('/order')}>{formatMessage({ id: '立即支付' })}</a></p></div>);
    }
    if (stat[1]) {
      alerts.push(<div key="ticket" className="alert alert-warning" role="alert"><p className="mb-0"><strong>{stat[1]}</strong>{' '}{formatMessage({ id: '条工单正在处理中' })}{' '}<a className="alert-link" href="javascript:void(0)" onClick={() => history.push('/ticket')}>{formatMessage({ id: '立即查看' })}</a></p></div>);
    }
    if (usagePercent >= 80 && usagePercent < 100 && !isExpired(subscribe.expired_at)) {
      alerts.push(<div key="traffic" className="alert alert-info" role="alert"><p className="mb-0">{formatMessage({ id: '当前已使用流量达{rate}%' }, { rate: usagePercent })}{' '}{subscribe.plan?.reset_price && <a onClick={() => this.resetPackage()}><strong>购买流量重置包</strong></a>}</p></div>);
    }
    return alerts;
  }

  renderSubscription(subscribe, usagePercent) {
    if (!subscribe.email) return <LoadingIndicator className="font-size-h3 mb-3" />;
    if (!subscribe.plan_id) {
      return <a onClick={() => history.push('/plan')}><div className="text-center"><div><i className="fa fa-plus fa-2x" /></div><div className="font-size-sm text-uppercase text-muted pt-2 pb-3">{formatMessage({ id: '购买订阅' })}</div></div></a>;
    }
    const expired = isExpired(subscribe.expired_at);
    const renewalPath = canRenew(subscribe) ? `/plan/${subscribe.plan_id}` : '/plan';
    return (
      <div>
        <h3 className="h4 mb-3">{subscribe.plan.name}</h3>
        {subscribe.expired_at === null ? (
          <p className="font-size-sm text-muted">{formatMessage({ id: '该订阅长期有效' })}</p>
        ) : (
          <p className="font-size-sm text-muted">
            {expired ? <a className="font-w600 text-danger" href="javascript:void(0);">{formatMessage({ id: '已过期' })}</a> : (
              <span>
                {formatMessage({ id: '于 {date} 到期，距离到期还有 {day} 天。' }, { date: formatDate(subscribe.expired_at), day: formatDaysRemaining(subscribe.expired_at) })}
                {subscribe.reset_day !== null ? (subscribe.reset_day !== 0 ? formatMessage({ id: '已用流量将在 {reset_day} 日后重置' }, { reset_day: subscribe.reset_day }) : formatMessage({ id: '已用流量已在今日重置' })) : ''}
              </span>
            )}
          </p>
        )}
        <div className="mb-0">
          <div className="progress mb-1" style={{ height: 6 }}><div className={`progress-bar progress-bar-striped progress-bar-animated bg-${progressBarColor(usagePercent)}`} role="progressbar" style={{ width: `${calculateUsage(subscribe.u + subscribe.d, subscribe.transfer_enable)}%` }} /></div>
          <p className="font-size-sm font-w600 mb-3">
            <span className="font-w700">{formatMessage({ id: '已用 {used} / 总计 {total}' }, { used: formatBytes(subscribe.u + subscribe.d), total: formatBytes(subscribe.transfer_enable) })}</span>{'  '}
            <span className="font-w700">{formatMessage({ id: '在线设备 {alive_ip}/{device_limit}' }, { alive_ip: subscribe.alive_ip, device_limit: formatDeviceLimit(subscribe.device_limit) })}</span>
          </p>
        </div>
        {usagePercent >= 80 && !expired && subscribe.plan?.reset_price && <div className="mb-4"><Button type="primary" onClick={() => this.resetPackage()}>{formatMessage({ id: '购买流量重置包' })}</Button></div>}
        {subscribe.allow_new_period && usagePercent >= 100 && !expired && <div className="mb-4"><Button type="primary" onClick={() => this.newPeriod()}>{formatMessage({ id: '提前开启流量周期' })}</Button></div>}
        {expired && <div className="mb-4"><Button type="primary" onClick={() => history.push(renewalPath)}>{formatMessage({ id: canRenew(subscribe) ? '续费订阅' : '购买订阅' })}</Button></div>}
      </div>
    );
  }

  renderShortcuts(subscribe) {
    const renewal = canRenew(subscribe);
    return (
      <div className="mb-3">
        <div className="v2board-shortcuts-item" onClick={() => history.push('/knowledge')}><div>{formatMessage({ id: '查看教程' })}</div><div className="description">{formatMessage({ id: '学习如何使用' })}{' '}{window?.settings?.title}</div><i style={{ float: 'right' }} className="nav-main-link-icon si si-book-open" /></div>
        <SubscribeImporter subscribeUrl={subscribe.subscribe_url}><div className="v2board-shortcuts-item"><div>{formatMessage({ id: '一键订阅' })}</div><div className="description">{formatMessage({ id: '快速将节点导入对应客户端进行使用' })}</div><i style={{ float: 'right' }} className="nav-main-link-icon si si-feed" /></div></SubscribeImporter>
        <div className="v2board-shortcuts-item" onClick={() => history.push(renewal ? `/plan/${subscribe.plan_id}` : '/plan')}><div>{formatMessage({ id: renewal ? '续费订阅' : '购买订阅' })}</div><div className="description">{formatMessage({ id: renewal ? '对您当前的订阅进行续费' : '对您当前的订阅进行购买' })}</div><i style={{ float: 'right' }} className={`nav-main-link-icon si si-${renewal ? 'clock' : 'bag'}`} /></div>
        <div className="v2board-shortcuts-item" onClick={() => history.push('/ticket')}><div>{formatMessage({ id: '遇到问题' })}</div><div className="description">{formatMessage({ id: '遇到问题可以通过工单与我们沟通' })}</div><i style={{ float: 'right' }} className="nav-main-link-icon si si-support" /></div>
      </div>
    );
  }

  render() {
    const { subscribe } = this.props.user;
    const notices = this.props.notice.notices;
    const usagePercent = subscribePercent(subscribe);
    return (
      <MainLayout {...this.props} title={formatMessage({ id: '仪表盘' })}>
        <main id="main-container"><div className="content content-full">
          {this.renderAlerts(subscribe, usagePercent)}
          {notices.length > 0 && <div className="row mb-3 mb-md-0"><div className="col-12 mb-sm-4">{notices.length > 1 ? <Carousel autoplay>{notices.map(notice => <div key={notice.id || notice.created_at}>{this.renderNotice(notice)}</div>)}</Carousel> : this.renderNotice(notices[0])}</div></div>}
          <div className="row mb-3 mb-md-0"><div className="col-xl-12"><div className="block block-rounded js-appear-enabled"><div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '我的订阅' })}</h3></div><div className="block-content">{this.renderSubscription(subscribe, usagePercent)}</div></div></div></div>
          <div className="row mb-3 mb-md-0"><div className="col-xl-12"><div className="block block-rounded js-appear-enabled"><div className="block-header block-header-default"><h3 className="block-title">{formatMessage({ id: '捷径' })}</h3></div><div className="block-content p-0"><div className="justify-content-md-between align-items-md-center">{this.renderShortcuts(subscribe)}</div></div></div></div></div>
        </div></main>
        {this.state.notice && <Modal title={this.state.notice.title} visible={this.state.visible} maskClosable footer={false} onCancel={() => this.modalVisible()}>{this.state.notice.content && <div className="notice-content" dangerouslySetInnerHTML={{ __html: this.state.notice.content }} />}</Modal>}
      </MainLayout>
    );
  }
}

export default connect(state => ({ notice: state.notice, user: state.user, comm: state.comm, knowledge: state.knowledge, order: state.order }))(DashboardPage);
