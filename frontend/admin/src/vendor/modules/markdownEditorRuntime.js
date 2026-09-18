let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var n = require("./70566e4c.js"),
  r = interopDefault(n),
  o = require("./504a595a.js"),
  a = interopDefault(o),
  l = require("./56625861.js"),
  i = interopDefault(l),
  u = require("./71317449.js"),
  s = require("./37436276.js");
function h(e) {
  return u["createElement"]("i", {
    className: "rmel-iconfont rmel-icon-" + e.type
  });
}
function f(e) {
  return u["createElement"]("div", {
    className: "rc-md-navigation " + (e.visible ? "visible" : "in-visible")
  }, u["createElement"]("div", {
    className: "navigation-nav left"
  }, u["createElement"]("div", {
    className: "button-wrap"
  }, e.left)), u["createElement"]("div", {
    className: "navigation-nav right"
  }, u["createElement"]("div", {
    className: "button-wrap"
  }, e.right)));
}
function p(e) {
  return u["createElement"]("div", {
    className: "tool-bar",
    style: e.style
  }, e.children);
}
var v = require("./75684241.js"),
  m = function (e) {
    function t() {
      for (var t, c = arguments.length, n = new Array(c), r = 0; r < c; r++) n[r] = arguments[r];
      return t = e.call.apply(e, [this].concat(n)) || this, t.EVENT_CHANGE = "a1", t.EVENT_FULL_SCREEN = "a2", t.EVENT_VIEW_CHANGE = "a3", t.EVENT_KEY_DOWN = "a4", t.EVENT_EDITOR_KEY_DOWN = "a5", t.EVENT_FOCUS = "a5", t.EVENT_BLUR = "a6", t.EVENT_SCROLL = "a7", t.EVENT_LANG_CHANGE = "b1", t;
    }
    return i()(t, e), t;
  }(v["EventEmitter"]),
  d = new m(),
  y = m,
  b = {
    clearTip: "Are you sure you want to clear all contents?",
    btnHeader: "Header",
    btnClear: "Clear",
    btnBold: "Bold",
    btnItalic: "Italic",
    btnUnderline: "Underline",
    btnStrikethrough: "Strikethrough",
    btnUnordered: "Unordered list",
    btnOrdered: "Ordered list",
    btnQuote: "Quote",
    btnLineBreak: "Line break",
    btnInlineCode: "Inline code",
    btnCode: "Code",
    btnTable: "Table",
    btnImage: "Image",
    btnLink: "Link",
    btnUndo: "Undo",
    btnRedo: "Redo",
    btnFullScreen: "Full screen",
    btnExitFullScreen: "Exit full screen",
    btnModeEditor: "Only display editor",
    btnModePreview: "Only display preview",
    btnModeAll: "Display both editor and preview",
    selectTabMap: "Actual input when typing a Tab key",
    tab: "Tab",
    spaces: "Spaces"
  },
  z = {
    clearTip: "\u60a8\u786e\u5b9a\u8981\u6e05\u7a7a\u6240\u6709\u5185\u5bb9\u5417\uff1f",
    btnHeader: "\u6807\u9898",
    btnClear: "\u6e05\u7a7a",
    btnBold: "\u52a0\u7c97",
    btnItalic: "\u659c\u4f53",
    btnUnderline: "\u4e0b\u5212\u7ebf",
    btnStrikethrough: "\u5220\u9664\u7ebf",
    btnUnordered: "\u65e0\u5e8f\u5217\u8868",
    btnOrdered: "\u6709\u5e8f\u5217\u8868",
    btnQuote: "\u5f15\u7528",
    btnLineBreak: "\u6362\u884c",
    btnInlineCode: "\u884c\u5185\u4ee3\u7801",
    btnCode: "\u4ee3\u7801\u5757",
    btnTable: "\u8868\u683c",
    btnImage: "\u56fe\u7247",
    btnLink: "\u94fe\u63a5",
    btnUndo: "\u64a4\u9500",
    btnRedo: "\u91cd\u505a",
    btnFullScreen: "\u5168\u5c4f",
    btnExitFullScreen: "\u9000\u51fa\u5168\u5c4f",
    btnModeEditor: "\u4ec5\u663e\u793a\u7f16\u8f91\u5668",
    btnModePreview: "\u4ec5\u663e\u793a\u9884\u89c8",
    btnModeAll: "\u663e\u793a\u7f16\u8f91\u5668\u4e0e\u9884\u89c8",
    selectTabMap: "\u6309\u4e0b Tab \u952e\u65f6\u5b9e\u9645\u7684\u8f93\u5165",
    tab: "\u5236\u8868\u7b26",
    spaces: "\u7a7a\u683c"
  },
  g = function () {
    function e() {
      this.langs = {
        enUS: b,
        zhCN: z
      }, this.current = "enUS", this.setUp();
    }
    var t = e.prototype;
    return t.setUp = function () {
      if ("undefined" !== typeof window) {
        var e = "enUS";
        if (navigator.language) {
          var t = navigator.language.split("-");
          e = t[0], 1 !== t.length && (e += t[t.length - 1].toUpperCase());
        }
        if (navigator.browserLanguage) {
          var c = navigator.browserLanguage.split("-");
          e = c[0], c[1] && (e += c[1].toUpperCase());
        }
        this.current !== e && this.isAvailable(e) && (this.current = e, d.emit(d.EVENT_LANG_CHANGE, this, e, this.langs[e]));
      }
    }, t.isAvailable = function (e) {
      return "undefined" !== typeof this.langs[e];
    }, t.add = function (e, t) {
      this.langs[e] = t;
    }, t.setCurrent = function (e) {
      if (!this.isAvailable(e)) throw new Error("Language " + e + " is not exists");
      this.current !== e && (this.current = e, d.emit(d.EVENT_LANG_CHANGE, this, e, this.langs[e]));
    }, t.get = function (e, t) {
      var c = this.langs[this.current][e] || "";
      return t && Object.keys(t).forEach(function (e) {
        c = c.replace(new RegExp("\\{" + e + "\\}", "g"), t[e]);
      }), c;
    }, t.getCurrent = function () {
      return this.current;
    }, e;
  }(),
  M = new g(),
  C = M,
  H = require("./57384d4a.js"),
  O = interopDefault(H),
  V = function (e) {
    function t() {
      return e.apply(this, arguments) || this;
    }
    i()(t, e);
    var c = t.prototype;
    return c.getConfig = function (e, t) {
      return "undefined" !== typeof this.props.config[e] && null !== this.props.config[e] ? this.props.config[e] : t;
    }, O()(t, [{
      key: "editor",
      get: function () {
        return this.props.editor;
      }
    }, {
      key: "editorConfig",
      get: function () {
        return this.props.editorConfig;
      }
    }]), t;
  }(u["Component"]);
