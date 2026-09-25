import React from 'react';
import Button from 'antd/lib/button';
import TelegramBindModal from '../TelegramBindModal';
import { formatMessage } from '../../../locales/i18n';
import type { UserCommunicationConfig } from '../../../types/userDomainContracts';
import type { UserInfo } from '../../../types/user';

interface ProfileTelegramProps {
    config: UserCommunicationConfig;
    userInfo: Partial<UserInfo>;
    onUnbind: () => void;
}

export default function ProfileTelegram({ config, userInfo, onUnbind }: ProfileTelegramProps) {
    if (!config.is_telegram) return null;

    return userInfo.telegram_id ? (
        <div className="block block-rounded unbind_telegram">
            <div className="block-header block-header-default">
                <h3 className="block-title">{formatMessage({ id: '绑定Telegram' })}</h3>
                <div className="block-options">
                    <Button type="danger" onClick={onUnbind}>
                        {formatMessage({ id: '解除绑定' })}
                    </Button>
                </div>
            </div>
            <div className="block-options">
                {formatMessage({ id: `Telegram ID: ${String(userInfo.telegram_id)}` })}
            </div>
        </div>
    ) : (
        <div className="block block-rounded bind_telegram">
            <div className="block-header block-header-default">
                <h3 className="block-title">{formatMessage({ id: '绑定Telegram' })}</h3>
                <div className="block-options">
                    <TelegramBindModal>
                        <button
                            type="button"
                            className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
                        >
                            {formatMessage({ id: '立即开始' })}
                        </button>
                    </TelegramBindModal>
                </div>
            </div>
        </div>
    );
}

export function ProfileTelegramCommunity({ config }: { config: UserCommunicationConfig }) {
    if (!config.telegram_discuss_link) return null;

    return (
        <div className="block block-rounded join_telegram_disscuss">
            <div className="block-header block-header-default">
                <h3 className="block-title">{formatMessage({ id: 'Telegram 讨论组' })}</h3>
                <div className="block-options">
                    <a
                        href={config.telegram_discuss_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
                    >
                        {formatMessage({ id: '立即加入' })}
                    </a>
                </div>
            </div>
        </div>
    );
}
