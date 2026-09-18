let legacyModule = module,
  legacyExports = exports;
legacyExports.extend = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend(target) {
  var source,
    sourceIndex,
    sourceCount,
    propertyName,
    sources = Array.prototype.slice.call(arguments, 1);
  for (sourceIndex = 0, sourceCount = sources.length; sourceIndex < sourceCount; sourceIndex += 1) if (source = sources[sourceIndex], source) for (propertyName in source) hasOwnProperty.call(source, propertyName) && (target[propertyName] = source[propertyName]);
  return target;
}
legacyExports.hop = hasOwnProperty;
