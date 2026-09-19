import React from 'react';
import { connect } from "../vendor/reactRedux.js";
import { a as Modal } from "../vendor/Modal.js";
import { Icon } from "../vendor/Icon.js";

import "../vendor/iconStyles.js";
import '../vendor/componentStyles.js';
export class AdminLogin extends React.Component {
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
      password: this.passwordInput.current.value
    });
  };
  showPasswordHelp = () => {
    Modal.info({
      title: '忘记密码',
      content: <div><div>在站点目录下执行命令找回密码</div><code>php artisan reset:password 管理员邮箱</code></div>,
      centered: true,
      okText: '我知道了',
      onOk() {}
    });
  };
  render() {
    const {
      loginLoading
    } = this.props.passport;
    const {
      background_url,
      logo,
      title
    } = window.settings;
    return <div id="page-container">
        <main id="main-container">
          <div className="v2board-background" style={{
          backgroundImage: background_url && `url(${background_url})`
        }} />
          <div className="no-gutters v2board-auth-box">
            <div className="" style={{
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
                          <p className="font-size-sm text-muted mb-3">登录到管理中心</p>
                        </div>
                        <div className="form-group"><input type="text" className="form-control form-control-alt" placeholder="邮箱" ref={this.emailInput} /></div>
                        <div className="form-group"><input type="password" className="form-control form-control-alt" placeholder="密码" ref={this.passwordInput} /></div>
                        <div className="form-group mb-0">
                          <button disabled={loginLoading} type="submit" className="btn btn-block btn-primary font-w400" onClick={this.login}>
                            {loginLoading ? <Icon type="loading" /> : <span><i className="si si-login mr-1" />登入</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center bg-gray-lighter p-3 px-4"><a onClick={this.showPasswordHelp}>忘记密码</a></div>
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
}))(AdminLogin);
