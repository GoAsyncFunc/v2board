import React from 'react';
import { formatMessage } from '../../locales/i18n';
import { isExpired } from '../../utils/siteHelpers';
import type { UserSubscription } from '../../types/subscriptionContracts';

interface DashboardAlertsProps {
    stat: number[];
    subscribe: Partial<UserSubscription>;
    usagePercent: number;
    onNavigate: (path: string) => void;
    onResetPackage: () => void;
}

export default function DashboardAlerts({
    stat,
    subscribe,
    usagePercent,
    onNavigate,
    onResetPackage,
}: DashboardAlertsProps): React.ReactElement {
    return (
        <>
            {Boolean(stat[0]) && (
                <div className="alert alert-danger" role="alert">
                    <p className="mb-0">
                        {formatMessage({ id: '还有没支付的订单' })}{' '}
                        <a
                            className="alert-link"
                            href="javascript:void(0)"
                            onClick={() => onNavigate('/order')}
                        >
                            {formatMessage({ id: '立即支付' })}
                        </a>
                    </p>
                </div>
            )}
            {Boolean(stat[1]) && (
                <div className="alert alert-warning" role="alert">
                    <p className="mb-0">
                        <strong>{stat[1]}</strong> {formatMessage({ id: '条工单正在处理中' })}{' '}
                        <a
                            className="alert-link"
                            href="javascript:void(0)"
                            onClick={() => onNavigate('/ticket')}
                        >
                            {formatMessage({ id: '立即查看' })}
                        </a>
                    </p>
                </div>
            )}
            {usagePercent >= 80 && usagePercent < 100 && !isExpired(subscribe.expired_at) && (
                <div className="alert alert-info" role="alert">
                    <p className="mb-0">
                        {formatMessage({ id: '当前已使用流量达{rate}%' }, { rate: usagePercent })}{' '}
                        {subscribe.plan?.reset_price && (
                            <a onClick={onResetPackage}>
                                <strong>购买流量重置包</strong>
                            </a>
                        )}
                    </p>
                </div>
            )}
        </>
    );
}
