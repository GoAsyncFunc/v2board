var React = require("./reactRuntime.js");
var PropTypes = require("./propTypesRuntime.js");
var RcTrigger = require("./RcTrigger.js");
var placements = require("./tooltipPlacements.js")["a"];
var TooltipContent = require("./TooltipContent.js");

class RcTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.getPopupElement = this.getPopupElement.bind(this);
    this.saveTrigger = this.saveTrigger.bind(this);
  }

  getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  }

  getPopupElement() {
    return [React.createElement("div", {
      className: this.props.prefixCls + "-arrow",
      key: "arrow"
    }, this.props.arrowContent), React.createElement(TooltipContent, {
      key: "content",
      trigger: this.trigger,
      prefixCls: this.props.prefixCls,
      id: this.props.id,
      overlay: this.props.overlay
    })];
  }

  saveTrigger(trigger) {
    this.trigger = trigger;
  }

  render() {
    var props = this.props;
    var triggerProps = Object.assign({}, props, {
      popupClassName: props.overlayClassName,
      ref: this.saveTrigger,
      prefixCls: props.prefixCls,
      popup: this.getPopupElement,
      action: props.trigger,
      builtinPlacements: placements,
      popupPlacement: props.placement,
      popupAlign: props.align,
      getPopupContainer: props.getTooltipContainer,
      onPopupVisibleChange: props.onVisibleChange,
      afterPopupVisibleChange: props.afterVisibleChange,
      popupTransitionName: props.transitionName,
      popupAnimation: props.animation,
      defaultPopupVisible: props.defaultVisible,
      destroyPopupOnHide: props.destroyTooltipOnHide,
      mouseLeaveDelay: props.mouseLeaveDelay,
      popupStyle: props.overlayStyle,
      mouseEnterDelay: props.mouseEnterDelay
    });
    if ("visible" in props) triggerProps.popupVisible = props.visible;
    return React.createElement(RcTrigger, triggerProps, props.children);
  }
}

RcTooltip.propTypes = {
  trigger: PropTypes.any,
  children: PropTypes.any,
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  placement: PropTypes.string,
  transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  animation: PropTypes.any,
  onVisibleChange: PropTypes.func,
  afterVisibleChange: PropTypes.func,
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  overlayStyle: PropTypes.object,
  overlayClassName: PropTypes.string,
  prefixCls: PropTypes.string,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  getTooltipContainer: PropTypes.func,
  destroyTooltipOnHide: PropTypes.bool,
  align: PropTypes.object,
  arrowContent: PropTypes.any,
  id: PropTypes.string
};

RcTooltip.defaultProps = {
  prefixCls: "rc-tooltip",
  mouseEnterDelay: 0,
  destroyTooltipOnHide: false,
  mouseLeaveDelay: 0.1,
  align: {},
  placement: "right",
  trigger: ["hover"],
  arrowContent: null
};

exports["a"] = RcTooltip;
