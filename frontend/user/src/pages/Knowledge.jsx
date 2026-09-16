const {
  formatDate
} = require('../components/DateTimeDisplay.jsx');
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var mergePropsModule = require("../vendor/modules/6a65685a.js"),
  mergeProps = interopDefault(mergePropsModule),
  inputControl = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  reactModule = require("../vendor/modules/71317449.js"),
  ReactComponent = interopDefault(reactModule),
  mainLayout = require("../layouts/MainLayout.jsx"),
  reactRedux = require("../vendor/reactRedux.js"),
  i18n = require("../vendor/i18n.js"),
  momentModule = require("../vendor/modules/77642f52.js"),
  moment = interopDefault(momentModule),
  modal = (require("../vendor/modules/62627350.js"), require("../vendor/modules/2f774774.js")),
  icon = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  notification = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js")),
  markdownModule = require("../vendor/modules/314d3348.js"),
  MarkdownIt = interopDefault(markdownModule),
  siteHelpers = require("../vendor/siteHelpers.js"),
  markdownRenderer = new MarkdownIt.a({
    html: !0,
    linkify: !0,
    typographer: !0
  });
class KnowledgeDetailModal extends ReactComponent.a.Component {
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
      language: Object(i18n["getLocale"])()
    });
  }
  show() {
    this.getKnowledge(this.props.id), this.setState({
      visible: !0
    }), window.copy = copied => {
      Object(siteHelpers["a"])(copied), notification["a"].success(Object(i18n["formatMessage"])({
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
    return ReactComponent.a.createElement(ReactComponent.a.Fragment, null, ReactComponent.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), ReactComponent.a.createElement(modal["a"], {
      visible: visible,
      title: knowledge.title || "Loading...",
      width: "80%",
      onClose: this.hide.bind(this)
    }, fetchByIdLoading ? ReactComponent.a.createElement(icon["a"], {
      type: "loading"
    }) : <div className={"custom-html-style"} dangerouslySetInnerHTML={{
      __html: markdownRenderer.render(knowledge.body || "")
    }}></div>));
  }
}
var ConnectedKnowledgeDetailModal = Object(reactRedux["c"])(state => {
  var knowledge = state.knowledge;
  return {
    knowledge: knowledge
  };
})(KnowledgeDetailModal);
class KnowledgePage extends ReactComponent.a.Component {
  componentDidMount() {
    this.props.dispatch({
      type: "knowledge/fetch",
      language: Object(i18n["getLocale"])()
    }), this.inputDelayTimer = void 0;
  }
  onSearch(keyword) {
    this.inputDelayTimer && clearTimeout(this.inputDelayTimer), this.inputDelayTimer = setTimeout(function () {
      this.inputDelayTimer = void 0, this.props.dispatch({
        type: "knowledge/fetch",
        language: Object(i18n["getLocale"])(),
        keyword: keyword || void 0
      });
    }.bind(this), 300);
  }
  render() {
    var knowledgeState = this.props.knowledge,
      knowledges = knowledgeState.knowledges,
      fetchLoading = knowledgeState.fetchLoading,
      queryId = this.props.location.query.id;
    return ReactComponent.a.createElement(mainLayout["a"], mergeProps()({}, this.props, {
      title: Object(i18n["formatMessage"])({
        id: "使用文档"
      })
    }), <main id={"main-container"}>
                <div className={"content content-full"}>
                    <div className={"v2board-knowledge-search-bar"}>
                        {ReactComponent.a.createElement(inputControl["a"].Search, {
            onChange: event => {
              this.onSearch(event.target.value);
            },
            className: "mb-3",
            size: "large",
            enterButton: !0,
            placeholder: Object(i18n["formatMessage"])({
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
                    return ReactComponent.a.createElement(ConnectedKnowledgeDetailModal, {
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
                                                                    {Object(i18n["formatMessage"])({
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
legacyExports["default"] = Object(reactRedux["c"])(state => {
  var knowledge = state.knowledge;
  return {
    knowledge
  };
})(KnowledgePage);
