import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import { PaymentBasicFields } from './PaymentBasicFields';
import { PaymentConfigFields } from './PaymentConfigFields';
import { PaytaroNotice } from './PaytaroNotice';
import type { AdminDispatch, AdminRootState } from '../../../../types/store';
import type {
    PaymentConfigValue,
    PaymentForm,
    PaymentRecord,
    PaymentState,
} from '../../../../types/payment';

interface PaymentEditorProps {
    children: React.ReactElement;
    dispatch: AdminDispatch;
    payment: PaymentState;
    record?: PaymentRecord;
}

interface PaymentEditorState {
    visible: boolean;
    submit: PaymentRecord;
    config: Record<string, PaymentConfigValue>;
    paymentMethods: string[];
    selectedPaymentMethod?: string;
    form: PaymentForm;
}

export class PaymentEditor extends React.Component<PaymentEditorProps, PaymentEditorState> {
    constructor(props: PaymentEditorProps) {
        super(props);
        const record = props.record || {};
        this.state = {
            visible: false,
            submit: { ...record },
            config: { ...(record.config || {}) },
            paymentMethods: [],
            selectedPaymentMethod: undefined,
            form: {},
        };
    }

    save(): void {
        const { config, selectedPaymentMethod, submit } = this.state;
        this.props.dispatch({
            type: 'payment/save',
            params: { ...submit, payment: selectedPaymentMethod, config },
            complete: () => this.setState({ visible: false }),
        });
    }

    show(): void {
        this.props.dispatch({
            type: 'payment/getPaymentMethods',
            complete: (paymentMethods: string[]) => {
                const selectedPaymentMethod =
                    this.state.selectedPaymentMethod ||
                    this.state.submit.payment ||
                    paymentMethods[0];
                this.setState({ visible: true, paymentMethods, selectedPaymentMethod }, () => {
                    this.selectPaymentMethod(selectedPaymentMethod);
                });
            },
        });
    }

    selectPaymentMethod(payment: string): void {
        this.props.dispatch({
            type: 'payment/getPaymentForm',
            payment,
            id: this.state.submit.id,
            complete: (form: PaymentForm) =>
                this.setState({ form, selectedPaymentMethod: payment }),
        });
    }

    updateConfig(field: string, value: PaymentConfigValue): void {
        this.setState({ config: { ...this.state.config, [field]: value } });
    }

    updateSubmit<Field extends keyof PaymentRecord>(
        field: Field,
        value: PaymentRecord[Field],
    ): void {
        this.setState({ submit: { ...this.state.submit, [field]: value } });
    }

    render() {
        const { paymentMethods, selectedPaymentMethod, form, config, submit, visible } = this.state;
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <Modal
                    title={submit.id ? '编辑支付方式' : '添加支付方式'}
                    visible={visible}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={() => this.save()}
                    okText={submit.id ? '保存' : '添加'}
                    okButtonProps={{ loading: this.props.payment.fetchLoading }}
                    cancelText="取消"
                >
                    <div>
                        <PaymentBasicFields
                            submit={submit}
                            paymentMethods={paymentMethods}
                            selectedPaymentMethod={selectedPaymentMethod}
                            onSubmitChange={(field, value) => this.updateSubmit(field, value)}
                            onPaymentMethodChange={(payment) => this.selectPaymentMethod(payment)}
                        />
                        <PaymentConfigFields
                            form={form}
                            config={config}
                            onChange={(field, value) => this.updateConfig(field, value)}
                        />
                        <PaytaroNotice paymentMethod={selectedPaymentMethod} />
                    </div>
                </Modal>
            </>
        );
    }
}

export default connect((state: AdminRootState) => ({ payment: state.payment }))(PaymentEditor);
