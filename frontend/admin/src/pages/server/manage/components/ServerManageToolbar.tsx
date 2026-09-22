import React from 'react';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import { createNewServerMenu } from '../editors/ServerEditorRegistry';

export interface ServerManageToolbarProps {
    sortMode: boolean;
    showSortControls?: boolean;
    onSearch: (value: string) => void;
    onToggleSort: () => void;
}

export function ServerManageToolbar({
    sortMode,
    showSortControls = true,
    onSearch,
    onToggleSort,
}: ServerManageToolbarProps): React.ReactElement {
    return (
        <div className="v2board-table-action" style={{ padding: 15 }}>
            <Dropdown overlay={createNewServerMenu()}>
                <Button>
                    <Icon type="plus" />
                </Button>
            </Dropdown>
            <Input
                placeholder="输入任意关键字搜索"
                style={{ width: 200 }}
                className="ml-2"
                onChange={(event) => onSearch(event.target.value)}
            />
            {showSortControls && (
                <Button style={{ float: 'right' }} type="primary" onClick={onToggleSort}>
                    {sortMode ? '保存排序' : '编辑排序'}
                </Button>
            )}
        </div>
    );
}
