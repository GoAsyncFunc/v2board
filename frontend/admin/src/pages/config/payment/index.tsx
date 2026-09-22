import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../../components/common/LoadingContainer';
import MainLayout from '../../../layouts/MainLayout';
import PaymentList from './components/PaymentList';
import ConnectedPaymentEditor, { PaymentEditor } from './components/PaymentEditor';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { PaymentState } from '../../../types/payment';

interface PaymentPageProps {
    dispatch: AdminDispatch;
    payment: PaymentState;
}

export class PaymentPage extends React.Component<PaymentPageProps> {
    componentDidMount(): void {
        this.props.dispatch({ type: 'payment/fetch' });
    }

    render(): React.ReactNode {
        const { payment } = this.props;
        return (
            <MainLayout {...this.props} title="支付配置">
                <div className="d-flex justify-content-between align-items-center" />
                <LoadingContainer loading={payment.fetchLoading}>
                    <div className="block block-rounded">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <ConnectedPaymentEditor key={0}>
                                    <Button>
                                        <Icon type="plus" /> 添加支付方式
                                    </Button>
                                </ConnectedPaymentEditor>
                            </div>
                            <PaymentList
                                dispatch={this.props.dispatch}
                                payment={payment}
                                renderEditor={(record, key) => (
                                    <ConnectedPaymentEditor key={key} record={record}>
                                        <a href="javascript:void(0);">编辑</a>
                                    </ConnectedPaymentEditor>
                                )}
                            />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export { PaymentEditor };

export default connect((state: AdminRootState) => ({ payment: state.payment }))(PaymentPage);
