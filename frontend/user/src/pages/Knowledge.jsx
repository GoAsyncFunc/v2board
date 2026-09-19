import React from 'react';
import { formatDate } from '../components/DateTimeDisplay.jsx';
import { Input } from '../vendor/ui.js';
import MainLayout from '../layouts/MainLayout.jsx';
import { c as connect } from '../vendor/reactRedux.js';
import { formatMessage, getLocale } from '../vendor/i18n.js';
import { Modal } from '../vendor/ui.js';
import { a as Icon } from '../vendor/Icon.js';
import { notification } from '../vendor/ui.js';
import { MarkdownIt } from '../vendor/utilities.js';
import { a as copyText } from '../vendor/siteHelpers.js';
import '../vendor/dateTime.js';

const markdownRenderer = new MarkdownIt({
    html: !0,
    linkify: !0,
    typographer: !0
  });
export class KnowledgeDetailModal extends React.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1
    };
  }
  componentDidMount() {
    this.props.autoOpen && this.show();
  }
  getKnowledge(id) {
    this.props.dispatch({
      type: "knowledge/fetchById",
      id: id,
      language: getLocale()
    });
  }
  show() {
    this.getKnowledge(this.props.id), this.setState({
      visible: !0
    }), window.copy = copied => {
      copyText(copied), notification.success(formatMessage({
        id: "复制成功"
      }));
    }, window.jump = targetId => {
      this.getKnowledge(targetId);
    };
  }
  hide() {
    this.props.dispatch({
      type: "knowledge/setState",
      payload: {
        knowledge: {}
      }
    }), this.setState({
      visible: !1
    }), window.copy = void 0, window.jump = void 0;
  }
  render() {
    var visible = this.state.visible,
      knowledgeState = this.props.knowledge,
      knowledge = knowledgeState.knowledge,
      fetchByIdLoading = knowledgeState.fetchByIdLoading;
    return React.createElement(React.Fragment, null, React.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), React.createElement(Modal, {
      visible: visible,
      title: knowledge.title || "Loading...",
      width: "80%",
      onClose: this.hide.bind(this)
    }, fetchByIdLoading ? React.createElement(Icon, {
      type: "loading"
    }) : <div className={"custom-html-style"} dangerouslySetInnerHTML={{
      __html: markdownRenderer.render(knowledge.body || "")
    }}></div>));
  }
}
const ConnectedKnowledgeDetailModal = connect(state => {
  var knowledge = state.knowledge;
  return {
    knowledge: knowledge
  };
})(KnowledgeDetailModal);
export class KnowledgePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "knowledge/fetch",
      language: getLocale()
    }), this.inputDelayTimer = void 0;
  }
  onSearch(keyword) {
    this.inputDelayTimer && clearTimeout(this.inputDelayTimer), this.inputDelayTimer = setTimeout(function () {
      this.inputDelayTimer = void 0, this.props.dispatch({
        type: "knowledge/fetch",
        language: getLocale(),
        keyword: keyword || void 0
      });
    }.bind(this), 300);
  }
  render() {
    var knowledgeState = this.props.knowledge,
      knowledges = knowledgeState.knowledges,
      fetchLoading = knowledgeState.fetchLoading,
      queryId = this.props.location.query.id;
    return React.createElement(MainLayout, {
      ...this.props,
      title: formatMessage({
        id: "使用文档"
      })
    }, <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"v2board-knowledge-search-bar"}>
                        {React.createElement(Input.Search, {
            onChange: event => {
              this.onSearch(event.target.value);
            },
            className: "mb-3",
            size: "large",
            enterButton: !0,
            placeholder: formatMessage({
              id: "搜索文档"
            })
          })}
                    </div>
                    {fetchLoading ? <div className={"spinner-grow text-primary"} role={"status"}>
                            <span className={"sr-only"}>{"Loading..."}</span>
                        </div> : Object.keys(knowledges).map(category => {
          return <div className={"row mb-3 mb-md-0"}>
                                    <div className={"col-md-12"}>
                                        <div className={"block block-rounded "}>
                                            <div className={"block-header block-header-default"}>
                                                <h3 className={"block-title"}>
                                                    {category}
                                                </h3>
                                            </div>
                                            <div className={"list-group"}>
                                                {knowledges[category] && knowledges[category].map(knowledgeItem => {
                    return React.createElement(ConnectedKnowledgeDetailModal, {
                      autoOpen: parseInt(queryId) === parseInt(knowledgeItem.id),
                      id: knowledgeItem.id
                    }, <a className={"list-group-item list-group-item-action"} style={{
                      borderRadius: "unset",
                      border: "unset",
                      borderBottom: "1px solid #e2e8f2"
                    }}>
                                                                <h5 className={"font-size-base mb-1"}>
                                                                    {knowledgeItem.title}
                                                                </h5>
                                                                <small>
                        {formatMessage({
                          id: "最后更新: {date}"
                        }, {
                          date: formatDate(knowledgeItem.updated_at)
                        })}
                                                                </small>
                                                            </a>);
                  })}
                                            </div>
                                        </div>
                                    </div>
                                </div>;
        })}
                </div>
            </main>);
  }
}
export default connect(state => {
  var knowledge = state.knowledge;
  return {
    knowledge
  };
})(KnowledgePage);
