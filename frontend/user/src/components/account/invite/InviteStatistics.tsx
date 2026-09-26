import React from 'react';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import { formatMessage } from '@/locales/i18n';
import type { InviteConfig, InviteState } from '@/types/invitationContracts';

interface InviteStatisticsProps {
    blockClassName: string;
    config: InviteConfig;
    stat: InviteState['stat'];
}

export function formatCommissionDistribution(
    config: InviteConfig,
    commissionRate?: number,
): string {
    const rate = Number(commissionRate) / 100;
    return [
        config.commission_distribution_l1,
        config.commission_distribution_l2,
        config.commission_distribution_l3,
    ]
        .map((distribution) => `${Number(distribution) * rate}%`)
        .join(',');
}

export default function InviteStatistics({ blockClassName, config, stat }: InviteStatisticsProps) {
    const [registeredUsers, totalCommission, pendingCommission, commissionRate] = stat;
    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-md-12">
                <div className={blockClassName}>
                    <div className="block-content pb-3">
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <div style={{ flex: 1 }}>{formatMessage({ id: '已注册用户数' })}</div>
                            <div style={{ flex: 1, textAlign: 'right' }}>
                                {registeredUsers !== undefined ? (
                                    registeredUsers
                                ) : (
                                    <Icon type="loading" />
                                )}
                                {'人'}
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <div style={{ flex: 1 }}>
                                {config.commission_distribution_enable ? (
                                    <>
                                        {formatMessage({ id: '三级分销比例' })}{' '}
                                        <Tooltip
                                            placement="top"
                                            title={formatMessage({
                                                id: '您邀请的用户再次邀请用户将按照订单金额乘以分销等级的比例进行分成。',
                                            })}
                                        >
                                            <Icon type="question-circle" />
                                        </Tooltip>
                                    </>
                                ) : (
                                    formatMessage({ id: '佣金比例' })
                                )}
                            </div>
                            <div style={{ flex: 1, textAlign: 'right' }}>
                                {config.commission_distribution_enable ? (
                                    formatCommissionDistribution(config, commissionRate)
                                ) : commissionRate !== undefined ? (
                                    `${commissionRate}%`
                                ) : (
                                    <Icon type="loading" />
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <div style={{ flex: 1 }}>
                                {formatMessage({ id: '确认中的佣金' })}{' '}
                                <Tooltip
                                    title={formatMessage({
                                        id: '佣金将会在确认后会到达你的佣金账户。',
                                    })}
                                >
                                    <Icon type="question-circle" />
                                </Tooltip>
                            </div>
                            <div style={{ flex: 1, textAlign: 'right' }}>
                                {pendingCommission !== undefined ? (
                                    `${config.currency_symbol} ${pendingCommission / 100}`
                                ) : (
                                    <Icon type="loading" />
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <div style={{ flex: 1 }}>{formatMessage({ id: '累计获得佣金' })}</div>
                            <div style={{ flex: 1, textAlign: 'right' }}>
                                {totalCommission !== undefined ? (
                                    `${config.currency_symbol} ${totalCommission / 100}`
                                ) : (
                                    <Icon type="loading" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
