import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../components/common/LoadingContainer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import type { PlanSummary } from '../../types/systemConfigurationContracts';
import type { AdminDispatch, AdminRootState } from '../../types/storeContracts';
import type { GiftCardRecord, GiftCardState } from '../../types/promotionContracts';
import GiftCardEditor from './components/GiftCardEditor';
import { GiftCardList } from './components/GiftCardList';

interface GiftCardPageProps {
    dispatch: AdminDispatch;
    giftCard: GiftCardState;
    plan: { plans: PlanSummary[] };
}

interface GiftCardPageState {
    editorVisible: boolean;
    editingGiftCard?: GiftCardRecord;
}

export class GiftCardPage extends React.Component<GiftCardPageProps, GiftCardPageState> {
    state: GiftCardPageState = { editorVisible: false, editingGiftCard: undefined };

    componentDidMount(): void {
        this.props.dispatch({ type: 'giftcard/fetch' });
        this.props.dispatch({ type: 'plan/fetch' });
    }

    openEditor = (record?: GiftCardRecord): void => {
        this.setState({ editorVisible: true, editingGiftCard: record });
    };

    closeEditor = (): void => {
        this.setState({ editorVisible: false, editingGiftCard: undefined });
    };

    render(): React.ReactNode {
        const { giftCard } = this.props;
        return (
            <MainLayout {...this.props} title="礼品卡管理">
                <LoadingContainer loading={giftCard.fetchLoading}>
                    <div className="block border-bottom">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <Button onClick={() => this.openEditor()}>
                                    <Icon type="plus" /> 添加礼品卡
                                </Button>
                            </div>
                            <GiftCardList
                                dispatch={this.props.dispatch}
                                giftCard={giftCard}
                                plan={this.props.plan}
                                onEdit={this.openEditor}
                            />
                        </div>
                    </div>
                </LoadingContainer>
                <GiftCardEditor
                    record={this.state.editingGiftCard}
                    visible={this.state.editorVisible}
                    onClose={this.closeEditor}
                />
            </MainLayout>
        );
    }
}

export { GiftCardEditor } from './components/GiftCardEditor';
export { GiftCardList } from './components/GiftCardList';

export default connect((state: AdminRootState) => ({
    giftCard: state.giftcard,
    plan: state.plan,
}))(GiftCardPage);
