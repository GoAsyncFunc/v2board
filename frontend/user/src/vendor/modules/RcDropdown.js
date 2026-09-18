var React = require("./reactRuntime.js");
var ReactDOM = require("./reactDomRuntime.js");
var PropTypes = require("./propTypesRuntime.js");
var classNames = require("./classNames.js");
var lifecycleCompat = require("./reactLifecyclesCompat.js");
var RcTrigger = require("./RcTrigger.js");
var placements = require("./dropdownPlacements.js");

class RcDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "visible" in props ? props.visible : props.defaultVisible
    };

    this.onClick = this.onClick.bind(this);
    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.getMenuElement = this.getMenuElement.bind(this);
    this.afterVisibleChange = this.afterVisibleChange.bind(this);
    this.saveTrigger = this.saveTrigger.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return "visible" in props ? { visible: props.visible } : null;
  }

  getOverlayElement() {
    return typeof this.props.overlay === "function" ? this.props.overlay() : this.props.overlay;
  }

  getMenuElementOrFactory() {
    return typeof this.props.overlay === "function" ? this.getMenuElement : this.getMenuElement();
  }

  getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  }

  getOpenClassName() {
    return this.props.openClassName !== undefined ? this.props.openClassName : this.props.prefixCls + "-open";
  }

  getMinOverlayWidthMatchTrigger() {
    if ("minOverlayWidthMatchTrigger" in this.props) return this.props.minOverlayWidthMatchTrigger;
    return !this.props.alignPoint;
  }

  onClick(event) {
    var overlayProps = this.getOverlayElement().props;
    if (!("visible" in this.props)) this.setState({ visible: false });
    if (this.props.onOverlayClick) this.props.onOverlayClick(event);
    if (overlayProps.onClick) overlayProps.onClick(event);
  }

  onVisibleChange(visible) {
    if (!("visible" in this.props)) this.setState({ visible: visible });
    this.props.onVisibleChange(visible);
  }

  getMenuElement() {
    var overlay = this.getOverlayElement();
    var extraProps = {
      prefixCls: this.props.prefixCls + "-menu",
      onClick: this.onClick
    };
    if (typeof overlay.type === "string") delete extraProps.prefixCls;
    return React.cloneElement(overlay, extraProps);
  }

  afterVisibleChange(visible) {
    if (visible && this.getMinOverlayWidthMatchTrigger()) {
      var overlayNode = this.getPopupDomNode();
      var rootNode = ReactDOM.findDOMNode(this);
      if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.minWidth = rootNode.offsetWidth + "px";
        var alignInstance = this.trigger && this.trigger._component && this.trigger._component.alignInstance;
        if (alignInstance) alignInstance.forceAlign();
      }
    }
  }

  saveTrigger(trigger) {
    this.trigger = trigger;
  }

  renderChildren() {
    var children = this.props.children;
    if (!this.state.visible || !children) return children;
    return React.cloneElement(children, {
      className: classNames(children.props && children.props.className, this.getOpenClassName())
    });
  }

  render() {
    var props = this.props;
    var triggerHideAction = props.hideAction;
    if (!triggerHideAction && props.trigger.indexOf("contextMenu") !== -1) triggerHideAction = ["click"];

    return React.createElement(RcTrigger, Object.assign({}, props, {
      prefixCls: props.prefixCls,
      ref: this.saveTrigger,
      popupClassName: props.overlayClassName,
      popupStyle: props.overlayStyle,
      builtinPlacements: placements,
      action: props.trigger,
      showAction: props.showAction,
      hideAction: triggerHideAction || [],
      popupPlacement: props.placement,
      popupAlign: props.align,
      popupTransitionName: props.transitionName,
      popupAnimation: props.animation,
      popupVisible: this.state.visible,
      afterPopupVisibleChange: this.afterVisibleChange,
      popup: this.getMenuElementOrFactory(),
      onPopupVisibleChange: this.onVisibleChange,
      getPopupContainer: props.getPopupContainer
    }), this.renderChildren());
  }
}

RcDropdown.propTypes = {
  minOverlayWidthMatchTrigger: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  onOverlayClick: PropTypes.func,
  prefixCls: PropTypes.string,
  children: PropTypes.any,
  transitionName: PropTypes.string,
  overlayClassName: PropTypes.string,
  openClassName: PropTypes.string,
  animation: PropTypes.any,
  align: PropTypes.object,
  overlayStyle: PropTypes.object,
  placement: PropTypes.string,
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  trigger: PropTypes.array,
  alignPoint: PropTypes.bool,
  showAction: PropTypes.array,
  hideAction: PropTypes.array,
  getPopupContainer: PropTypes.func,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool
};

RcDropdown.defaultProps = {
  prefixCls: "rc-dropdown",
  trigger: ["hover"],
  showAction: [],
  overlayClassName: "",
  overlayStyle: {},
  defaultVisible: false,
  onVisibleChange: function onVisibleChange() {},
  placement: "bottomLeft"
};

lifecycleCompat.polyfill(RcDropdown);
exports["a"] = RcDropdown;