V.pluginName = "", V.align = "left", V.defaultConfig = {};
var w = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  i()(t, e);
  var c = t.prototype;
  return c.render = function () {
    return u["createElement"]("span", {
      className: "rc-md-divider"
    });
  }, t;
}(V);
w.pluginName = "divider";
var S = {
  start: 0,
  end: 0,
  text: ""
};
function L(e, t) {
  var c = "undefined" !== typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (c) return (c = c.call(e)).next.bind(c);
  if (Array.isArray(e) || (c = k(e)) || t && e && "number" === typeof e.length) {
    c && (e = c);
    var n = 0;
    return function () {
      return n >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[n++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function k(e, t) {
  if (e) {
    if ("string" === typeof e) return x(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? x(e, t) : void 0;
  }
}
function x(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
function E(e) {
  return e && (e instanceof Promise || ("object" === typeof e || "function" === typeof e) && "function" === typeof e.then);
}
function P(e, t) {
  var c = "",
    n = t;
  while (n--) c += e;
  return c;
}
function T(e, t) {
  var c = t.withKey,
    n = t.keyCode,
    r = t.key,
    o = t.aliasCommand,
    a = {
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      altKey: e.altKey,
      shiftKey: e.shiftKey,
      keyCode: e.keyCode,
      key: e.key
    };
  if (o && (a.ctrlKey = a.ctrlKey || a.metaKey), c && c.length > 0) for (var l, i = L(c); !(l = i()).done;) {
    var u = l.value;
    if ("undefined" !== typeof a[u] && !a[u]) return !1;
  } else if (a.metaKey || a.ctrlKey || a.shiftKey || a.altKey) return !1;
  return a.key ? a.key === r : a.keyCode === n;
}
function j(e, t) {
  var c = e.split("\n"),
    n = e.substr(0, t).split("\n"),
    r = n.length,
    o = n[n.length - 1].length,
    a = c[n.length - 1],
    l = n.length > 1 ? n[n.length - 2] : null,
    i = c.length > n.length ? c[n.length] : null;
  return {
    line: r,
    col: o,
    beforeText: e.substr(0, t),
    afterText: e.substr(t),
    curLine: a,
    prevLine: l,
    nextLine: i
  };
}
for (var N = {
    bold: ["**", "**"],
    italic: ["*", "*"],
    underline: ["++", "++"],
    strikethrough: ["~~", "~~"],
    quote: ["\n> ", "\n"],
    inlinecode: ["`", "`"],
    code: ["\n```\n", "\n```\n"]
  }, R = 1; R <= 6; R++) N["h" + R] = ["\n" + P("#", R) + " ", "\n"];
function _(e) {
  for (var t = e.row, c = void 0 === t ? 2 : t, n = e.col, r = void 0 === n ? 2 : n, o = ["|"], a = ["|"], l = ["|"], i = "", u = 1; u <= r; u++) o.push(" Head |"), l.push(" --- |"), a.push(" Data |");
  for (var s = 1; s <= c; s++) i += "\n" + a.join("");
  return o.join("") + "\n" + l.join("") + i;
}
function A(e, t) {
  var c = t;
  if ("\n" !== c.substr(0, 1) && (c = "\n" + c), "unordered" === e) return c.length > 1 ? c.replace(/\n/g, "\n* ").trim() : "* ";
  var n = 1;
  return c.length > 1 ? c.replace(/\n/g, function () {
    return "\n" + n++ + ". ";
  }).trim() : "1. ";
}
function F(e, t) {
  return {
    text: e,
    newBlock: t,
    selection: {
      start: e.length,
      end: e.length
    }
  };
}
function I(e, t, c) {
  if ("undefined" !== typeof N[t]) return {
    text: "" + N[t][0] + e + N[t][1],
    selection: {
      start: N[t][0].length,
      end: N[t][0].length + e.length
    }
  };
  switch (t) {
    case "tab":
      var n = 1 === c.tabMapValue ? "\t" : " ".repeat(c.tabMapValue),
        r = n + e.replace(/\n/g, "\n" + n),
        o = e.includes("\n") ? e.match(/\n/g).length : 0;
      return {
        text: r,
        selection: {
          start: c.tabMapValue,
          end: c.tabMapValue * (o + 1) + e.length
        }
      };
    case "unordered":
      return F(A("unordered", e), !0);
    case "order":
      return F(A("order", e), !0);
    case "hr":
      return F("---", !0);
    case "table":
      return {
        text: _(c),
        newBlock: !0
      };
    case "image":
      return {
        text: "![" + (e || c.target) + "](" + (c.imageUrl || "") + ")",
        selection: {
          start: 2,
          end: e.length + 2
        }
      };
    case "link":
      return {
        text: "[" + e + "](" + (c.linkUrl || "") + ")",
        selection: {
          start: 1,
          end: e.length + 1
        }
      };
  }
  return {
    text: e,
    selection: {
      start: 0,
      end: e.length
    }
  };
}
var D = I;
function K(e, t) {
  var c = {};
  return Object.keys(e).forEach(function (n) {
    "undefined" !== typeof t[n] ? "object" !== typeof t[n] ? c[n] = t[n] : Array.isArray(t[n]) ? c[n] = [].concat(t[n]) : c[n] = K(e[n], t[n]) : c[n] = e[n];
  }), c;
}
var U = function (e) {
  for (var t = r()({}, e), c = arguments.length, n = new Array(c > 1 ? c - 1 : 0), o = 1; o < c; o++) n[o - 1] = arguments[o];
  return n.forEach(function (e) {
    "object" === typeof e && (t = K(t, e));
  }), t;
};
function B(e, t) {
  var c = D("", "image", {
      target: "Uploading_" + Object(s["a"])(),
      imageUrl: ""
    }).text,
    n = new Promise(function (c) {
      var n = !0,
        r = function (t) {
          n && console.warn("Deprecated: onImageUpload should return a Promise, callback will be removed in future"), c(D("", "image", {
            target: e.name,
            imageUrl: t
          }).text);
        },
        o = t(e, r);
      E(o) && (n = !1, o.then(r));
    });
  return {
    placeholder: c,
    uploaded: n
  };
}
var q = B,
  W = {
    theme: "default",
    view: {
      menu: !0,
      md: !0,
      html: !0
    },
    canView: {
      menu: !0,
      md: !0,
      html: !0,
      both: !0,
      fullScreen: !0,
      hideMenu: !0
    },
    htmlClass: "",
    markdownClass: "",
    syncScrollMode: ["rightFollowLeft", "leftFollowRight"],
    imageUrl: "",
    imageAccept: "",
    linkUrl: "",
    loggerMaxSize: 100,
    loggerInterval: 600,
    table: {
      maxRow: 4,
      maxCol: 6
    },
    allowPasteImage: !0,
    onImageUpload: void 0,
    onCustomImageUpload: void 0,
    shortcuts: !0,
    onChangeTrigger: "both"
  },
  G = W,
  Y = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.el = u["createRef"](), c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.getElement = function () {
      return this.el.current;
    }, c.getHeight = function () {
      return this.el.current ? this.el.current.offsetHeight : 0;
    }, t;
  }(u["Component"]),
  Q = function (e) {
    function t() {
      return e.apply(this, arguments) || this;
    }
    i()(t, e);
    var c = t.prototype;
    return c.getHtml = function () {
      return "string" === typeof this.props.html ? this.props.html : this.el.current ? this.el.current.innerHTML : "";
    }, c.render = function () {
      return "string" === typeof this.props.html ? u["createElement"]("div", {
        ref: this.el,
        dangerouslySetInnerHTML: {
          __html: this.props.html
        },
        className: this.props.className || "custom-html-style"
      }) : u["createElement"]("div", {
        ref: this.el,
        className: this.props.className || "custom-html-style"
      }, this.props.html);
    }, t;
  }(Y);
function X(e, t) {
  var c = "undefined" !== typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
  if (c) return (c = c.call(e)).next.bind(c);
  if (Array.isArray(e) || (c = Z(e)) || t && e && "number" === typeof e.length) {
    c && (e = c);
    var n = 0;
    return function () {
      return n >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[n++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Z(e, t) {
  if (e) {
    if ("string" === typeof e) return J(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? J(e, t) : void 0;
  }
}
function J(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
var $ = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.nodeMdText = u["createRef"](), c.nodeMdPreview = u["createRef"](), c.nodeMdPreviewWrapper = u["createRef"](), c.hasContentChanged = !0, c.composing = !1, c.pluginApis = new Map(), c.scrollScale = 1, c.isSyncingScroll = !1, c.shouldSyncScroll = "md", c.keyboardListeners = [], c.emitter = new y(), c.config = U(G, c.props.config, c.props), c.state = {
      text: (c.props.value || c.props.defaultValue || "").replace(/\u21b5/g, "\n"),
      html: "",
      view: c.config.view || G.view,
      fullScreen: !1,
      plugins: c.getPlugins()
    }, c.config.canView && !c.config.canView.menu && (c.state.view.menu = !1), c.nodeMdText = u["createRef"](), c.nodeMdPreviewWrapper = u["createRef"](), c.handleChange = c.handleChange.bind(a()(c)), c.handlePaste = c.handlePaste.bind(a()(c)), c.handleDrop = c.handleDrop.bind(a()(c)), c.handleToggleMenu = c.handleToggleMenu.bind(a()(c)), c.handleKeyDown = c.handleKeyDown.bind(a()(c)), c.handleEditorKeyDown = c.handleEditorKeyDown.bind(a()(c)), c.handleLocaleUpdate = c.handleLocaleUpdate.bind(a()(c)), c.handleFocus = c.handleFocus.bind(a()(c)), c.handleBlur = c.handleBlur.bind(a()(c)), c.handleInputScroll = c.handleSyncScroll.bind(a()(c), "md"), c.handlePreviewScroll = c.handleSyncScroll.bind(a()(c), "html"), c;
  }
  i()(t, e), t.use = function (e, c) {
    void 0 === c && (c = {});
    for (var n = 0; n < t.plugins.length; n++) if (t.plugins[n].comp === e) return void t.plugins.splice(n, 1, {
      comp: e,
      config: c
    });
    t.plugins.push({
      comp: e,
      config: c
    });
  }, t.unuse = function (e) {
    for (var c = 0; c < t.plugins.length; c++) if (t.plugins[c].comp === e) return void t.plugins.splice(c, 1);
  }, t.unuseAll = function () {
    t.plugins = [];
  };
  var c = t.prototype;
  return c.componentDidMount = function () {
    var e = this.state.text;
    this.renderHTML(e), d.on(d.EVENT_LANG_CHANGE, this.handleLocaleUpdate), C.setUp();
  }, c.componentWillUnmount = function () {
    d.off(d.EVENT_LANG_CHANGE, this.handleLocaleUpdate);
  }, c.componentDidUpdate = function (e) {
    if ("undefined" !== typeof this.props.value && this.props.value !== this.state.text) {
      var t = this.props.value;
      "string" !== typeof t && (t = String(t).toString()), t = t.replace(/\u21b5/g, "\n"), this.state.text !== t && (this.setState({
        text: t
      }), this.renderHTML(t));
    }
    e.plugins !== this.props.plugins && this.setState({
      plugins: this.getPlugins()
    });
  }, c.isComposing = function () {
    return this.composing;
  }, c.getPlugins = function () {
    var e = this,
      c = [];
    if (this.props.plugins) for (var n, o = function (e) {
        if (e !== w.pluginName) for (var n, r = X(t.plugins); !(n = r()).done;) {
          var o = n.value;
          if (o.comp.pluginName === e) return void c.push(o);
        } else c.push({
          comp: w,
          config: {}
        });
      }, a = X(this.props.plugins); !(n = a()).done;) {
      var l = n.value;
      "fonts" === l ? (o("font-bold"), o("font-italic"), o("font-underline"), o("font-strikethrough"), o("list-unordered"), o("list-ordered"), o("block-quote"), o("block-wrap"), o("block-code-inline"), o("block-code-block")) : o(l);
    } else c = [].concat(t.plugins);
    var i = {};
    return c.forEach(function (t) {
      "undefined" === typeof i[t.comp.align] && (i[t.comp.align] = []);
      var c = "divider" === t.comp.pluginName ? Object(s["a"])() : t.comp.pluginName;
      i[t.comp.align].push(u["createElement"](t.comp, {
        editor: e,
        editorConfig: e.config,
        config: r()({}, t.comp.defaultConfig || {}, t.config || {}),
        key: c
      }));
    }), i;
  }, c.handleSyncScroll = function (e, t) {
    var c = this;
    if (e === this.shouldSyncScroll) {
      this.props.onScroll && this.props.onScroll(t, e), this.emitter.emit(this.emitter.EVENT_SCROLL, t, e);
      var n = this.config.syncScrollMode,
        r = void 0 === n ? [] : n;
      r.includes("md" === e ? "rightFollowLeft" : "leftFollowRight") && (this.hasContentChanged && this.nodeMdText.current && this.nodeMdPreviewWrapper.current && (this.scrollScale = this.nodeMdText.current.scrollHeight / this.nodeMdPreviewWrapper.current.scrollHeight, this.hasContentChanged = !1), this.isSyncingScroll || (this.isSyncingScroll = !0, requestAnimationFrame(function () {
        c.nodeMdText.current && c.nodeMdPreviewWrapper.current && ("md" === e ? c.nodeMdPreviewWrapper.current.scrollTop = c.nodeMdText.current.scrollTop / c.scrollScale : c.nodeMdText.current.scrollTop = c.nodeMdPreviewWrapper.current.scrollTop * c.scrollScale), c.isSyncingScroll = !1;
      })));
    }
  }, c.renderHTML = function (e) {
    var t = this;
    if (!this.props.renderHTML) return console.error("renderHTML props is required!"), Promise.resolve();
    var c = this.props.renderHTML(e);
    return E(c) ? c.then(function (e) {
      return t.setHtml(e);
    }) : "function" === typeof c ? this.setHtml(c()) : this.setHtml(c);
  }, c.setHtml = function (e) {
    var t = this;
    return new Promise(function (c) {
      t.setState({
        html: e
      }, c);
    });
  }, c.handleToggleMenu = function () {
    this.setView({
      menu: !this.state.view.menu
    });
  }, c.handleFocus = function (e) {
    var t = this.props.onFocus;
    t && t(e), this.emitter.emit(this.emitter.EVENT_FOCUS, e);
  }, c.handleBlur = function (e) {
    var t = this.props.onBlur;
    t && t(e), this.emitter.emit(this.emitter.EVENT_BLUR, e);
  }, c.handleChange = function (e) {
    e.persist();
    var t = e.target.value;
    this.setText(t, e);
  }, c.handlePaste = function (e) {
    if (this.config.allowPasteImage && this.config.onImageUpload) {
      var t = e.nativeEvent,
        c = (t.clipboardData || window.clipboardData).items;
      c && (e.preventDefault(), this.uploadWithDataTransfer(c));
    }
  }, c.handleDrop = function (e) {
    if (this.config.onImageUpload) {
      var t = e.nativeEvent;
      if (t.dataTransfer) {
        var c = t.dataTransfer.items;
        c && (e.preventDefault(), this.uploadWithDataTransfer(c));
      }
    }
  }, c.handleEditorKeyDown = function (e) {
    var t = this,
      c = e.keyCode,
      n = e.key,
      r = e.currentTarget;
    if ((13 === c || "Enter" === n) && !1 === this.composing) {
      var o = r.value,
        a = r.selectionStart,
        l = j(o, a),
        i = function () {
          var c = r.value.substr(0, a - l.curLine.length) + r.value.substr(a);
          t.setText(c, void 0, {
            start: a - l.curLine.length,
            end: a - l.curLine.length
          }), e.preventDefault();
        },
        u = function (c) {
          t.insertText("\n" + c, !1, {
            start: c.length + 1,
            end: c.length + 1
          }), e.preventDefault();
        },
        s = l.curLine.match(/^(\s*?)\* /);
      if (s) return /^(\s*?)\* $/.test(l.curLine) ? void i() : void u(s[0]);
      var h = l.curLine.match(/^(\s*?)(\d+)\. /);
      if (h) {
        if (/^(\s*?)(\d+)\. $/.test(l.curLine)) return void i();
        var f = "" + h[1] + (parseInt(h[2], 10) + 1) + ". ";
        return void u(f);
      }
    }
    this.emitter.emit(this.emitter.EVENT_EDITOR_KEY_DOWN, e);
  }, c.handleLocaleUpdate = function () {
    this.forceUpdate();
  }, c.getMdElement = function () {
    return this.nodeMdText.current;
  }, c.getHtmlElement = function () {
    return this.nodeMdPreviewWrapper.current;
  }, c.clearSelection = function () {
    this.nodeMdText.current && this.nodeMdText.current.setSelectionRange(0, 0, "none");
  }, c.getSelection = function () {
    var e = this.nodeMdText.current;
    if (!e) return r()({}, S);
    var t = e.selectionStart,
      c = e.selectionEnd,
      n = (e.value || "").slice(t, c);
    return {
      start: t,
      end: c,
      text: n
    };
  }, c.setSelection = function (e) {
    this.nodeMdText.current && (this.nodeMdText.current.setSelectionRange(e.start, e.end, "forward"), this.nodeMdText.current.focus());
  }, c.insertMarkdown = function (e, t) {
    void 0 === t && (t = {});
    var c = this.getSelection(),
      n = t ? r()({}, t) : {};
    if ("image" === e && (n = r()({}, n, {
      target: t.target || c.text || "",
      imageUrl: t.imageUrl || this.config.imageUrl
    })), "link" === e && (n = r()({}, n, {
      linkUrl: this.config.linkUrl
    })), "tab" === e && c.start !== c.end) {
      var o = this.getMdValue().slice(0, c.start).lastIndexOf("\n") + 1;
      this.setSelection({
        start: o,
        end: c.end
      });
    }
    var a = D(c.text, e, n),
      l = a.text,
      i = a.selection;
    if (a.newBlock) {
      var u = j(this.getMdValue(), c.start),
        s = u.col,
        h = u.curLine;
      s > 0 && h.length > 0 && (l = "\n" + l, i && (i.start++, i.end++));
      var f = u.afterText;
      c.start !== c.end && (f = j(this.getMdValue(), c.end).afterText), "" !== f.trim() && "\n\n" !== f.substr(0, 2) && ("\n" !== f.substr(0, 1) && (l += "\n"), l += "\n");
    }
    this.insertText(l, !0, i);
  }, c.insertPlaceholder = function (e, t) {
    var c = this;
    this.insertText(e, !0), t.then(function (t) {
      var n = c.getMdValue().replace(e, t);
      c.setText(n);
    });
  }, c.insertText = function (e, t, c) {
    void 0 === e && (e = ""), void 0 === t && (t = !1);
    var n = this.state.text,
      r = this.getSelection(),
      o = n.slice(0, r.start),
      a = n.slice(t ? r.end : r.start, n.length);
    this.setText(o + e + a, void 0, c ? {
      start: c.start + o.length,
      end: c.end + o.length
    } : {
      start: r.start,
      end: r.start
    });
  }, c.setText = function (e, t, c) {
    var n = this;
    void 0 === e && (e = "");
    var r = this.config.onChangeTrigger,
      o = void 0 === r ? "both" : r,
      a = e.replace(/\u21b5/g, "\n");
    if (this.state.text !== e) {
      this.setState({
        text: a
      }), !this.props.onChange || "both" !== o && "beforeRender" !== o || this.props.onChange({
        text: a,
        html: this.getHtmlValue()
      }, t), this.emitter.emit(this.emitter.EVENT_CHANGE, e, t, "undefined" === typeof t), c && setTimeout(function () {
        return n.setSelection(c);
      }), this.hasContentChanged || (this.hasContentChanged = !0);
      var l = this.renderHTML(a);
      "both" !== o && "afterRender" !== o || l.then(function () {
        n.props.onChange && n.props.onChange({
          text: n.state.text,
          html: n.getHtmlValue()
        }, t);
      });
    }
  }, c.getMdValue = function () {
    return this.state.text;
  }, c.getHtmlValue = function () {
    return "string" === typeof this.state.html ? this.state.html : this.nodeMdPreview.current ? this.nodeMdPreview.current.getHtml() : "";
  }, c.onKeyboard = function (e) {
    var t = this;
    Array.isArray(e) ? e.forEach(function (e) {
      return t.onKeyboard(e);
    }) : this.keyboardListeners.includes(e) || this.keyboardListeners.push(e);
  }, c.offKeyboard = function (e) {
    var t = this;
    if (Array.isArray(e)) e.forEach(function (e) {
      return t.offKeyboard(e);
    });else {
      var c = this.keyboardListeners.indexOf(e);
      c >= 0 && this.keyboardListeners.splice(c, 1);
    }
  }, c.handleKeyDown = function (e) {
    for (var t, c = X(this.keyboardListeners); !(t = c()).done;) {
      var n = t.value;
      if (T(e, n)) return e.preventDefault(), void n.callback(e);
    }
    this.emitter.emit(this.emitter.EVENT_KEY_DOWN, e);
  }, c.getEventType = function (e) {
    switch (e) {
      case "change":
        return this.emitter.EVENT_CHANGE;
      case "fullscreen":
        return this.emitter.EVENT_FULL_SCREEN;
      case "viewchange":
        return this.emitter.EVENT_VIEW_CHANGE;
      case "keydown":
        return this.emitter.EVENT_KEY_DOWN;
      case "editor_keydown":
        return this.emitter.EVENT_EDITOR_KEY_DOWN;
      case "blur":
        return this.emitter.EVENT_BLUR;
      case "focus":
        return this.emitter.EVENT_FOCUS;
      case "scroll":
        return this.emitter.EVENT_SCROLL;
    }
  }, c.on = function (e, t) {
    var c = this.getEventType(e);
    c && this.emitter.on(c, t);
  }, c.off = function (e, t) {
    var c = this.getEventType(e);
    c && this.emitter.off(c, t);
  }, c.setView = function (e) {
    var t = this,
      c = r()({}, this.state.view, e);
    this.setState({
      view: c
    }, function () {
      t.emitter.emit(t.emitter.EVENT_VIEW_CHANGE, c);
    });
  }, c.getView = function () {
    return r()({}, this.state.view);
  }, c.fullScreen = function (e) {
    var t = this;
    this.state.fullScreen !== e && this.setState({
      fullScreen: e
    }, function () {
      t.emitter.emit(t.emitter.EVENT_FULL_SCREEN, e);
    });
  }, c.registerPluginApi = function (e, t) {
    this.pluginApis.set(e, t);
  }, c.unregisterPluginApi = function (e) {
    this.pluginApis.delete(e);
  }, c.callPluginApi = function (e) {
    var t = this.pluginApis.get(e);
    if (!t) throw new Error("API " + e + " not found");
    for (var c = arguments.length, n = new Array(c > 1 ? c - 1 : 0), r = 1; r < c; r++) n[r - 1] = arguments[r];
    return t.apply(void 0, n);
  }, c.isFullScreen = function () {
    return this.state.fullScreen;
  }, c.uploadWithDataTransfer = function (e) {
    var t = this,
      c = this.config.onImageUpload;
    if (c) {
      var n = [];
      Array.prototype.forEach.call(e, function (e) {
        if ("file" === e.kind && e.type.includes("image")) {
          var r = e.getAsFile();
          if (r) {
            var o = q(r, c);
            n.push(Promise.resolve(o.placeholder)), o.uploaded.then(function (e) {
              var c = t.getMdValue().replace(o.placeholder, e),
                n = e.length - o.placeholder.length,
                r = t.getSelection();
              t.setText(c, void 0, {
                start: r.start + n,
                end: r.start + n
              });
            });
          }
        } else "string" === e.kind && "text/plain" === e.type && n.push(new Promise(function (t) {
          return e.getAsString(t);
        }));
      }), Promise.all(n).then(function (e) {
        var c = e.join(""),
          n = t.getSelection();
        t.insertText(c, !0, {
          start: n.start === n.end ? c.length : 0,
          end: c.length
        });
      });
    }
  }, c.render = function () {
    var e = this,
      t = this.state,
      c = t.view,
      n = t.fullScreen,
      r = t.text,
      o = t.html,
      a = this.props,
      l = a.id,
      i = a.className,
      s = void 0 === i ? "" : i,
      v = a.style,
      m = a.name,
      d = void 0 === m ? "textarea" : m,
      y = a.autoFocus,
      b = a.placeholder,
      z = a.readOnly,
      g = this.config.canView && this.config.canView.hideMenu && !this.config.canView.menu,
      M = function (t) {
        return e.state.plugins[t] || [];
      },
      C = !!c.menu,
      H = l ? l + "_md" : void 0,
      O = l ? l + "_html" : void 0;
    return u["createElement"]("div", {
      id: l,
      className: "rc-md-editor " + (n ? "full" : "") + " " + s,
      style: v,
      onKeyDown: this.handleKeyDown,
      onDrop: this.handleDrop
    }, u["createElement"](f, {
      visible: C,
      left: M("left"),
      right: M("right")
    }), u["createElement"]("div", {
      className: "editor-container"
    }, g && u["createElement"](p, null, u["createElement"]("span", {
      className: "button button-type-menu",
      title: C ? "hidden menu" : "show menu",
      onClick: this.handleToggleMenu
    }, u["createElement"](h, {
      type: "expand-" + (C ? "less" : "more")
    }))), u["createElement"]("section", {
      className: "section sec-md " + (c.md ? "visible" : "in-visible")
    }, u["createElement"]("textarea", {
      id: H,
      ref: this.nodeMdText,
      name: d,
      autoFocus: y,
      placeholder: b,
      readOnly: z,
      value: r,
      className: "section-container input " + (this.config.markdownClass || ""),
      wrap: "hard",
      onChange: this.handleChange,
      onScroll: this.handleInputScroll,
      onMouseOver: function () {
        return e.shouldSyncScroll = "md";
      },
      onKeyDown: this.handleEditorKeyDown,
      onCompositionStart: function () {
        return e.composing = !0;
      },
      onCompositionEnd: function () {
        return e.composing = !1;
      },
      onPaste: this.handlePaste,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur
    })), u["createElement"]("section", {
      className: "section sec-html " + (c.html ? "visible" : "in-visible")
    }, u["createElement"]("div", {
      id: O,
      className: "section-container html-wrap",
      ref: this.nodeMdPreviewWrapper,
      onMouseOver: function () {
        return e.shouldSyncScroll = "html";
      },
      onScroll: this.handlePreviewScroll
    }, u["createElement"](Q, {
      html: o,
      className: this.config.htmlClass,
      ref: this.nodeMdPreview
    })))));
  }, t;
}(u["Component"]);
$.plugins = [], $.addLocale = C.add.bind(C), $.useLocale = C.setCurrent.bind(C), $.getLocale = C.getCurrent.bind(C);
var ee = $,
  te = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.timer = null, c.useTimer = c.getConfig("useTimer") || "undefined" === typeof requestAnimationFrame, c.handleChange = c.handleChange.bind(a()(c)), c.doResize = c.doResize.bind(a()(c)), c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.doResize = function () {
      var e = this,
        t = function (t) {
          t.style.height = "auto";
          var c = Math.min(Math.max(e.getConfig("min"), t.scrollHeight), e.getConfig("max"));
          return t.style.height = c + "px", c;
        };
      this.timer = null;
      var c = this.editor.getView(),
        n = this.editor.getMdElement(),
        r = this.editor.getHtmlElement();
      if (n && c.md) {
        var o = t(n);
        r && (r.style.height = o + "px");
      } else r && c.html && t(r);
    }, c.handleChange = function () {
      null === this.timer && (this.useTimer ? this.timer = window.setTimeout(this.doResize) : this.timer = requestAnimationFrame(this.doResize));
    }, c.componentDidMount = function () {
      this.editor.on("change", this.handleChange), this.editor.on("viewchange", this.handleChange), this.handleChange();
    }, c.componentWillUnmount = function () {
      this.editor.off("change", this.handleChange), this.editor.off("viewchange", this.handleChange), null !== this.timer && this.useTimer && (window.clearTimeout(this.timer), this.timer = null);
    }, c.render = function () {
      return u["createElement"]("span", null);
    }, t;
  }(V);
te.pluginName = "auto-resize", te.align = "left", te.defaultConfig = {
  min: 200,
  max: 1 / 0,
  useTimer: !1
};
var ce = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  i()(t, e);
  var c = t.prototype;
  return c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-code-block",
      title: C.get("btnCode"),
      onClick: function () {
        return e.editor.insertMarkdown("code");
      }
    }, u["createElement"](h, {
      type: "code-block"
    }));
  }, t;
}(V);
ce.pluginName = "block-code-block";
var ne = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  i()(t, e);
  var c = t.prototype;
  return c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-code-inline",
      title: C.get("btnInlineCode"),
      onClick: function () {
        return e.editor.insertMarkdown("inlinecode");
      }
    }, u["createElement"](h, {
      type: "code"
    }));
  }, t;
}(V);
ne.pluginName = "block-code-inline";
var re = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  i()(t, e);
  var c = t.prototype;
  return c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-quote",
      title: C.get("btnQuote"),
      onClick: function () {
        return e.editor.insertMarkdown("quote");
      }
    }, u["createElement"](h, {
      type: "quote"
    }));
  }, t;
}(V);
re.pluginName = "block-quote";
var oe = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  i()(t, e);
  var c = t.prototype;
  return c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-wrap",
      title: C.get("btnLineBreak"),
      onClick: function () {
        return e.editor.insertMarkdown("hr");
      }
    }, u["createElement"](h, {
      type: "wrap"
    }));
  }, t;
}(V);
oe.pluginName = "block-wrap";
var ae = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleClick = c.handleClick.bind(a()(c)), c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.handleClick = function () {
    if ("" !== this.editor.getMdValue() && window.confirm && "function" === typeof window.confirm) {
      var e = window.confirm(C.get("clearTip"));
      e && this.editor.setText("");
    }
  }, c.render = function () {
    return u["createElement"]("span", {
      className: "button button-type-clear",
      title: C.get("btnClear"),
      onClick: this.handleClick
    }, u["createElement"](h, {
      type: "delete"
    }));
  }, t;
}(V);
ae.pluginName = "clear";
var le = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleKeyboard = {
      key: "b",
      keyCode: 66,
      aliasCommand: !0,
      withKey: ["ctrlKey"],
      callback: function () {
        return c.editor.insertMarkdown("bold");
      }
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.componentDidMount = function () {
    this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
  }, c.componentWillUnmount = function () {
    this.editor.offKeyboard(this.handleKeyboard);
  }, c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-bold",
      title: C.get("btnBold"),
      onClick: function () {
        return e.editor.insertMarkdown("bold");
      }
    }, u["createElement"](h, {
      type: "bold"
    }));
  }, t;
}(V);
le.pluginName = "font-bold";
var ie = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleKeyboard = {
      key: "i",
      keyCode: 73,
      aliasCommand: !0,
      withKey: ["ctrlKey"],
      callback: function () {
        return c.editor.insertMarkdown("italic");
      }
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.componentDidMount = function () {
    this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
  }, c.componentWillUnmount = function () {
    this.editor.offKeyboard(this.handleKeyboard);
  }, c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-italic",
      title: C.get("btnItalic"),
      onClick: function () {
        return e.editor.insertMarkdown("italic");
      }
    }, u["createElement"](h, {
      type: "italic"
    }));
  }, t;
}(V);
ie.pluginName = "font-italic";
var ue = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleKeyboard = {
      key: "d",
      keyCode: 68,
      aliasCommand: !0,
      withKey: ["ctrlKey"],
      callback: function () {
        return c.editor.insertMarkdown("strikethrough");
      }
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.componentDidMount = function () {
    this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
  }, c.componentWillUnmount = function () {
    this.editor.offKeyboard(this.handleKeyboard);
  }, c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-strikethrough",
      title: C.get("btnStrikethrough"),
      onClick: function () {
        return e.editor.insertMarkdown("strikethrough");
      }
    }, u["createElement"](h, {
      type: "strikethrough"
    }));
  }, t;
}(V);
ue.pluginName = "font-strikethrough";
var se = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleKeyboard = {
      key: "u",
      keyCode: 85,
      withKey: ["ctrlKey"],
      callback: function () {
        return c.editor.insertMarkdown("underline");
      }
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.componentDidMount = function () {
    this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
  }, c.componentWillUnmount = function () {
    this.editor.offKeyboard(this.handleKeyboard);
  }, c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-underline",
      title: C.get("btnUnderline"),
      onClick: function () {
        return e.editor.insertMarkdown("underline");
      }
    }, u["createElement"](h, {
      type: "underline"
    }));
  }, t;
}(V);
se.pluginName = "font-underline";
var he = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleClick = c.handleClick.bind(a()(c)), c.handleChange = c.handleChange.bind(a()(c)), c.state = {
      enable: c.editor.isFullScreen()
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.handleClick = function () {
    this.editor.fullScreen(!this.state.enable);
  }, c.handleChange = function (e) {
    this.setState({
      enable: e
    });
  }, c.componentDidMount = function () {
    this.editor.on("fullscreen", this.handleChange);
  }, c.componentWillUnmount = function () {
    this.editor.off("fullscreen", this.handleChange);
  }, c.render = function () {
    if (this.editorConfig.canView && this.editorConfig.canView.fullScreen) {
      var e = this.state.enable;
      return u["createElement"]("span", {
        className: "button button-type-fullscreen",
        title: C.get(e ? "btnExitFullScreen" : "btnFullScreen"),
        onClick: this.handleClick
      }, u["createElement"](h, {
        type: e ? "fullscreen-exit" : "fullscreen"
      }));
    }
    return null;
  }, t;
}(V);
he.pluginName = "full-screen", he.align = "right";
var fe = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.handleClose = c.handleClose.bind(a()(c)), c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.handleClose = function (e) {
      e.stopPropagation();
      var t = this.props.onClose;
      "function" === typeof t && t();
    }, c.render = function () {
      return u["createElement"]("div", {
        className: "drop-wrap " + (this.props.show ? "show" : "hidden"),
        onClick: this.handleClose
      }, this.props.children);
    }, t;
  }(u["Component"]),
  pe = fe,
  ve = function (e) {
    function t() {
      return e.apply(this, arguments) || this;
    }
    i()(t, e);
    var c = t.prototype;
    return c.handleHeader = function (e) {
      var t = this.props.onSelectHeader;
      "function" === typeof t && t(e);
    }, c.render = function () {
      return u["createElement"]("ul", {
        className: "header-list"
      }, u["createElement"]("li", {
        className: "list-item"
      }, u["createElement"]("h1", {
        onClick: this.handleHeader.bind(this, "h1")
      }, "H1")), u["createElement"]("li", {
        className: "list-item"
      }, u["createElement"]("h2", {
        onClick: this.handleHeader.bind(this, "h2")
      }, "H2")), u["createElement"]("li", {
        className: "list-item"
      }, u["createElement"]("h3", {
        onClick: this.handleHeader.bind(this, "h3")
      }, "H3")), u["createElement"]("li", {
        className: "list-item"
      }, u["createElement"]("h4", {
        onClick: this.handleHeader.bind(this, "h4")
      }, "H4")), u["createElement"]("li", {
        className: "list-item"
      }, u["createElement"]("h5", {
        onClick: this.handleHeader.bind(this, "h5")
      }, "H5")), u["createElement"]("li", {
        className: "list-item"
      }, u["createElement"]("h6", {
        onClick: this.handleHeader.bind(this, "h6")
      }, "H6")));
    }, t;
  }(u["Component"]),
  me = ve,
  de = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.show = c.show.bind(a()(c)), c.hide = c.hide.bind(a()(c)), c.state = {
        show: !1
      }, c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.show = function () {
      this.setState({
        show: !0
      });
    }, c.hide = function () {
      this.setState({
        show: !1
      });
    }, c.render = function () {
      var e = this;
      return u["createElement"]("span", {
        className: "button button-type-header",
        title: C.get("btnHeader"),
        onMouseEnter: this.show,
        onMouseLeave: this.hide
      }, u["createElement"](h, {
        type: "font-size"
      }), u["createElement"](pe, {
        show: this.state.show,
        onClose: this.hide
      }, u["createElement"](me, {
        onSelectHeader: function (t) {
          return e.editor.insertMarkdown(t);
        }
      })));
    }, t;
  }(V);
