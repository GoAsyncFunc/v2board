let legacyModule = module,
  legacyExports = exports;
var r = this && this.__extends || function () {
    var e = function (t, n) {
      return e = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (e, t) {
        e.__proto__ = t;
      } || function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      }, e(t, n);
    };
    return function (t, n) {
      function r() {
        this.constructor = t;
      }
      e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
    };
  }(),
  i = this && this.__assign || function () {
    return i = Object.assign || function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      return e;
    }, i.apply(this, arguments);
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var o = require("./74474578.js"),
  a = o.getAceInstance(),
  s = require("./62552f73.js"),
  l = require("./2b2b6e56.js"),
  u = require("./31377839.js"),
  c = require("./reactRuntime.js"),
  f = require("./58614753.js"),
  d = require("./79444a33.js"),
  h = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return o.editorEvents.forEach(function (e) {
        n[e] = n[e].bind(n);
      }), n.debounce = o.debounce, n;
    }
    return r(t, e), t.prototype.componentDidMount = function () {
      var e = this,
        t = this.props,
        n = t.className,
        r = t.onBeforeLoad,
        i = t.mode,
        s = t.focus,
        u = t.theme,
        c = t.fontSize,
        f = t.value,
        h = t.defaultValue,
        p = t.cursorStart,
        g = t.showGutter,
        m = t.wrapEnabled,
        v = t.showPrintMargin,
        y = t.scrollMargin,
        b = void 0 === y ? [0, 0, 0, 0] : y,
        x = t.keyboardHandler,
        _ = t.onLoad,
        w = t.commands,
        O = t.annotations,
        S = t.markers,
        k = t.splits;
      this.editor = a.edit(this.refEditor), this.editor.setTheme("ace/theme/" + u), r && r(a);
      var j = Object.keys(this.props.editorProps),
        M = new l.Split(this.editor.container, "ace/theme/" + u, k);
      this.editor.env.split = M, this.splitEditor = M.getEditor(0), this.split = M, this.editor.setShowPrintMargin(!1), this.editor.renderer.setShowGutter(!1);
      var C = this.splitEditor.$options;
      this.props.debounceChangePeriod && (this.onChange = this.debounce(this.onChange, this.props.debounceChangePeriod)), M.forEach(function (t, n) {
        for (var r = 0; r < j.length; r++) t[j[r]] = e.props.editorProps[j[r]];
        var s = d(h, n),
          l = d(f, n, "");
        t.session.setUndoManager(new a.UndoManager()), t.setTheme("ace/theme/" + u), t.renderer.setScrollMargin(b[0], b[1], b[2], b[3]), t.getSession().setMode("ace/mode/" + i), t.setFontSize(c), t.renderer.setShowGutter(g), t.getSession().setUseWrapMode(m), t.setShowPrintMargin(v), t.on("focus", e.onFocus), t.on("blur", e.onBlur), t.on("input", e.onInput), t.on("copy", e.onCopy), t.on("paste", e.onPaste), t.on("change", e.onChange), t.getSession().selection.on("changeSelection", e.onSelectionChange), t.getSession().selection.on("changeCursor", e.onCursorChange), t.session.on("changeScrollTop", e.onScroll), t.setValue(void 0 === s ? l : s, p);
        var y = d(O, n, []),
          _ = d(S, n, []);
        t.getSession().setAnnotations(y), _ && _.length > 0 && e.handleMarkers(_, t);
        for (r = 0; r < o.editorOptions.length; r++) {
          var k = o.editorOptions[r];
          C.hasOwnProperty(k) ? t.setOption(k, e.props[k]) : e.props[k] && console.warn("ReaceAce: editor option " + k + " was activated but not found. Did you need to import a related tool or did you possibly mispell the option?");
        }
        e.handleOptions(e.props, t), Array.isArray(w) && w.forEach(function (e) {
          "string" === typeof e.exec ? t.commands.bindKey(e.bindKey, e.exec) : t.commands.addCommand(e);
        }), x && t.setKeyboardHandler("ace/keyboard/" + x);
      }), n && (this.refEditor.className += " " + n), s && this.splitEditor.focus();
      var T = this.editor.env.split;
      T.setOrientation("below" === this.props.orientation ? T.BELOW : T.BESIDE), T.resize(!0), _ && _(T);
    }, t.prototype.componentDidUpdate = function (e) {
      var t = this,
        n = e,
        r = this.props,
        i = this.editor.env.split;
      if (r.splits !== n.splits && i.setSplits(r.splits), r.orientation !== n.orientation && i.setOrientation("below" === r.orientation ? i.BELOW : i.BESIDE), i.forEach(function (e, i) {
        r.mode !== n.mode && e.getSession().setMode("ace/mode/" + r.mode), r.keyboardHandler !== n.keyboardHandler && (r.keyboardHandler ? e.setKeyboardHandler("ace/keyboard/" + r.keyboardHandler) : e.setKeyboardHandler(null)), r.fontSize !== n.fontSize && e.setFontSize(r.fontSize), r.wrapEnabled !== n.wrapEnabled && e.getSession().setUseWrapMode(r.wrapEnabled), r.showPrintMargin !== n.showPrintMargin && e.setShowPrintMargin(r.showPrintMargin), r.showGutter !== n.showGutter && e.renderer.setShowGutter(r.showGutter);
        for (var a = 0; a < o.editorOptions.length; a++) {
          var s = o.editorOptions[a];
          r[s] !== n[s] && e.setOption(s, r[s]);
        }
        f(r.setOptions, n.setOptions) || t.handleOptions(r, e);
        var l = d(r.value, i, "");
        if (e.getValue() !== l) {
          t.silent = !0;
          var u = e.session.selection.toJSON();
          e.setValue(l, r.cursorStart), e.session.selection.fromJSON(u), t.silent = !1;
        }
        var c = d(r.annotations, i, []),
          h = d(n.annotations, i, []);
        f(c, h) || e.getSession().setAnnotations(c);
        var p = d(r.markers, i, []),
          g = d(n.markers, i, []);
        !f(p, g) && Array.isArray(p) && t.handleMarkers(p, e);
      }), r.className !== n.className) {
        var a = this.refEditor.className,
          s = a.trim().split(" "),
          l = n.className.trim().split(" ");
        l.forEach(function (e) {
          var t = s.indexOf(e);
          s.splice(t, 1);
        }), this.refEditor.className = " " + r.className + " " + s.join(" ");
      }
      r.theme !== n.theme && i.setTheme("ace/theme/" + r.theme), r.focus && !n.focus && this.splitEditor.focus(), r.height === this.props.height && r.width === this.props.width || this.editor.resize();
    }, t.prototype.componentWillUnmount = function () {
      this.editor.destroy(), this.editor = null;
    }, t.prototype.onChange = function (e) {
      if (this.props.onChange && !this.silent) {
        var t = [];
        this.editor.env.split.forEach(function (e) {
          t.push(e.getValue());
        }), this.props.onChange(t, e);
      }
    }, t.prototype.onSelectionChange = function (e) {
      if (this.props.onSelectionChange) {
        var t = [];
        this.editor.env.split.forEach(function (e) {
          t.push(e.getSelection());
        }), this.props.onSelectionChange(t, e);
      }
    }, t.prototype.onCursorChange = function (e) {
      if (this.props.onCursorChange) {
        var t = [];
        this.editor.env.split.forEach(function (e) {
          t.push(e.getSelection());
        }), this.props.onCursorChange(t, e);
      }
    }, t.prototype.onFocus = function (e) {
      this.props.onFocus && this.props.onFocus(e);
    }, t.prototype.onInput = function (e) {
      this.props.onInput && this.props.onInput(e);
    }, t.prototype.onBlur = function (e) {
      this.props.onBlur && this.props.onBlur(e);
    }, t.prototype.onCopy = function (e) {
      this.props.onCopy && this.props.onCopy(e);
    }, t.prototype.onPaste = function (e) {
      this.props.onPaste && this.props.onPaste(e);
    }, t.prototype.onScroll = function () {
      this.props.onScroll && this.props.onScroll(this.editor);
    }, t.prototype.handleOptions = function (e, t) {
      for (var n = Object.keys(e.setOptions), r = 0; r < n.length; r++) t.setOption(n[r], e.setOptions[n[r]]);
    }, t.prototype.handleMarkers = function (e, t) {
      var n = t.getSession().getMarkers(!0);
      for (var r in n) n.hasOwnProperty(r) && t.getSession().removeMarker(n[r].id);
      for (var r in n = t.getSession().getMarkers(!1), n) n.hasOwnProperty(r) && t.getSession().removeMarker(n[r].id);
      e.forEach(function (e) {
        var n = e.startRow,
          r = e.startCol,
          i = e.endRow,
          o = e.endCol,
          a = e.className,
          l = e.type,
          u = e.inFront,
          c = void 0 !== u && u,
          f = new s.Range(n, r, i, o);
        t.getSession().addMarker(f, a, l, c);
      });
    }, t.prototype.updateRef = function (e) {
      this.refEditor = e;
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.name,
        n = e.width,
        r = e.height,
        o = e.style,
        a = i({
          width: n,
          height: r
        }, o);
      return c.createElement("div", {
        ref: this.updateRef,
        id: t,
        style: a
      });
    }, t.propTypes = {
      className: u.string,
      debounceChangePeriod: u.number,
      defaultValue: u.arrayOf(u.string),
      focus: u.bool,
      fontSize: u.oneOfType([u.number, u.string]),
      height: u.string,
      mode: u.string,
      name: u.string,
      onBlur: u.func,
      onChange: u.func,
      onCopy: u.func,
      onFocus: u.func,
      onInput: u.func,
      onLoad: u.func,
      onPaste: u.func,
      onScroll: u.func,
      orientation: u.string,
      showGutter: u.bool,
      splits: u.number,
      theme: u.string,
      value: u.arrayOf(u.string),
      width: u.string,
      onSelectionChange: u.func,
      onCursorChange: u.func,
      onBeforeLoad: u.func,
      minLines: u.number,
      maxLines: u.number,
      readOnly: u.bool,
      highlightActiveLine: u.bool,
      tabSize: u.number,
      showPrintMargin: u.bool,
      cursorStart: u.number,
      editorProps: u.object,
      setOptions: u.object,
      style: u.object,
      scrollMargin: u.array,
      annotations: u.array,
      markers: u.array,
      keyboardHandler: u.string,
      wrapEnabled: u.bool,
      enableBasicAutocompletion: u.oneOfType([u.bool, u.array]),
      enableLiveAutocompletion: u.oneOfType([u.bool, u.array]),
      commands: u.array
    }, t.defaultProps = {
      name: "ace-editor",
      focus: !1,
      orientation: "beside",
      splits: 2,
      mode: "",
      theme: "",
      height: "500px",
      width: "500px",
      value: [],
      fontSize: 12,
      showGutter: !0,
      onChange: null,
      onPaste: null,
      onLoad: null,
      onScroll: null,
      minLines: null,
      maxLines: null,
      readOnly: !1,
      highlightActiveLine: !0,
      showPrintMargin: !0,
      tabSize: 4,
      cursorStart: 1,
      editorProps: {},
      style: {},
      scrollMargin: [0, 0, 0, 0],
      setOptions: {},
      wrapEnabled: !1,
      enableBasicAutocompletion: !1,
      enableLiveAutocompletion: !1
    }, t;
  }(c.Component);
legacyExports.default = h;
