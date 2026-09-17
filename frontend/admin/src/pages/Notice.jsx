import React from 'react';
import MainLayout from '../layouts/MainLayout.jsx';
import { c as connect } from '../vendor/reactRedux.js';
import { a as Modal } from '../vendor/Modal.js';
import { a as Select } from '../vendor/modules/32664d37.js';
import { a as Input } from '../vendor/modules/35724567.js';
import { a as Table } from '../vendor/modules/7743416a.js';
import { a as Button } from '../vendor/modules/322f5270.js';
import { a as Icon } from '../vendor/Icon.js';
import { a as Divider } from '../vendor/Divider.js';
import { a as Switch } from '../vendor/modules/53646330.js';
import { a as LoadingContainer } from '../vendor/modules/76333265.js';
import { a as mergeProps } from '../vendor/modules/70307045.js';
import { createReadonlyNoticeColumns } from '../components/NoticeDisplayColumns.jsx';
import '../vendor/modules/32717463.js';
import '../vendor/modules/4f614579.js';
import '../vendor/modules/354e4461.js';
import '../vendor/modules/67395956.js';
import '../vendor/modules/2b4c3642.js';
import '../vendor/iconStyles.js';
import '../vendor/modules/2f7a7346.js';
import '../vendor/modules/426f5337.js';
import '../vendor/modules/77642f52.js';

const readonlyColumns = createReadonlyNoticeColumns();
class NoticePage extends React.Component {
  constructor(props) {
    super(props), this.state = {
      visible: !1,
      submit: {},
      notices: []
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "notice/fetch"
    });
  }
  modalVisible() {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.state.visible || this.setState({
        submit: {}
      });
    });
  }
  save() {
    this.props.dispatch({
      type: "notice/save",
      params: mergeProps({}, this.state.submit),
      callback: () => {
        this.modalVisible();
      }
    });
  }
  drop(notice) {
    this.props.dispatch({
      type: "notice/drop",
      id: notice.id
    });
  }
  render() {
    var noticeState = this.props.notice,
      notices = noticeState.notices,
      fetchLoading = noticeState.fetchLoading,
      columns = [readonlyColumns["id"], {
        title: "显示",
        dataIndex: "show",
        key: "show",
        render: (value, record) => {
          return React.createElement(Switch, {
            size: "small",
            onChange: () => this.props.dispatch({
              type: "notice/show",
              id: record.id
            }),
            checked: value
          });
        }
      }, readonlyColumns["title"], readonlyColumns["created_at"], {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        fixed: "right",
        render: (value, record, index) => {
          return <div>
                                <a onClick={() => this.setState({
              submit: notices[index]
            }, () => this.modalVisible())} href={"javascript:void(0);"}>
                                    {"编辑"}
                                </a>
                                {React.createElement(Divider, {
              type: "vertical"
            })}
                                <a onClick={() => this.drop(record)} href={"javascript:void(0);"}>
                                    {"删除"}
                                </a>
                            </div>;
        }
      }];
    return React.createElement(MainLayout, mergeProps({}, this.props, {
      title: "公告管理"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, React.createElement(LoadingContainer, {
      loading: fetchLoading
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {React.createElement(Button, {
            onClick: () => this.modalVisible()
          }, React.createElement(Icon, {
            type: "plus"
          }), " 添加公告")}
                        </div>
                        {React.createElement(Table, {
          tableLayout: "auto",
          dataSource: notices,
          pagination: !1,
          columns,
          scroll: {
            x: 950
          }
        })}
                    </div>
                </div>), React.createElement(Modal, {
      title: "".concat(this.state.submit.id ? "编辑公告" : "新建公告"),
      visible: this.state.visible,
      onCancel: () => this.modalVisible(),
      onOk: () => this.state.saveLoading || this.save(),
      okText: this.state.saveLoading ? React.createElement(Icon, {
        type: "loading"
      }) : "提交",
      cancelText: "取消"
    }, <div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>{"标题"}</label>
                        {React.createElement(Input, {
          placeholder: "请输入公告标题",
          value: this.state.submit.title,
          onChange: e => {
            this.setState({
              submit: mergeProps({}, this.state.submit, {
                title: e.target.value
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"公告内容"}
                        </label>
                        {React.createElement(Input.TextArea, {
          rows: 12,
          value: this.state.submit.content,
          placeholder: "请输入公告内容",
          onChange: e => {
            this.setState({
              submit: mergeProps({}, this.state.submit, {
                content: e.target.value
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor={"example-text-input-alt"}>
                            {"公告标签"}
                        </label>
                        {React.createElement(Select, {
          mode: "tags",
          value: this.state.submit.tags || [],
          style: {
            width: "100%"
          },
          placeholder: "输入后回车添加标签",
          onChange: e => {
            this.setState({
              submit: mergeProps({}, this.state.submit, {
                tags: e.length > 0 ? e : null
              })
            });
          }
        })}
                    </div>
                    <div className={"form-group"}>
                        <label for={"example-text-input-alt"}>
                            {"图片URL"}
                        </label>
                        {React.createElement(Input, {
          placeholder: "请输入图片URL",
          value: this.state.submit.img_url,
          onChange: e => {
            this.setState({
              submit: mergeProps({}, this.state.submit, {
                img_url: e.target.value
              })
            });
          }
        })}
                    </div>
                </div>));
  }
}
export default connect(state => ({ notice: state.notice }))(NoticePage);