de.pluginName = "header";
var ye = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.timerId = void 0, c.locked = !1, c.input = u["createRef"](), c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.click = function () {
      var e = this;
      !this.locked && this.input.current && (this.locked = !0, this.input.current.value = "", this.input.current.click(), this.timerId && window.clearTimeout(this.timerId), this.timerId = window.setTimeout(function () {
        e.locked = !1, window.clearTimeout(e.timerId), e.timerId = void 0;
      }, 200));
    }, c.componentWillUnmount = function () {
      this.timerId && window.clearTimeout(this.timerId);
    }, c.render = function () {
      return u["createElement"]("input", {
        type: "file",
        ref: this.input,
        accept: this.props.accept,
        style: {
          position: "absolute",
          zIndex: -1,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          opacity: 0
        },
        onChange: this.props.onChange
      });
    }, t;
  }(u["Component"]),
  be = ye,
  ze = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.inputFile = u["createRef"](), c.onImageChanged = c.onImageChanged.bind(a()(c)), c.handleCustomImageUpload = c.handleCustomImageUpload.bind(a()(c)), c.handleImageUpload = c.handleImageUpload.bind(a()(c)), c.state = {
        show: !1
      }, c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.handleImageUpload = function () {
      var e = this.editorConfig.onImageUpload;
      "function" === typeof e ? this.inputFile.current && this.inputFile.current.click() : this.editor.insertMarkdown("image");
    }, c.onImageChanged = function (e) {
      var t = this.editorConfig.onImageUpload;
      if (t) {
        var c = q(e, t);
        this.editor.insertPlaceholder(c.placeholder, c.uploaded);
      }
    }, c.handleCustomImageUpload = function (e) {
      var t = this,
        c = this.editorConfig.onCustomImageUpload;
      if (c) {
        var n = c.call(this, e);
        E(n) && n.then(function (e) {
          e && e.url && t.editor.insertMarkdown("image", {
            target: e.text,
            imageUrl: e.url
          });
        });
      }
    }, c.render = function () {
      var e = this,
        t = !!this.editorConfig.onCustomImageUpload;
      return t ? u["createElement"]("span", {
        className: "button button-type-image",
        title: C.get("btnImage"),
        onClick: this.handleCustomImageUpload
      }, u["createElement"](h, {
        type: "image"
      })) : u["createElement"]("span", {
        className: "button button-type-image",
        title: C.get("btnImage"),
        onClick: this.handleImageUpload,
        style: {
          position: "relative"
        }
      }, u["createElement"](h, {
        type: "image"
      }), u["createElement"](be, {
        accept: this.editorConfig.imageAccept || "",
        ref: this.inputFile,
        onChange: function (t) {
          t.persist(), t.target.files && t.target.files.length > 0 && e.onImageChanged(t.target.files[0]);
        }
      }));
    }, t;
  }(V);
