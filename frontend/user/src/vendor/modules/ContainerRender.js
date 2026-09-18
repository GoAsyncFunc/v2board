var React = require("./reactRuntime.js");
var ReactDOM = require("./reactDomRuntime.js");
var PropTypes = require("./propTypesRuntime.js");

class ContainerRender extends React.Component {
  constructor(props) {
    super(props);

    this.container = null;
    this.removeContainer = this.removeContainer.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  componentDidMount() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  }

  componentDidUpdate() {
    if (this.props.autoMount) {
      this.renderComponent();
    }
  }

  componentWillUnmount() {
    if (this.props.autoDestroy) {
      this.removeContainer();
    }
  }

  removeContainer() {
    if (!this.container) {
      return;
    }

    ReactDOM.unmountComponentAtNode(this.container);
    this.container.parentNode.removeChild(this.container);
    this.container = null;
  }

  renderComponent(componentProps, ready) {
    var props = this.props;
    if (!props.visible && !props.parent._component && !props.forceRender) {
      return;
    }

    if (!this.container) {
      this.container = props.getContainer();
    }

    ReactDOM.unstable_renderSubtreeIntoContainer(
      props.parent,
      props.getComponent(componentProps),
      this.container,
      function handleRenderedComponent() {
        if (ready) {
          ready.call(this);
        }
      }
    );
  }

  render() {
    return this.props.children({
      renderComponent: this.renderComponent,
      removeContainer: this.removeContainer
    });
  }
}

ContainerRender.propTypes = {
  autoMount: PropTypes.bool,
  autoDestroy: PropTypes.bool,
  visible: PropTypes.bool,
  forceRender: PropTypes.bool,
  parent: PropTypes.any,
  getComponent: PropTypes.func.isRequired,
  getContainer: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

ContainerRender.defaultProps = {
  autoMount: true,
  autoDestroy: true,
  forceRender: false
};

module.exports = ContainerRender;
