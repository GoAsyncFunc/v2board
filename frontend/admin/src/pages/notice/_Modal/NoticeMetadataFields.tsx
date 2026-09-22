import React from 'react';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import type { NoticeRecord } from '../../../types/notice';

export interface NoticeMetadataFieldsProps {
    notice: NoticeRecord;
    onChange: (field: keyof NoticeRecord, value: NoticeRecord[keyof NoticeRecord]) => void;
}

export function NoticeMetadataFields({
    notice,
    onChange,
}: NoticeMetadataFieldsProps): React.ReactElement {
    return (
        <>
            <div className="form-group">
                <label htmlFor="notice-tags">公告标签</label>
                <Select
                    id="notice-tags"
                    mode="tags"
                    value={notice.tags || []}
                    style={{ width: '100%' }}
                    placeholder="输入后回车添加标签"
                    onChange={(tags: string[]) => onChange('tags', tags.length > 0 ? tags : null)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="notice-image">图片URL</label>
                <Input
                    id="notice-image"
                    placeholder="请输入图片URL"
                    value={notice.img_url}
                    onChange={(event) => onChange('img_url', event.target.value)}
                />
            </div>
        </>
    );
}
