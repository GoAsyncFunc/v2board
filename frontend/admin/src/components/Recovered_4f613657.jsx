let legacyModule = module,
    legacyExports = exports;
const { defineExport, interopDefault } = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
defineExport(legacyExports, "a", function () {
    return l;
});
require("../vendor/modules/67395956.js");
var r = require("../vendor/modules/7743416a.js"),
    i = require("../vendor/modules/6a65685a.js"),
    o = interopDefault(i),
    a = require("../vendor/modules/71317449.js"),
    s = interopDefault(a);
(require("./Recovered_48394c55.jsx"),
    require("./Recovered_33585647.jsx"),
    require("./Recovered_796b4332.jsx"),
    require("../layouts/MainLayout.jsx"));
class l extends s.a.Component {
    render() {
        return s.a.createElement(
            s.a.Fragment,
            null,
            s.a.createElement(
                r["a"],
                o()({}, this.props, {
                    onRow: (e, t) => {
                        if (!this.props.disableRightClick)
                            return {
                                onClick: (e) => {
                                    this.props.onContextMenu &&
                                        (this.props.onContextMenu(void 0),
                                        (document.getElementById(
                                            "v2board-table-dropdown",
                                        ).style = "display:none;"));
                                },
                                onDoubleClick: (e) => {},
                                onContextMenu: (t) => {
                                    this.props.onContextMenu &&
                                        (t.preventDefault(),
                                        this.forceUpdate(),
                                        this.props.onContextMenu &&
                                            this.props.onContextMenu(e),
                                        (document.getElementById(
                                            "v2board-table-dropdown",
                                        ).style = "top: "
                                            .concat(t.clientY, "px; left: ")
                                            .concat(
                                                t.clientX,
                                                "px;display:unset;",
                                            )));
                                },
                                onMouseEnter: (e) => {},
                                onMouseLeave: (e) => {},
                            };
                    },
                }),
            ),
            <div
                id={"v2board-table-dropdown"}
                className={"ant-dropdown ant-dropdown-placement-bottomLeft"}
                style={{
                    display: "none",
                    position: "fixed",
                    top: 0,
                    left: 0,
                }}
                onClick={() => {
                    this.props.onContextMenu &&
                        (document.getElementById(
                            "v2board-table-dropdown",
                        ).style = "display:none;");
                }}
            >
                {this.props.children}
            </div>,
        );
    }
}
