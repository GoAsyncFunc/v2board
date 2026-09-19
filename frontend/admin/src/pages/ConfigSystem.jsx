import React from "react";
import { connect } from "../vendor/reactRedux.js";
import { Button } from "../vendor/ui.js";
import { Input } from "../vendor/ui.js";
import { Tabs } from "../vendor/ui.js";
import { Switch } from "../vendor/ui.js";
import MainLayout from "../layouts/MainLayout.jsx";
import ConfigRow from "../components/config/ConfigRow.jsx";
import SiteConfigTab from "../components/config/SiteConfigTab.jsx";
import SafeConfigTab from "../components/config/SafeConfigTab.jsx";
import SubscribeConfigTab from "../components/config/SubscribeConfigTab.jsx";
import DepositConfigTab from "../components/config/DepositConfigTab.jsx";
import TicketConfigTab from "../components/config/TicketConfigTab.jsx";
import InviteConfigTab from "../components/config/InviteConfigTab.jsx";
import FrontendConfigTab from "../components/config/FrontendConfigTab.jsx";
import AppConfigTab from "../components/config/AppConfigTab.jsx";
import TelegramConfigTab from "../components/config/TelegramConfigTab.jsx";
import EmailConfigTab from "../components/config/EmailConfigTab.jsx";
import ServerConfigTab from "../components/config/ServerConfigTab.jsx";
export class SystemConfigPage extends React.Component {
    componentDidMount() {
        this.props.dispatch({ type: "config/fetch" });
        this.props.dispatch({ type: "plan/fetch" });
        this.props.dispatch({ type: "config/getEmailTemplate" });
        this.props.dispatch({ type: "config/getThemeTemplate" });
    }
    set(parentKey, field, value) {
        const config = this.props.config;
        this.props.dispatch({
            type: "config/setState",
            payload: {
                [parentKey]: { ...config[parentKey], [field]: value },
            },
        });
        if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
        this.inputDelayTimer = setTimeout(() => {
            this.inputDelayTimer = null;
            this.props.dispatch({ type: "config/save", parentKey });
        }, 1500);
    }
    render() {
        const {
            site,
            invite,
            subscribe,
            frontend,
            server,
            tabs,
            fetchLoading,
            emailTemplate,
            email,
            telegram,
            setTelegramWebhookLoading,
            app,
            testSendMailLoading,
            safe,
        } = this.props.config;
        const plans = this.props.plan.plans;
        return (
            <MainLayout {...this.props} title="系统配置">
                <div
                    className={`mb-0 block border-bottom ${fetchLoading ? "block-mode-loading" : ""}`}
                >
                    {React.createElement(
                        Tabs,
                        {
                            onChange: (e) =>
                                this.setState({
                                    tabs: e,
                                }),
                            defaultActiveKey: tabs,
                            size: "large",
                        },
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "站点", key: "site" },
                            <SiteConfigTab
                                site={site}
                                plans={plans}
                                onChange={(field, value) => this.set("site", field, value)}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "安全", key: "safe" },
                            <SafeConfigTab safe={safe} onChange={(field, value) => this.set("safe", field, value)} />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "订阅", key: "subscribe" },
                            <SubscribeConfigTab
                                subscribe={subscribe}
                                onChange={(field, value) => this.set("subscribe", field, value)}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "充值", key: "deposit" },
                            <DepositConfigTab
                                deposit={this.props.config.deposit}
                                onChange={(field, value) => this.set("deposit", field, value)}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "工单", key: "ticket" },
                            <TicketConfigTab
                                ticket={this.props.config.ticket}
                                onChange={(field, value) => this.set("ticket", field, value)}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "邀请&佣金", key: "invite" },
                            <InviteConfigTab
                                invite={invite}
                                onChange={(field, value) => this.set("invite", field, value)}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "个性化", key: "frontend" },
                            <FrontendConfigTab
                                frontend={frontend}
                                onChange={(field, value) => this.set("frontend", field, value)}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "节点", key: "server" },
                            <ServerConfigTab
                                server={server}
                                onChange={(field, value) => this.set("server", field, value)}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "邮件", key: "email" },
                            <EmailConfigTab
                                email={email}
                                templates={emailTemplate}
                                testSendMailLoading={testSendMailLoading}
                                onChange={(field, value) => this.set("email", field, value)}
                                onTestSendMail={() => this.props.dispatch({ type: "config/testSendMail" })}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "Telegram", key: "telegram" },
                            <TelegramConfigTab
                                telegram={telegram}
                                webhookLoading={setTelegramWebhookLoading}
                                onChange={(field, value) => this.set("telegram", field, value)}
                                onSetWebhook={() => this.props.dispatch({ type: "config/setTelegramWebhook" })}
                            />,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            { tab: "APP", key: "app" },
                            <AppConfigTab
                                app={app}
                                onChange={(field, value) => this.set("app", field, value)}
                            />,
                        ),
                    )}
                </div>
            </MainLayout>
        );
    }
}
export default connect((state) => ({ plan: state.plan, config: state.config }))(
    SystemConfigPage,
);
