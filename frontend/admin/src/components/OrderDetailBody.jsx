import React from 'react';
import {a as Row} from '../vendor/modules/424d7252.js';
import {a as Col} from '../vendor/modules/6b504b48.js';
import {a as settings} from '../vendor/modules/7449346c.js';
import moment from '../vendor/modules/77642f52.js';
import {a as Divider} from '../vendor/Divider.js';
import {a as Tooltip} from '../vendor/modules/3353372b.js';
import {a as Icon} from '../vendor/Icon.js';
export default function OrderDetailBody({order,user,inviteUser,plans,onUserFilter}) {var e;const t=plans,n={marginBottom:0};return user.email ? <div>
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"邮箱"}</Col><Col {...{
      span: 18
    }}><a onClick={() => onUserFilter("email", "模糊", user.email)} href={"javascript:void(0);"}>
                                        {user.email}
                                    </a></Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"订单号"}</Col><Col {...{
      span: 18
    }}>{order.trade_no}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"订单周期"}</Col><Col {...{
      span: 18
    }}>{settings.periodText[order.period]}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"订单状态"}</Col><Col {...{
      span: 18
    }}>{settings.orderStatusText[order.status]}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"订阅计划"}</Col><Col {...{
      span: 18
    }}>{null === (e = t.find(e => e.id === order.plan_id)) || void 0 === e ? void 0 : e.name}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"回调单号"}</Col><Col {...{
      span: 18
    }}>{order.callback_no ? order.callback_no : "-"}</Col></Row>}
                            {<Divider></Divider>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"支付金额"}</Col><Col {...{
      span: 18
    }}>{(order.total_amount / 100).toFixed(2)}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"余额支付"}</Col><Col {...{
      span: 18
    }}>{(order.balance_amount / 100).toFixed(2)}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"优惠金额"}</Col><Col {...{
      span: 18
    }}>{(order.discount_amount / 100).toFixed(2)}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"退回金额"}</Col><Col {...{
      span: 18
    }}>{(order.refund_amount / 100).toFixed(2)}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"折抵金额"}</Col><Col {...{
      span: 18
    }}>{(order.surplus_amount / 100).toFixed(2)}</Col></Row>}
                            {<Divider></Divider>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"创建时间"}</Col><Col {...{
      span: 18
    }}>{moment(1e3 * order.created_at).format("YYYY-MM-DD HH:mm:ss")}</Col></Row>}
                            {<Row {...{
    gutter: [16, 16],
    style: n
  }}><Col {...{
      span: 6
    }}>{"更新时间"}</Col><Col {...{
      span: 18
    }}>{moment(1e3 * order.updated_at).format("YYYY-MM-DD HH:mm:ss")}</Col></Row>}
                            {order.invite_user_id && 3 === order.status ? <div>
                                    {<Divider></Divider>}
                                    {<Row {...{
      gutter: [16, 16],
      style: n
    }}><Col {...{
        span: 6
      }}>{"邀请人"}</Col><Col {...{
        span: 18
      }}><Tooltip {...{
          title: "查看TA邀请的人"
        }}><a onClick={() => onUserFilter("invite_by_email", "模糊", inviteUser.email)} href={"javascript:void(0);"}>
                                                    {inviteUser.email}
                                                </a></Tooltip></Col></Row>}
                                    {<Row {...{
      gutter: [16, 16],
      style: n
    }}><Col {...{
        span: 6
      }}>{"佣金金额"}</Col><Col {...{
        span: 18
      }}>{(order.commission_balance / 100).toFixed(2)}</Col></Row>}
                                    {order.actual_commission_balance && <Row {...{
      gutter: [16, 16],
      style: n
    }}><Col {...{
        span: 6
      }}>{"实际发放"}</Col><Col {...{
        span: 18
      }}>{(order.actual_commission_balance / 100).toFixed(2)}</Col></Row>}
                                    {<Row {...{
      gutter: [16, 16],
      style: n
    }}><Col {...{
        span: 6
      }}>{"佣金状态"}</Col><Col {...{
        span: 18
      }}>{settings.commissionStatusText[order.commission_status]}</Col></Row>}
                                </div> : ""}
                        </div> : <Icon {...{
  type: "loading",
  style: {
    fontSize: 24,
    color: "#415A94"
  }
}}></Icon>;}
