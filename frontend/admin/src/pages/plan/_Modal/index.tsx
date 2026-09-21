import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Divider from 'antd/lib/divider';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Tooltip from 'antd/lib/tooltip';
import PermissionGroupEditor from '../../../components/common/PermissionGroupEditor';
import NullableSelectOption from '../../../components/common/NullableSelectOption';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { PlanFieldValue, PlanRecord, PlanState } from '../../../types/plan';
import PlanPriceFields from './PriceFields';

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
                        <div className="form-group">
                            <label>套餐名称</label>
                            <Input
                                placeholder="请输入套餐名称"
                                value={record.name ?? undefined}
                                onChange={(event) => this.updateRecord('name', event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>套餐描述</label>
                            <Input.TextArea
                                rows={4}
                                value={record.content ?? undefined}
                                placeholder="请输入套餐描述，支持HTML"
                                onChange={(event) =>
                                    this.updateRecord('content', event.target.value)
                                }
                            />
                        </div>
                        <PlanPriceFields
                            record={record}
                            currencySymbol={currencySymbol}
                            onPriceChange={(field, value) => this.updatePrice(field, value)}
                        />
                        <Divider />
                        <div className="form-group">
                            <label>套餐流量</label>
                            <Input
                                addonAfter="GB"
                                placeholder="请输入套餐流量"
                                value={record.transfer_enable as string | number | undefined}
                                onChange={(event) =>
                                    this.updateRecord('transfer_enable', event.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>设备数限制</label>
                            <Input
                                placeholder="留空则不限制"
                                value={record.device_limit as string | number | undefined}
                                onChange={(event) =>
                                    this.updateRecord('device_limit', event.target.value)
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                权限组{' '}
                                <PermissionGroupEditor>
                                    <a href="javascript:void(0);">添加权限组</a>
                                </PermissionGroupEditor>
                            </label>
                            <Select
                                placeholder="请选择权限组"
                                style={{ width: '100%' }}
                                value={record.group_id}
                                onChange={(groupId) => this.updateRecord('group_id', groupId)}
                            >
                                {groups.map((group) => (
                                    <Select.Option key={group.id} value={group.id}>
                                        {group.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="form-group">
                            <label>流量重置方式</label>
                            <Select
                                placeholder="请选择权限组"
                                style={{ width: '100%' }}
                                value={record.reset_traffic_method}
                                onChange={(method) =>
                                    this.updateRecord('reset_traffic_method', method)
                                }
                            >
                                <NullableSelectOption value={null}>
                                    跟随系统设置
                                </NullableSelectOption>
                                <Select.Option value={0}>每月1号</Select.Option>
                                <Select.Option value={1}>按月重置</Select.Option>
                                <Select.Option value={2}>不重置</Select.Option>
                                <Select.Option value={3}>每年1月1日</Select.Option>
                                <Select.Option value={4}>按年重置</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>最大容纳用户量</label>
                        <Input
                            placeholder="留空则不限制"
                            value={record.capacity_limit as string | number | undefined}
                            onChange={(event) =>
                                this.updateRecord('capacity_limit', event.target.value)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>限速</label>
                        <Input
                            addonAfter="Mbps"
                            placeholder="留空则不限制"
                            value={record.speed_limit as string | number | undefined}
                            onChange={(event) =>
                                this.updateRecord('speed_limit', event.target.value)
                            }
                        />
                    </div>
                    <div className="v2board-drawer-action">
                        <div style={{ float: 'left', marginTop: 5 }}>
                            <Tooltip
                                title="勾选后变更的流量、限速、权限组将应用到该套餐下的用户"
                                placement="top"
                            >
                                <Checkbox
                                    onChange={(event) =>
                                        this.updateRecord('force_update', event.target.checked)
                                    }
                                >
                                    强制更新到用户
                                </Checkbox>
                            </Tooltip>
                        </div>
                        <Button
                            style={{ marginRight: 8 }}
                            onClick={() => this.setState({ visible: false })}
                        >
                            取消
                        </Button>
                        <Button
                            loading={saveLoading}
                            onClick={() => !saveLoading && this.save()}
                            type="primary"
                        >
                            提交
                        </Button>
                    </div>
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
