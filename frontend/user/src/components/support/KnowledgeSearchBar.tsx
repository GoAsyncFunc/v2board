import React from 'react';
import Input from 'antd/lib/input';
import { formatMessage } from '../../locales/i18n';

interface KnowledgeSearchBarProps {
    onSearch: (keyword: string) => void;
}

export default function KnowledgeSearchBar({ onSearch }: KnowledgeSearchBarProps) {
    return (
        <div className="v2board-knowledge-search-bar">
            <Input.Search
                onChange={(event) => onSearch(event.target.value)}
                className="mb-3"
                size="large"
                enterButton
                placeholder={formatMessage({ id: '搜索文档' })}
            />
        </div>
    );
}
