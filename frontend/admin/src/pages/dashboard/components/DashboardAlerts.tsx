import React from 'react';
import history from '../../../app/navigationService';
import type { DashboardStats } from '../../../types/monitoringContracts';

interface DashboardAlertsProps {
    onOpenCommissions: () => void;
    onOpenTickets: () => void;
    queueStatus?: string;
    stat: Pick<DashboardStats, 'commission_pending_total' | 'ticket_pending_total'>;
}

export default function DashboardAlerts({
    onOpenCommissions,
    onOpenTickets,
    queueStatus,
    stat,
}: DashboardAlertsProps) {
    return (
        <>
            {queueStatus && queueStatus !== 'running' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="alert alert-danger" role="alert">
                            <p className="mb-0">当前队列服务运行异常，可能会导致业务无法使用。</p>
                        </div>
                    </div>
                </div>
            )}
            {Boolean(stat.ticket_pending_total) && (
                <div className="alert alert-danger" role="alert">
                    <p className="mb-0">
                        有 {stat.ticket_pending_total} 条工单等待处理{' '}
                        <a className="alert-link" href="javascript:void(0)" onClick={onOpenTickets}>
                            立即处理
                        </a>
                    </p>
                </div>
            )}
            {Boolean(stat.commission_pending_total) && (
                <div className="alert alert-danger" role="alert">
                    <p className="mb-0">
                        有 {stat.commission_pending_total} 笔佣金等待确认{' '}
                        <a
                            className="alert-link"
                            href="javascript:void(0)"
                            onClick={onOpenCommissions}
                        >
                            立即处理
                        </a>
                    </p>
                </div>
            )}
        </>
    );
}
