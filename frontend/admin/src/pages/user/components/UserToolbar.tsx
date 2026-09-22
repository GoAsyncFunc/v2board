import React from 'react';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Tooltip from 'antd/lib/tooltip';
import UserFilterDrawer from './UserFilterDrawer';
import SendMailEditor from './SendMailEditor';
import UserGenerator from './UserGenerator';
import type { FilterItem } from '../../../types/filter';
import type { UserPlanOption } from '../../../types/user';

interface UserToolbarProps {
    filter: FilterItem[];
    plans: UserPlanOption[];
    onFilter: (filter: FilterItem[]) => void;
    onExport: () => void;
    onBatchBan: () => void;
    onBatchDelete: () => void;
}

export default function UserToolbar({
    filter,
    plans,
    onFilter,
    onExport,
    onBatchBan,
    onBatchDelete,
}: UserToolbarProps) {
    return (
        <div className="v2board-table-action" style={{ padding: 15 }}>
            <Tooltip
                title="Tips：可以使用过滤器过滤后再使用操作对过滤的用户进行操作。"
                placement="right"
            >
                <Button.Group>
                    <UserFilterDrawer
                        key={filter.length}
                        value={filter}
                        plans={plans}
                        onOk={onFilter}
                    >
                        <Button type={filter.length > 0 ? 'primary' : undefined}>
                            <Icon type="filter" /> 过滤器
                        </Button>
                    </UserFilterDrawer>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <a onClick={onExport}>
                                        <Icon type="file-excel" /> 导出CSV
                                    </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <SendMailEditor>
                                        <a>
                                            <Icon type="mail" /> 发送邮件
                                        </a>
                                    </SendMailEditor>
                                </Menu.Item>
                                <Menu.Item disabled={!filter.length}>
                                    <a onClick={onBatchBan}>
                                        <Icon type="stop" /> 批量封禁
                                    </a>
                                </Menu.Item>
                                <Menu.Item disabled={!filter.length}>
                                    <a onClick={onBatchDelete}>
                                        <Icon type="delete" /> 批量删除
                                    </a>
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Button>
                            <Icon type="select" />
                            操作
                        </Button>
                    </Dropdown>
                </Button.Group>
            </Tooltip>
            <UserGenerator>
                <Button className="ml-2">
                    <Icon type="user-add" />
                </Button>
            </UserGenerator>
        </div>
    );
}
