import React from 'react';
import { connect } from 'react-redux';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import LoadingContainer from '../../components/common/LoadingContainer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import type { AdminDispatch, AdminRootState } from '../../types/storeContracts';
import type { KnowledgeState } from '../../types/knowledge';
import ConnectedKnowledgeEditor from './components/KnowledgeEditor';
import { KnowledgeList } from './components/KnowledgeList';

interface KnowledgePageProps {
    dispatch: AdminDispatch;
    knowledge: KnowledgeState;
}

export class KnowledgePage extends React.Component<KnowledgePageProps> {
    componentDidMount(): void {
        this.props.dispatch({ type: 'knowledge/fetch' });
        this.props.dispatch({ type: 'knowledge/getCategory' });
    }

    render(): React.ReactNode {
        const { knowledge } = this.props;
        return (
            <MainLayout {...this.props} title="知识库管理">
                <LoadingContainer loading={knowledge.fetchLoading}>
                    <div className="block border-bottom">
                        <div className="bg-white">
                            <div style={{ padding: 15 }}>
                                <ConnectedKnowledgeEditor>
                                    <Button>
                                        <Icon type="plus" />
                                        新增
                                    </Button>
                                </ConnectedKnowledgeEditor>
                            </div>
                            <KnowledgeList dispatch={this.props.dispatch} knowledge={knowledge} />
                        </div>
                    </div>
                </LoadingContainer>
            </MainLayout>
        );
    }
}

export { KnowledgeEditor } from './components/KnowledgeEditor';
export { KnowledgeList } from './components/KnowledgeList';

export default connect((state: AdminRootState) => ({ knowledge: state.knowledge }))(KnowledgePage);
