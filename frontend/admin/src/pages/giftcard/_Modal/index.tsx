import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import type { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import type { PlanSummary } from '../../../types/config';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { GiftcardRecord, GiftcardState } from '../../../types/promotion';

const defaultGiftcard: GiftcardRecord = { type: 1 };

export function createValidityRange(
    startedAt?: number | string | null,
    endedAt?: number | string | null,
): RangePickerValue {
    const start = startedAt ? moment(1000 * Number(startedAt)) : null;
    const end = endedAt ? moment(1000 * Number(endedAt)) : null;
    if (start && end) return [start, end];
    if (start) return [start, null];
    if (end) return [null, end];
    return [];
}

export function getGiftcardValueSuffix(type: GiftcardRecord['type']): string {
    return (
        ({ 1: '¥', 2: '天', 3: 'GB', 4: '', 5: '天' } as Record<number, string>)[type || 1] || ''
    );
}

interface GiftcardEditorProps {
    dispatch: AdminDispatch;
    giftcard: GiftcardState;
    plan: { plans: PlanSummary[] };
    record?: GiftcardRecord;
    visible: boolean;
    onClose: () => void;
}

interface GiftcardEditorState {
    submit: GiftcardRecord;
}

export class GiftcardEditor extends React.Component<GiftcardEditorProps, GiftcardEditorState> {
    state: GiftcardEditorState = { submit: { ...defaultGiftcard, ...this.props.record } };

    componentDidUpdate(previousProps: GiftcardEditorProps): void {
        if (
            previousProps.record !== this.props.record ||
            (!previousProps.visible && this.props.visible)
        ) {
            this.setState({ submit: { ...defaultGiftcard, ...this.props.record } });
        }
    }

    updateSubmit(patch: Partial<GiftcardRecord>): void {
        this.setState(({ submit }) => ({ submit: { ...submit, ...patch } }));
    }

    generate(): void {
        this.props.dispatch({
            type: 'giftcard/generate',
            params: { ...this.state.submit },
            callback: this.props.onClose,
        });
    }

    render(): React.ReactNode {
        const { submit } = this.state;
        const { giftcard, plan } = this.props;
        const validityRange = createValidityRange(submit.started_at, submit.ended_at);
        const valueSuffix = getGiftcardValueSuffix(submit.type);
        return (
            <Modal
                title={submit.id ? '编辑礼品卡' : '新建礼品卡'}
                visible={this.props.visible}
                onCancel={this.props.onClose}
                onOk={() => this.generate()}
                okText={giftcard.saveLoading ? <Icon type="loading" /> : '提交'}
                cancelText="取消"
            >
                <div>
                    <div className="form-group">
                        <label htmlFor="giftcard-name">名称</label>
                        <Input
                            id="giftcard-name"
                            placeholder="请输入礼品卡名称"
                            value={submit.name}
                            onChange={(event) => this.updateSubmit({ name: event.target.value })}
                        />
                    </div>
                    {!submit.generate_count && (
                        <div className="form-group">
                            <label htmlFor="giftcard-code">自定义礼品卡卡密</label>
                            <Input
                                id="giftcard-code"
                                placeholder="自定义礼品卡卡密(留空随机生成)"
                                value={submit.code}
                                onChange={(event) =>
                                    this.updateSubmit({
                                        code: event.target.value,
                                        generate_count: undefined,
                                    })
                                }
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="giftcard-value">礼品卡类型</label>
                        <Input
                            id="giftcard-value"
                            type="number"
                            addonBefore={
                                <Select
                                    style={{ width: 140 }}
                                    value={submit.type}
                                    onChange={(type: 1 | 2 | 3 | 4 | 5) =>
                                        this.updateSubmit({ type })
                                    }
                                >
                                    <Select.Option value={1}>增加账户余额</Select.Option>
                                    <Select.Option value={2}>增加订阅时长</Select.Option>
                                    <Select.Option value={3}>增加套餐流量</Select.Option>
                                    <Select.Option value={4}>重置套餐流量</Select.Option>
                                    <Select.Option value={5}>兑换订阅套餐</Select.Option>
                                </Select>
                            }
                            addonAfter={valueSuffix}
                            disabled={submit.type === 4}
                            placeholder={submit.type === 5 ? '一次性套餐输入0' : '请输入值'}
                            value={submit.type === 4 ? 0 : submit.value}
                            onChange={(event) => this.updateSubmit({ value: event.target.value })}
                        />
                    </div>
                    {submit.type === 5 && (
                        <div className="form-group">
                            <label htmlFor="giftcard-plan">指定订阅</label>
                            <Select
                                id="giftcard-plan"
                                value={
                                    submit.plan_id === null || submit.plan_id === undefined
                                        ? undefined
                                        : String(submit.plan_id)
                                }
                                onChange={(planId: string) =>
                                    this.updateSubmit({
                                        plan_id: planId && planId.length ? planId : null,
                                    })
                                }
                                placeholder="指定订阅"
                                style={{ width: '100%' }}
                            >
                                {plan.plans.map((item) => (
                                    <Select.Option key={item.id} value={`${item.id}`}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    )}
                    <div className="form-group">
                        <label>礼品卡有效期</label>
                        <DatePicker.RangePicker
                            style={{ width: '100%' }}
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={['Start Time', 'End Time']}
                            value={validityRange}
                            onChange={(range) =>
                                this.updateSubmit({
                                    started_at: range[0] ? range[0].format('X') : null,
                                    ended_at: range[1] ? range[1].format('X') : null,
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="giftcard-limit">最大使用次数</label>
                        <Input
                            id="giftcard-limit"
                            placeholder="限制最大使用次数，用完则无法使用(为空则不限制)"
                            value={submit.limit_use ?? undefined}
                            onChange={(event) =>
                                this.updateSubmit({ limit_use: event.target.value })
                            }
                        />
                    </div>
                    {!submit.code && !submit.id && (
                        <div className="form-group">
                            <label htmlFor="giftcard-count">生成数量</label>
                            <Input
                                id="giftcard-count"
                                placeholder="输入数量批量生成"
                                value={submit.generate_count}
                                onChange={(event) =>
                                    this.updateSubmit({
                                        generate_count: event.target.value,
                                        code: undefined,
                                    })
                                }
                            />
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}

export default connect((state: AdminRootState) => ({
    giftcard: state.giftcard,
    plan: state.plan,
}))(GiftcardEditor);
