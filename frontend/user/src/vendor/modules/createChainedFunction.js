module.exports = function createChainedFunction() {
  var functions = Array.prototype.slice.call(arguments);
  if (functions.length === 1) return functions[0];

  return function chainedFunction() {
    for (var index = 0; index < functions.length; index += 1) {
      if (functions[index] && functions[index].apply) {
        functions[index].apply(this, arguments);
      }
    }
  };
};
