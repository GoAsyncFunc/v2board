import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../components/common/LoadingContainer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import type { AdminDispatch, AdminRootState } from '../../types/storeContracts';
import type { PlanState } from '../../types/planContracts';
import PlanEditor from './components/PlanEditor';
import { PlanList } from './components/PlanList';

interface ServerGroupState {
    groups: Array<{ id: number | string; name?: React.ReactNode }>;
}

interface PlanPageProps {
    dispatch: AdminDispatch;
    plan: PlanState;
    serverGroup: ServerGroupState;
}

export class PlanPage extends React.Component<PlanPageProps> {
    componentDidMount(): void {
        this.props.dispatch({ type: 'plan/fetch' });
        this.props.dispatch({ type: 'serverGroup/fetch' });
    }

    render(): React.ReactNode {
        const { plan, serverGroup } = this.props;
        return (
            <MainLayout {...this.props} title="订阅管理">
                <div className="d-flex justify-content-between align-items-center" />
                <LoadingContainer loading={plan.fetchLoading}>
                    <div className="block block-rounded">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <PlanEditor>
                                    <Button>
                                        <Icon type="plus" /> 添加订阅
                                    </Button>
                                </PlanEditor>
                            </div>
                            <PlanList
                                dispatch={this.props.dispatch}
                                plan={plan}
                                serverGroup={serverGroup}
                            />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export { PlanEditor } from './components/PlanEditor';
export { PlanList } from './components/PlanList';

export default connect((state: AdminRootState) => ({
    plan: state.plan,
    serverGroup: state.serverGroup,
}))(PlanPage);
