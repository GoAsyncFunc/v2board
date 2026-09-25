import React from 'react';
import { connect } from 'react-redux';
import DatePicker from 'antd/lib/date-picker';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import type { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import type { PlanSummary } from '../../../types/configurationValues';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { CouponRecord, CouponState } from '../../../types/promotion';
import { CouponBasicFields } from './CouponBasicFields';
import { CouponGenerationField } from './CouponGenerationField';
import { CouponRestrictionsFields } from './CouponRestrictionsFields';
import { CouponUsageFields } from './CouponUsageFields';
import { CouponValueFields } from './CouponValueFields';

const defaultCoupon: CouponRecord = { type: 1 };

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

interface CouponEditorProps {
    dispatch: AdminDispatch;
    coupon: CouponState;
    plan: { plans: PlanSummary[] };
    record?: CouponRecord;
    visible: boolean;
    onClose: () => void;
}

interface CouponEditorState {
    submit: CouponRecord;
}

export class CouponEditor extends React.Component<CouponEditorProps, CouponEditorState> {
    state: CouponEditorState = { submit: { ...defaultCoupon, ...this.props.record } };

    componentDidUpdate(previousProps: CouponEditorProps): void {
        if (
            previousProps.record !== this.props.record ||
            (!previousProps.visible && this.props.visible)
        ) {
            this.setState({ submit: { ...defaultCoupon, ...this.props.record } });
        }
    }

    updateSubmit(patch: Partial<CouponRecord>): void {
        this.setState(({ submit }) => ({ submit: { ...submit, ...patch } }));
    }

    generate(): void {
        this.props.dispatch({
            type: 'coupon/generate',
            params: { ...this.state.submit },
            callback: this.props.onClose,
        });
    }

    render(): React.ReactNode {
        const { submit } = this.state;
        const { coupon, plan } = this.props;
        const validityRange = createValidityRange(submit.started_at, submit.ended_at);
        return (
            <Modal
                title={submit.id ? '编辑优惠券' : '新建优惠券'}
                visible={this.props.visible}
                onCancel={this.props.onClose}
                onOk={() => this.generate()}
                okText={coupon.saveLoading ? <Icon type="loading" /> : '提交'}
                cancelText="取消"
            >
                <div>
                    <CouponBasicFields
                        coupon={submit}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                    <CouponValueFields
                        coupon={submit}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                    <div className="form-group">
                        <label>优惠券有效期</label>
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
                    <CouponUsageFields
                        coupon={submit}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                    <CouponRestrictionsFields
                        coupon={submit}
                        plans={plan.plans}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                    <CouponGenerationField
                        coupon={submit}
                        onChange={(patch) => this.updateSubmit(patch)}
                    />
                </div>
            </Modal>
        );
    }
}

export default connect((state: AdminRootState) => ({
    coupon: state.coupon,
    plan: state.plan,
}))(CouponEditor);
