import React from 'react';
import Button from 'antd/lib/button';
import { formatMessage } from '../../../locales/i18n';

interface ProfilePasswordFormProps {
    oldPasswordRef: React.RefObject<HTMLInputElement>;
    newPasswordRef: React.RefObject<HTMLInputElement>;
    repeatPasswordRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
    onSubmit: () => void;
}

export default function ProfilePasswordForm({
    oldPasswordRef,
    newPasswordRef,
    repeatPasswordRef,
    loading,
    onSubmit,
}: ProfilePasswordFormProps) {
    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-md-12">
                <div className="block block-rounded">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">{formatMessage({ id: '修改密码' })}</h3>
                    </div>
                    <div className="block-content">
                        <div className="row push">
                            <div className="col-lg-8 col-xl-5">
                                <div className="form-group">
                                    <label>{formatMessage({ id: '旧密码' })}</label>
                                    <input
                                        ref={oldPasswordRef}
                                        type="password"
                                        className="form-control"
                                        placeholder={formatMessage({ id: '请输入旧密码' })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{formatMessage({ id: '新密码' })}</label>
                                    <input
                                        ref={newPasswordRef}
                                        type="password"
                                        className="form-control"
                                        placeholder={formatMessage({ id: '请输入新密码' })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{formatMessage({ id: '新密码' })}</label>
                                    <input
                                        ref={repeatPasswordRef}
                                        type="password"
                                        className="form-control"
                                        placeholder={formatMessage({ id: '请输入新密码' })}
                                    />
                                </div>
                                <Button type="primary" onClick={onSubmit} loading={loading}>
                                    {formatMessage({ id: '保存' })}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