ze.pluginName = "image";
var ge = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleKeyboard = {
      key: "k",
      keyCode: 75,
      aliasCommand: !0,
      withKey: ["ctrlKey"],
      callback: function () {
        return c.editor.insertMarkdown("link");
      }
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.componentDidMount = function () {
    this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
  }, c.componentWillUnmount = function () {
    this.editor.offKeyboard(this.handleKeyboard);
  }, c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-link",
      title: C.get("btnLink"),
      onClick: function () {
        return e.editor.insertMarkdown("link");
      }
    }, u["createElement"](h, {
      type: "link"
    }));
  }, t;
}(V);
ge.pluginName = "link";
var Me = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleKeyboard = {
      key: "7",
      keyCode: 55,
      withKey: ["ctrlKey", "shiftKey"],
      aliasCommand: !0,
      callback: function () {
        return c.editor.insertMarkdown("order");
      }
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.componentDidMount = function () {
    this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
  }, c.componentWillUnmount = function () {
    this.editor.offKeyboard(this.handleKeyboard);
  }, c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-ordered",
      title: C.get("btnOrdered"),
      onClick: function () {
        return e.editor.insertMarkdown("order");
      }
    }, u["createElement"](h, {
      type: "list-ordered"
    }));
  }, t;
}(V);
Me.pluginName = "list-ordered";
var Ce = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleKeyboard = {
      key: "8",
      keyCode: 56,
      withKey: ["ctrlKey", "shiftKey"],
      aliasCommand: !0,
      callback: function () {
        return c.editor.insertMarkdown("unordered");
      }
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.componentDidMount = function () {
    this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
  }, c.componentWillUnmount = function () {
    this.editor.offKeyboard(this.handleKeyboard);
  }, c.render = function () {
    var e = this;
    return u["createElement"]("span", {
      className: "button button-type-unordered",
      title: C.get("btnUnordered"),
      onClick: function () {
        return e.editor.insertMarkdown("unordered");
      }
    }, u["createElement"](h, {
      type: "list-unordered"
    }));
  }, t;
}(V);
Ce.pluginName = "list-unordered";
var He,
  Oe = 100,
  Ve = function () {
    function e(e) {
      void 0 === e && (e = {}), this.record = [], this.recycle = [], this.initValue = "";
      var t = e,
        c = t.maxSize,
        n = void 0 === c ? Oe : c;
      this.maxSize = n;
    }
    var t = e.prototype;
    return t.push = function (e) {
      var t = this.record.push(e);
      while (this.record.length > this.maxSize) this.record.shift();
      return t;
    }, t.get = function () {
      return this.record;
    }, t.getLast = function () {
      var e = this.record.length;
      return this.record[e - 1];
    }, t.undo = function (e) {
      var t = this.record.pop();
      if ("undefined" === typeof t) return this.initValue;
      if (t !== e) return this.recycle.push(t), t;
      var c = this.record.pop();
      return "undefined" === typeof c ? (this.recycle.push(t), this.initValue) : (this.recycle.push(t), c);
    }, t.redo = function () {
      var e = this.recycle.pop();
      if ("undefined" !== typeof e) return this.push(e), e;
    }, t.cleanRedo = function () {
      this.recycle = [];
    }, t.getUndoCount = function () {
      return this.undo.length;
    }, t.getRedoCount = function () {
      return this.recycle.length;
    }, e;
  }(),
  we = Ve,
  Se = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.handleKeyboards = [], c.lastPop = null, c.handleChange = c.handleChange.bind(a()(c)), c.handleRedo = c.handleRedo.bind(a()(c)), c.handleUndo = c.handleUndo.bind(a()(c)), c.handleKeyboards = [{
        key: "y",
        keyCode: 89,
        withKey: ["ctrlKey"],
        callback: c.handleRedo
      }, {
        key: "z",
        keyCode: 90,
        withKey: ["metaKey", "shiftKey"],
        callback: c.handleRedo
      }, {
        key: "z",
        keyCode: 90,
        aliasCommand: !0,
        withKey: ["ctrlKey"],
        callback: c.handleUndo
      }], c.logger = new we({
        maxSize: c.editorConfig.loggerMaxSize
      }), c.editor.registerPluginApi("undo", c.handleUndo), c.editor.registerPluginApi("redo", c.handleRedo), c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.handleUndo = function () {
      var e = this.logger.undo(this.editor.getMdValue());
      "undefined" !== typeof e && (this.pause(), this.lastPop = e, this.editor.setText(e), this.forceUpdate());
    }, c.handleRedo = function () {
      var e = this.logger.redo();
      "undefined" !== typeof e && (this.lastPop = e, this.editor.setText(e), this.forceUpdate());
    }, c.handleChange = function (e, t, c) {
      var n = this;
      if (this.logger.getLast() !== e && (null === this.lastPop || this.lastPop !== e)) {
        if (this.logger.cleanRedo(), c) return this.logger.push(e), this.lastPop = null, void this.forceUpdate();
        this.timerId && (window.clearTimeout(this.timerId), this.timerId = 0), this.timerId = window.setTimeout(function () {
          n.logger.getLast() !== e && (n.logger.push(e), n.lastPop = null, n.forceUpdate()), window.clearTimeout(n.timerId), n.timerId = 0;
        }, this.editorConfig.loggerInterval);
      }
    }, c.componentDidMount = function () {
      var e = this;
      this.editor.on("change", this.handleChange), this.handleKeyboards.forEach(function (t) {
        return e.editor.onKeyboard(t);
      }), this.logger.initValue = this.editor.getMdValue(), this.forceUpdate();
    }, c.componentWillUnmount = function () {
      var e = this;
      this.timerId && window.clearTimeout(this.timerId), this.editor.off("change", this.handleChange), this.editor.unregisterPluginApi("undo"), this.editor.unregisterPluginApi("redo"), this.handleKeyboards.forEach(function (t) {
        return e.editor.offKeyboard(t);
      });
    }, c.pause = function () {
      this.timerId && (window.clearTimeout(this.timerId), this.timerId = void 0);
    }, c.render = function () {
      var e = this.logger.getUndoCount() > 1 || this.logger.initValue !== this.editor.getMdValue(),
        t = this.logger.getRedoCount() > 0;
      return u["createElement"](u["Fragment"], null, u["createElement"]("span", {
        className: "button button-type-undo " + (e ? "" : "disabled"),
        title: C.get("btnUndo"),
        onClick: this.handleUndo
      }, u["createElement"](h, {
        type: "undo"
      })), u["createElement"]("span", {
        className: "button button-type-redo " + (t ? "" : "disabled"),
        title: C.get("btnRedo"),
        onClick: this.handleRedo
      }, u["createElement"](h, {
        type: "redo"
      })));
    }, t;
  }(V);
