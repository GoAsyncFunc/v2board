let legacyModule = module,
    legacyExports = exports;
const { defineExport, interopDefault } = require("../app/moduleInterop.js");
const React = require("../vendor/modules/reactRuntime.js");
defineExport(legacyExports, "a", function () {
    return ContextMenuTable;
});
require("../vendor/modules/67395956.js");
var tableModule = require("../vendor/modules/antdTable.js"),
    objectAssignModule = require("../vendor/modules/6a65685a.js"),
    objectAssign = interopDefault(objectAssignModule),
    reactModule = require("../vendor/modules/reactRuntime.js"),
    ReactComponent = interopDefault(reactModule);
(require("./Recovered_48394c55.jsx"),
    require("./Recovered_33585647.jsx"),
    require("./Recovered_796b4332.jsx"),
    require("../layouts/MainLayout.jsx"));
class ContextMenuTable extends ReactComponent.a.Component {
    render() {
        return ReactComponent.a.createElement(
            ReactComponent.a.Fragment,
            null,
            ReactComponent.a.createElement(
                tableModule["a"],
                objectAssign()({}, this.props, {
                    onRow: (record, rowIndex) => {
                        if (!this.props.disableRightClick)
                            return {
                                onClick: (event) => {
                                    this.props.onContextMenu &&
                                        (this.props.onContextMenu(void 0),
                                        (document.getElementById(
                                            "v2board-table-dropdown",
                                        ).style = "display:none;"));
                                },
                                onDoubleClick: (event) => {},
                                onContextMenu: (event) => {
                                    this.props.onContextMenu &&
                                        (event.preventDefault(),
                                        this.forceUpdate(),
                                        this.props.onContextMenu &&
                                            this.props.onContextMenu(record),
                                        (document.getElementById(
                                            "v2board-table-dropdown",
                                        ).style = "top: "
                                            .concat(event.clientY, "px; left: ")
                                            .concat(
                                                event.clientX,
                                                "px;display:unset;",
                                            )));
                                },
                                onMouseEnter: (event) => {},
                                onMouseLeave: (event) => {},
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
