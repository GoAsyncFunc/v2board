let legacyModule = module,
  legacyExports = exports;
(function (e) {
  ace.define("ace/mode/json_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (e, t, n) {
    "use strict";

    var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      o = function () {
        this.$rules = {
          start: [{
            token: "variable",
            regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
          }, {
            token: "string",
            regex: '"',
            next: "string"
          }, {
            token: "constant.numeric",
            regex: "0[xX][0-9a-fA-F]+\\b"
          }, {
            token: "constant.numeric",
            regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
          }, {
            token: "constant.language.boolean",
            regex: "(?:true|false)\\b"
          }, {
            token: "text",
            regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
          }, {
            token: "comment",
            regex: "\\/\\/.*$"
          }, {
            token: "comment.start",
            regex: "\\/\\*",
            next: "comment"
          }, {
            token: "paren.lparen",
            regex: "[[({]"
          }, {
            token: "paren.rparen",
            regex: "[\\])}]"
          }, {
            token: "punctuation.operator",
            regex: /[,]/
          }, {
            token: "text",
            regex: "\\s+"
          }],
          string: [{
            token: "constant.language.escape",
            regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
          }, {
            token: "string",
            regex: '"|$',
            next: "start"
          }, {
            defaultToken: "string"
          }],
          comment: [{
            token: "comment.end",
            regex: "\\*\\/",
            next: "start"
          }, {
            defaultToken: "comment"
          }]
        };
      };
    r.inherits(o, i), t.JsonHighlightRules = o;
  }), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function (e, t, n) {
    "use strict";

    var r = e("../range").Range,
      i = function () {};
    (function () {
      this.checkOutdent = function (e, t) {
        return !!/^\s+$/.test(e) && /^\s*\}/.test(t);
      }, this.autoOutdent = function (e, t) {
        var n = e.getLine(t),
          i = n.match(/^(\s*\})/);
        if (!i) return 0;
        var o = i[1].length,
          a = e.findMatchingBracket({
            row: t,
            column: o
          });
        if (!a || a.row == t) return 0;
        var s = this.$getIndent(e.getLine(a.row));
        e.replace(new r(t, 0, t, o - 1), s);
      }, this.$getIndent = function (e) {
        return e.match(/^\s*/)[0];
      };
    }).call(i.prototype), t.MatchingBraceOutdent = i;
  }), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function (e, t, n) {
    "use strict";

    var r = e("../../lib/oop"),
      i = e("../../range").Range,
      o = e("./fold_mode").FoldMode,
      a = t.FoldMode = function (e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)));
      };
    r.inherits(a, o), function () {
      this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, n) {
        var r = e.getLine(n);
        if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r)) return "";
        var i = this._getFoldWidgetBase(e, t, n);
        return !i && this.startRegionRe.test(r) ? "start" : i;
      }, this.getFoldWidgetRange = function (e, t, n, r) {
        var i = e.getLine(n);
        if (this.startRegionRe.test(i)) return this.getCommentRegionBlock(e, i, n);
        var o = i.match(this.foldingStartMarker);
        if (o) {
          var a = o.index;
          if (o[1]) return this.openingBracketBlock(e, o[1], n, a);
          var s = e.getCommentFoldRange(n, a + o[0].length, 1);
          return s && !s.isMultiLine() && (r ? s = this.getSectionRange(e, n) : "all" != t && (s = null)), s;
        }
        if ("markbegin" !== t) {
          o = i.match(this.foldingStopMarker);
          if (o) {
            a = o.index + o[0].length;
            return o[1] ? this.closingBracketBlock(e, o[1], n, a) : e.getCommentFoldRange(n, a, -1);
          }
        }
      }, this.getSectionRange = function (e, t) {
        var n = e.getLine(t),
          r = n.search(/\S/),
          o = t,
          a = n.length;
        t += 1;
        var s = t,
          l = e.getLength();
        while (++t < l) {
          n = e.getLine(t);
          var c = n.search(/\S/);
          if (-1 !== c) {
            if (r > c) break;
            var u = this.getFoldWidgetRange(e, "all", t);
            if (u) {
              if (u.start.row <= o) break;
              if (u.isMultiLine()) t = u.end.row;else if (r == c) break;
            }
            s = t;
          }
        }
        return new i(o, a, s, e.getLine(s).length);
      }, this.getCommentRegionBlock = function (e, t, n) {
        var r = t.search(/\s*$/),
          o = e.getLength(),
          a = n,
          s = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
          l = 1;
        while (++n < o) {
          t = e.getLine(n);
          var c = s.exec(t);
          if (c && (c[1] ? l-- : l++, !l)) break;
        }
        var u = n;
        if (u > a) return new i(a, r, u, t.length);
      };
    }.call(a.prototype);
  }), ace.define("ace/mode/json", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/json_highlight_rules", "ace/mode/matching_brace_outdent", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle", "ace/worker/worker_client"], function (e, t, n) {
    "use strict";

    var r = e("../lib/oop"),
      i = e("./text").Mode,
      o = e("./json_highlight_rules").JsonHighlightRules,
      a = e("./matching_brace_outdent").MatchingBraceOutdent,
      s = e("./behaviour/cstyle").CstyleBehaviour,
      l = e("./folding/cstyle").FoldMode,
      c = e("../worker/worker_client").WorkerClient,
      u = function () {
        this.HighlightRules = o, this.$outdent = new a(), this.$behaviour = new s(), this.foldingRules = new l();
      };
    r.inherits(u, i), function () {
      this.lineCommentStart = "//", this.blockComment = {
        start: "/*",
        end: "*/"
      }, this.getNextLineIndent = function (e, t, n) {
        var r = this.$getIndent(t);
        if ("start" == e) {
          var i = t.match(/^.*[\{\(\[]\s*$/);
          i && (r += n);
        }
        return r;
      }, this.checkOutdent = function (e, t, n) {
        return this.$outdent.checkOutdent(t, n);
      }, this.autoOutdent = function (e, t, n) {
        this.$outdent.autoOutdent(t, n);
      }, this.createWorker = function (e) {
        var t = new c(["ace"], "ace/mode/json_worker", "JsonWorker");
        return t.attachToDocument(e.getDocument()), t.on("annotate", function (t) {
          e.setAnnotations(t.data);
        }), t.on("terminate", function () {
          e.clearAnnotations();
        }), t;
      }, this.$id = "ace/mode/json";
    }.call(u.prototype), t.Mode = u;
  }), function () {
    ace.require(["ace/mode/json"], function (t) {
      e && (e.exports = t);
    });
  }();
}).call(this, require("./59755469.js")(legacyModule));