Se.pluginName = "logger", function (e) {
  e[e["SHOW_ALL"] = 0] = "SHOW_ALL", e[e["SHOW_MD"] = 1] = "SHOW_MD", e[e["SHOW_HTML"] = 2] = "SHOW_HTML";
}(He || (He = {}));
var Le = function (e) {
  function t(t) {
    var c;
    return c = e.call(this, t) || this, c.handleClick = c.handleClick.bind(a()(c)), c.handleChange = c.handleChange.bind(a()(c)), c.state = {
      view: c.editor.getView()
    }, c;
  }
  i()(t, e);
  var c = t.prototype;
  return c.handleClick = function () {
    switch (this.next) {
      case He.SHOW_ALL:
        this.editor.setView({
          html: !0,
          md: !0
        });
        break;
      case He.SHOW_HTML:
        this.editor.setView({
          html: !0,
          md: !1
        });
        break;
      case He.SHOW_MD:
        this.editor.setView({
          html: !1,
          md: !0
        });
        break;
    }
  }, c.handleChange = function (e) {
    this.setState({
      view: e
    });
  }, c.componentDidMount = function () {
    this.editor.on("viewchange", this.handleChange);
  }, c.componentWillUnmount = function () {
    this.editor.off("viewchange", this.handleChange);
  }, c.getDisplayInfo = function () {
    var e = this.next;
    switch (e) {
      case He.SHOW_ALL:
        return {
          icon: "view-split",
          title: "All"
        };
      case He.SHOW_HTML:
        return {
          icon: "visibility",
          title: "Preview"
        };
      default:
        return {
          icon: "keyboard",
          title: "Editor"
        };
    }
  }, c.render = function () {
    if (this.isDisplay) {
      var e = this.getDisplayInfo();
      return u["createElement"]("span", {
        className: "button button-type-mode",
        title: C.get("btnMode" + e.title),
        onClick: this.handleClick
      }, u["createElement"](h, {
        type: e.icon
      }));
    }
    return null;
  }, O()(t, [{
    key: "isDisplay",
    get: function () {
      var e = this.editorConfig.canView;
      return !!e && [e.html, e.md, e.both].filter(function (e) {
        return e;
      }).length >= 2;
    }
  }, {
    key: "next",
    get: function () {
      var e = this.editorConfig.canView,
        t = this.state.view,
        c = [He.SHOW_ALL, He.SHOW_MD, He.SHOW_HTML];
      e && (e.both || c.splice(c.indexOf(He.SHOW_ALL), 1), e.md || c.splice(c.indexOf(He.SHOW_MD), 1), e.html || c.splice(c.indexOf(He.SHOW_HTML), 1));
      var n = He.SHOW_MD;
      if (t.html && (n = He.SHOW_HTML), t.html && t.md && (n = He.SHOW_ALL), 0 === c.length) return n;
      if (1 === c.length) return c[0];
      var r = c.indexOf(n);
      return r < c.length - 1 ? c[r + 1] : c[0];
    }
  }]), t;
}(V);
Le.pluginName = "mode-toggle", Le.align = "right";
var ke = Le,
  xe = function (e) {
    function t(t) {
      var c;
      c = e.call(this, t) || this, c.config = {
        padding: 3,
        width: 20,
        height: 20
      };
      var n = t.maxRow,
        r = void 0 === n ? 5 : n,
        o = t.maxCol,
        a = void 0 === o ? 6 : o;
      return c.state = {
        maxRow: r,
        maxCol: a,
        list: c.formatTableModel(r, a)
      }, c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.formatTableModel = function (e, t) {
      void 0 === e && (e = 0), void 0 === t && (t = 0);
      var c = new Array(e).fill(void 0);
      return c.map(function (e) {
        return new Array(t).fill(0);
      });
    }, c.calcWrapStyle = function () {
      var e = this.state,
        t = e.maxRow,
        c = e.maxCol,
        n = this.config,
        r = n.width,
        o = n.height,
        a = n.padding,
        l = (r + a) * c - a,
        i = (o + a) * t - a;
      return {
        width: l + "px",
        height: i + "px"
      };
    }, c.calcItemStyle = function (e, t) {
      void 0 === e && (e = 0), void 0 === t && (t = 0);
      var c = this.config,
        n = c.width,
        r = c.height,
        o = c.padding,
        a = (r + o) * e,
        l = (n + o) * t;
      return {
        top: a + "px",
        left: l + "px"
      };
    }, c.getList = function (e, t) {
      var c = this.state.list;
      return c.map(function (c, n) {
        return c.map(function (c, r) {
          return n <= e && r <= t ? 1 : 0;
        });
      });
    }, c.handleHover = function (e, t) {
      this.setState({
        list: this.getList(e, t)
      });
    }, c.handleSetTable = function (e, t) {
      var c = this.props.onSetTable;
      "function" === typeof c && c({
        row: e + 1,
        col: t + 1
      });
    }, c.componentDidUpdate = function (e) {
      !1 === this.props.visibility && e.visibility !== this.props.visibility && this.setState({
        list: this.getList(-1, -1)
      });
    }, c.render = function () {
      var e = this;
      return u["createElement"]("ul", {
        className: "table-list wrap",
        style: this.calcWrapStyle()
      }, this.state.list.map(function (t, c) {
        return t.map(function (t, n) {
          return u["createElement"]("li", {
            className: "list-item " + (1 === t ? "active" : ""),
            key: c + "-" + n,
            style: e.calcItemStyle(c, n),
            onMouseOver: e.handleHover.bind(e, c, n),
            onClick: e.handleSetTable.bind(e, c, n)
          });
        });
      }));
    }, t;
  }(u["Component"]),
  Ee = xe,
  Pe = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.show = c.show.bind(a()(c)), c.hide = c.hide.bind(a()(c)), c.state = {
        show: !1
      }, c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.show = function () {
      this.setState({
        show: !0
      });
    }, c.hide = function () {
      this.setState({
        show: !1
      });
    }, c.render = function () {
      var e = this,
        t = this.editorConfig.table || this.props.config;
      return u["createElement"]("span", {
        className: "button button-type-table",
        title: C.get("btnTable"),
        onMouseEnter: this.show,
        onMouseLeave: this.hide
      }, u["createElement"](h, {
        type: "grid"
      }), u["createElement"](pe, {
        show: this.state.show,
        onClose: this.hide
      }, u["createElement"](Ee, {
        visibility: this.state.show,
        maxRow: t.maxRow,
        maxCol: t.maxCol,
        onSetTable: function (t) {
          return e.editor.insertMarkdown("table", t);
        }
      })));
    }, t;
  }(V);
