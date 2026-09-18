Object.defineProperty(exports, "__esModule", {
  value: !0
});

var React = require("./reactRuntime.js"),
  storeShape = require("./storeShape.js").storeShape;

class MiniStoreProvider extends React.Component {
  getChildContext() {
    return {
      miniStore: this.props.store
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

MiniStoreProvider.propTypes = {
  store: storeShape.isRequired
};
MiniStoreProvider.childContextTypes = {
  miniStore: storeShape.isRequired
};

exports.default = MiniStoreProvider;
