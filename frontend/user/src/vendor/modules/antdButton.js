"use strict";

const React = require("./reactRuntime.js");
const PropTypes = require("./propTypesRuntime.js");
const classNames = require("./classNames.js");
const { polyfill } = require("./reactLifecyclesCompat.js");
const omitProps = require("./omitProps.js").a;
const Icon = require("../Icon.js").a;
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;
const Wave = require("./Wave.js").a;
const tuple = require("./tuple.js").a;

const twoChineseCharactersPattern = /^[\u4e00-\u9fa5]{2}$/;
const isTwoChineseCharacters = twoChineseCharactersPattern.test.bind(twoChineseCharactersPattern);

function insertSpace(child, shouldInsertSpace) {
  if (child == null) {
    return undefined;
  }

  const space = shouldInsertSpace ? " " : "";
  const isDomElement = typeof child !== "string"
    && typeof child !== "number"
    && typeof child.type === "string";

  if (isDomElement && isTwoChineseCharacters(child.props.children)) {
    return React.cloneElement(child, {}, child.props.children.split("").join(space));
  }
  if (typeof child === "string") {
    const content = isTwoChineseCharacters(child) ? child.split("").join(space) : child;
    return React.createElement("span", null, content);
  }
  return child;
}

function spaceChildren(children, shouldInsertSpace) {
  let previousChildWasText = false;
  const childList = [];

  React.Children.forEach(children, child => {
    const isText = typeof child === "string" || typeof child === "number";
    if (previousChildWasText && isText) {
      const lastIndex = childList.length - 1;
      childList[lastIndex] = `${childList[lastIndex]}${child}`;
    } else {
      childList.push(child);
    }
    previousChildWasText = isText;
  });

  return React.Children.map(childList, child => insertSpace(child, shouldInsertSpace));
}

const buttonShapes = tuple("circle", "circle-outline", "round");
const buttonSizes = tuple("large", "default", "small");
const buttonHtmlTypes = tuple("submit", "button", "reset");

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.saveButtonRef = node => {
      this.buttonNode = node;
    };

    this.handleClick = event => {
      if (!this.state.loading && this.props.onClick) {
        this.props.onClick(event);
      }
    };

    this.renderButton = config => {
      const { getPrefixCls, autoInsertSpaceInButton } = config;
      const {
        prefixCls: customPrefixCls,
        type,
        shape,
        size,
        className,
        children,
        icon,
        ghost,
        block,
        ...rest
      } = this.props;
      const { loading, hasTwoCNChar } = this.state;
      const prefixCls = getPrefixCls("btn", customPrefixCls);
      const autoInsertSpace = autoInsertSpaceInButton !== false;
      const sizeClassName = size === "large" ? "lg" : size === "small" ? "sm" : "";
      const iconType = loading ? "loading" : icon;
      const buttonClassName = classNames(prefixCls, className, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-${sizeClassName}`]: sizeClassName,
        [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
        [`${prefixCls}-loading`]: !!loading,
        [`${prefixCls}-background-ghost`]: ghost,
        [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
        [`${prefixCls}-block`]: block
      });
      const iconNode = iconType ? React.createElement(Icon, { type: iconType }) : null;
      const childNodes = children || children === 0
        ? spaceChildren(children, this.isNeedInserted() && autoInsertSpace)
        : null;
      const linkProps = omitProps(rest, ["htmlType", "loading"]);

      if (linkProps.href !== undefined) {
        return React.createElement("a", Object.assign({}, linkProps, {
          className: buttonClassName,
          onClick: this.handleClick,
          ref: this.saveButtonRef
        }), iconNode, childNodes);
      }

      const { htmlType, ...otherProps } = rest;
      const buttonNode = React.createElement("button", Object.assign(
        {},
        omitProps(otherProps, ["loading"]),
        {
          type: htmlType,
          className: buttonClassName,
          onClick: this.handleClick,
          ref: this.saveButtonRef
        }
      ), iconNode, childNodes);

      return type === "link" ? buttonNode : React.createElement(Wave, null, buttonNode);
    };

    this.state = {
      loading: props.loading,
      hasTwoCNChar: false
    };
  }

  componentDidMount() {
    this.fixTwoChineseCharacters();
  }

  componentDidUpdate(previousProps) {
    this.fixTwoChineseCharacters();

    if (previousProps.loading && typeof previousProps.loading !== "boolean") {
      clearTimeout(this.delayTimeout);
    }

    const { loading } = this.props;
    if (loading && typeof loading !== "boolean" && loading.delay) {
      this.delayTimeout = window.setTimeout(() => {
        this.setState({ loading });
      }, loading.delay);
    } else if (previousProps.loading !== loading) {
      this.setState({ loading });
    }
  }

  componentWillUnmount() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  fixTwoChineseCharacters() {
    if (!this.buttonNode) {
      return;
    }

    const shouldMark = this.isNeedInserted()
      && isTwoChineseCharacters(this.buttonNode.textContent);
    if (shouldMark !== this.state.hasTwoCNChar) {
      this.setState({ hasTwoCNChar: shouldMark });
    }
  }

  isNeedInserted() {
    const { icon, children, type } = this.props;
    return React.Children.count(children) === 1 && !icon && type !== "link";
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderButton);
  }
}

Button.__ANT_BUTTON = true;
Button.defaultProps = {
  loading: false,
  ghost: false,
  block: false,
  htmlType: "button"
};
Button.propTypes = {
  type: PropTypes.string,
  shape: PropTypes.oneOf(buttonShapes),
  size: PropTypes.oneOf(buttonSizes),
  htmlType: PropTypes.oneOf(buttonHtmlTypes),
  onClick: PropTypes.func,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  className: PropTypes.string,
  icon: PropTypes.string,
  block: PropTypes.bool,
  title: PropTypes.string
};

polyfill(Button);

function ButtonGroup(props) {
  return React.createElement(ConfigConsumer, null, config => {
    const {
      prefixCls: customPrefixCls,
      size,
      className,
      ...restProps
    } = props;
    const prefixCls = config.getPrefixCls("btn-group", customPrefixCls);
    const sizeClassName = size === "large" ? "lg" : size === "small" ? "sm" : "";
    const groupClassName = classNames(prefixCls, {
      [`${prefixCls}-${sizeClassName}`]: sizeClassName
    }, className);

    return React.createElement("div", Object.assign({}, restProps, {
      className: groupClassName
    }));
  });
}

Button.Group = ButtonGroup;

exports.__esModule = true;
exports.default = Button;
exports.a = Button;
