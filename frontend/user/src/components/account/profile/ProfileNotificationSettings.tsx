import React from 'react';
import Switch from 'antd/lib/switch';
import { formatMessage } from '../../../locales/i18n';
import type { UserInfo, UserSetting, UserState } from '../../../types/userContracts';

interface ProfileNotificationSettingsProps {
    userInfo: Partial<UserInfo>;
    userState: UserState;
    onSettingChange: (key: UserSetting, value: 0 | 1) => void;
}

export default function ProfileNotificationSettings({
    userInfo,
    userState,
    onSettingChange,
}: ProfileNotificationSettingsProps) {
    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-md-12">
                <div className="block block-rounded">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">{formatMessage({ id: '通知' })}</h3>
                    </div>
                    <div className="block-content">
                        <div className="row">
                            <div className="col-lg-8 col-xl-5">
                                <div className="form-group">
                                    <label>{formatMessage({ id: '到期邮件提醒' })}</label>
                                    <div>
                                        <Switch
                                            loading={userState.remind_expire_loading}
                                            checked={Boolean(userInfo.remind_expire)}
                                            onChange={(enabled) =>
                                                onSettingChange('remind_expire', enabled ? 1 : 0)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{formatMessage({ id: '流量邮件提醒' })}</label>
                                    <div>
                                        <Switch
                                            loading={userState.remind_traffic_loading}
                                            checked={Boolean(userInfo.remind_traffic)}
                                            onChange={(enabled) =>
                                                onSettingChange('remind_traffic', enabled ? 1 : 0)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
