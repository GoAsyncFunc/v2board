import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import Drawer from 'antd/lib/drawer';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { PlanFieldValue, PlanRecord, PlanState } from '../../../types/plan';
import { PlanAccessFields } from './PlanAccessFields';
import { PlanBasicFields } from './PlanBasicFields';
import { PlanEditorActions } from './PlanEditorActions';
import PlanPriceFields from './PriceFields';
import { PlanResourceFields } from './PlanResourceFields';

interface ServerGroupState {
    groups: Array<{ id: number | string; name?: React.ReactNode }>;
}

interface ConfigState {
    site: { currency_symbol?: string };
}

interface PlanEditorProps {
    children: React.ReactElement;
    dispatch: AdminDispatch;
    record?: PlanRecord;
    plan: PlanState;
    serverGroup: ServerGroupState;
    config: ConfigState;
}

interface PlanEditorState {
    visible: boolean;
    record: PlanRecord;
}

export function emptyPlan(): PlanRecord {
    return {
        show: 0,
        name: null,
        transfer_enable: null,
        group_id: undefined,
        month_price: null,
        quarter_price: null,
        half_year_price: null,
        year_price: null,
        two_year_price: null,
        three_year_price: null,
        onetime_price: null,
        reset_price: null,
    };
}

export class PlanEditor extends React.Component<PlanEditorProps, PlanEditorState> {
    constructor(props: PlanEditorProps) {
        super(props);
        this.state = { visible: false, record: props.record ? { ...props.record } : emptyPlan() };
    }

    componentDidMount(): void {
        this.props.dispatch({ type: 'config/fetch', key: 'site' });
        this.props.dispatch({ type: 'serverGroup/fetch' });
    }

    updateRecord(field: string, value: PlanFieldValue): void {
        this.setState({ record: { ...this.state.record, [field]: value } });
    }

    updatePrice(field: string, value: string): void {
        this.updateRecord(field, value !== '' ? value : null);
    }

    save(): void {
        this.props.dispatch({
            type: 'plan/save',
            params: { ...this.state.record },
            callback: () => this.setState({ visible: false }),
        });
    }

    render(): React.ReactNode {
        const { record, visible } = this.state;
        const currencySymbol = this.props.config.site.currency_symbol;
        const groups = this.props.serverGroup.groups;
        const saveLoading = this.props.plan.saveLoading;
        return (
            <>
                {React.cloneElement(this.props.children, {
                    onClick: () => this.setState({ visible: true }),
                })}
                <Drawer
                    maskClosable
                    onClose={() => this.setState({ visible: false })}
                    title={record.id ? '编辑订阅' : '新建订阅'}
                    visible={visible}
                    width="80%"
                >
                    <div>
                        <PlanBasicFields
                            record={record}
                            onChange={(field, value) => this.updateRecord(field, value)}
                        />
                        <PlanPriceFields
                            record={record}
                            currencySymbol={currencySymbol}
                            onPriceChange={(field, value) => this.updatePrice(field, value)}
                        />
                        <Divider />
                        <PlanResourceFields
                            record={record}
                            onChange={(field, value) => this.updateRecord(field, value)}
                        />
                        <PlanAccessFields
                            record={record}
                            groups={groups}
                            onChange={(field, value) => this.updateRecord(field, value)}
                        />
                    </div>
                    <PlanEditorActions
                        saveLoading={saveLoading}
                        onForceUpdateChange={(value) => this.updateRecord('force_update', value)}
                        onCancel={() => this.setState({ visible: false })}
                        onSubmit={() => !saveLoading && this.save()}
                    />
                </Drawer>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({
    plan: state.plan,
    serverGroup: state.serverGroup,
    config: state.config,
}))(PlanEditor);
