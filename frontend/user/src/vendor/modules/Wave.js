var React = require("./reactRuntime.js");
var ReactDOM = require("./reactDomRuntime.js");
var animationEvents = require("./cssAnimationEvents.js");
var requestAnimationFrame = require("./requestAnimationFrame.js")["a"];
var ConfigConsumer = require("./ConfigContext.js").ConfigConsumer;

var waveStyleElement;

function isHidden(element) {
  return !element || element.offsetParent === null;
}

function isNotGrey(color) {
  var match = (color || "").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);
  return !(match && match[1] && match[2] && match[3]) || !(match[1] === match[2] && match[2] === match[3]);
}

class Wave extends React.Component {
  constructor(props) {
    super(props);
    this.animationStart = false;
    this.destroyed = false;

    this.onClick = this.onClick.bind(this);
    this.onTransitionStart = this.onTransitionStart.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.renderWave = this.renderWave.bind(this);
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    if (node && node.nodeType === 1) this.clickListener = this.bindAnimationEvent(node);
  }

  componentWillUnmount() {
    if (this.clickListener) this.clickListener.cancel();
    if (this.clickWaveTimeoutId) clearTimeout(this.clickWaveTimeoutId);
    this.destroyed = true;
  }

  getAttributeName() {
    return this.props.insertExtraNode ? "ant-click-animating" : "ant-click-animating-without-extra-node";
  }

  onClick(node, waveColor) {
    if (!node || isHidden(node) || node.className.indexOf("-leave") >= 0) return;

    this.extraNode = document.createElement("div");
    this.extraNode.className = "ant-click-animating-node";
    node.setAttribute(this.getAttributeName(), "true");
    waveStyleElement = waveStyleElement || document.createElement("style");

    if (waveColor && waveColor !== "#ffffff" && waveColor !== "rgb(255, 255, 255)" && isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && waveColor !== "transparent") {
      if (this.csp && this.csp.nonce) waveStyleElement.nonce = this.csp.nonce;
      this.extraNode.style.borderColor = waveColor;
      waveStyleElement.innerHTML = "[ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node { --antd-wave-shadow-color: " + waveColor + "; }";
      if (!document.body.contains(waveStyleElement)) document.body.appendChild(waveStyleElement);
    }

    if (this.props.insertExtraNode) node.appendChild(this.extraNode);
    animationEvents.addStartEventListener(node, this.onTransitionStart);
    animationEvents.addEndEventListener(node, this.onTransitionEnd);
  }

  onTransitionStart(event) {
    if (this.destroyed) return;
    var node = ReactDOM.findDOMNode(this);
    if ((!event || event.target === node) && !this.animationStart) this.resetEffect(node);
  }

  onTransitionEnd(event) {
    if (event && event.animationName === "fadeEffect") this.resetEffect(event.target);
  }

  bindAnimationEvent(node) {
    if (!node || !node.getAttribute || node.getAttribute("disabled") || node.className.indexOf("disabled") >= 0) return null;
    var component = this;
    function handleClick(event) {
      if (event.target.tagName === "INPUT" || isHidden(event.target)) return;
      component.resetEffect(node);
      var style = getComputedStyle(node);
      var waveColor = style.getPropertyValue("border-top-color") || style.getPropertyValue("border-color") || style.getPropertyValue("background-color");
      component.clickWaveTimeoutId = window.setTimeout(function startWave() {
        component.onClick(node, waveColor);
      }, 0);
      requestAnimationFrame.cancel(component.animationStartId);
      component.animationStart = true;
      component.animationStartId = requestAnimationFrame(function finishAnimationStart() {
        component.animationStart = false;
      }, 10);
    }
    node.addEventListener("click", handleClick, true);
    return {
      cancel: function cancel() {
        node.removeEventListener("click", handleClick, true);
      }
    };
  }

  resetEffect(node) {
    if (!node || node === this.extraNode || !(node instanceof Element)) return;
    node.setAttribute(this.getAttributeName(), "false");
    if (waveStyleElement) waveStyleElement.innerHTML = "";
    if (this.props.insertExtraNode && this.extraNode && node.contains(this.extraNode)) node.removeChild(this.extraNode);
    animationEvents.removeStartEventListener(node, this.onTransitionStart);
    animationEvents.removeEndEventListener(node, this.onTransitionEnd);
  }

  renderWave(config) {
    this.csp = config.csp;
    return this.props.children;
  }

  render() {
    return React.createElement(ConfigConsumer, null, this.renderWave);
  }
}

exports["a"] = Wave;
