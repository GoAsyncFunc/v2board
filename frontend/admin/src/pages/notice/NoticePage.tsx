import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../components/common/LoadingContainer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import type { AdminDispatch, AdminRootState } from '../../types/store';
import type { NoticeRecord, NoticeState } from '../../types/notice';
import NoticeEditor from './components/NoticeEditor';
import { NoticeList } from './components/NoticeList';

interface NoticePageProps {
    dispatch: AdminDispatch;
    notice: NoticeState;
}

interface NoticePageState {
    editorVisible: boolean;
    editingNotice?: NoticeRecord;
}

export class NoticePage extends React.Component<NoticePageProps, NoticePageState> {
    state: NoticePageState = { editorVisible: false, editingNotice: undefined };

    componentDidMount(): void {
        this.props.dispatch({ type: 'notice/fetch' });
    }

    openEditor = (record?: NoticeRecord): void => {
        this.setState({ editorVisible: true, editingNotice: record });
    };

    closeEditor = (): void => {
        this.setState({ editorVisible: false, editingNotice: undefined });
    };

    render(): React.ReactNode {
        const { notice } = this.props;
        return (
            <MainLayout {...this.props} title="公告管理">
                <LoadingContainer loading={notice.fetchLoading}>
                    <div className="block block-rounded">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <Button onClick={() => this.openEditor()}>
                                    <Icon type="plus" /> 添加公告
                                </Button>
                            </div>
                            <NoticeList
                                dispatch={this.props.dispatch}
                                notices={notice.notices}
                                onEdit={this.openEditor}
                            />
                        </div>
                    </div>
                </LoadingContainer>
                <NoticeEditor
                    dispatch={this.props.dispatch}
                    notice={notice}
                    record={this.state.editingNotice}
                    visible={this.state.editorVisible}
                    onClose={this.closeEditor}
                />
            </MainLayout>
        );
    }
}

export { NoticeEditor } from './components/NoticeEditor';
export { NoticeList } from './components/NoticeList';

export default connect((state: AdminRootState) => ({ notice: state.notice }))(NoticePage);
