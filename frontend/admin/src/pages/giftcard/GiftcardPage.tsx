import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../components/common/LoadingContainer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import type { PlanSummary } from '../../types/configurationValues';
import type { AdminDispatch, AdminRootState } from '../../types/storeContracts';
import type { GiftcardRecord, GiftcardState } from '../../types/promotion';
import GiftcardEditor from './components/GiftcardEditor';
import { GiftcardList } from './components/GiftcardList';

interface GiftcardPageProps {
    dispatch: AdminDispatch;
    giftcard: GiftcardState;
    plan: { plans: PlanSummary[] };
}

interface GiftcardPageState {
    editorVisible: boolean;
    editingGiftcard?: GiftcardRecord;
}

export class GiftcardPage extends React.Component<GiftcardPageProps, GiftcardPageState> {
    state: GiftcardPageState = { editorVisible: false, editingGiftcard: undefined };

    componentDidMount(): void {
        this.props.dispatch({ type: 'giftcard/fetch' });
        this.props.dispatch({ type: 'plan/fetch' });
    }

    openEditor = (record?: GiftcardRecord): void => {
        this.setState({ editorVisible: true, editingGiftcard: record });
    };

    closeEditor = (): void => {
        this.setState({ editorVisible: false, editingGiftcard: undefined });
    };

    render(): React.ReactNode {
        const { giftcard } = this.props;
        return (
            <MainLayout {...this.props} title="礼品卡管理">
                <LoadingContainer loading={giftcard.fetchLoading}>
                    <div className="block border-bottom">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <Button onClick={() => this.openEditor()}>
                                    <Icon type="plus" /> 添加礼品卡
                                </Button>
                            </div>
                            <GiftcardList
                                dispatch={this.props.dispatch}
                                giftcard={giftcard}
                                plan={this.props.plan}
                                onEdit={this.openEditor}
                            />
                        </div>
                    </div>
                </LoadingContainer>
                <GiftcardEditor
                    record={this.state.editingGiftcard}
                    visible={this.state.editorVisible}
                    onClose={this.closeEditor}
                />
            </MainLayout>
        );
    }
}

export { GiftcardEditor } from './components/GiftcardEditor';
export { GiftcardList } from './components/GiftcardList';

export default connect((state: AdminRootState) => ({
    giftcard: state.giftcard,
    plan: state.plan,
}))(GiftcardPage);
