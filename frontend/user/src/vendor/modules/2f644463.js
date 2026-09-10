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
  o = {
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
  i = [],
  a = [];
function s() {
  var e = document.createElement("div"),
    t = e.style;
  function n(e, n) {
    for (var r in e) if (e.hasOwnProperty(r)) {
      var o = e[r];
      for (var i in o) if (i in t) {
        n.push(o[i]);
        break;
      }
    }
  }
  "AnimationEvent" in window || (delete r.animationstart.animation, delete o.animationend.animation), "TransitionEvent" in window || (delete r.transitionstart.transition, delete o.transitionend.transition), n(r, i), n(o, a);
}
function c(e, t, n) {
  e.addEventListener(t, n, !1);
}
function u(e, t, n) {
  e.removeEventListener(t, n, !1);
}
"undefined" !== typeof window && "undefined" !== typeof document && s();
var l = {
  startEvents: i,
  addStartEventListener: function (e, t) {
    0 !== i.length ? i.forEach(function (n) {
      c(e, n, t);
    }) : window.setTimeout(t, 0);
  },
  removeStartEventListener: function (e, t) {
    0 !== i.length && i.forEach(function (n) {
      u(e, n, t);
    });
  },
  endEvents: a,
  addEndEventListener: function (e, t) {
    0 !== a.length ? a.forEach(function (n) {
      c(e, n, t);
    }) : window.setTimeout(t, 0);
  },
  removeEndEventListener: function (e, t) {
    0 !== a.length && a.forEach(function (n) {
      u(e, n, t);
    });
  }
};
legacyExports["a"] = l;
