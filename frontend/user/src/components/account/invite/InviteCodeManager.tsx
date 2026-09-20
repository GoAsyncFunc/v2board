import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Table from 'antd/lib/table';
import { formatMessage } from '../../../locales/i18n';
import { createInviteCodeDateColumn } from '../InviteDisplayColumns';
import type { ColumnProps } from 'antd/lib/table';
import type { InviteCode } from '../../../types/invite';

interface InviteCodeManagerProps {
    blockClassName: string;
    codes: InviteCode[];
    saveLoading: boolean;
    onCopyLink: (code: string) => void;
    onGenerate: () => void;
}

export default function InviteCodeManager({
    blockClassName,
    codes,
    saveLoading,
    onCopyLink,
    onGenerate,
}: InviteCodeManagerProps) {
    const columns: ColumnProps<InviteCode>[] = [
        {
            title: formatMessage({ id: '邀请码' }),
            dataIndex: 'code',
            key: 'code',
            render: (code: string) => (
                <>
                    <span>{code}</span>
                    <a
                        style={{ marginLeft: 5 }}
                        href="javascript:void(0);"
                        onClick={() => onCopyLink(code)}
                    >
                        {formatMessage({ id: '复制链接' })}
                    </a>
                </>
            ),
        },
        createInviteCodeDateColumn(),
    ];

    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-md-12">
                <div className={blockClassName}>
                    <div className="block-header block-header-default">
                        <h3 className="block-title">{formatMessage({ id: '邀请码管理' })}</h3>
                        <div className="block-options">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
                                onClick={() => {
                                    if (!saveLoading) onGenerate();
                                }}
                            >
                                {saveLoading ? (
                                    <Icon type="loading" />
                                ) : (
                                    formatMessage({ id: '生成邀请码' })
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="block-content p-0">
                        <Table
                            tableLayout="auto"
                            columns={columns}
                            dataSource={codes}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
