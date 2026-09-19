import React from 'react';
import { connect } from 'react-redux';
import Tabs from 'antd/lib/tabs';
import MainLayout from '../layouts/MainLayout';
import SiteConfigTab from '../components/config/SiteConfigTab';
import SafeConfigTab from '../components/config/SafeConfigTab';
import SubscribeConfigTab from '../components/config/SubscribeConfigTab';
import DepositConfigTab from '../components/config/DepositConfigTab';
import TicketConfigTab from '../components/config/TicketConfigTab';
import InviteConfigTab from '../components/config/InviteConfigTab';
import FrontendConfigTab from '../components/config/FrontendConfigTab';
import ServerConfigTab from '../components/config/ServerConfigTab';
import EmailConfigTab from '../components/config/EmailConfigTab';
import TelegramConfigTab from '../components/config/TelegramConfigTab';
import AppConfigTab from '../components/config/AppConfigTab';
import type { AdminDispatch } from '../types/store';
import type { AdminConfigState, ConfigGroupKey, ConfigValue, PlanSummary } from '../types/config';

interface SystemConfigPageProps {
  dispatch: AdminDispatch;
  config: AdminConfigState;
  plan: { plans: PlanSummary[] };
  [key: string]: unknown;
}

interface SystemConfigRootState {
  config: AdminConfigState;
  plan: SystemConfigPageProps['plan'];
}

interface SystemConfigPageState {
  tabs?: string;
}

export class SystemConfigPage extends React.Component<SystemConfigPageProps, SystemConfigPageState> {
  inputDelayTimer: ReturnType<typeof setTimeout> | null = null;

  componentDidMount() {
    this.props.dispatch({ type: 'config/fetch' });
    this.props.dispatch({ type: 'plan/fetch' });
    this.props.dispatch({ type: 'config/getEmailTemplate' });
    this.props.dispatch({ type: 'config/getThemeTemplate' });
  }

  set(parentKey: ConfigGroupKey, field: string, value: ConfigValue): void {
    const config = this.props.config;
    this.props.dispatch({
      type: 'config/setState',
      payload: { [parentKey]: { ...config[parentKey], [field]: value } },
    });
    if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
    this.inputDelayTimer = setTimeout(() => {
      this.inputDelayTimer = null;
      this.props.dispatch({ type: 'config/save', parentKey });
    }, 1500);
  }

  render() {
    const {
      site, invite, subscribe, frontend, server, tabs, fetchLoading,
      emailTemplate, email, telegram, setTelegramWebhookLoading,
      app, testSendMailLoading, safe,
    } = this.props.config;
    const plans = this.props.plan.plans;
    const update = (group: ConfigGroupKey, field: string, value: ConfigValue): void => this.set(group, field, value);
    return (
      <MainLayout {...this.props} title="系统配置">
        <div className={`mb-0 block border-bottom ${fetchLoading ? 'block-mode-loading' : ''}`}>
          <Tabs
            onChange={activeTab => this.setState({ tabs: activeTab })}
            defaultActiveKey={tabs}
            size="large"
          >
            <Tabs.TabPane tab="站点" key="site">
              <SiteConfigTab site={site} plans={plans} onChange={(field, value) => update('site', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="安全" key="safe">
              <SafeConfigTab safe={safe} onChange={(field, value) => update('safe', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="订阅" key="subscribe">
              <SubscribeConfigTab subscribe={subscribe} onChange={(field, value) => update('subscribe', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="充值" key="deposit">
              <DepositConfigTab deposit={this.props.config.deposit} onChange={(field, value) => update('deposit', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="工单" key="ticket">
              <TicketConfigTab ticket={this.props.config.ticket} onChange={(field, value) => update('ticket', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="邀请&佣金" key="invite">
              <InviteConfigTab invite={invite} onChange={(field, value) => update('invite', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="个性化" key="frontend">
              <FrontendConfigTab frontend={frontend} onChange={(field, value) => update('frontend', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="节点" key="server">
              <ServerConfigTab server={server} onChange={(field, value) => update('server', field, value)} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="邮件" key="email">
              <EmailConfigTab
                email={email}
                templates={emailTemplate}
                testSendMailLoading={testSendMailLoading}
                onChange={(field, value) => update('email', field, value)}
                onTestSendMail={() => this.props.dispatch({ type: 'config/testSendMail' })}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Telegram" key="telegram">
              <TelegramConfigTab
                telegram={telegram}
                webhookLoading={setTelegramWebhookLoading}
                onChange={(field, value) => update('telegram', field, value)}
                onSetWebhook={() => this.props.dispatch({ type: 'config/setTelegramWebhook' })}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="APP" key="app">
              <AppConfigTab app={app} onChange={(field, value) => update('app', field, value)} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </MainLayout>
    );
  }
}

export default connect((state: SystemConfigRootState) => ({ plan: state.plan, config: state.config }))(SystemConfigPage);
