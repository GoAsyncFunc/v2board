import React from 'react';
import Input from 'antd/lib/input';
import type { NoticeRecord } from '../../../types/notice';

export interface NoticeContentFieldsProps {
    notice: NoticeRecord;
    onChange: (field: keyof NoticeRecord, value: NoticeRecord[keyof NoticeRecord]) => void;
}

export function NoticeContentFields({
    notice,
    onChange,
}: NoticeContentFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="notice-title">标题</label>
                <Input
                    id="notice-title"
                    placeholder="请输入公告标题"
                    value={notice.title}
                    onChange={(event) => onChange('title', event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="notice-content">公告内容</label>
                <Input.TextArea
                    id="notice-content"
                    rows={12}
                    value={notice.content}
                    placeholder="请输入公告内容"
                    onChange={(event) => onChange('content', event.target.value)}
                />
            </div>
        </>
    );
}
