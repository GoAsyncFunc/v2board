import React from 'react';
import { connect } from '../vendor/reactRedux.js';
import Modal from '../vendor/Modal.js';

let scriptPromise;

function loadRecaptchaScript() {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const callbackName = `recaptchaLoaded_${Date.now()}`;
    const script = document.createElement('script');
    window[callbackName] = () => {
      delete window[callbackName];
      resolve(window.grecaptcha);
    };
    script.src = `https://www.recaptcha.net/recaptcha/api.js?onload=${callbackName}&render=explicit`;
    script.async = true;
    script.onerror = reject;
    document.body.appendChild(script);
  });
  return scriptPromise;
}

class Recaptcha extends React.Component {
  state = { visible: false };
  widgetContainer = React.createRef();
  widgetId = null;

  show = () => {
    if (!this.props.visible) {
      this.props.callback?.();
      return;
    }
    this.setState({ visible: true });
  };

  hide = () => this.setState({ visible: false });

  handleChange = value => {
    setTimeout(() => {
      this.hide();
      this.props.callback?.(value);
    }, 500);
  };

  componentDidUpdate(previousProps, previousState) {
    if (!previousState.visible && this.state.visible) this.renderWidget();
  }

  componentWillUnmount() {
    if (this.widgetId !== null && window.grecaptcha) window.grecaptcha.reset(this.widgetId);
  }

  async renderWidget() {
    const grecaptcha = await loadRecaptchaScript();
    if (!this.state.visible || !this.widgetContainer.current || this.widgetId !== null) return;
    this.widgetId = grecaptcha.render(this.widgetContainer.current, {
      sitekey: this.props.guest.commConfig.recaptcha_site_key,
      callback: this.handleChange,
      'expired-callback': () => this.handleChange(null),
      'error-callback': () => this.handleChange(null),
    });
  }

  render() {
    return (
      <>
        {React.cloneElement(this.props.children, { onClick: this.show })}
        <Modal visible={this.state.visible} onCancel={this.hide} footer={false} closable={false} centered>
          <div ref={this.widgetContainer} />
        </Modal>
      </>
    );
  }
}

export default connect(state => ({ guest: state.guest }))(Recaptcha);
