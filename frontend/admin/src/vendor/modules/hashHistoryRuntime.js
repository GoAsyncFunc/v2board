let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var assign = Object.assign || function (target) {
    for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
      var source = arguments[sourceIndex];
      for (var propertyName in source) Object.prototype.hasOwnProperty.call(source, propertyName) && (target[propertyName] = source[propertyName]);
    }
    return target;
  },
  warningModule = require("./noopLegacy.js"),
  warning = interopDefault(warningModule),
  invariantModule = require("./invariant.js"),
  invariant = interopDefault(invariantModule),
  locationUtils = require("./locationRuntime.js"),
  pathUtils = require("./historyPathUtils.js"),
  transitionManagerModule = require("./5236342b.js"),
  createTransitionManager = interopDefault(transitionManagerModule),
  browserSupport = require("./historyBrowserSupport.js");
function interopDefault(moduleValue) {
  return moduleValue && moduleValue.__esModule ? moduleValue : {
    default: moduleValue
  };
}
var hashChangeEvent = "hashchange",
  hashPathCoders = {
    hashbang: {
      encodePath: function (path) {
        return "!" === path.charAt(0) ? path : "!/" + (0, pathUtils.stripLeadingSlash)(path);
      },
      decodePath: function (path) {
        return "!" === path.charAt(0) ? path.substr(1) : path;
      }
    },
    noslash: {
      encodePath: pathUtils.stripLeadingSlash,
      decodePath: pathUtils.addLeadingSlash
    },
    slash: {
      encodePath: pathUtils.addLeadingSlash,
      decodePath: pathUtils.addLeadingSlash
    }
  };
