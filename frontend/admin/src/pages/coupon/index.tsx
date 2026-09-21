import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../components/common/LoadingContainer';
import MainLayout from '../../layouts/MainLayout';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { CouponRecord, CouponState } from '../../types/promotion';
import CouponEditor from './_Modal';
import { CouponList } from './_List';

interface CouponPageProps {
    dispatch: AdminDispatch;
    coupon: CouponState;
}

interface CouponPageState {
    editorVisible: boolean;
    editingCoupon?: CouponRecord;
}

export class CouponPage extends React.Component<CouponPageProps, CouponPageState> {
    state: CouponPageState = { editorVisible: false, editingCoupon: undefined };

    componentDidMount(): void {
        this.props.dispatch({ type: 'coupon/fetch' });
        this.props.dispatch({ type: 'plan/fetch' });
    }

    openEditor = (record?: CouponRecord): void => {
        this.setState({ editorVisible: true, editingCoupon: record });
    };

    closeEditor = (): void => {
        this.setState({ editorVisible: false, editingCoupon: undefined });
    };

    render(): React.ReactNode {
        const { coupon } = this.props;
        return (
            <MainLayout {...this.props} title="优惠券管理">
                <LoadingContainer loading={coupon.fetchLoading}>
                    <div className="block border-bottom">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <Button onClick={() => this.openEditor()}>
                                    <Icon type="plus" /> 添加优惠券
                                </Button>
                            </div>
                            <CouponList
                                dispatch={this.props.dispatch}
                                coupon={coupon}
                                onEdit={this.openEditor}
                            />
                        </div>
                    </div>
                </LoadingContainer>
                <CouponEditor
                    record={this.state.editingCoupon}
                    visible={this.state.editorVisible}
                    onClose={this.closeEditor}
                />
            </MainLayout>
        );
    }
}

export { CouponEditor } from './_Modal';
export { CouponList } from './_List';

export default connect((state: AdminRootState) => ({ coupon: state.coupon }))(CouponPage);
