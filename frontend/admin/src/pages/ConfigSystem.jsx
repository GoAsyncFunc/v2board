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
                            {
                                tab: "个性化",
                                key: "frontend",
                            },
                            <div className={"block-content"}>
                                <div className={"row"}>
                                    <div className={"col-lg-12"}>
                                        <div
                                            className={"alert alert-warning"}
                                            role={"alert"}
                                        >
                                            <p className={"mb-0"}>
                                                {
                                                    "如果你采用前后分离的方式部署V2board管理端，那么本页配置将不会生效。了解"
                                                }
                                                <setTelegramWebhookLoading>
                                                    <a
                                                        href={
                                                            "https://docs.v2board.com/use/advanced.html#%E5%89%8D%E7%AB%AF%E5%88%86%E7%A6%BB"
                                                        }
                                                    >
                                                        {"前后分离"}
                                                    </a>
                                                </setTelegramWebhookLoading>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "边栏风格",
                                    },
                                    React.createElement(Switch, {
                                        checkedChildren: "亮",
                                        unCheckedChildren: "暗",
                                        checked:
                                            "light" ===
                                            frontend.frontend_theme_sidebar
                                                ? 1
                                                : 0,
                                        onChange: (e) =>
                                            this.set(
                                                "site",
                                                "frontend_theme_sidebar",
                                                e ? "light" : "dark",
                                            ),
                                    }),
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "头部风格",
                                    },
                                    React.createElement(Switch, {
                                        checkedChildren: "亮",
                                        unCheckedChildren: "暗",
                                        checked:
                                            "light" ===
                                            frontend.frontend_theme_header
                                                ? 1
                                                : 0,
                                        onChange: (e) =>
                                            this.set(
                                                "site",
                                                "frontend_theme_header",
                                                e ? "light" : "dark",
                                            ),
                                    }),
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "主题色",
                                    },
                                    <select
                                        className={"form-control"}
                                        defaultValue={
                                            frontend.frontend_theme_color
                                        }
                                        onChange={(e) =>
                                            this.set(
                                                "frontend",
                                                "frontend_theme_color",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value={"default"}>
                                            {"默认"}
                                        </option>
                                        <option value={"black"}>
                                            {"黑色"}
                                        </option>
                                        <option value={"darkblue"}>
                                            {"暗蓝色"}
                                        </option>
                                        <option value={"green"}>
                                            {"奶绿色"}
                                        </option>
                                    </select>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "背景",
                                        description:
                                            "将会在后台登录页面进行展示。",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={
                                            "https://xxxxx.com/wallpaper.png"
                                        }
                                        defaultValue={
                                            frontend.frontend_background_url
                                        }
                                        onChange={(e) =>
                                            this.set(
                                                "frontend",
                                                "frontend_background_url",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                            </div>,
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
                            {
                                tab: "邮件",
                                key: "email",
                            },
                            <div className={"block-content"}>
                                <div className={"row"}>
                                    <div className={"col-lg-12"}>
                                        <div
                                            className={"alert alert-warning"}
                                            role={"alert"}
                                        >
                                            <p className={"mb-0"}>
                                                {
                                                    "如果你更改了本页配置，需要对队列服务进行重启。另外本页配置优先级高于.env中邮件配置。"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "SMTP服务器地址",
                                        description:
                                            "由邮件服务商提供的服务地址",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={email.email_host}
                                        onChange={(e) =>
                                            this.set(
                                                "email",
                                                "email_host",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "SMTP服务端口",
                                        description: "常见的端口有25, 465, 587",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={email.email_port}
                                        onChange={(e) =>
                                            this.set(
                                                "email",
                                                "email_port",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "SMTP加密方式",
                                        description:
                                            "465端口加密方式一般为SSL，587端口加密方式一般为TLS",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={email.email_encryption}
                                        onChange={(e) =>
                                            this.set(
                                                "email",
                                                "email_encryption",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "SMTP账号",
                                        description: "由邮件服务商提供的账号",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={email.email_username}
                                        onChange={(e) =>
                                            this.set(
                                                "email",
                                                "email_username",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "SMTP密码",
                                        description: "由邮件服务商提供的密码",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={email.email_password}
                                        onChange={(e) =>
                                            this.set(
                                                "email",
                                                "email_password",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "发件地址",
                                        description:
                                            "由邮件服务商提供的发件地址",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"请输入"}
                                        defaultValue={email.email_from_address}
                                        onChange={(e) =>
                                            this.set(
                                                "email",
                                                "email_from_address",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "邮件模板",
                                        description:
                                            "你可以在文档查看如何自定义邮件模板",
                                    },
                                    <select
                                        onChange={(e) =>
                                            this.set(
                                                "email",
                                                "email_template",
                                                e.target.value,
                                            )
                                        }
                                        className={"form-control"}
                                        value={email.email_template}
                                    >
                                        {emailTemplate.map((e) => {
                                            return (
                                                <option
                                                    key={Math.random()}
                                                    value={e}
                                                >
                                                    {e}
                                                </option>
                                            );
                                        })}
                                    </select>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "发送测试邮件",
                                        description:
                                            "邮件将会发送到当前登陆用户邮箱",
                                    },
                                    React.createElement(
                                        Button,
                                        {
                                            loading: testSendMailLoading,
                                            type: "primary",
                                            onClick: () =>
                                                this.props.dispatch({
                                                    type: "config/testSendMail",
                                                }),
                                        },
                                        "发送测试邮件",
                                    ),
                                )}
                            </div>,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            {
                                tab: "Telegram",
                                key: "telegram",
                            },
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "机器人Token",
                                        description:
                                            "请输入由Botfather提供的token。",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={
                                            "0000000000:xxxxxxxxx_xxxxxxxxxxxxxxx"
                                        }
                                        defaultValue={
                                            telegram.telegram_bot_token
                                        }
                                        onChange={(e) =>
                                            this.set(
                                                "telegram",
                                                "telegram_bot_token",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {telegram.telegram_bot_token &&
                                    React.createElement(
                                        ConfigRow,
                                        {
                                            title: "设置Webhook",
                                            description:
                                                "对机器人进行Webhook设置，不设置将无法收到Telegram通知。",
                                        },
                                        React.createElement(
                                            Button,
                                            {
                                                type: "primary",
                                                onClick: () => {
                                                    this.props.dispatch({
                                                        type: "config/setTelegramWebhook",
                                                    });
                                                },
                                                loading:
                                                    setTelegramWebhookLoading,
                                                disabled:
                                                    setTelegramWebhookLoading,
                                            },
                                            "一键设置",
                                        ),
                                    )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "开启机器人通知",
                                        description:
                                            "开启后bot将会对绑定了telegram的管理员和用户进行基础通知。",
                                    },
                                    React.createElement(Switch, {
                                        checked: parseInt(
                                            telegram.telegram_bot_enable,
                                        ),
                                        onChange: (e) =>
                                            this.set(
                                                "telegram",
                                                "telegram_bot_enable",
                                                e ? 1 : 0,
                                            ),
                                    }),
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "群组地址",
                                        description:
                                            "填写后将会在用户端展示，或者被用于需要的地方。",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"https://t.me/xxxxxx"}
                                        defaultValue={
                                            telegram.telegram_discuss_link
                                        }
                                        onChange={(e) =>
                                            this.set(
                                                "telegram",
                                                "telegram_discuss_link",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                            </div>,
                        ),
                        React.createElement(
                            Tabs.TabPane,
                            {
                                tab: "APP",
                                key: "app",
                            },
                            <div className={"block-content"}>
                                <div className={"row"}>
                                    <div className={"col-lg-12"}>
                                        <div
                                            className={"alert alert-warning"}
                                            role={"alert"}
                                        >
                                            <p className={"mb-0"}>
                                                {
                                                    "用于自有客户端(APP)的版本管理及更新"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>,
                            <div className={""}>
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "Windows",
                                        description:
                                            "Windows端版本号及下载地址",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"1.0.0"}
                                        defaultValue={app.windows_version}
                                        onChange={(e) =>
                                            this.set(
                                                "app",
                                                "windows_version",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                    <input
                                        type={"text"}
                                        className={"form-control mt-1"}
                                        placeholder={"https://xxxx.com/xxx.exe"}
                                        defaultValue={app.windows_download_url}
                                        onChange={(e) =>
                                            this.set(
                                                "app",
                                                "windows_download_url",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "macOS",
                                        description: "macOS端版本号及下载地址",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"1.0.0"}
                                        defaultValue={app.macos_version}
                                        onChange={(e) =>
                                            this.set(
                                                "app",
                                                "macos_version",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                    <input
                                        type={"text"}
                                        className={"form-control mt-1"}
                                        placeholder={"https://xxxx.com/xxx.dmg"}
                                        defaultValue={app.macos_download_url}
                                        onChange={(e) =>
                                            this.set(
                                                "app",
                                                "macos_download_url",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                                {React.createElement(
                                    ConfigRow,
                                    {
                                        title: "Android",
                                        description:
                                            "Android端版本号及下载地址",
                                    },
                                    <input
                                        type={"text"}
                                        className={"form-control"}
                                        placeholder={"1.0.0"}
                                        defaultValue={app.android_version}
                                        onChange={(e) =>
                                            this.set(
                                                "app",
                                                "android_version",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                    <input
                                        type={"text"}
                                        className={"form-control mt-1"}
                                        placeholder={"https://xxxx.com/xxx.apk"}
                                        defaultValue={app.android_download_url}
                                        onChange={(e) =>
                                            this.set(
                                                "app",
                                                "android_download_url",
                                                e.target.value,
                                            )
                                        }
                                    ></input>,
                                )}
                            </div>,
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
