import React from 'react';
import type { QueueStats } from '@/types/monitoringContracts';

interface QueueOverviewProps {
    queueStats?: QueueStats | null;
}

export default function QueueOverview({ queueStats }: QueueOverviewProps): React.ReactElement {
    return (
        <div className="block block-rounded">
            <div className="block-header block-header-default">
                <h3 className="block-title">总览</h3>
            </div>
            <div className="block-content p-0">
                <div className="row no-gutters">
                    <div className="col-lg-6 col-xl-3 border-right p-4 border-bottom">
                        <div>当前作业量</div>
                        <div className="mt-4 font-size-h3">{queueStats?.jobsPerMinute || '0'}</div>
                    </div>
                    <div className="col-lg-6 col-xl-3 border-right p-4 border-bottom">
                        <div>近一小时处理量</div>
                        <div className="mt-4 font-size-h3">{queueStats?.recentJobs || '0'}</div>
                    </div>
                    <div className="col-lg-6 col-xl-3 border-right p-4 border-bottom">
                        <div>7日内报错数量</div>
                        <div className="mt-4 font-size-h3">{queueStats?.failedJobs || '0'}</div>
                    </div>
                    <div className="col-lg-6 col-xl-3 p-4 border-bottom overflow-hidden">
                        <div>状态</div>
                        <div className="mt-4 font-size-h3">
                            {queueStats && (queueStats.status ? '运行中' : '未启动')}
                        </div>
                        {queueStats && (
                            <i
                                className={`si ${queueStats.status ? 'si-check text-success' : 'si-close text-danger'}`}
                                style={{
                                    position: 'absolute',
                                    fontSize: 100,
                                    right: -20,
                                    bottom: -20,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
