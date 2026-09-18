let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  i = interopDefault(r),
  o = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/antdButton.js")),
  a = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/antdInput.js")),
  s = (require("../vendor/modules/5a6e6e2b.js"), require("../vendor/modules/antdTabs.js")),
  l = (require("../vendor/modules/426f5337.js"), require("../vendor/modules/antdSwitch.js")),
  c = require("../vendor/modules/70307045.js"),
  u = interopDefault(c),
  h = require("../vendor/modules/reactRuntime.js"),
  f = interopDefault(h),
  d = require("../layouts/MainLayout.jsx"),
  p = require("../vendor/reactRedux.js");
class m extends f.a.Component {
  render() {
    return <div className={"row ".concat(this.props.isChildren ? "v2board-config-children" : "")} style={{
      padding: "20px",
      borderBottom: "1px solid #eee"
    }}>
                <div className={"col-lg-6"}>
                    <div style={{
          fontWeight: "bold",
          marginBottom: 5
        }}>
                        {this.props.title}
                    </div>
                    <div style={{
          fontSize: 12,
          marginBottom: 5,
          color: "#666"
        }}>
                        {this.props.description}
                    </div>
                </div>
                <div className={"col-lg-6 text-right"}>
                    {this.props.children}
                </div>
            </div>;
  }
}
class g extends f.a.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "config/fetch"
    }), this.props.dispatch({
      type: "plan/fetch"
    }), this.props.dispatch({
      type: "config/getEmailTemplate"
    }), this.props.dispatch({
      type: "config/getThemeTemplate"
    });
  }
  set(e, t, n) {
    var r = this.props.config;
    this.props.dispatch({
      type: "config/setState",
      payload: {
        [e]: u()({}, r[e], {
          [t]: n
        })
      }
    }), this.inputDelayTimer && clearTimeout(this.inputDelayTimer), this.inputDelayTimer = setTimeout(function () {
      this.inputDelayTimer = null, this.props.dispatch({
        type: "config/save",
        parentKey: e
      });
    }.bind(this), 1500);
  }
  render() {
    var e = this.props.config,
      t = e.site,
      n = e.invite,
      r = e.subscribe,
      c = e.frontend,
      u = e.server,
      h = e.tabs,
      p = e.fetchLoading,
      g = e.emailTemplate,
      v = (e.themeTemplate, e.email),
      y = e.telegram,
      b = e.setTelegramWebhookLoading,
      w = e.app,
      x = e.testSendMailLoading,
      _ = e.safe,
      E = this.props.plan.plans;
    return f.a.createElement(d["a"], i()({}, this.props, {
      title: "系统配置"
    }), <div className={"mb-0 block border-bottom ".concat(p ? "block-mode-loading" : "")}>
                {f.a.createElement(s["a"], {
        onChange: e => this.setState({
          tabs: e
        }),
        defaultActiveKey: h,
        size: "large"
      }, f.a.createElement(s["a"].TabPane, {
        tab: "站点",
        key: "site"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "站点名称",
          description: "用于显示需要站点名称的地方。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入站点名称"} defaultValue={t.app_name} onChange={e => this.set("site", "app_name", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "站点描述",
          description: "用于显示需要站点描述的地方。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入站点描述"} defaultValue={t.app_description} onChange={e => this.set("site", "app_description", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "站点网址",
          description: "当前网站最新网址，将会在邮件等需要用于网址处体现。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入站点URL，末尾不要/"} defaultValue={t.app_url} onChange={e => this.set("site", "app_url", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "强制HTTPS",
          description: "当站点没有使用HTTPS，CDN或反代开启强制HTTPS时需要开启。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(t.force_https),
          onChange: e => this.set("site", "force_https", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "LOGO",
          description: "用于显示需要LOGO的地方。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入LOGO URL，末尾不要/"} defaultValue={t.logo} onChange={e => this.set("site", "logo", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "订阅URL",
          description: "用于订阅所使用，留空则为站点URL。如需多个订阅URL随机获取请使用逗号进行分割。"
        }, <textarea rows={"4"} type={"text"} className={"form-control"} placeholder={"请输入订阅URL，末尾不要/。逗号分割支持多域名"} defaultValue={t.subscribe_url} onChange={e => this.set("site", "subscribe_url", e.target.value)}></textarea>)}
                            {f.a.createElement(m, {
          title: "订阅路径",
          description: "用于订阅所使用，留空则为/api/v1/client/subscribe。如需更换不同的订阅路径请设置。"
        }, <input type={"text"} className={"form-control"} placeholder={"/api/v1/client/subscribe"} defaultValue={t.subscribe_path} onChange={e => this.set("site", "subscribe_path", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "用户条款(TOS)URL",
          description: "用于跳转到用户条款(TOS)"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入用户条款URL，末尾不要/"} defaultValue={t.tos_url} onChange={e => this.set("site", "tos_url", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "停止新用户注册",
          description: "开启后任何人都将无法进行注册。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(t.stop_register),
          onChange: e => this.set("site", "stop_register", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "注册试用",
          description: "选择需要试用的订阅，如果没有选项请先前往订阅管理添加。"
        }, <select onChange={e => this.set("site", "try_out_plan_id", e.target.value)} className={"form-control"} value={t.try_out_plan_id} placeholder={"请选择试用订阅"}>
                                    <option value={0}>{"关闭"}</option>
                                    {E.map(e => {
            return <option key={Math.random()} value={e.id}>
                                                {e.name}
                                            </option>;
          })}
                                </select>)}
                            {0 === t.try_out_plan_id || f.a.createElement(m, {
          isChildren: !0,
          title: "试用时间(小时)"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={t.try_out_hour} onChange={e => this.set("site", "try_out_hour", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "货币单位",
          description: "仅用于展示使用，更改后系统中所有的货币单位都将发生变更。"
        }, <input type={"text"} className={"form-control"} placeholder={"CNY"} defaultValue={t.currency} onChange={e => this.set("site", "currency", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "货币符号",
          description: "仅用于展示使用，更改后系统中所有的货币单位都将发生变更。"
        }, <input type={"text"} className={"form-control"} placeholder={"¥"} defaultValue={t.currency_symbol} onChange={e => this.set("site", "currency_symbol", e.target.value)}></input>)}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "安全",
        key: "safe"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "邮箱验证",
          description: "开启后将会强制要求用户进行邮箱验证。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(_.email_verify),
          onChange: e => this.set("safe", "email_verify", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "禁止使用Gmail多别名",
          description: "开启后Gmail多别名将无法注册。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(_.email_gmail_limit_enable),
          onChange: e => this.set("safe", "email_gmail_limit_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "安全模式",
          description: "开启后除了站点URL以外的绑定本站点的域名访问都将会被403。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(_.safe_mode_enable),
          onChange: e => this.set("safe", "safe_mode_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "后台路径",
          description: "后台管理路径，修改后将会改变原有的admin路径"
        }, <input type={"text"} className={"form-control"} placeholder={"admin"} defaultValue={_.secure_path} onChange={e => this.set("safe", "secure_path", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "邮箱后缀白名单",
          description: "开启后在名单中的邮箱后缀才允许进行注册。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(_.email_whitelist_enable),
          onChange: e => this.set("safe", "email_whitelist_enable", e ? 1 : 0)
        }))}
                            {_.email_whitelist_enable ? f.a.createElement(m, {
          isChildren: !0,
          title: "白名单后缀",
          description: "请使用逗号进行分割，如：qq.com,gmail.com。"
        }, <textarea rows={"4"} type={"text"} className={"form-control"} placeholder={"请输入后缀域名，逗号分割 如：qq.com,gmail.com"} defaultValue={_.email_whitelist_suffix} onChange={e => this.set("safe", "email_whitelist_suffix", e.target.value.split(","))}></textarea>) : ""}
                            {f.a.createElement(m, {
          title: "防机器人",
          description: "开启后将会使用Google reCAPTCHA防止机器人。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(_.recaptcha_enable),
          onChange: e => this.set("safe", "recaptcha_enable", e ? 1 : 0)
        }))}
                            {_.recaptcha_enable ? f.a.createElement(f.a.Fragment, null, f.a.createElement(m, {
          isChildren: !0,
          title: "密钥",
          description: "在Google reCAPTCHA申请的密钥。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={_.recaptcha_key} onChange={e => this.set("safe", "recaptcha_key", e.target.value)}></input>), f.a.createElement(m, {
          isChildren: !0,
          title: "网站密钥",
          description: "在Google reCAPTCH申请的网站密钥。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={_.recaptcha_site_key} onChange={e => this.set("safe", "recaptcha_site_key", e.target.value)}></input>)) : ""}
                            {f.a.createElement(m, {
          title: "IP注册限制",
          description: "开启后如果IP注册账户达到规则要求将会被限制注册，请注意IP判断可能因为CDN或前置代理导致问题。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(_.register_limit_by_ip_enable),
          onChange: e => this.set("safe", "register_limit_by_ip_enable", e ? 1 : 0)
        }))}
                            {_.register_limit_by_ip_enable ? f.a.createElement(f.a.Fragment, null, f.a.createElement(m, {
          isChildren: !0,
          title: "次数",
          description: "达到注册次数后开启惩罚。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={_.register_limit_count} onChange={e => this.set("safe", "register_limit_count", e.target.value)}></input>), f.a.createElement(m, {
          isChildren: !0,
          title: "惩罚时间(分钟)",
          description: "需要等待惩罚时间过后才可以再次注册。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={_.register_limit_expire} onChange={e => this.set("safe", "register_limit_expire", e.target.value)}></input>)) : ""}
                            {f.a.createElement(m, {
          title: "防爆破限制",
          description: "开启后如果该账户尝试登陆失败次数过多将会被限制。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(_.password_limit_enable),
          onChange: e => this.set("safe", "password_limit_enable", e ? 1 : 0)
        }))}
                            {_.password_limit_enable ? f.a.createElement(f.a.Fragment, null, f.a.createElement(m, {
          isChildren: !0,
          title: "次数",
          description: "达到失败次数后开启惩罚。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={_.password_limit_count} onChange={e => this.set("safe", "password_limit_count", e.target.value)}></input>), f.a.createElement(m, {
          isChildren: !0,
          title: "惩罚时间(分钟)",
          description: "需要等待惩罚时间过后才可以再次登陆。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={_.password_limit_expire} onChange={e => this.set("safe", "password_limit_expire", e.target.value)}></input>)) : ""}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "订阅",
        key: "subscribe"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "允许用户更改订阅",
          description: "开启后用户将会可以对订阅计划进行变更。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(r.plan_change_enable),
          onChange: e => this.set("subscribe", "plan_change_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "月流量重置方式",
          description: "全局流量重置方式，默认每月1号。可以在订阅管理为订阅单独设置。"
        }, <select onChange={e => this.set("subscribe", "reset_traffic_method", e.target.value)} className={"form-control"} value={r.reset_traffic_method} placeholder={"请选择订阅重置方式"}>
                                    <option value={0}>{"每月1号"}</option>
                                    <option value={1}>{"按月重置"}</option>
                                    <option value={2}>{"不重置"}</option>
                                    <option value={3}>{"每年1月1日"}</option>
                                    <option value={4}>{"按年重置"}</option>
                                </select>)}
                            {f.a.createElement(m, {
          title: "开启折抵方案",
          description: "开启后用户更换订阅将会由系统对原有订阅进行折抵，方案参考文档。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(r.surplus_enable),
          onChange: e => this.set("subscribe", "surplus_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "允许提前开启流量周期",
          description: "开启后用户流量用尽时可以选择扣除订阅时长为代价重置流量，按月重置时扣除本周期剩余订阅时长，每月1号重置时扣除整月时间30天。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(r.allow_new_period),
          onChange: e => this.set("subscribe", "allow_new_period", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "当订阅新购时触发事件",
          description: "新购订阅完成时将触发该任务。"
        }, <select onChange={e => this.set("subscribe", "new_order_event_id", e.target.value)} className={"form-control"} value={r.new_order_event_id} placeholder={"请选择事件"}>
                                    <option value={0}>
                                        {"不执行任何动作"}
                                    </option>
                                    <option value={1}>{"重置用户流量"}</option>
                                </select>)}
                            {f.a.createElement(m, {
          title: "当订阅续费时触发事件",
          description: "续费订阅完成时将触发该任务。"
        }, <select onChange={e => this.set("subscribe", "renew_order_event_id", e.target.value)} className={"form-control"} value={r.renew_order_event_id} placeholder={"请选择事件"}>
                                    <option value={0}>
                                        {"不执行任何动作"}
                                    </option>
                                    <option value={1}>{"重置用户流量"}</option>
                                </select>)}
                            {f.a.createElement(m, {
          title: "当订阅变更时触发事件",
          description: "变更订阅完成时将触发该任务。"
        }, <select onChange={e => this.set("subscribe", "change_order_event_id", e.target.value)} className={"form-control"} value={r.change_order_event_id} placeholder={"请选择事件"}>
                                    <option value={0}>
                                        {"不执行任何动作"}
                                    </option>
                                    <option value={1}>{"重置用户流量"}</option>
                                </select>)}
                            {f.a.createElement(m, {
          title: "在订阅中展示订阅信息",
          description: "开启后将会在用户订阅节点时输出订阅信息。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(r.show_info_to_server_enable),
          onChange: e => this.set("subscribe", "show_info_to_server_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "订阅链接生效模式",
          description: "用户获取订阅链接后的有效期。"
        }, <select onChange={e => this.set("subscribe", "show_subscribe_method", e.target.value)} className={"form-control"} value={r.show_subscribe_method} placeholder={"请选择"}>
                                    <option value={0}>{"永久有效"}</option>
                                    <option value={1}>{"一次性有效"}</option>
                                    <option value={2}>{"限时有效"}</option>
                                </select>)}
                            {r.show_subscribe_method == 2 ? f.a.createElement(m, {
          isChildren: !0,
          title: "订阅链接有效时间(分钟)",
          description: "订阅链接获取后经过该时间将失效。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={r.show_subscribe_expire} onChange={e => this.set("safe", "show_subscribe_expire", e.target.value)}></input>) : ""}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "充值",
        key: "deposit"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "充值奖励",
          description: "充值一定金额可以获得的奖励。"
        }, <textarea rows={"2"} type={"text"} className={"form-control"} placeholder={"请输入 充值金额:奖励金额,逗号分割\n如 50:18,100:38, 200:88"} defaultValue={e.deposit.deposit_bounus} onChange={e => this.set("deposit", "deposit_bounus", e.target.value.split(","))}></textarea>)}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "工单",
        key: "ticket"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "工单设置",
          description: "请选择工单的状态。"
        }, <select onChange={e => this.set("ticket", "ticket_status", e.target.value)} className={"form-control"} value={e.ticket.ticket_status || 0}>
                                    <option value={0}>{"完全开放工单"}</option>
                                    <option value={1}>
                                        {"仅限有付费订单用户"}
                                    </option>
                                    <option value={2}>{"完全禁止工单"}</option>
                                </select>)}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "邀请&佣金",
        key: "invite"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "开启强制邀请",
          description: "开启后只有被邀请的用户才可以进行注册。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(n.invite_force),
          onChange: e => this.set("invite", "invite_force", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "邀请佣金百分比",
          description: "默认全局的佣金分配比例，你可以在用户管理单独配置单个比例。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={n.invite_commission} onChange={e => this.set("invite", "invite_commission", parseInt(e.target.value))}></input>)}
                            {f.a.createElement(m, {
          title: "用户可创建邀请码上限"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={n.invite_gen_limit} onChange={e => this.set("invite", "invite_gen_limit", parseInt(e.target.value))}></input>)}
                            {f.a.createElement(m, {
          title: "邀请码永不失效",
          description: "开启后邀请码被使用后将不会失效，否则使用过后即失效。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(n.invite_never_expire),
          onChange: e => this.set("invite", "invite_never_expire", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "佣金仅首次发放",
          description: "开启后被邀请人首次支付时才会产生佣金，可以在用户管理对用户进行单独配置。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(n.commission_first_time_enable),
          onChange: e => this.set("invite", "commission_first_time_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "佣金自动确认",
          description: "开启后佣金将会在订单完成3日后自动进行确认。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(n.commission_auto_check_enable),
          onChange: e => this.set("invite", "commission_auto_check_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "提现单申请门槛(元)",
          description: "小于门槛金额的提现单将不会被提交。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={n.commission_withdraw_limit} onChange={e => this.set("invite", "commission_withdraw_limit", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "提现方式",
          description: "可以支持的提现方式。"
        }, <textarea rows={"4"} type={"text"} className={"form-control"} placeholder={"请输入后缀域名，逗号分割 如：支付宝,USDT,贝宝"} defaultValue={n.commission_withdraw_method} onChange={e => this.set("invite", "commission_withdraw_method", e.target.value.split(","))}></textarea>)}
                            {f.a.createElement(m, {
          title: "关闭提现",
          description: "关闭后将禁止用户申请提现，且邀请佣金将会直接进入用户余额。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(n.withdraw_close_enable),
          onChange: e => this.set("invite", "withdraw_close_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "三级分销",
          description: "开启后将佣金将按照设置的3成比例进行分成，三成比例合计请不要>100%。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(n.commission_distribution_enable),
          onChange: e => this.set("invite", "commission_distribution_enable", e ? 1 : 0)
        }))}
                            {parseInt(n.commission_distribution_enable) ? f.a.createElement(f.a.Fragment, null, f.a.createElement(m, {
          isChildren: !0,
          title: "一级邀请人比例"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入比例如：50"} defaultValue={n.commission_distribution_l1} onChange={e => this.set("invite", "commission_distribution_l1", e.target.value)}></input>), f.a.createElement(m, {
          isChildren: !0,
          title: "二级邀请人比例"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入比例如：30"} defaultValue={n.commission_distribution_l2} onChange={e => this.set("invite", "commission_distribution_l2", e.target.value)}></input>), f.a.createElement(m, {
          isChildren: !0,
          title: "三级邀请人比例"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入比例如：20"} defaultValue={n.commission_distribution_l3} onChange={e => this.set("invite", "commission_distribution_l3", e.target.value)}></input>)) : ""}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "个性化",
        key: "frontend"
      }, <div className={"block-content"}>
                            <div className={"row"}>
                                <div className={"col-lg-12"}>
                                    <div className={"alert alert-warning"} role={"alert"}>
                                        <p className={"mb-0"}>
                                            {"如果你采用前后分离的方式部署V2board管理端，那么本页配置将不会生效。了解"}
                                            <b>
                                                <a href={"https://docs.v2board.com/use/advanced.html#%E5%89%8D%E7%AB%AF%E5%88%86%E7%A6%BB"}>
                                                    {"前后分离"}
                                                </a>
                                            </b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "边栏风格"
        }, f.a.createElement(l["a"], {
          checkedChildren: "亮",
          unCheckedChildren: "暗",
          checked: "light" === c.frontend_theme_sidebar ? 1 : 0,
          onChange: e => this.set("site", "frontend_theme_sidebar", e ? "light" : "dark")
        }))}
                            {f.a.createElement(m, {
          title: "头部风格"
        }, f.a.createElement(l["a"], {
          checkedChildren: "亮",
          unCheckedChildren: "暗",
          checked: "light" === c.frontend_theme_header ? 1 : 0,
          onChange: e => this.set("site", "frontend_theme_header", e ? "light" : "dark")
        }))}
                            {f.a.createElement(m, {
          title: "主题色"
        }, <select className={"form-control"} defaultValue={c.frontend_theme_color} onChange={e => this.set("frontend", "frontend_theme_color", e.target.value)}>
                                    <option value={"default"}>{"默认"}</option>
                                    <option value={"black"}>{"黑色"}</option>
                                    <option value={"darkblue"}>
                                        {"暗蓝色"}
                                    </option>
                                    <option value={"green"}>{"奶绿色"}</option>
                                </select>)}
                            {f.a.createElement(m, {
          title: "背景",
          description: "将会在后台登录页面进行展示。"
        }, <input type={"text"} className={"form-control"} placeholder={"https://xxxxx.com/wallpaper.png"} defaultValue={c.frontend_background_url} onChange={e => this.set("frontend", "frontend_background_url", e.target.value)}></input>)}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "节点",
        key: "server"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "节点对接API地址",
          description: "v2node节点一键对接专用地址。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={u.server_api_url} onChange={e => this.set("server", "server_api_url", e.target.value)}></input>)}
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "通讯密钥",
          description: "V2board与节点通讯的密钥，以便数据不会被他人获取。"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={u.server_token} onChange={e => this.set("server", "server_token", e.target.value)}></input>)}
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "节点拉取动作轮询间隔",
          description: "节点从面板获取数据的间隔频率。"
        }, f.a.createElement(a["a"], {
          addonAfter: "秒",
          size: "large",
          type: "number",
          placeholder: "请输入",
          defaultValue: u.server_pull_interval,
          onChange: e => this.set("server", "server_pull_interval", e.target.value)
        }))}
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "节点推送动作轮询间隔",
          description: "节点推送数据到面板的间隔频率。"
        }, f.a.createElement(a["a"], {
          addonAfter: "秒",
          size: "large",
          type: "number",
          placeholder: "请输入",
          defaultValue: u.server_push_interval,
          onChange: e => this.set("server", "server_push_interval", e.target.value)
        }))}
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "节点用户流量上报最低阈值",
          description: "每次推送动作仅累计使用流量高于阈值的用户信息会被上报，未上报流量会累计"
        }, f.a.createElement(a["a"], {
          addonAfter: "Kb",
          size: "large",
          type: "number",
          placeholder: "请输入",
          defaultValue: u.server_node_report_min_traffic,
          onChange: e => this.set("server", "server_node_report_min_traffic", e.target.value)
        }))}
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "节点用户设备数统计最低阈值",
          description: "每次推送动作仅上报流量高于阈值的在线设备IP地址会被节点统计"
        }, f.a.createElement(a["a"], {
          addonAfter: "Kb",
          size: "large",
          type: "number",
          placeholder: "请输入",
          defaultValue: u.server_device_online_min_traffic,
          onChange: e => this.set("server", "server_device_online_min_traffic", e.target.value)
        }))}
                        </div>, f.a.createElement(m, {
        title: "全局设备数限制采用宽松模式",
        description: "开启后同一IP地址使用多个节点只统计为一个设备"
      }, f.a.createElement(l["a"], {
        checked: parseInt(u.device_limit_mode),
        onChange: e => this.set("server", "device_limit_mode", e ? 1 : 0)
      }))), f.a.createElement(s["a"].TabPane, {
        tab: "邮件",
        key: "email"
      }, <div className={"block-content"}>
                            <div className={"row"}>
                                <div className={"col-lg-12"}>
                                    <div className={"alert alert-warning"} role={"alert"}>
                                        <p className={"mb-0"}>
                                            {"如果你更改了本页配置，需要对队列服务进行重启。另外本页配置优先级高于.env中邮件配置。"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "SMTP服务器地址",
          description: "由邮件服务商提供的服务地址"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={v.email_host} onChange={e => this.set("email", "email_host", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "SMTP服务端口",
          description: "常见的端口有25, 465, 587"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={v.email_port} onChange={e => this.set("email", "email_port", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "SMTP加密方式",
          description: "465端口加密方式一般为SSL，587端口加密方式一般为TLS"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={v.email_encryption} onChange={e => this.set("email", "email_encryption", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "SMTP账号",
          description: "由邮件服务商提供的账号"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={v.email_username} onChange={e => this.set("email", "email_username", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "SMTP密码",
          description: "由邮件服务商提供的密码"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={v.email_password} onChange={e => this.set("email", "email_password", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "发件地址",
          description: "由邮件服务商提供的发件地址"
        }, <input type={"text"} className={"form-control"} placeholder={"请输入"} defaultValue={v.email_from_address} onChange={e => this.set("email", "email_from_address", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "邮件模板",
          description: "你可以在文档查看如何自定义邮件模板"
        }, <select onChange={e => this.set("email", "email_template", e.target.value)} className={"form-control"} value={v.email_template}>
                                    {g.map(e => {
            return <option key={Math.random()} value={e}>
                                                {e}
                                            </option>;
          })}
                                </select>)}
                            {f.a.createElement(m, {
          title: "发送测试邮件",
          description: "邮件将会发送到当前登陆用户邮箱"
        }, f.a.createElement(o["a"], {
          loading: x,
          type: "primary",
          onClick: () => this.props.dispatch({
            type: "config/testSendMail"
          })
        }, "发送测试邮件"))}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "Telegram",
        key: "telegram"
      }, <div className={""}>
                            {f.a.createElement(m, {
          title: "机器人Token",
          description: "请输入由Botfather提供的token。"
        }, <input type={"text"} className={"form-control"} placeholder={"0000000000:xxxxxxxxx_xxxxxxxxxxxxxxx"} defaultValue={y.telegram_bot_token} onChange={e => this.set("telegram", "telegram_bot_token", e.target.value)}></input>)}
                            {y.telegram_bot_token && f.a.createElement(m, {
          title: "设置Webhook",
          description: "对机器人进行Webhook设置，不设置将无法收到Telegram通知。"
        }, f.a.createElement(o["a"], {
          type: "primary",
          onClick: () => {
            this.props.dispatch({
              type: "config/setTelegramWebhook"
            });
          },
          loading: b,
          disabled: b
        }, "一键设置"))}
                            {f.a.createElement(m, {
          title: "开启机器人通知",
          description: "开启后bot将会对绑定了telegram的管理员和用户进行基础通知。"
        }, f.a.createElement(l["a"], {
          checked: parseInt(y.telegram_bot_enable),
          onChange: e => this.set("telegram", "telegram_bot_enable", e ? 1 : 0)
        }))}
                            {f.a.createElement(m, {
          title: "群组地址",
          description: "填写后将会在用户端展示，或者被用于需要的地方。"
        }, <input type={"text"} className={"form-control"} placeholder={"https://t.me/xxxxxx"} defaultValue={y.telegram_discuss_link} onChange={e => this.set("telegram", "telegram_discuss_link", e.target.value)}></input>)}
                        </div>), f.a.createElement(s["a"].TabPane, {
        tab: "APP",
        key: "app"
      }, <div className={"block-content"}>
                            <div className={"row"}>
                                <div className={"col-lg-12"}>
                                    <div className={"alert alert-warning"} role={"alert"}>
                                        <p className={"mb-0"}>
                                            {"用于自有客户端(APP)的版本管理及更新"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>, <div className={""}>
                            {f.a.createElement(m, {
          title: "Windows",
          description: "Windows端版本号及下载地址"
        }, <input type={"text"} className={"form-control"} placeholder={"1.0.0"} defaultValue={w.windows_version} onChange={e => this.set("app", "windows_version", e.target.value)}></input>, <input type={"text"} className={"form-control mt-1"} placeholder={"https://xxxx.com/xxx.exe"} defaultValue={w.windows_download_url} onChange={e => this.set("app", "windows_download_url", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "macOS",
          description: "macOS端版本号及下载地址"
        }, <input type={"text"} className={"form-control"} placeholder={"1.0.0"} defaultValue={w.macos_version} onChange={e => this.set("app", "macos_version", e.target.value)}></input>, <input type={"text"} className={"form-control mt-1"} placeholder={"https://xxxx.com/xxx.dmg"} defaultValue={w.macos_download_url} onChange={e => this.set("app", "macos_download_url", e.target.value)}></input>)}
                            {f.a.createElement(m, {
          title: "Android",
          description: "Android端版本号及下载地址"
        }, <input type={"text"} className={"form-control"} placeholder={"1.0.0"} defaultValue={w.android_version} onChange={e => this.set("app", "android_version", e.target.value)}></input>, <input type={"text"} className={"form-control mt-1"} placeholder={"https://xxxx.com/xxx.apk"} defaultValue={w.android_download_url} onChange={e => this.set("app", "android_download_url", e.target.value)}></input>)}
                        </div>))}
            </div>);
  }
}
legacyExports["default"] = Object(p["c"])(e => {
  var t = e.plan,
    n = e.config;
  return {
    plan: t,
    config: n
  };
})(g);
