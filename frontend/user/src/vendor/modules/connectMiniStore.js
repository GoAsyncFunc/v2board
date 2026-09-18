Object.defineProperty(exports, "__esModule", {
  value: !0
});
exports.default = connectMiniStore;

var React = require("./reactRuntime.js"),
  shallowEqual = require("./shallowEqualWithComparator.js"),
  copyProperties = require("./copyProperties.js"),
  lifecycleCompat = require("./reactLifecyclesCompat.js"),
  storeShape = require("./storeShape.js").storeShape;

function getDisplayName(component) {
  return component.displayName || component.name || "Component";
}

function isStateless(component) {
  return !component.prototype.render;
}

function emptyState() {
  return {};
}

function assign(target) {
  for (var sourceIndex = 1; sourceIndex < arguments.length; sourceIndex++) {
    var source = arguments[sourceIndex];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
    }
  }
  return target;
}

function connectMiniStore(mapStateToProps) {
  var shouldSubscribe = !!mapStateToProps,
    selectState = mapStateToProps || emptyState;

  return function wrapWithMiniStore(WrappedComponent) {
    class MiniStoreConnector extends React.Component {
      static getDerivedStateFromProps(props, previousState) {
        if (mapStateToProps && 2 === mapStateToProps.length && props !== previousState.props) {
          return {
            subscribed: selectState(previousState.store.getState(), props),
            props: props
          };
        }
        return {
          props: props
        };
      }

      constructor(props, context) {
        super(props, context);
        this.handleChange = () => {
          if (this.unsubscribe) {
            this.setState({
              subscribed: selectState(this.store.getState(), this.props)
            });
          }
        };
        this.store = context.miniStore;
        this.state = {
          subscribed: selectState(this.store.getState(), props),
          store: this.store,
          props: props
        };
      }

      componentDidMount() {
        this.trySubscribe();
      }

      componentWillUnmount() {
        this.tryUnsubscribe();
      }

      shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state.subscribed, nextState.subscribed);
      }

      trySubscribe() {
        if (shouldSubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange);
          this.handleChange();
        }
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      }

      getWrappedInstance() {
        return this.wrappedInstance;
      }

      render() {
        var props = assign({}, this.props, this.state.subscribed, {
          store: this.store
        });
        if (!isStateless(WrappedComponent)) {
          props = assign({}, props, {
            ref: component => this.wrappedInstance = component
          });
        }
        return React.createElement(WrappedComponent, props);
      }
    }

    MiniStoreConnector.displayName = "Connect(" + getDisplayName(WrappedComponent) + ")";
    MiniStoreConnector.contextTypes = {
      miniStore: storeShape.isRequired
    };
    lifecycleCompat.polyfill(MiniStoreConnector);
    return copyProperties(MiniStoreConnector, WrappedComponent);
  };
}
