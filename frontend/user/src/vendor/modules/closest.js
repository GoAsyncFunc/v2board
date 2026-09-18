const matchesSelector = require("./matchesSelector.js");

module.exports = function closest(element, selector, boundary) {
  boundary = boundary || document;
  element = {
    parentNode: element
  };

  while ((element = element.parentNode) && element !== boundary) {
    if (matchesSelector(element, selector)) return element;
  }
};
