import React from 'react';
import { connect } from 'react-redux';
import ContextMenuTable from '@/components/common/ContextMenuTable';
import SortableTable from '@/components/common/SortableTable';
import type { AdminDispatch, AdminRootState } from '@/types/storeContracts';
import type { PlanFieldValue, PlanRecord, PlanState } from '@/types/planContracts';
import type { PlanGroup } from './PlanGroupColumn';
import {
    createPlanActionMenu,
    createPlanContextMenu,
    createPlanListColumns,
    type PlanListActions,
} from './PlanListColumns';

interface ServerGroupState {
    groups: PlanGroup[];
}

interface PlanListProps {
    dispatch: AdminDispatch;
    plan: PlanState;
    serverGroup: ServerGroupState;
}

export class PlanList extends React.Component<PlanListProps> {
    contextPlan?: PlanRecord;

    drop(id: number | string | undefined): void {
        this.props.dispatch({ type: 'plan/drop', id });
    }

    update(id: number | string | undefined, key: string, value: PlanFieldValue): void {
        this.props.dispatch({ type: 'plan/update', id, key, value });
    }

    listActions(): PlanListActions {
        return {
            onDrop: (id) => this.drop(id),
            onUpdate: (id, key, value) => this.update(id, key, value),
        };
    }

    actionMenu(plan: PlanRecord): React.ReactElement {
        return createPlanActionMenu(plan, this.listActions());
    }

    columns() {
        return createPlanListColumns(this.props.serverGroup.groups, this.listActions());
    }

    render(): React.ReactNode {
        const { plans } = this.props.plan;
        return (
            <SortableTable
                records={plans}
                getRowKey={(plan) => String(plan.id ?? '')}
                onSortEnd={(fromIndex, toIndex) =>
                    this.props.dispatch({ type: 'plan/sort', fromIndex, toIndex })
                }
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
                    {createPlanContextMenu(this.contextPlan, this.listActions())}
                </ContextMenuTable>
            </SortableTable>
        );
    }
}

export default connect((state: AdminRootState) => ({
    plan: state.plan,
    serverGroup: state.serverGroup,
}))(PlanList);
