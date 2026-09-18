import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { c as connect } from '../vendor/reactRedux.js';
import { a as Table } from '../vendor/modules/antdTable.js';
import { a as Input } from '../vendor/modules/35724567.js';
import { a as Radio } from '../vendor/modules/39794836.js';
import { a as Divider } from '../vendor/Divider.js';
import { a as Badge } from '../vendor/modules/4b725473.js';
import { a as LoadingContainer } from '../vendor/modules/76333265.js';
import { a as mergeProps } from '../vendor/modules/6a65685a.js';
import { createReadonlyTicketColumns } from '../components/TicketDisplayColumns.jsx';
import '../vendor/modules/67395956.js';
import '../vendor/modules/354e4461.js';
import '../vendor/modules/374b616b.js';
import '../vendor/modules/2f7a7346.js';
import '../vendor/modules/41776870.js';
import '../vendor/modules/77642f52.js';

class TicketPage extends React.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1,
      submit: {
        level: 1
      }
    }, this.onSearchTimeout = void 0;
  }
  componentDidMount() {
    this.props.dispatch({
      type: "ticket/fetch"
    });
  }
  close(ticketId) {
    this.props.dispatch({
      type: "ticket/close",
      id: ticketId
    });
  }
  tableOnChange(pagination, filters) {
    this.props.dispatch({
      type: "ticket/filter",
      pagination,
      filter: filters
    });
  }
  filter(field, value) {
    this.props.dispatch({
      type: "ticket/filter",
      filter: {
        [field]: value
      },
      pagination: {
        pageSize: 10,
        current: 1
      }
    });
  }
  toChat(ticketId) {
    var target = window.location.origin + window.location.pathname + "#/ticket/" + ticketId;
    -1 === window.navigator.userAgent.toLowerCase().indexOf("mobile") && -1 === window.navigator.userAgent.toLowerCase().indexOf("ipad") ? window.open(target, "_blank", "height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no") : window.location.href = target;
  }
  onSearch(field, value) {
    clearTimeout(this.onSearchTimeout), this.onSearchTimeout = setTimeout(() => {
      this.props.dispatch({
        type: "ticket/filter",
        filter: {
          [field]: value
        },
        pagination: {
          pageSize: 10,
          current: 1
        }
      });
    }, 300);
  }
  render() {
    var ticketState = this.props.ticket,
      tickets = ticketState.tickets,
      fetchLoading = ticketState.fetchLoading,
      pagination = ticketState.pagination,
      filterState = ticketState.filter,
      levels = ["低", "中", "高"],
      readonly = createReadonlyTicketColumns(levels),
      columns = [readonly.id, readonly.subject, readonly.level, {
        title: "工单状态",
        dataIndex: "reply_status",
        key: "reply_status",
        filters: 1 !== filterState.status && [{
          text: "已回复",
          value: 1
        }, {
          text: "待回复",
          value: 0
        }],
        render: (e, t) => {
          return 1 === t.status ? <span>
                                {React.createElement(Badge, {
              status: "success"
            })}
                                {"已关闭"}
                            </span> : <span>
                                {React.createElement(Badge, {
              status: e ? "processing" : "error"
            })}
                                {e ? "已回复" : "待回复"}
                            </span>;
        }
      }, readonly.created_at, readonly.updated_at, {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (e, t) => {
          return <div>
                                <a href={"javascript:void(0);"} onClick={() => this.toChat(t.id)}>
                                    {"查看"}
                                </a>
                                {React.createElement(Divider, {
              type: "vertical"
            })}
                                <a disabled={t.status} href={"javascript:void(0);"} onClick={() => this.close(t.id)}>
                                    {"关闭"}
                                </a>
                            </div>;
        }
      }];
    return React.createElement(MainLayout, mergeProps({}, this.props, {
      title: "工单管理"
    }), React.createElement(LoadingContainer, {
      loading: fetchLoading
    }, <div className={"block border-bottom"}>
                    <div className={"bg-white"}>
                        <div className={"p-3"}>
                            {React.createElement(Radio["Group"], {
            value: filterState.status,
            onChange: e => this.filter("status", e.target.value)
          }, React.createElement(Radio["Button"], {
            value: 0
          }, "已开启"), React.createElement(Radio["Button"], {
            value: 1
          }, "已关闭"))}
                            <div style={{
            float: "right"
          }}>
                                {React.createElement(Input, {
              placeholder: "输入邮箱搜索",
              onChange: event => this.onSearch("email", event.target.value)
            })}
                            </div>
                        </div>
                        {React.createElement(Table, {
          tableLayout: "auto",
          dataSource: tickets,
          pagination: mergeProps({}, pagination, {
            size: "small"
          }),
          columns,
          scroll: {
            x: 900
          },
          onChange: (pagination, filters) => this.tableOnChange(pagination, filters)
        })}
                    </div>
                </div>));
  }
}
export default connect(state => {
  return { ticket: state.ticket };
})(TicketPage);
