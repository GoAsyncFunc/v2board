let legacyModule = module,
  legacyExports = exports;
require("./arrayIteratorLegacy.js");
for (var r = require("./35543259.js"), i = require("./definePropertyRuntime.js"), o = require("./emptyExports.js"), a = require("./55576958.js")("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), l = 0; l < s.length; l++) {
  var c = s[l],
    u = r[c],
    h = u && u.prototype;
  h && !h[a] && i(h, a, c), o[c] = o.Array;
}