Pe.pluginName = "table", Pe.defaultConfig = {
  maxRow: 6,
  maxCol: 6
};
var Te = require("./54535951.js"),
  je = interopDefault(Te),
  Ne = function (e) {
    function t() {
      return e.apply(this, arguments) || this;
    }
    i()(t, e);
    var c = t.prototype;
    return c.handleSelectMapValue = function (e) {
      var t = this.props.onSelectMapValue;
      "function" === typeof t && t(e);
    }, c.render = function () {
      var e = this,
        t = this.props.value;
      return u["createElement"]("ul", {
        className: "tab-map-list"
      }, [1, 2, 4, 8].map(function (c) {
        return u["createElement"]("li", {
          key: c,
          className: je()("list-item", {
            active: t === c
          })
        }, u["createElement"]("div", {
          onClick: e.handleSelectMapValue.bind(e, c)
        }, 1 === c ? C.get("tab") : c + " " + C.get("spaces")));
      }));
    }, t;
  }(u["Component"]),
  Re = Ne,
  _e = function (e) {
    function t(t) {
      var c;
      return c = e.call(this, t) || this, c.show = c.show.bind(a()(c)), c.hide = c.hide.bind(a()(c)), c.handleChangeMapValue = c.handleChangeMapValue.bind(a()(c)), c.state = {
        tabMapValue: c.getConfig("tabMapValue"),
        show: !1
      }, c.handleKeyboard = {
        key: "Tab",
        keyCode: 9,
        aliasCommand: !0,
        withKey: [],
        callback: function () {
          return c.editor.insertMarkdown("tab", {
            tabMapValue: c.state.tabMapValue
          });
        }
      }, c;
    }
    i()(t, e);
    var c = t.prototype;
    return c.show = function () {
      this.setState({
        show: !0
      });
    }, c.hide = function () {
      this.setState({
        show: !1
      });
    }, c.handleChangeMapValue = function (e) {
      this.setState({
        tabMapValue: e
      });
    }, c.componentDidMount = function () {
      this.editorConfig.shortcuts && this.editor.onKeyboard(this.handleKeyboard);
    }, c.componentWillUnmount = function () {
      this.editor.offKeyboard(this.handleKeyboard);
    }, c.render = function () {
      return u["createElement"]("span", {
        className: "button button-type-header",
        title: C.get("selectTabMap"),
        onClick: this.show,
        onMouseLeave: this.hide
      }, u["createElement"](h, {
        type: "tab"
      }), u["createElement"](pe, {
        show: this.state.show,
        onClose: this.hide
      }, u["createElement"](Re, {
        value: this.state.tabMapValue,
        onSelectMapValue: this.handleChangeMapValue
      })));
    }, t;
  }(V);
