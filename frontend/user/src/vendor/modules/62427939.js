let legacyModule = module,
  legacyExports = exports;
require("./7732642b.js");
for (var r = require("./35543259.js"), o = require("./definePropertyRuntime.js"), i = require("./53427545.js"), a = require("./55576958.js")("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < s.length; c++) {
  var u = s[c],
    l = r[u],
    f = l && l.prototype;
  f && !f[a] && o(f, a, u), i[u] = i.Array;
}