function getHashPath() {
  var href = window.location.href,
    hashIndex = href.indexOf("#");
  return -1 === hashIndex ? "" : href.substring(hashIndex + 1);
}
function pushHashPath(path) {
  return window.location.hash = path;
}
function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf("#");
  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + "#" + path);
}
function createHashHistory(options) {
  var historyOptions = void 0 === options ? {} : options;
  (0, invariant.default)(browserSupport.canUseDOM, "Hash history needs a DOM");
  var globalHistory = window.history,
    canGoWithoutReload = (0, browserSupport.supportsGoWithoutReloadUsingHash)(),
    getUserConfirmation = historyOptions.getUserConfirmation,
    confirm = void 0 === getUserConfirmation ? browserSupport.getConfirmation : getUserConfirmation,
    hashType = historyOptions.hashType,
    selectedHashType = void 0 === hashType ? "slash" : hashType,
    basename = historyOptions.basename ? (0, pathUtils.stripTrailingSlash)((0, pathUtils.addLeadingSlash)(historyOptions.basename)) : "",
    pathCoder = hashPathCoders[selectedHashType],
    encodePath = pathCoder.encodePath,
    decodePath = pathCoder.decodePath;
  function getDOMLocation() {
    var path = decodePath(getHashPath());
    (0, warning.default)(!basename || (0, pathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + path + '" to begin with "' + basename + '".'), basename && (path = (0, pathUtils.stripBasename)(path, basename));
    return (0, locationUtils.createLocation)(path);
  }
  var transitionManager = (0, createTransitionManager.default)();
  function setState(nextState) {
    assign(history, nextState), history.length = globalHistory.length, transitionManager.notifyListeners(history.location, history.action);
  }
  var forceNextPop = !1,
    ignorePath = null;
  function handleHashChange() {
    var path = getHashPath(),
      encodedPath = encodePath(path);
    if (path !== encodedPath) replaceHashPath(encodedPath);else {
      var location = getDOMLocation(),
        previousLocation = history.location;
      if (!forceNextPop && (0, locationUtils.locationsAreEqual)(previousLocation, location) || ignorePath === (0, pathUtils.createPath)(location)) return;
      ignorePath = null, handlePop(location);
    }
  }
  function handlePop(location) {
    if (forceNextPop) forceNextPop = !1, setState();else {
      var action = "POP";
      transitionManager.confirmTransitionTo(location, action, confirm, function (ok) {
        ok ? setState({
          action: action,
          location: location
        }) : revertPop(location);
      });
    }
  }
  function revertPop(fromLocation) {
    var currentPath = history.location,
      currentIndex = allPaths.lastIndexOf((0, pathUtils.createPath)(currentPath));
    -1 === currentIndex && (currentIndex = 0);
    var targetIndex = allPaths.lastIndexOf((0, pathUtils.createPath)(fromLocation));
    -1 === targetIndex && (targetIndex = 0);
    var delta = currentIndex - targetIndex;
    delta && (forceNextPop = !0, go(delta));
  }
  var initialHashPath = getHashPath(),
    encodedInitialHashPath = encodePath(initialHashPath);
  initialHashPath !== encodedInitialHashPath && replaceHashPath(encodedInitialHashPath);
  var initialLocation = getDOMLocation(),
    allPaths = [(0, pathUtils.createPath)(initialLocation)];
  function createHref(location) {
    return "#" + encodePath(basename + (0, pathUtils.createPath)(location));
  }
  function push(path) {
    (0, warning.default)(void 0 === arguments[1], "Hash history cannot push state; it is ignored");
    var action = "PUSH",
      location = (0, locationUtils.createLocation)(path, void 0, void 0, history.location);
    transitionManager.confirmTransitionTo(location, action, confirm, function (ok) {
      if (ok) {
        var nextPath = (0, pathUtils.createPath)(location),
          encodedPath = encodePath(basename + nextPath),
          hashChanged = getHashPath() !== encodedPath;
        if (hashChanged) {
          ignorePath = nextPath, pushHashPath(encodedPath);
          var previousIndex = allPaths.lastIndexOf((0, pathUtils.createPath)(history.location)),
            nextPaths = allPaths.slice(0, -1 === previousIndex ? 0 : previousIndex + 1);
          nextPaths.push(nextPath), allPaths = nextPaths, setState({
            action: action,
            location: location
          });
        } else (0, warning.default)(!1, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"), setState();
      }
    });
  }
  function replace(path) {
    (0, warning.default)(void 0 === arguments[1], "Hash history cannot replace state; it is ignored");
    var action = "REPLACE",
      location = (0, locationUtils.createLocation)(path, void 0, void 0, history.location);
    transitionManager.confirmTransitionTo(location, action, confirm, function (ok) {
      if (ok) {
        var nextPath = (0, pathUtils.createPath)(location),
          encodedPath = encodePath(basename + nextPath),
          hashChanged = getHashPath() !== encodedPath;
        hashChanged && (ignorePath = nextPath, replaceHashPath(encodedPath));
        var previousIndex = allPaths.indexOf((0, pathUtils.createPath)(history.location));
        -1 !== previousIndex && (allPaths[previousIndex] = nextPath), setState({
          action: action,
          location: location
        });
      }
    });
  }
  function go(delta) {
    (0, warning.default)(canGoWithoutReload, "Hash history go(n) causes a full page reload in this browser"), globalHistory.go(delta);
  }
  function goBack() {
    return go(-1);
  }
  function goForward() {
    return go(1);
  }
  var listenerCount = 0;
  function checkDOMListeners(delta) {
    listenerCount += delta, 1 === listenerCount ? window.addEventListener(hashChangeEvent, handleHashChange) : 0 === listenerCount && window.removeEventListener(hashChangeEvent, handleHashChange);
  }
  var isBlocked = !1;
  function block(prompt) {
    var unblockPrompt = transitionManager.setPrompt(void 0 === prompt ? !1 : prompt);
    return isBlocked || (checkDOMListeners(1), isBlocked = !0), function () {
      return isBlocked && (isBlocked = !1, checkDOMListeners(-1)), unblockPrompt();
    };
  }
  function listen(listener) {
    var cancelListener = transitionManager.appendListener(listener);
    return checkDOMListeners(1), function () {
      checkDOMListeners(-1), cancelListener();
    };
  }
  var history = {
    length: globalHistory.length,
    action: "POP",
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}
legacyExports.default = createHashHistory;
