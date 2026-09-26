import React from 'react';
import Button from 'antd/lib/button';
import LoadingContainer from '@/components/common/LoadingContainer';
import { formatDate, formatDaysRemaining } from '@/components/common/DateTimeDisplay';
import {
    formatDeviceLimit,
    hasSubscriptionUsage,
    progressBarColor,
} from '@/components/subscription/SubscribeUsage';
import { formatMessage } from '@/locales/i18n';
import { calculateUsage, canRenew, formatBytes, isExpired } from '@/utils/siteHelpers';
import type { SubscriptionPlan, UserSubscription } from '@/types/subscriptionContracts';

interface DashboardSubscriptionProps {
    subscribe: Partial<UserSubscription>;
    usagePercent: number;
    onNavigate: (path: string) => void;
    onNewPeriod: () => void;
    onResetPackage: () => void;
}

function requireSubscriptionPlan(subscription: Partial<UserSubscription>): SubscriptionPlan {
    if (!subscription.plan) throw new TypeError('Active subscription plan was not provided');
    return subscription.plan;
}

export default function DashboardSubscription({
    subscribe,
    usagePercent,
    onNavigate,
    onNewPeriod,
    onResetPackage,
}: DashboardSubscriptionProps): React.ReactElement {
    if (!subscribe.email) return <LoadingContainer className="font-size-h3 mb-3" />;
    if (!subscribe.plan_id) {
        return (
            <a onClick={() => onNavigate('/plan')}>
                <div className="text-center">
                    <div>
                        <i className="fa fa-plus fa-2x" />
                    </div>
                    <div className="font-size-sm text-uppercase text-muted pt-2 pb-3">
                        {formatMessage({ id: '购买订阅' })}
                    </div>
                </div>
            </a>
        );
    }
    if (!hasSubscriptionUsage(subscribe)) return <LoadingContainer className="font-size-h3 mb-3" />;
    const plan = requireSubscriptionPlan(subscribe);
    const expired = isExpired(subscribe.expired_at);
    const renewalPath = canRenew(subscribe) ? `/plan/${subscribe.plan_id}` : '/plan';
    return (
        <div>
            <h3 className="h4 mb-3">{plan.name}</h3>
            {subscribe.expired_at === null ? (
                <p className="font-size-sm text-muted">{formatMessage({ id: '该订阅长期有效' })}</p>
            ) : (
                <p className="font-size-sm text-muted">
                    {expired ? (
                        <a className="font-w600 text-danger" href="javascript:void(0);">
                            {formatMessage({ id: '已过期' })}
                        </a>
                    ) : (
                        <span>
                            {formatMessage(
                                { id: '于 {date} 到期，距离到期还有 {day} 天。' },
                                {
                                    date: formatDate(subscribe.expired_at),
                                    day: formatDaysRemaining(subscribe.expired_at),
                                },
                            )}
                            {subscribe.reset_day !== null
                                ? subscribe.reset_day !== 0
                                    ? formatMessage(
                                          { id: '已用流量将在 {reset_day} 日后重置' },
                                          { reset_day: subscribe.reset_day },
                                      )
                                    : formatMessage({ id: '已用流量已在今日重置' })
                                : ''}
                        </span>
                    )}
                </p>
            )}
            <div className="mb-0">
                <div className="progress mb-1" style={{ height: 6 }}>
                    <div
                        className={`progress-bar progress-bar-striped progress-bar-animated bg-${progressBarColor(usagePercent)}`}
                        role="progressbar"
                        style={{
                            width: `${calculateUsage(subscribe.u + subscribe.d, subscribe.transfer_enable)}%`,
                        }}
                    />
                </div>
                <p className="font-size-sm font-w600 mb-3">
                    <span className="font-w700">
                        {formatMessage(
                            { id: '已用 {used} / 总计 {total}' },
                            {
                                used: formatBytes(subscribe.u + subscribe.d),
                                total: formatBytes(subscribe.transfer_enable),
                            },
                        )}
                    </span>
                    {'  '}
                    <span className="font-w700">
                        {formatMessage(
                            { id: '在线设备 {alive_ip}/{device_limit}' },
                            {
                                alive_ip: subscribe.alive_ip,
                                device_limit: formatDeviceLimit(subscribe.device_limit),
                            },
                        )}
                    </span>
                </p>
            </div>
            {usagePercent >= 80 && !expired && subscribe.plan?.reset_price && (
                <div className="mb-4">
                    <Button type="primary" onClick={onResetPackage}>
                        {formatMessage({ id: '购买流量重置包' })}
                    </Button>
                </div>
            )}
            {subscribe.allow_new_period && usagePercent >= 100 && !expired && (
                <div className="mb-4">
                    <Button type="primary" onClick={onNewPeriod}>
                        {formatMessage({ id: '提前开启流量周期' })}
                    </Button>
                </div>
            )}
            {expired && (
                <div className="mb-4">
                    <Button type="primary" onClick={() => onNavigate(renewalPath)}>
                        {formatMessage({ id: canRenew(subscribe) ? '续费订阅' : '购买订阅' })}
                    </Button>
                </div>
            )}
        </div>
    );
}
