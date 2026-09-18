var ReactDOM = require("./reactDomRuntime.js");

module.exports = function findDomNode(node) {
  if (typeof HTMLElement !== "undefined" && node instanceof HTMLElement) return node;
  return ReactDOM.findDOMNode(node);
};
