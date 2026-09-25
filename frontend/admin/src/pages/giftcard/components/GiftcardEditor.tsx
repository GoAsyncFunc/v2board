import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import type { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import type { PlanSummary } from '../../../types/configurationValues';
import type { AdminDispatch, AdminRootState } from '../../../types/storeContracts';
import type { GiftcardRecord, GiftcardState } from '../../../types/promotion';
import { GiftcardBasicFields } from './GiftcardBasicFields';
import { GiftcardGenerationField } from './GiftcardGenerationField';
import { GiftcardPlanField } from './GiftcardPlanField';
import { GiftcardUsageFields } from './GiftcardUsageFields';
import { GiftcardValueFields } from './GiftcardValueFields';

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
                    <GiftcardBasicFields
                        giftcard={submit}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                    <GiftcardValueFields
                        giftcard={submit}
                        valueSuffix={valueSuffix}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                    <GiftcardPlanField
                        giftcard={submit}
                        plans={plan.plans}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
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
                    <GiftcardUsageFields
                        giftcard={submit}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                    <GiftcardGenerationField
                        giftcard={submit}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                </div>
            </Modal>
        );
    }
}

export default connect((state: AdminRootState) => ({
    giftcard: state.giftcard,
    plan: state.plan,
}))(GiftcardEditor);
