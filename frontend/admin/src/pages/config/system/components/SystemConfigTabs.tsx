import React from 'react';
import Tabs from 'antd/lib/tabs';
import SiteConfigTab from './SiteConfigTab';
import SafeConfigTab from './SafeConfigTab';
import SubscribeConfigTab from './SubscribeConfigTab';
import DepositConfigTab from './DepositConfigTab';
import TicketConfigTab from './TicketConfigTab';
import InviteConfigTab from './InviteConfigTab';
import FrontendConfigTab from './FrontendConfigTab';
import ServerConfigTab from './ServerConfigTab';
import EmailConfigTab from './EmailConfigTab';
import TelegramConfigTab from './TelegramConfigTab';
import AppConfigTab from './AppConfigTab';
import type {
    AdminConfigState,
    ConfigGroupKey,
    ConfigValue,
    PlanSummary,
} from '../../../../types/systemConfigurationContracts';

interface SystemConfigTabsProps {
    config: AdminConfigState;
    onChange: (group: ConfigGroupKey, field: string, value: ConfigValue) => void;
    onChangeTab: (tab: string) => void;
    onSetWebhook: () => void;
    onTestSendMail: () => void;
    plans: PlanSummary[];
}

export default function SystemConfigTabs({
    config,
    onChange,
    onChangeTab,
    onSetWebhook,
    onTestSendMail,
    plans,
}: SystemConfigTabsProps) {
    return (
        <Tabs onChange={onChangeTab} defaultActiveKey={config.tabs} size="large">
            <Tabs.TabPane tab="站点" key="site">
                <SiteConfigTab
                    site={config.site}
                    plans={plans}
                    onChange={(field, value) => onChange('site', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="安全" key="safe">
                <SafeConfigTab
                    safe={config.safe}
                    onChange={(field, value) => onChange('safe', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="订阅" key="subscribe">
                <SubscribeConfigTab
                    subscribe={config.subscribe}
                    onChange={(field, value) => onChange('subscribe', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="充值" key="deposit">
                <DepositConfigTab
                    deposit={config.deposit}
                    onChange={(field, value) => onChange('deposit', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="工单" key="ticket">
                <TicketConfigTab
                    ticket={config.ticket}
                    onChange={(field, value) => onChange('ticket', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="邀请&佣金" key="invite">
                <InviteConfigTab
                    invite={config.invite}
                    onChange={(field, value) => onChange('invite', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="个性化" key="frontend">
                <FrontendConfigTab
                    frontend={config.frontend}
                    onChange={(field, value) => onChange('frontend', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="节点" key="server">
                <ServerConfigTab
                    server={config.server}
                    onChange={(field, value) => onChange('server', field, value)}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="邮件" key="email">
                <EmailConfigTab
                    email={config.email}
                    templates={config.emailTemplate}
                    testSendMailLoading={config.testSendMailLoading}
                    onChange={(field, value) => onChange('email', field, value)}
                    onTestSendMail={onTestSendMail}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Telegram" key="telegram">
                <TelegramConfigTab
                    telegram={config.telegram}
                    webhookLoading={config.setTelegramWebhookLoading}
                    onChange={(field, value) => onChange('telegram', field, value)}
                    onSetWebhook={onSetWebhook}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="APP" key="app">
                <AppConfigTab
                    app={config.app}
                    onChange={(field, value) => onChange('app', field, value)}
                />
            </Tabs.TabPane>
        </Tabs>
    );
}
