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
                            {
                                tab: "节点",
                                key: "server",
                            },
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "节点对接API地址",
                                        description:
                                            "v2node节点一键对接专用地址。",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={server.server_api_url}
                                        onChange={(e) =>
                                            this.set(
                                                "server",
                                                "server_api_url",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "通讯密钥",
                                        description:
                                            "V2board与节点通讯的密钥，以便数据不会被他人获取。",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={server.server_token}
                                        onChange={(e) =>
                                            this.set(
                                                "server",
                                                "server_token",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "节点拉取动作轮询间隔",
                                        description:
                                            "节点从面板获取数据的间隔频率。",
                                    },
                                    React.createElement(Input, {
                                        addonAfter: "秒",
                                        size: "large",
                                        type: "number",
                                        placeholder: "请输入",
                                        defaultValue:
                                            server.server_pull_interval,
                                        onChange: (e) =>
                                            this.set(
                                                "server",
                                                "server_pull_interval",
                                                e.target.value,
                                            ),
                                    }),
                                )}
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "节点推送动作轮询间隔",
                                        description:
                                            "节点推送数据到面板的间隔频率。",
                                    },
                                    React.createElement(Input, {
                                        addonAfter: "秒",
                                        size: "large",
                                        type: "number",
                                        placeholder: "请输入",
                                        defaultValue:
                                            server.server_push_interval,
                                        onChange: (e) =>
                                            this.set(
                                                "server",
                                                "server_push_interval",
                                                e.target.value,
                                            ),
                                    }),
                                )}
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "节点用户流量上报最低阈值",
                                        description:
                                            "每次推送动作仅累计使用流量高于阈值的用户信息会被上报，未上报流量会累计",
                                    },
                                    React.createElement(Input, {
                                        addonAfter: "Kb",
                                        size: "large",
                                        type: "number",
                                        placeholder: "请输入",
                                        defaultValue:
                                            server.server_node_report_min_traffic,
                                        onChange: (e) =>
                                            this.set(
                                                "server",
                                                "server_node_report_min_traffic",
                                                e.target.value,
                                            ),
                                    }),
                                )}
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "节点用户设备数统计最低阈值",
                                        description:
                                            "每次推送动作仅上报流量高于阈值的在线设备IP地址会被节点统计",
                                    },
                                    React.createElement(Input, {
                                        addonAfter: "Kb",
                                        size: "large",
                                        type: "number",
                                        placeholder: "请输入",
                                        defaultValue:
                                            server.server_device_online_min_traffic,
                                        onChange: (e) =>
                                            this.set(
                                                "server",
                                                "server_device_online_min_traffic",
                                                e.target.value,
                                            ),
                                    }),
                                )}
                            </div>,
                            React.createElement(
                                ConfigRow,
                                {
                                    title: "全局设备数限制采用宽松模式",
                                    description:
                                        "开启后同一IP地址使用多个节点只统计为一个设备",
                                },
                                React.createElement(Switch, {
                                    checked: parseInt(server.device_limit_mode),
                                    onChange: (e) =>
                                        this.set(
                                            "server",
                                            "device_limit_mode",
                                            e ? 1 : 0,
                                        ),
                                }),
                            ),
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
