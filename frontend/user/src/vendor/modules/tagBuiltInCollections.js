let legacyModule = module,
  legacyExports = exports;
require("./arrayIteratorLegacy.js");
for (var globalObject = require("./globalObject.js"), defineProperty = require("./definePropertyRuntime.js"), emptyExports = require("./emptyExports.js"), toStringTag = require("./wellKnownSymbolLegacy.js")("toStringTag"), collectionNames = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), index = 0; index < collectionNames.length; index++) {
  var collectionName = collectionNames[index],
    collectionConstructor = globalObject[collectionName],
    collectionPrototype = collectionConstructor && collectionConstructor.prototype;
  collectionPrototype && !collectionPrototype[toStringTag] && defineProperty(collectionPrototype, toStringTag, collectionName), emptyExports[collectionName] = emptyExports.Array;
}
