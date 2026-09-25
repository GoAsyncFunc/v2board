import React from 'react';
import Carousel from 'antd/lib/carousel';
import DashboardNoticeCard from './DashboardNoticeCard';
import type { UserNotice } from '../../types/subscriptionContracts';

interface DashboardNoticeSectionProps {
    notices: UserNotice[];
    onOpen: (notice: UserNotice) => void;
}

export default function DashboardNoticeSection({
    notices,
    onOpen,
}: DashboardNoticeSectionProps): React.ReactElement | null {
    if (notices.length === 0) return null;

    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-12 mb-sm-4">
                {notices.length > 1 ? (
                    <Carousel autoplay>
                        {notices.map((notice) => (
                            <div key={notice.id || notice.created_at}>
                                <DashboardNoticeCard notice={notice} onOpen={onOpen} />
                            </div>
                        ))}
                    </Carousel>
                ) : (
                    <DashboardNoticeCard notice={notices[0]} onOpen={onOpen} />
                )}
            </div>
        </div>
    );
}
