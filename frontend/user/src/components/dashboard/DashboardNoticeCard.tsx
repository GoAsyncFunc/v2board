import React from 'react';
import { formatDateDash } from '../common/DateTimeDisplay';
import { formatMessage } from '../../locales/i18n';
import type { UserNotice } from '../../types/subscriptionContracts';

interface DashboardNoticeCardProps {
    notice: UserNotice;
    onOpen: (notice: UserNotice) => void;
}

export default function DashboardNoticeCard({
    notice,
    onOpen,
}: DashboardNoticeCardProps): React.ReactElement {
    const background = notice.img_url
        ? { backgroundImage: `url(${notice.img_url})`, backgroundSize: 'cover' }
        : {};
    return (
        <a
            className="block block-rounded bg-image mb-0 v2board-bg-pixels"
            style={background}
            href="javascript:void(0)"
            onClick={() => onOpen(notice)}
        >
            <div className="block-content bg-black-50">
                <div className="mb-5 mb-sm-7 d-sm-flex justify-content-sm-between align-items-sm-center">
                    <p>
                        <span className="badge badge-danger p-2 text-uppercase">
                            {formatMessage({ id: '公告' })}
                        </span>
                    </p>
                </div>
                <p className="font-size-lg text-white mb-1">{notice.title}</p>
                <p className="font-w600 text-white-75">{formatDateDash(notice.created_at)}</p>
            </div>
        </a>
    );
}
