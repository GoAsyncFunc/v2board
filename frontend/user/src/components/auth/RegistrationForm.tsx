import React from 'react';
import Icon from 'antd/lib/icon';
import Recaptcha from '@/components/common/Recaptcha';
import { formatMessage } from '@/locales/i18n';
import type { CommunicationConfig, RecaptchaToken } from '@/types/authenticationContracts';

export interface RegistrationFormProps {
    commConfig: CommunicationConfig;
    emailCodeInput: React.RefObject<HTMLInputElement>;
    emailInput: React.RefObject<HTMLInputElement>;
    emailSuffix?: string;
    inviteCode?: string;
    inviteInput: React.RefObject<HTMLInputElement>;
    onEmailSuffixChange: (value: string) => void;
    onRegister: (recaptchaData?: RecaptchaToken) => void;
    onSendEmailVerify: (recaptchaData?: RecaptchaToken) => void;
    onToggleTerms: () => void;
    passwordInput: React.RefObject<HTMLInputElement>;
    registerLoading: boolean;
    repeatedPasswordInput: React.RefObject<HTMLInputElement>;
    sendEmailVerifyLoading: boolean;
    sendEmailVerifyTimeout: number;
    tosChecked: boolean;
}

export default function RegistrationForm({
    commConfig,
    emailCodeInput,
    emailInput,
    emailSuffix,
    inviteCode,
    inviteInput,
    onEmailSuffixChange,
    onRegister,
    onSendEmailVerify,
    onToggleTerms,
    passwordInput,
    registerLoading,
    repeatedPasswordInput,
    sendEmailVerifyLoading,
    sendEmailVerifyTimeout,
    tosChecked,
}: RegistrationFormProps): React.ReactElement {
    return (
        <div>
            <div
                className={`form-group ${commConfig.email_whitelist_suffix ? 'v2board-email-whitelist-enable' : ''}`}
            >
                <input
                    type="text"
                    className="form-control form-control-alt"
                    placeholder={formatMessage({ id: '邮箱' })}
                    ref={emailInput}
                />
                {commConfig.email_whitelist_suffix ? (
                    <select
                        className="form-control form-control-alt"
                        value={emailSuffix}
                        onChange={(event) => onEmailSuffixChange(event.target.value)}
                    >
                        {commConfig.email_whitelist_suffix.map((suffix) => (
                            <option key={suffix} value={suffix}>
                                @{suffix}
                            </option>
                        ))}
                    </select>
                ) : (
                    ''
                )}
            </div>
            {commConfig.is_email_verify ? (
                <div className="form-group form-row">
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control form-control-alt"
                            placeholder={formatMessage({ id: '邮箱验证码' })}
                            ref={emailCodeInput}
                        />
                    </div>
                    <div className="col-3">
                        <Recaptcha
                            visible={Boolean(commConfig.is_recaptcha)}
                            callback={onSendEmailVerify}
                        >
                            <button
                                type="submit"
                                disabled={sendEmailVerifyTimeout !== 60 || sendEmailVerifyLoading}
                                className="btn btn-block btn-primary font-w400"
                            >
                                {sendEmailVerifyTimeout === 60 ? (
                                    sendEmailVerifyLoading ? (
                                        <Icon type="loading" />
                                    ) : (
                                        formatMessage({ id: '发送' })
                                    )
                                ) : (
                                    sendEmailVerifyTimeout
                                )}
                            </button>
                        </Recaptcha>
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className="form-group">
                <input
                    type="password"
                    className="form-control form-control-alt"
                    placeholder={formatMessage({ id: '密码' })}
                    ref={passwordInput}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control form-control-alt"
                    placeholder={formatMessage({ id: '密码' })}
                    ref={repeatedPasswordInput}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    disabled={Boolean(inviteCode)}
                    defaultValue={inviteCode}
                    className="form-control form-control-alt"
                    placeholder={formatMessage({
                        id: commConfig.is_invite_force ? '邀请码' : '邀请码(选填)',
                    })}
                    ref={inviteInput}
                />
            </div>
            {commConfig.tos_url && (
                <div className="form-group">
                    <div className="custom-control custom-checkbox custom-control-primary">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            checked={tosChecked}
                            style={{ zIndex: 1000 }}
                            onChange={onToggleTerms}
                        />
                        <label className="custom-control-label">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: formatMessage(
                                        {
                                            id: '我已阅读并同意 <a target="_blank" href="{url}">服务条款</a>',
                                        },
                                        { url: commConfig.tos_url },
                                    ),
                                }}
                            />
                        </label>
                    </div>
                </div>
            )}
            <div className="form-group mb-0">
                <Recaptcha visible={Boolean(commConfig.is_recaptcha)} callback={onRegister}>
                    <button
                        disabled={Boolean(registerLoading || (commConfig.tos_url && !tosChecked))}
                        type="submit"
                        className="btn btn-block btn-primary font-w400"
                    >
                        {registerLoading ? (
                            <Icon type="loading" />
                        ) : (
                            <span>
                                <i className="si si-emoticon-smile mr-1" />
                                {formatMessage({ id: '注册' })}
                            </span>
                        )}
                    </button>
                </Recaptcha>
            </div>
        </div>
    );
}
