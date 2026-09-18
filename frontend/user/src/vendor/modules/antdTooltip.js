"use strict";

const React = require("./reactRuntime.js");
const { polyfill } = require("./reactLifecyclesCompat.js");
const RcTooltip = require("./RcTooltip.js").a;
const classNames = require("./classNames.js");
const getTooltipPlacements = require("./antdTooltipPlacements.js").default;
const ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;

function splitObject(source, keys) {
  const picked = {};
  const omitted = Object.assign({}, source);

  keys.forEach(key => {
    if (source && key in source) {
      picked[key] = source[key];
      delete omitted[key];
    }
  });

  return { picked, omitted };
}

function getDisabledCompatibleChildren(element) {
  const elementType = element.type;
  const isAntControl = elementType.__ANT_BUTTON === true
    || elementType.__ANT_SWITCH === true
    || elementType.__ANT_CHECKBOX === true;

  if (!(isAntControl || element.type === "button") || !element.props.disabled) {
    return element;
  }

  const { picked, omitted } = splitObject(element.props.style, [
    "position",
    "left",
    "right",
    "top",
    "bottom",
    "float",
    "display",
    "zIndex"
  ]);
  const wrapperStyle = Object.assign({
    display: "inline-block"
  }, picked, {
    cursor: "not-allowed",
    width: element.props.block ? "100%" : null
  });
  const childStyle = Object.assign({}, omitted, {
    pointerEvents: "none"
  });
  const child = React.cloneElement(element, {
    style: childStyle,
    className: null
  });

  return React.createElement("span", {
    style: wrapperStyle,
    className: element.props.className
  }, child);
}

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.onVisibleChange = visible => {
      const { onVisibleChange } = this.props;
      if (!("visible" in this.props)) {
        this.setState({
          visible: !this.isNoTitle() && visible
        });
      }
      if (onVisibleChange && !this.isNoTitle()) {
        onVisibleChange(visible);
      }
    };

    this.saveTooltip = node => {
      this.tooltip = node;
    };

    this.onPopupAlign = (domNode, align) => {
      const placements = this.getPlacements();
      const placement = Object.keys(placements).find(key => (
        placements[key].points[0] === align.points[0]
        && placements[key].points[1] === align.points[1]
      ));
      if (!placement) {
        return;
      }

      const rect = domNode.getBoundingClientRect();
      const transformOrigin = {
        top: "50%",
        left: "50%"
      };
      if (placement.indexOf("top") >= 0 || placement.indexOf("Bottom") >= 0) {
        transformOrigin.top = `${rect.height - align.offset[1]}px`;
      } else if (placement.indexOf("Top") >= 0 || placement.indexOf("bottom") >= 0) {
        transformOrigin.top = `${-align.offset[1]}px`;
      }
      if (placement.indexOf("left") >= 0 || placement.indexOf("Right") >= 0) {
        transformOrigin.left = `${rect.width - align.offset[0]}px`;
      } else if (placement.indexOf("right") >= 0 || placement.indexOf("Left") >= 0) {
        transformOrigin.left = `${-align.offset[0]}px`;
      }
      domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
    };

    this.renderTooltip = config => {
      const {
        getPopupContainer: getContextPopupContainer,
        getPrefixCls
      } = config;
      const {
        prefixCls: customPrefixCls,
        openClassName,
        getPopupContainer,
        getTooltipContainer,
        children
      } = this.props;
      const prefixCls = getPrefixCls("tooltip", customPrefixCls);
      const visible = !("visible" in this.props) && this.isNoTitle()
        ? false
        : this.state.visible;
      const child = getDisabledCompatibleChildren(
        React.isValidElement(children) ? children : React.createElement("span", null, children)
      );
      const childClassName = classNames(
        child.props.className,
        openClassName || `${prefixCls}-open`
      );

      return React.createElement(RcTooltip, Object.assign({}, this.props, {
        prefixCls,
        getTooltipContainer: getPopupContainer || getTooltipContainer || getContextPopupContainer,
        ref: this.saveTooltip,
        builtinPlacements: this.getPlacements(),
        overlay: this.getOverlay(),
        visible,
        onVisibleChange: this.onVisibleChange,
        onPopupAlign: this.onPopupAlign
      }), visible ? React.cloneElement(child, {
        className: childClassName
      }) : child);
    };

    this.state = {
      visible: !!props.visible || !!props.defaultVisible
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return "visible" in nextProps ? { visible: nextProps.visible } : null;
  }

  getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  }

  getPlacements() {
    const {
      builtinPlacements,
      arrowPointAtCenter,
      autoAdjustOverflow
    } = this.props;
    return builtinPlacements || getTooltipPlacements({
      arrowPointAtCenter,
      verticalArrowShift: 8,
      autoAdjustOverflow
    });
  }

  isNoTitle() {
    const { title, overlay } = this.props;
    return !title && !overlay && title !== 0;
  }

  getOverlay() {
    const { title, overlay } = this.props;
    return title === 0 ? title : overlay || title || "";
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderTooltip);
  }
}

Tooltip.defaultProps = {
  placement: "top",
  transitionName: "zoom-big-fast",
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true
};

polyfill(Tooltip);

exports.__esModule = true;
exports.default = Tooltip;
exports.a = Tooltip;
