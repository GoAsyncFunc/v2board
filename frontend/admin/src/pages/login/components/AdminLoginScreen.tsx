import React from 'react';
import Icon from 'antd/lib/icon';

interface AdminLoginScreenProps {
    backgroundUrl?: string;
    logo?: string;
    title?: string;
    emailInput: React.RefObject<HTMLInputElement>;
    passwordInput: React.RefObject<HTMLInputElement>;
    loginLoading: boolean;
    onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
    onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: () => void;
    onForgotPassword: () => void;
}

export function AdminLoginScreen({
    backgroundUrl,
    logo,
    title,
    emailInput,
    passwordInput,
    loginLoading,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onForgotPassword,
}: AdminLoginScreenProps): React.ReactElement {
    return (
        <div id="page-container">
            <main id="main-container">
                <div
                    className="v2board-background"
                    style={{
                        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
                    }}
                />
                <div className="no-gutters v2board-auth-box">
                    <div style={{ maxWidth: 450, width: '100%', margin: 'auto' }}>
                        <div className="mx-2 mx-sm-0">
                            <div
                                className="block block-rounded block-transparent block-fx-pop w-100 mb-0 overflow-hidden bg-image"
                                style={{ boxShadow: '0 0.5rem 2rem #0000000d' }}
                            >
                                <div className="row no-gutters">
                                    <div className="col-md-12 order-md-1 bg-white">
                                        <div className="block-content block-content-full px-lg-4 py-md-4 py-lg-4">
                                            <div className="mb-3 text-center">
                                                <a
                                                    className="font-size-h1"
                                                    href="javascript:void(0);"
                                                >
                                                    {logo ? (
                                                        <img
                                                            className="v2board-logo mb-3"
                                                            src={logo}
                                                        />
                                                    ) : (
                                                        <span className="text-dark">
                                                            {title || 'V2Board'}
                                                        </span>
                                                    )}
                                                </a>
                                                <p className="font-size-sm text-muted mb-3">
                                                    登录到管理中心
                                                </p>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-alt"
                                                    placeholder="邮箱"
                                                    ref={emailInput}
                                                    onChange={onEmailChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-alt"
                                                    placeholder="密码"
                                                    ref={passwordInput}
                                                    onChange={onPasswordChange}
                                                />
                                            </div>
                                            <div className="form-group mb-0">
                                                <button
                                                    disabled={loginLoading}
                                                    type="submit"
                                                    className="btn btn-block btn-primary font-w400"
                                                    onClick={onSubmit}
                                                >
                                                    {loginLoading ? (
                                                        <Icon type="loading" />
                                                    ) : (
                                                        <span>
                                                            <i className="si si-login mr-1" />
                                                            登入
                                                        </span>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center bg-gray-lighter p-3 px-4">
                                    <a onClick={onForgotPassword}>忘记密码</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminLoginScreen;
