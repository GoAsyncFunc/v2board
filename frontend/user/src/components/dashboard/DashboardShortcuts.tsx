import React from 'react';
import SubscribeImporter from '../subscription/SubscribeImporter';
import { formatMessage } from '../../locales/i18n';
import { canRenew } from '../../utils/siteHelpers';
import type { UserSubscription } from '../../types/subscriptionContracts';

interface DashboardShortcutsProps {
    subscribe: Partial<UserSubscription>;
    onNavigate: (path: string) => void;
}

export default function DashboardShortcuts({
    subscribe,
    onNavigate,
}: DashboardShortcutsProps): React.ReactElement {
    const renewal = canRenew(subscribe);
    return (
        <div className="mb-3">
            <div className="v2board-shortcuts-item" onClick={() => onNavigate('/knowledge')}>
                <div>{formatMessage({ id: '查看教程' })}</div>
                <div className="description">
                    {formatMessage({ id: '学习如何使用' })} {window?.settings?.title}
                </div>
                <i style={{ float: 'right' }} className="nav-main-link-icon si si-book-open" />
            </div>
            <SubscribeImporter subscribeUrl={subscribe.subscribe_url}>
                <div className="v2board-shortcuts-item">
                    <div>{formatMessage({ id: '一键订阅' })}</div>
                    <div className="description">
                        {formatMessage({ id: '快速将节点导入对应客户端进行使用' })}
                    </div>
                    <i style={{ float: 'right' }} className="nav-main-link-icon si si-feed" />
                </div>
            </SubscribeImporter>
            <div
                className="v2board-shortcuts-item"
                onClick={() => onNavigate(renewal ? `/plan/${subscribe.plan_id}` : '/plan')}
            >
                <div>{formatMessage({ id: renewal ? '续费订阅' : '购买订阅' })}</div>
                <div className="description">
                    {formatMessage({
                        id: renewal ? '对您当前的订阅进行续费' : '对您当前的订阅进行购买',
                    })}
                </div>
                <i
                    style={{ float: 'right' }}
                    className={`nav-main-link-icon si si-${renewal ? 'clock' : 'bag'}`}
                />
            </div>
            <div className="v2board-shortcuts-item" onClick={() => onNavigate('/ticket')}>
                <div>{formatMessage({ id: '遇到问题' })}</div>
                <div className="description">
                    {formatMessage({ id: '遇到问题可以通过工单与我们沟通' })}
                </div>
                <i style={{ float: 'right' }} className="nav-main-link-icon si si-support" />
            </div>
        </div>
    );
}
