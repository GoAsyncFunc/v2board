import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import { TableDragHandle } from '@/components/common/SortableTable';
import type { AdminDispatch } from '@/types/storeContracts';
import type { PlanFieldValue, PlanRecord } from '@/types/planContracts';
import PlanEditor from './PlanEditor';
import { createPlanGroupColumn, type PlanGroup } from './PlanGroupColumn';
import { createPlanPriceColumns } from './PlanPriceColumns';
import { createPlanResourceColumns } from './PlanResourceColumns';

const resourceColumns = createPlanResourceColumns();
const priceColumns = createPlanPriceColumns();

export interface PlanListActions {
    onDrop: (id: number | string | undefined) => void;
    onUpdate: (id: number | string | undefined, key: string, value: PlanFieldValue) => void;
}

export function createPlanActionMenu(
    plan: PlanRecord,
    actions: PlanListActions,
): React.ReactElement {
    return (
        <Menu>
            <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                <PlanEditor record={plan} key={plan.id}>
                    <a>
                        <Icon type="edit" /> 编辑
                    </a>
                </PlanEditor>
            </Menu.Item>
            <Menu.Item style={{ color: '#ff4d4f' }} onClick={() => actions.onDrop(plan.id)}>
                <Icon type="delete" /> 删除
            </Menu.Item>
        </Menu>
    );
}

export function createPlanContextMenu(
    plan: PlanRecord | undefined,
    actions: PlanListActions,
): React.ReactElement {
    return (
        <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
            <li className="ant-dropdown-menu-item">
                <PlanEditor record={plan} key={plan?.id}>
                    <a>
                        <Icon type="edit" /> 编辑
                    </a>
                </PlanEditor>
            </li>
            <li className="ant-dropdown-menu-item" onClick={() => actions.onDrop(plan?.id)}>
                <a style={{ color: '#ff4d4f' }}>
                    <Icon type="delete" /> 删除
                </a>
            </li>
        </ul>
    );
}

export function createPlanListColumns(
    groups: PlanGroup[],
    actions: PlanListActions,
): ColumnProps<PlanRecord>[] {
    return [
        {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            render: () => <TableDragHandle title="拖动排序" />,
        },
        {
            title: '销售状态',
            dataIndex: 'show',
            key: 'show',
            render: (shown: number | string, plan: PlanRecord) => (
                <Switch
                    size="small"
                    checked={Boolean(parseInt(String(shown), 10))}
                    onClick={() =>
                        actions.onUpdate(plan.id, 'show', parseInt(String(shown), 10) ? 0 : 1)
                    }
                />
            ),
        },
        {
            title: (
                <span>
                    续费{' '}
                    <Tooltip placement="top" title="在订阅停止销售时，已购用户是否可以续费">
                        <Icon type="question-circle" />
                    </Tooltip>
                </span>
            ),
            dataIndex: 'renew',
            key: 'renew',
            render: (renew: number | string, plan: PlanRecord) => (
                <Switch
                    size="small"
                    checked={Boolean(parseInt(String(renew), 10))}
                    onClick={() =>
                        actions.onUpdate(plan.id, 'renew', parseInt(String(renew), 10) ? 0 : 1)
                    }
                />
            ),
        },
        resourceColumns.name,
        resourceColumns.count,
        resourceColumns.transfer_enable,
        resourceColumns.device_limit,
        priceColumns.month_price,
        priceColumns.quarter_price,
        priceColumns.half_year_price,
        priceColumns.year_price,
        priceColumns.two_year_price,
        priceColumns.three_year_price,
        priceColumns.onetime_price,
        priceColumns.reset_price,
        createPlanGroupColumn(groups),
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            align: 'right',
            render: (_value: undefined, plan: PlanRecord) => (
                <Dropdown trigger={['click']} overlay={createPlanActionMenu(plan, actions)}>
                    <a href="javascript:void(0);">
                        操作 <Icon type="caret-down" />
                    </a>
                </Dropdown>
            ),
        },
    ];
}
