const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");

var reactModule = require("./reactRuntime.js"),
  React = interopDefault(reactModule),
  reactDomModule = require("./reactDomRuntime.js"),
  ReactDOM = interopDefault(reactDomModule),
  propTypesModule = require("./propTypesRuntime.js"),
  PropTypes = interopDefault(propTypesModule);

class Portal extends React.a.Component {
  componentDidMount() {
    this.createContainer();
  }

  componentDidUpdate(previousProps) {
    var didUpdate = this.props.didUpdate;
    if (didUpdate) didUpdate(previousProps);
  }

  componentWillUnmount() {
    this.removeContainer();
  }

  createContainer() {
    this._container = this.props.getContainer();
    this.forceUpdate();
  }

  removeContainer() {
    if (this._container) this._container.parentNode.removeChild(this._container);
  }

  render() {
    return this._container ? ReactDOM.a.createPortal(this.props.children, this._container) : null;
  }
}

Portal.propTypes = {
  getContainer: PropTypes.a.func.isRequired,
  children: PropTypes.a.node.isRequired,
  didUpdate: PropTypes.a.func
};

defineExport(exports, "a", function () {
  return Portal;
});
