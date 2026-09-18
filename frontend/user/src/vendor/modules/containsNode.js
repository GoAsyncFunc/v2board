const {
  defineExport
} = require("../../app/moduleInterop.js");
function containsNode(root, node) {
  var current = node;
  while (current) {
    if (current === root) return !0;
    current = current.parentNode;
  }
  return !1;
}
defineExport(exports, "a", function () {
  return containsNode;
});
