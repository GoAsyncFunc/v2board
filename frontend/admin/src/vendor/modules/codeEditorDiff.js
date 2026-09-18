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
}();
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var i = require("./31377839.js"),
  o = require("./reactRuntime.js"),
  a = require("./codeEditorSplit.js"),
  s = require("./5a427753.js"),
  l = function (e) {
    function t(t) {
      var n = e.call(this, t) || this;
      return n.state = {
        value: n.props.value
      }, n.onChange = n.onChange.bind(n), n.diff = n.diff.bind(n), n;
    }
    return r(t, e), t.prototype.componentDidUpdate = function () {
      var e = this.props.value;
      e !== this.state.value && this.setState({
        value: e
      });
    }, t.prototype.onChange = function (e) {
      this.setState({
        value: e
      }), this.props.onChange && this.props.onChange(e);
    }, t.prototype.diff = function () {
      var e = new s(),
        t = this.state.value[0],
        n = this.state.value[1];
      if (0 === t.length && 0 === n.length) return [];
      var r = e.diff_main(t, n);
      e.diff_cleanupSemantic(r);
      var i = this.generateDiffedLines(r),
        o = this.setCodeMarkers(i);
      return o;
    }, t.prototype.generateDiffedLines = function (e) {
      var t = {
          DIFF_EQUAL: 0,
          DIFF_DELETE: -1,
          DIFF_INSERT: 1
        },
        n = {
          left: [],
          right: []
        },
        r = {
          left: 1,
          right: 1
        };
      return e.forEach(function (e) {
        var i = e[0],
          o = e[1],
          a = o.split("\n").length - 1;
        if (0 !== o.length) {
          var s = o[0],
            l = o[o.length - 1],
            u = 0;
          switch (i) {
            case t.DIFF_EQUAL:
              r.left += a, r.right += a;
              break;
            case t.DIFF_DELETE:
              "\n" === s && (r.left++, a--), u = a, 0 === u && n.right.push({
                startLine: r.right,
                endLine: r.right
              }), "\n" === l && (u -= 1), n.left.push({
                startLine: r.left,
                endLine: r.left + u
              }), r.left += a;
              break;
            case t.DIFF_INSERT:
              "\n" === s && (r.right++, a--), u = a, 0 === u && n.left.push({
                startLine: r.left,
                endLine: r.left
              }), "\n" === l && (u -= 1), n.right.push({
                startLine: r.right,
                endLine: r.right + u
              }), r.right += a;
              break;
            default:
              throw new Error("Diff type was not defined.");
          }
        }
      }), n;
    }, t.prototype.setCodeMarkers = function (e) {
      void 0 === e && (e = {
        left: [],
        right: []
      });
      for (var t = [], n = {
          left: [],
          right: []
        }, r = 0; r < e.left.length; r++) {
        var i = {
          startRow: e.left[r].startLine - 1,
          endRow: e.left[r].endLine,
          type: "text",
          className: "codeMarker"
        };
        n.left.push(i);
      }
      for (r = 0; r < e.right.length; r++) {
        i = {
          startRow: e.right[r].startLine - 1,
          endRow: e.right[r].endLine,
          type: "text",
          className: "codeMarker"
        };
        n.right.push(i);
      }
      return t[0] = n.left, t[1] = n.right, t;
    }, t.prototype.render = function () {
      var e = this.diff();
      return o.createElement(a.default, {
        name: this.props.name,
        className: this.props.className,
        focus: this.props.focus,
        orientation: this.props.orientation,
        splits: this.props.splits,
        mode: this.props.mode,
        theme: this.props.theme,
        height: this.props.height,
        width: this.props.width,
        fontSize: this.props.fontSize,
        showGutter: this.props.showGutter,
        onChange: this.onChange,
        onPaste: this.props.onPaste,
        onLoad: this.props.onLoad,
        onScroll: this.props.onScroll,
        minLines: this.props.minLines,
        maxLines: this.props.maxLines,
        readOnly: this.props.readOnly,
        highlightActiveLine: this.props.highlightActiveLine,
        showPrintMargin: this.props.showPrintMargin,
        tabSize: this.props.tabSize,
        cursorStart: this.props.cursorStart,
        editorProps: this.props.editorProps,
        style: this.props.style,
        scrollMargin: this.props.scrollMargin,
        setOptions: this.props.setOptions,
        wrapEnabled: this.props.wrapEnabled,
        enableBasicAutocompletion: this.props.enableBasicAutocompletion,
        enableLiveAutocompletion: this.props.enableLiveAutocompletion,
        value: this.state.value,
        markers: e
      });
    }, t.propTypes = {
      cursorStart: i.number,
      editorProps: i.object,
      enableBasicAutocompletion: i.bool,
      enableLiveAutocompletion: i.bool,
      focus: i.bool,
      fontSize: i.number,
      height: i.string,
      highlightActiveLine: i.bool,
      maxLines: i.number,
      minLines: i.number,
      mode: i.string,
      name: i.string,
      className: i.string,
      onLoad: i.func,
      onPaste: i.func,
      onScroll: i.func,
      onChange: i.func,
      orientation: i.string,
      readOnly: i.bool,
      scrollMargin: i.array,
      setOptions: i.object,
      showGutter: i.bool,
      showPrintMargin: i.bool,
      splits: i.number,
      style: i.object,
      tabSize: i.number,
      theme: i.string,
      value: i.array,
      width: i.string,
      wrapEnabled: i.bool
    }, t.defaultProps = {
      cursorStart: 1,
      editorProps: {},
      enableBasicAutocompletion: !1,
      enableLiveAutocompletion: !1,
      focus: !1,
      fontSize: 12,
      height: "500px",
      highlightActiveLine: !0,
      maxLines: null,
      minLines: null,
      mode: "",
      name: "ace-editor",
      onLoad: null,
      onScroll: null,
      onPaste: null,
      onChange: null,
      orientation: "beside",
      readOnly: !1,
      scrollMargin: [0, 0, 0, 0],
      setOptions: {},
      showGutter: !0,
      showPrintMargin: !0,
      splits: 2,
      style: {},
      tabSize: 4,
      theme: "github",
      value: ["", ""],
      width: "500px",
      wrapEnabled: !0
    }, t;
  }(o.Component);
legacyExports.default = l;
