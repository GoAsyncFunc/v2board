let legacyModule = module,
  legacyExports = exports;
var r = {
    transitionstart: {
      transition: "transitionstart",
      WebkitTransition: "webkitTransitionStart",
      MozTransition: "mozTransitionStart",
      OTransition: "oTransitionStart",
      msTransition: "MSTransitionStart"
    },
    animationstart: {
      animation: "animationstart",
      WebkitAnimation: "webkitAnimationStart",
      MozAnimation: "mozAnimationStart",
      OAnimation: "oAnimationStart",
      msAnimation: "MSAnimationStart"
    }
  },
  i = {
    transitionend: {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "mozTransitionEnd",
      OTransition: "oTransitionEnd",
      msTransition: "MSTransitionEnd"
    },
    animationend: {
      animation: "animationend",
      WebkitAnimation: "webkitAnimationEnd",
      MozAnimation: "mozAnimationEnd",
      OAnimation: "oAnimationEnd",
      msAnimation: "MSAnimationEnd"
    }
  },
  o = [],
  a = [];
function s() {
  var e = document.createElement("div"),
    t = e.style;
  function n(e, n) {
    for (var r in e) if (e.hasOwnProperty(r)) {
      var i = e[r];
      for (var o in i) if (o in t) {
        n.push(i[o]);
        break;
      }
    }
  }
  "AnimationEvent" in window || (delete r.animationstart.animation, delete i.animationend.animation), "TransitionEvent" in window || (delete r.transitionstart.transition, delete i.transitionend.transition), n(r, o), n(i, a);
}
function l(e, t, n) {
  e.addEventListener(t, n, !1);
}
function c(e, t, n) {
  e.removeEventListener(t, n, !1);
}
"undefined" !== typeof window && "undefined" !== typeof document && s();
var u = {
  startEvents: o,
  addStartEventListener: function (e, t) {
    0 !== o.length ? o.forEach(function (n) {
      l(e, n, t);
    }) : window.setTimeout(t, 0);
  },
  removeStartEventListener: function (e, t) {
    0 !== o.length && o.forEach(function (n) {
      c(e, n, t);
    });
  },
  endEvents: a,
  addEndEventListener: function (e, t) {
    0 !== a.length ? a.forEach(function (n) {
      l(e, n, t);
    }) : window.setTimeout(t, 0);
  },
  removeEndEventListener: function (e, t) {
    0 !== a.length && a.forEach(function (n) {
      c(e, n, t);
    });
  }
};
legacyExports["a"] = u;
