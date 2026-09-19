"use strict";

const React = require("./reactRuntime.js");
const PropTypes = require("./propTypesRuntime.js");
const RcSubMenu = require("./SubMenu.js").default;
const classNames = require("./classNames.js");
const MenuContext = require("./antdMenuContext.js");

class AntdSubMenu extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = event => {
      this.subMenu.onKeyDown(event);
    };

    this.saveSubMenu = subMenu => {
      this.subMenu = subMenu;
    };
  }

  render() {
    const { rootPrefixCls, popupClassName } = this.props;
    return React.createElement(MenuContext.Consumer, null, context => (
      React.createElement(RcSubMenu, Object.assign({}, this.props, {
        ref: this.saveSubMenu,
        popupClassName: classNames(
          `${rootPrefixCls}-${context.antdMenuTheme}`,
          popupClassName
        )
      }))
    ));
  }
}

AntdSubMenu.contextTypes = {
  antdMenuTheme: PropTypes.string
};
AntdSubMenu.isSubMenu = 1;

module.exports = AntdSubMenu;
