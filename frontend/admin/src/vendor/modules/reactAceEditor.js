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
var o = require("./31377839.js"),
  a = require("./reactRuntime.js"),
  s = require("./58614753.js"),
  l = require("./74474578.js"),
  u = l.getAceInstance(),
  c = u.require("ace/range").Range,
  f = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return l.editorEvents.forEach(function (e) {
        n[e] = n[e].bind(n);
      }), n.debounce = l.debounce, n;
    }
    return r(t, e), t.prototype.componentDidMount = function () {
      var e = this,
        t = this.props,
        n = t.className,
        r = t.onBeforeLoad,
        i = t.onValidate,
        o = t.mode,
        a = t.focus,
        s = t.theme,
        c = t.fontSize,
        f = t.value,
        d = t.defaultValue,
        h = t.cursorStart,
        p = t.showGutter,
        g = t.wrapEnabled,
        m = t.showPrintMargin,
        v = t.scrollMargin,
        y = void 0 === v ? [0, 0, 0, 0] : v,
        b = t.keyboardHandler,
        x = t.onLoad,
        _ = t.commands,
        w = t.annotations,
        O = t.markers,
        S = t.placeholder;
      this.editor = u.edit(this.refEditor), r && r(u);
      for (var k = Object.keys(this.props.editorProps), j = 0; j < k.length; j++) this.editor[k[j]] = this.props.editorProps[k[j]];
      this.props.debounceChangePeriod && (this.onChange = this.debounce(this.onChange, this.props.debounceChangePeriod)), this.editor.renderer.setScrollMargin(y[0], y[1], y[2], y[3]), this.editor.getSession().setMode("ace/mode/" + o), this.editor.setTheme("ace/theme/" + s), this.editor.setFontSize(c), this.editor.getSession().setValue(d || f, h), this.props.navigateToFileEnd && this.editor.navigateFileEnd(), this.editor.renderer.setShowGutter(p), this.editor.getSession().setUseWrapMode(g), this.editor.setShowPrintMargin(m), this.editor.on("focus", this.onFocus), this.editor.on("blur", this.onBlur), this.editor.on("copy", this.onCopy), this.editor.on("paste", this.onPaste), this.editor.on("change", this.onChange), this.editor.on("input", this.onInput), S && this.updatePlaceholder(), this.editor.getSession().selection.on("changeSelection", this.onSelectionChange), this.editor.getSession().selection.on("changeCursor", this.onCursorChange), i && this.editor.getSession().on("changeAnnotation", function () {
        var t = e.editor.getSession().getAnnotations();
        e.props.onValidate(t);
      }), this.editor.session.on("changeScrollTop", this.onScroll), this.editor.getSession().setAnnotations(w || []), O && O.length > 0 && this.handleMarkers(O);
      var M = this.editor.$options;
      l.editorOptions.forEach(function (t) {
        M.hasOwnProperty(t) ? e.editor.setOption(t, e.props[t]) : e.props[t] && console.warn("ReactAce: editor option " + t + " was activated but not found. Did you need to import a related tool or did you possibly mispell the option?");
      }), this.handleOptions(this.props), Array.isArray(_) && _.forEach(function (t) {
        "string" === typeof t.exec ? e.editor.commands.bindKey(t.bindKey, t.exec) : e.editor.commands.addCommand(t);
      }), b && this.editor.setKeyboardHandler("ace/keyboard/" + b), n && (this.refEditor.className += " " + n), x && x(this.editor), this.editor.resize(), a && this.editor.focus();
    }, t.prototype.componentDidUpdate = function (e) {
      for (var t = e, n = this.props, r = 0; r < l.editorOptions.length; r++) {
        var i = l.editorOptions[r];
        n[i] !== t[i] && this.editor.setOption(i, n[i]);
      }
      if (n.className !== t.className) {
        var o = this.refEditor.className,
          a = o.trim().split(" "),
          u = t.className.trim().split(" ");
        u.forEach(function (e) {
          var t = a.indexOf(e);
          a.splice(t, 1);
        }), this.refEditor.className = " " + n.className + " " + a.join(" ");
      }
      if (this.editor && this.editor.getValue() !== n.value) {
        this.silent = !0;
        var c = this.editor.session.selection.toJSON();
        this.editor.setValue(n.value, n.cursorStart), this.editor.session.selection.fromJSON(c), this.silent = !1;
      }
      n.placeholder !== t.placeholder && this.updatePlaceholder(), n.mode !== t.mode && this.editor.getSession().setMode("ace/mode/" + n.mode), n.theme !== t.theme && this.editor.setTheme("ace/theme/" + n.theme), n.keyboardHandler !== t.keyboardHandler && (n.keyboardHandler ? this.editor.setKeyboardHandler("ace/keyboard/" + n.keyboardHandler) : this.editor.setKeyboardHandler(null)), n.fontSize !== t.fontSize && this.editor.setFontSize(n.fontSize), n.wrapEnabled !== t.wrapEnabled && this.editor.getSession().setUseWrapMode(n.wrapEnabled), n.showPrintMargin !== t.showPrintMargin && this.editor.setShowPrintMargin(n.showPrintMargin), n.showGutter !== t.showGutter && this.editor.renderer.setShowGutter(n.showGutter), s(n.setOptions, t.setOptions) || this.handleOptions(n), s(n.annotations, t.annotations) || this.editor.getSession().setAnnotations(n.annotations || []), !s(n.markers, t.markers) && Array.isArray(n.markers) && this.handleMarkers(n.markers), s(n.scrollMargin, t.scrollMargin) || this.handleScrollMargins(n.scrollMargin), e.height === this.props.height && e.width === this.props.width || this.editor.resize(), this.props.focus && !e.focus && this.editor.focus();
    }, t.prototype.handleScrollMargins = function (e) {
      void 0 === e && (e = [0, 0, 0, 0]), this.editor.renderer.setScrollMargins(e[0], e[1], e[2], e[3]);
    }, t.prototype.componentWillUnmount = function () {
      this.editor.destroy(), this.editor = null;
    }, t.prototype.onChange = function (e) {
      if (this.props.onChange && !this.silent) {
        var t = this.editor.getValue();
        this.props.onChange(t, e);
      }
    }, t.prototype.onSelectionChange = function (e) {
      if (this.props.onSelectionChange) {
        var t = this.editor.getSelection();
        this.props.onSelectionChange(t, e);
      }
    }, t.prototype.onCursorChange = function (e) {
      if (this.props.onCursorChange) {
        var t = this.editor.getSelection();
        this.props.onCursorChange(t, e);
      }
    }, t.prototype.onInput = function (e) {
      this.props.onInput && this.props.onInput(e), this.props.placeholder && this.updatePlaceholder();
    }, t.prototype.onFocus = function (e) {
      this.props.onFocus && this.props.onFocus(e, this.editor);
    }, t.prototype.onBlur = function (e) {
      this.props.onBlur && this.props.onBlur(e, this.editor);
    }, t.prototype.onCopy = function (e) {
      this.props.onCopy && this.props.onCopy(e);
    }, t.prototype.onPaste = function (e) {
      this.props.onPaste && this.props.onPaste(e);
    }, t.prototype.onScroll = function () {
      this.props.onScroll && this.props.onScroll(this.editor);
    }, t.prototype.handleOptions = function (e) {
      for (var t = Object.keys(e.setOptions), n = 0; n < t.length; n++) this.editor.setOption(t[n], e.setOptions[t[n]]);
    }, t.prototype.handleMarkers = function (e) {
      var t = this,
        n = this.editor.getSession().getMarkers(!0);
      for (var r in n) n.hasOwnProperty(r) && this.editor.getSession().removeMarker(n[r].id);
      for (var r in n = this.editor.getSession().getMarkers(!1), n) n.hasOwnProperty(r) && "ace_active-line" !== n[r].clazz && "ace_selected-word" !== n[r].clazz && this.editor.getSession().removeMarker(n[r].id);
      e.forEach(function (e) {
        var n = e.startRow,
          r = e.startCol,
          i = e.endRow,
          o = e.endCol,
          a = e.className,
          s = e.type,
          l = e.inFront,
          u = void 0 !== l && l,
          f = new c(n, r, i, o);
        t.editor.getSession().addMarker(f, a, s, u);
      });
    }, t.prototype.updatePlaceholder = function () {
      var e = this.editor,
        t = this.props.placeholder,
        n = !e.session.getValue().length,
        r = e.renderer.placeholderNode;
      !n && r ? (e.renderer.scroller.removeChild(e.renderer.placeholderNode), e.renderer.placeholderNode = null) : n && !r ? (r = e.renderer.placeholderNode = document.createElement("div"), r.textContent = t || "", r.className = "ace_comment ace_placeholder", r.style.padding = "0 9px", r.style.position = "absolute", r.style.zIndex = "3", e.renderer.scroller.appendChild(r)) : n && r && (r.textContent = t);
    }, t.prototype.updateRef = function (e) {
      this.refEditor = e;
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.name,
        n = e.width,
        r = e.height,
        o = e.style,
        s = i({
          width: n,
          height: r
        }, o);
      return a.createElement("div", {
        ref: this.updateRef,
        id: t,
        style: s
      });
    }, t.propTypes = {
      mode: o.string,
      focus: o.bool,
      theme: o.string,
      name: o.string,
      className: o.string,
      height: o.string,
      width: o.string,
      fontSize: o.oneOfType([o.number, o.string]),
      showGutter: o.bool,
      onChange: o.func,
      onCopy: o.func,
      onPaste: o.func,
      onFocus: o.func,
      onInput: o.func,
      onBlur: o.func,
      onScroll: o.func,
      value: o.string,
      defaultValue: o.string,
      onLoad: o.func,
      onSelectionChange: o.func,
      onCursorChange: o.func,
      onBeforeLoad: o.func,
      onValidate: o.func,
      minLines: o.number,
      maxLines: o.number,
      readOnly: o.bool,
      highlightActiveLine: o.bool,
      tabSize: o.number,
      showPrintMargin: o.bool,
      cursorStart: o.number,
      debounceChangePeriod: o.number,
      editorProps: o.object,
      setOptions: o.object,
      style: o.object,
      scrollMargin: o.array,
      annotations: o.array,
      markers: o.array,
      keyboardHandler: o.string,
      wrapEnabled: o.bool,
      enableSnippets: o.bool,
      enableBasicAutocompletion: o.oneOfType([o.bool, o.array]),
      enableLiveAutocompletion: o.oneOfType([o.bool, o.array]),
      navigateToFileEnd: o.bool,
      commands: o.array,
      placeholder: o.string
    }, t.defaultProps = {
      name: "ace-editor",
      focus: !1,
      mode: "",
      theme: "",
      height: "500px",
      width: "500px",
      value: "",
      fontSize: 12,
      enableSnippets: !1,
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
      enableLiveAutocompletion: !1,
      placeholder: null,
      navigateToFileEnd: !0
    }, t;
  }(a.Component);
legacyExports.default = f;
