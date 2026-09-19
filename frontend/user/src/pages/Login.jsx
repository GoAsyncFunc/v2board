import React from 'react';
import { connect } from "../vendor/reactRedux.js";
import { Divider } from "../vendor/Divider.js";
import { Icon } from "../vendor/Icon.js";
import history from "../vendor/routerHistory.js";
import { formatMessage, getLocale } from "../vendor/i18n.js";
import { a as LanguageSelector } from '../components/LanguageSelector.jsx';
import { localeSettings } from "../vendor/localeSettings.js";

import "../vendor/iconStyles.js";
import '../vendor/componentStyles.js';
const message = id => formatMessage({
  id
});
export class UserLogin extends React.Component {
  emailInput = React.createRef();
  passwordInput = React.createRef();
  componentDidMount() {
    const {
      verify,
      redirect
    } = this.props.location.query;
    if (verify) this.props.dispatch({
      type: 'passport/token2Login',
      verify,
      redirect
    });
    this.props.dispatch({
      type: 'user/checkLogin',
      redirect
    });
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.keyCode === 13) this.login();
  };
  login = () => {
    this.props.dispatch({
      type: 'passport/login',
      email: this.emailInput.current.value,
      password: this.passwordInput.current.value,
      redirect: this.props.location.query.redirect
    });
  };
  render() {
    const {
      loginLoading
    } = this.props.passport;
    const {
      background_url,
      title,
      logo,
      description
    } = window.settings;
    return <div id="page-container">
        <main id="main-container">
          <div className="v2board-background" style={{
          backgroundImage: background_url && `url(${background_url})`
        }} />
          <div className="no-gutters v2board-auth-box">
            <div style={{
            maxWidth: 450,
            width: '100%',
            margin: 'auto'
          }}>
              <div className="mx-2 mx-sm-0">
                <div className="block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image" style={{
                boxShadow: '0 0.5rem 2rem #0000000d'
              }}>
                  <div className="row no-gutters">
                    <div className="col-md-12 order-md-1 bg-white">
                      <div className="block-content block-content-full px-lg-4 py-md-4 py-lg-4">
                        <div className="mb-3 text-center">
                          <a className="font-size-h1" href="javascript:void(0);">
                            {logo ? <img className="v2board-logo mb-3" src={logo} /> : <span className="text-dark">{title || 'V2Board'}</span>}
                          </a>
                          {description && <p className="font-size-sm text-muted mb-3">{description}</p>}
                        </div>
                        <div className="form-group"><input type="text" className="form-control form-control-alt" placeholder={message('邮箱')} ref={this.emailInput} /></div>
                        <div className="form-group"><input type="password" className="form-control form-control-alt" placeholder={message('密码')} ref={this.passwordInput} /></div>
                        <div className="form-group mb-0">
                          <button disabled={loginLoading} type="submit" className="btn btn-block btn-primary font-w400" onClick={this.login}>
                            {loginLoading ? <Icon type="loading" /> : <span><i className="si si-login mr-1" />{message('登入')}</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-left bg-gray-lighter p-3 px-4">
                    <a className="font-size-sm text-muted" href="javascript:void(0);" onClick={() => history.push('/register')}>{message('注册')}</a>
                    <Divider type="vertical" />
                    <a className="font-size-sm text-muted" href="javascript:void(0);" onClick={() => history.push('/forgetpassword')}>{message('忘记密码')}</a>
                    <LanguageSelector><span className="v2board-login-i18n-btn"><i className="si si-globe pr-1" /><span className="font-size-sm text-muted" style={{
                        verticalAlign: 'text-bottom'
                      }}>{localeSettings.i18nText[getLocale()]}</span></span></LanguageSelector>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>;
  }
}
export default connect(({
  passport
}) => ({
  passport
}))(UserLogin);
