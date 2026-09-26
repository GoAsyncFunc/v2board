import React from 'react';
import Button from 'antd/lib/button';
import Switch from 'antd/lib/switch';
import { formatMoney } from '@/components/common/MoneyDisplay';
import { formatMessage } from '@/locales/i18n';
import type { UserCommunicationConfig } from '@/types/userDomainContracts';
import type { UserInfo, UserSetting, UserState } from '@/types/userContracts';

interface ProfileWalletProps {
    config: UserCommunicationConfig;
    userInfo: Partial<UserInfo>;
    userState: UserState;
    onDeposit: () => void;
    onSettingChange: (key: UserSetting, value: 0 | 1) => void;
}

export default function ProfileWallet({
    config,
    userInfo,
    userState,
    onDeposit,
    onSettingChange,
}: ProfileWalletProps) {
    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-lg-12">
                <div className="block">
                    <div className="block-content pb-3">
                        <i className="fa fa-wallet fa-2x text-gray-light float-right" />
                        <div className="pb-sm-3">
                            <p className="text-muted w-75">
                                {formatMessage({ id: '我的钱包(仅消费)' })}
                            </p>
                            <p className="display-4 text-black font-w300 mb-2">
                                {formatMoney(userInfo.balance)}
                                <span className="font-size-h5 text-muted ml-4">
                                    {config.currency}
                                </span>
                            </p>
                            <span className="text-muted" style={{ cursor: 'pointer' }}>
                                {formatMessage({ id: '自动续费' })}{' '}
                                <Switch
                                    loading={userState.auto_renewal_loading}
                                    checked={Boolean(userInfo.auto_renewal)}
                                    onChange={(enabled) =>
                                        onSettingChange('auto_renewal', enabled ? 1 : 0)
                                    }
                                />
                            </span>
                            <div className="pt-3">
                                <Button type="primary" onClick={onDeposit}>
                                    {formatMessage({ id: '充值' })}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