_e.pluginName = "tab-insert", _e.defaultConfig = {
  tabMapValue: 1
}, defineExport(legacyExports, "Plugins", function () {
  return Ae;
}), defineExport(legacyExports, "DropList", function () {
  return pe;
}), defineExport(legacyExports, "PluginComponent", function () {
  return V;
}), defineExport(legacyExports, "getDecorated", function () {
  return D;
}), ee.use(de), ee.use(le), ee.use(ie), ee.use(se), ee.use(ue), ee.use(Ce), ee.use(Me), ee.use(re), ee.use(oe), ee.use(ne), ee.use(ce), ee.use(Pe), ee.use(ze), ee.use(ge), ee.use(ae), ee.use(Se), ee.use(ke), ee.use(he);
var Ae = {
  Header: de,
  FontBold: le,
  FontItalic: ie,
  FontUnderline: se,
  FontStrikethrough: ue,
  ListUnordered: Ce,
  ListOrdered: Me,
  BlockQuote: re,
  BlockWrap: oe,
  BlockCodeInline: ne,
  BlockCodeBlock: ce,
  Table: Pe,
  Image: ze,
  Link: ge,
  Clear: ae,
  Logger: Se,
  ModeToggle: ke,
  FullScreen: he,
  AutoResize: te,
  TabInsert: _e
};
legacyExports["default"] = ee;
