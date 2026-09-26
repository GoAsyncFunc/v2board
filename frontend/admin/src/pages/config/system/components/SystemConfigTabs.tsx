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
    ConfigGroupChangeHandler,
    PlanSummary,
} from '@/types/systemConfigurationContracts';

interface SystemConfigTabsProps {
    config: AdminConfigState;
    onChange: ConfigGroupChangeHandler;
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
                <SiteConfigTab site={config.site} plans={plans} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="安全" key="safe">
                <SafeConfigTab safe={config.safe} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="订阅" key="subscribe">
                <SubscribeConfigTab subscribe={config.subscribe} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="充值" key="deposit">
                <DepositConfigTab deposit={config.deposit} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="工单" key="ticket">
                <TicketConfigTab ticket={config.ticket} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="邀请&佣金" key="invite">
                <InviteConfigTab invite={config.invite} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="个性化" key="frontend">
                <FrontendConfigTab frontend={config.frontend} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="节点" key="server">
                <ServerConfigTab server={config.server} onChange={onChange} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="邮件" key="email">
                <EmailConfigTab
                    email={config.email}
                    templates={config.emailTemplate}
                    testSendMailLoading={config.testSendMailLoading}
                    onChange={onChange}
                    onTestSendMail={onTestSendMail}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Telegram" key="telegram">
                <TelegramConfigTab
                    telegram={config.telegram}
                    webhookLoading={config.setTelegramWebhookLoading}
                    onChange={onChange}
                    onSetWebhook={onSetWebhook}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="APP" key="app">
                <AppConfigTab app={config.app} onChange={onChange} />
            </Tabs.TabPane>
        </Tabs>
    );
}
