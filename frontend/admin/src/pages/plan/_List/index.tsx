import React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Switch from 'antd/lib/switch';
import Tooltip from 'antd/lib/tooltip';
import type { ColumnProps } from 'antd/lib/table/interface';
import ContextMenuTable from '../../../components/common/ContextMenuTable';
import Sortable from '../../../components/common/Sortable';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { PlanFieldValue, PlanRecord, PlanState } from '../../../types/plan';
import PlanEditor from '../_Modal';
import { createPlanGroupColumn, type PlanGroup } from './PlanGroupColumn';
import { createReadonlyPlanPriceColumns } from './PlanPriceColumns';
import { createReadonlyPlanResourceColumns } from './PlanResourceColumns';

interface ServerGroupState {
    groups: PlanGroup[];
}

interface PlanListProps {
    dispatch: AdminDispatch;
    plan: PlanState;
    serverGroup: ServerGroupState;
}

const resourceColumns = createReadonlyPlanResourceColumns();
const priceColumns = createReadonlyPlanPriceColumns();

export class PlanList extends React.Component<PlanListProps> {
    contextPlan?: PlanRecord;

    drop(id: number | string | undefined): void {
        this.props.dispatch({ type: 'plan/drop', id });
    }

    update(id: number | string | undefined, key: string, value: PlanFieldValue): void {
        this.props.dispatch({ type: 'plan/update', id, key, value });
    }

    actionMenu(plan: PlanRecord): React.ReactElement {
        return (
            <Menu>
                <Menu.Item onContextMenu={(event) => event.stopPropagation()}>
                    <PlanEditor record={plan} key={plan.id}>
                        <a>
                            <Icon type="edit" /> 编辑
                        </a>
                    </PlanEditor>
                </Menu.Item>
                <Menu.Item style={{ color: '#ff4d4f' }} onClick={() => this.drop(plan.id)}>
                    <Icon type="delete" /> 删除
                </Menu.Item>
            </Menu>
        );
    }

    columns(): ColumnProps<PlanRecord>[] {
        return [
            {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                render: () => <Icon type="menu" style={{ cursor: 'move' }} />,
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
                            this.update(plan.id, 'show', parseInt(String(shown), 10) ? 0 : 1)
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
                            this.update(plan.id, 'renew', parseInt(String(renew), 10) ? 0 : 1)
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
            createPlanGroupColumn(this.props.serverGroup.groups),
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                align: 'right',
                render: (_value: undefined, plan: PlanRecord) => (
                    <Dropdown trigger={['click']} overlay={this.actionMenu(plan)}>
                        <a href="javascript:void(0);">
                            操作 <Icon type="caret-down" />
                        </a>
                    </Dropdown>
                ),
            },
        ];
    }

    render(): React.ReactNode {
        const { plans } = this.props.plan;
        return (
            <Sortable
                onDragEnd={(fromIndex, toIndex) =>
                    this.props.dispatch({ type: 'plan/sort', fromIndex, toIndex })
                }
                nodeSelector="tr"
                handleSelector="i"
            >
                <ContextMenuTable
                    onContextMenu={(plan) => {
                        this.contextPlan = plan;
                        this.forceUpdate();
                    }}
                    tableLayout="auto"
                    dataSource={plans}
                    columns={this.columns()}
                    pagination={false}
                    scroll={{ x: 1300 }}
                >
                    <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical">
                        <li className="ant-dropdown-menu-item">
                            <PlanEditor record={this.contextPlan} key={this.contextPlan?.id}>
                                <a>
                                    <Icon type="edit" /> 编辑
                                </a>
                            </PlanEditor>
                        </li>
                        <li
                            className="ant-dropdown-menu-item"
                            onClick={() => this.drop(this.contextPlan?.id)}
                        >
                            <a style={{ color: '#ff4d4f' }}>
                                <Icon type="delete" /> 删除
                            </a>
                        </li>
                    </ul>
                </ContextMenuTable>
            </Sortable>
        );
    }
}

export default connect((state: AdminRootState) => ({
    plan: state.plan,
    serverGroup: state.serverGroup,
}))(PlanList);
