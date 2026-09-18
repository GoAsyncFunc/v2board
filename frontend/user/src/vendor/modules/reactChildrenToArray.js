"use strict";

const React = require("./reactRuntime.js");
const ReactIs = require("./reactIsLegacyEntry.js");

function childrenToArray(children) {
  let result = [];

  React.Children.forEach(children, function (child) {
    if (child === undefined || child === null) {
      return;
    }

    if (Array.isArray(child)) {
      result = result.concat(childrenToArray(child));
    } else if (ReactIs.isFragment(child) && child.props) {
      result = result.concat(childrenToArray(child.props.children));
    } else {
      result.push(child);
    }
  });

  return result;
}

exports.__esModule = true;
exports.default = childrenToArray;
