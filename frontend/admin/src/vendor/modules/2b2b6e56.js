let legacyModule = module,
  legacyExports = exports;
(function (e) {
  ace.define("ace/split", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/editor", "ace/virtual_renderer", "ace/edit_session"], function (e, t, n) {
    "use strict";

    var r = e("./lib/oop"),
      i = (e("./lib/lang"), e("./lib/event_emitter").EventEmitter),
      o = e("./editor").Editor,
      a = e("./virtual_renderer").VirtualRenderer,
      s = e("./edit_session").EditSession,
      l = function (e, t, n) {
        this.BELOW = 1, this.BESIDE = 0, this.$container = e, this.$theme = t, this.$splits = 0, this.$editorCSS = "", this.$editors = [], this.$orientation = this.BESIDE, this.setSplits(n || 1), this.$cEditor = this.$editors[0], this.on("focus", function (e) {
          this.$cEditor = e;
        }.bind(this));
      };
    (function () {
      r.implement(this, i), this.$createEditor = function () {
        var e = document.createElement("div");
        e.className = this.$editorCSS, e.style.cssText = "position: absolute; top:0px; bottom:0px", this.$container.appendChild(e);
        var t = new o(new a(e, this.$theme));
        return t.on("focus", function () {
          this._emit("focus", t);
        }.bind(this)), this.$editors.push(t), t.setFontSize(this.$fontSize), t;
      }, this.setSplits = function (e) {
        var t;
        if (e < 1) throw "The number of splits have to be > 0!";
        if (e != this.$splits) {
          if (e > this.$splits) {
            while (this.$splits < this.$editors.length && this.$splits < e) t = this.$editors[this.$splits], this.$container.appendChild(t.container), t.setFontSize(this.$fontSize), this.$splits++;
            while (this.$splits < e) this.$createEditor(), this.$splits++;
          } else while (this.$splits > e) t = this.$editors[this.$splits - 1], this.$container.removeChild(t.container), this.$splits--;
          this.resize();
        }
      }, this.getSplits = function () {
        return this.$splits;
      }, this.getEditor = function (e) {
        return this.$editors[e];
      }, this.getCurrentEditor = function () {
        return this.$cEditor;
      }, this.focus = function () {
        this.$cEditor.focus();
      }, this.blur = function () {
        this.$cEditor.blur();
      }, this.setTheme = function (e) {
        this.$editors.forEach(function (t) {
          t.setTheme(e);
        });
      }, this.setKeyboardHandler = function (e) {
        this.$editors.forEach(function (t) {
          t.setKeyboardHandler(e);
        });
      }, this.forEach = function (e, t) {
        this.$editors.forEach(e, t);
      }, this.$fontSize = "", this.setFontSize = function (e) {
        this.$fontSize = e, this.forEach(function (t) {
          t.setFontSize(e);
        });
      }, this.$cloneSession = function (e) {
        var t = new s(e.getDocument(), e.getMode()),
          n = e.getUndoManager();
        return t.setUndoManager(n), t.setTabSize(e.getTabSize()), t.setUseSoftTabs(e.getUseSoftTabs()), t.setOverwrite(e.getOverwrite()), t.setBreakpoints(e.getBreakpoints()), t.setUseWrapMode(e.getUseWrapMode()), t.setUseWorker(e.getUseWorker()), t.setWrapLimitRange(e.$wrapLimitRange.min, e.$wrapLimitRange.max), t.$foldData = e.$cloneFoldData(), t;
      }, this.setSession = function (e, t) {
        var n;
        n = null == t ? this.$cEditor : this.$editors[t];
        var r = this.$editors.some(function (t) {
          return t.session === e;
        });
        return r && (e = this.$cloneSession(e)), n.setSession(e), e;
      }, this.getOrientation = function () {
        return this.$orientation;
      }, this.setOrientation = function (e) {
        this.$orientation != e && (this.$orientation = e, this.resize());
      }, this.resize = function () {
        var e,
          t = this.$container.clientWidth,
          n = this.$container.clientHeight;
        if (this.$orientation == this.BESIDE) for (var r = t / this.$splits, i = 0; i < this.$splits; i++) e = this.$editors[i], e.container.style.width = r + "px", e.container.style.top = "0px", e.container.style.left = i * r + "px", e.container.style.height = n + "px", e.resize();else {
          var o = n / this.$splits;
          for (i = 0; i < this.$splits; i++) e = this.$editors[i], e.container.style.width = t + "px", e.container.style.top = i * o + "px", e.container.style.left = "0px", e.container.style.height = o + "px", e.resize();
        }
      };
    }).call(l.prototype), t.Split = l;
  }), ace.define("ace/ext/split", ["require", "exports", "module", "ace/split"], function (e, t, n) {
    "use strict";

    n.exports = e("../split");
  }), function () {
    ace.require(["ace/ext/split"], function (t) {
      e && (e.exports = t);
    });
  }();
}).call(this, require("./59755469.js")(legacyModule));
