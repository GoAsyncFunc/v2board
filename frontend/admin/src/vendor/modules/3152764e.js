let legacyModule = module,
  legacyExports = exports;
var r = function () {
    function e(e) {
      this.value = e;
    }
    return e;
  }(),
  i = function () {
    function e() {
      this._len = 0;
    }
    return e.prototype.insert = function (e) {
      var t = new r(e);
      return this.insertEntry(t), t;
    }, e.prototype.insertEntry = function (e) {
      this.head ? (this.tail.next = e, e.prev = this.tail, e.next = null, this.tail = e) : this.head = this.tail = e, this._len++;
    }, e.prototype.remove = function (e) {
      var t = e.prev,
        n = e.next;
      t ? t.next = n : this.head = n, n ? n.prev = t : this.tail = t, e.next = e.prev = null, this._len--;
    }, e.prototype.len = function () {
      return this._len;
    }, e.prototype.clear = function () {
      this.head = this.tail = null, this._len = 0;
    }, e;
  }(),
  o = function () {
    function e(e) {
      this._list = new i(), this._maxSize = 10, this._map = {}, this._maxSize = e;
    }
    return e.prototype.put = function (e, t) {
      var n = this._list,
        i = this._map,
        o = null;
      if (null == i[e]) {
        var a = n.len(),
          s = this._lastRemovedEntry;
        if (a >= this._maxSize && a > 0) {
          var l = n.head;
          n.remove(l), delete i[l.key], o = l.value, this._lastRemovedEntry = l;
        }
        s ? s.value = t : s = new r(t), s.key = e, n.insertEntry(s), i[e] = s;
      }
      return o;
    }, e.prototype.get = function (e) {
      var t = this._map[e],
        n = this._list;
      if (null != t) return t !== n.tail && (n.remove(t), n.insertEntry(t)), t.value;
    }, e.prototype.clear = function () {
      this._list.clear(), this._map = {};
    }, e.prototype.len = function () {
      return this._list.len();
    }, e;
  }();
legacyExports["a"] = o;
