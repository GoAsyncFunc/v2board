let legacyModule = module,
  legacyExports = exports;
var apply = require("./apply.js"),
  max = Math.max;
function overRest(func, start, transform) {
  return start = max(void 0 === start ? func.length - 1 : start, 0), function () {
    var args = arguments,
      index = -1,
      restLength = max(args.length - start, 0),
      rest = Array(restLength);
    while (++index < restLength) rest[index] = args[start + index];
    index = -1;
    var leadingArgs = Array(start + 1);
    while (++index < start) leadingArgs[index] = args[index];
    return leadingArgs[start] = transform(rest), apply(func, this, leadingArgs);
  };
}
legacyModule.exports = overRest;
