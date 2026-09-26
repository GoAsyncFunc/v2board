import React from 'react';
import { formatIncome, formatLiveCount } from '@/components/common/MoneyDisplay';
import type { DashboardIncomeKey, DashboardStats } from '@/types/monitoringContracts';

const dashboardIncomeFields: Array<[DashboardIncomeKey, string]> = [
    ['month_income', '本月收入'],
    ['last_month_income', '上月收入'],
    ['commission_last_month_payout', '上月佣金支出'],
];

export default function DashboardOverview({
    stat,
    currency,
    orderChart,
}: {
    stat: DashboardStats;
    currency?: string;
    orderChart: React.RefObject<HTMLDivElement>;
}) {
    return (
        <div className="row no-gutters">
            <div className="col-lg-12 js-appear-enabled animated" data-toggle="appear">
                <div className="block border-bottom mb-0 v2board-stats-bar">
                    <div className="block-content">
                        <div className="d-flex align-items-center">
                            <div className="pr-4 pr-sm-5 pl-0 pl-sm-3">
                                <i className="fa fa-users fa-2x text-gray-light float-right" />
                                <div className="text-muted mb-1" style={{ width: 120 }}>
                                    在线人数
                                </div>
                                <div className="display-4 text-black font-w300 mb-2">
                                    {stat.online_user || '0'}
                                </div>
                            </div>
                            <div className="pr-4 pr-sm-5 pl-0 pl-sm-3">
                                <i className="fa fa-chart-line fa-2x text-gray-light float-right" />
                                <p className="text-muted w-75 mb-1">今日收入</p>
                                <p className="display-4 text-black font-w300 mb-2">
                                    {formatIncome(stat.day_income)}
                                    <span className="font-size-h5 font-w600 text-muted">
                                        {currency}
                                    </span>
                                </p>
                            </div>
                            <div className="pr-4 pr-sm-5 pl-0 pl-sm-3">
                                <i className="fa fa-user fa-2x text-gray-light float-right" />
                                <div className="text-muted mb-1" style={{ width: 120 }}>
                                    实时注册
                                </div>
                                <div className="display-4 text-black font-w300 mb-2">
                                    {formatLiveCount(stat.day_register_total)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12 js-appear-enabled animated" data-toggle="appear">
                <div className="block border-bottom mb-0 v2board-stats-bar">
                    <div className="block-content block-content-full">
                        <div className="d-flex align-items-center">
                            {dashboardIncomeFields.map(([key, label], index) => (
                                <div
                                    className={
                                        index
                                            ? 'px-4 px-sm-5 border-start'
                                            : 'pr-4 pr-sm-5 pl-0 pl-sm-3'
                                    }
                                    key={key}
                                >
                                    <p className="fs-3 text-dark mb-0">
                                        {formatIncome(stat[key])} {currency}
                                    </p>
                                    <p className="text-muted mb-0">{label}</p>
                                </div>
                            ))}
                            <div className="px-4 px-sm-5 border-start">
                                <p className="fs-3 text-dark mb-0">
                                    {stat.month_register_total || '-'}
                                </p>
                                <p className="text-muted mb-0">本月新增用户</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12 js-appear-enabled animated" data-toggle="appear">
                <div className="block border-bottom mb-0">
                    <div
                        className="px-sm-3 pt-sm-3 py-3 clearfix"
                        style={{ height: 400 }}
                        ref={orderChart}
                    />
                </div>
            </div>
        </div>
    );
}
