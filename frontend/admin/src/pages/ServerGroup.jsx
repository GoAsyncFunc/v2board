const {
  createReadonlyServerGroupColumns
} = require('../components/ServerGroupDisplayColumns.jsx');
const readonlyColumns = createReadonlyServerGroupColumns();
let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  i = interopDefault(r),
  o = (require("../vendor/modules/67395956.js"), require("../vendor/modules/7743416a.js")),
  a = (require("../vendor/modules/2b4c3642.js"), require("../vendor/modules/322f5270.js")),
  s = (require("../vendor/modules/2f7a7346.js"), require("../vendor/Divider.js")),
  l = (require("../vendor/iconStyles.js"), require("../vendor/Icon.js")),
  c = require("../vendor/modules/71317449.js"),
  u = interopDefault(c),
  h = require("../layouts/MainLayout.jsx"),
  f = require("../vendor/reactRedux.js"),
  d = require("../vendor/modules/387a4e6a.js"),
  p = require("../vendor/modules/76333265.js");
class m extends u.a.Component {
  constructor(e) {
    super(e), this.state = {
      group: [],
      submit: {},
      visible: !1
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "serverGroup/fetch"
    });
  }
  drop(e) {
    this.props.dispatch({
      type: "serverGroup/drop",
      id: e
    });
  }
  modalVisible() {
    this.setState({
      visible: !this.state.visible,
      submit: {}
    });
  }
  render() {
    var e = this.props.serverGroup,
      t = e.groups,
      n = e.fetchLoading,
      r = [readonlyColumns["id"], readonlyColumns["name"], readonlyColumns["user_count"], readonlyColumns["server_count"], {
        title: "操作",
        dataIndex: "action",
        key: "action",
        align: "right",
        render: (e, t) => {
          return <div>
                                {u.a.createElement(d["a"], {
              record: t,
              key: t.id
            }, <a href={"javascript:void(0);"}>
                                        {"编辑"}
                                    </a>)}
                                {u.a.createElement(s["a"], {
              type: "vertical"
            })}
                                <a href={"javascript:void(0);"} onClick={() => this.drop(t.id)}>
                                    {"删除"}
                                </a>
                            </div>;
        }
      }];
    return u.a.createElement(h["a"], i()({}, this.props, {
      title: "权限组管理"
    }), <div className={"d-flex justify-content-between align-items-center"}></div>, u.a.createElement(p["a"], {
      loading: n
    }, <div className={"block block-rounded"}>
                    <div className={"bg-white"}>
                        <div style={{
          padding: 15
        }}>
                            {u.a.createElement(d["a"], null, u.a.createElement(a["a"], {
            onClick: () => this.modalVisible()
          }, u.a.createElement(l["a"], {
            type: "plus"
          }), " 添加权限组"))}
                        </div>
                        {u.a.createElement(o["a"], {
          tableLayout: "auto",
          columns: r,
          dataSource: t,
          pagination: !1
        })}
                    </div>
                </div>));
  }
}
legacyExports["default"] = Object(f["c"])(e => {
  var t = e.serverGroup;
  return {
    serverGroup: t
  };
})(m);
