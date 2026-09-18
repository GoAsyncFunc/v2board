function matchesSelector(element, selector) {
  const elementPrototype = window.Element.prototype;
  const nativeMatches =
    elementPrototype.matches ||
    elementPrototype.mozMatchesSelector ||
    elementPrototype.msMatchesSelector ||
    elementPrototype.oMatchesSelector ||
    elementPrototype.webkitMatchesSelector;

  if (!element || element.nodeType !== 1) return false;
  if (nativeMatches) return nativeMatches.call(element, selector);

  const matchingElements = element.parentNode.querySelectorAll(selector);
  for (let index = 0; index < matchingElements.length; index += 1) {
    if (matchingElements[index] === element) return true;
  }
  return false;
}

module.exports = matchesSelector;
