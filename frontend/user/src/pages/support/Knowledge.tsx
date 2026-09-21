import React from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import KnowledgeArticleList from '../../components/support/KnowledgeArticleList';
import KnowledgeSearchBar from '../../components/support/KnowledgeSearchBar';
import { formatMessage, getLocale } from '../../locales/i18n';
import type { KnowledgeState } from '../../types/knowledge';
import type { UserDispatch, UserRootState } from '../../types/store';

interface KnowledgePageProps {
    knowledge: KnowledgeState;
    dispatch: UserDispatch;
    location: { pathname: string; query: { id?: string } };
}

export class KnowledgePage extends React.Component<KnowledgePageProps> {
    inputDelayTimer?: ReturnType<typeof setTimeout>;

    componentDidMount() {
        this.props.dispatch({ type: 'knowledge/fetch', language: getLocale() });
        this.inputDelayTimer = undefined;
    }

    onSearch(keyword: string) {
        if (this.inputDelayTimer) clearTimeout(this.inputDelayTimer);
        this.inputDelayTimer = setTimeout(() => {
            this.inputDelayTimer = undefined;
            this.props.dispatch({
                type: 'knowledge/fetch',
                language: getLocale(),
                keyword: keyword || undefined,
            });
        }, 300);
    }

    render() {
        const { knowledges: articlesByCategory, fetchLoading } = this.props.knowledge;
        const queryId = this.props.location.query.id;
        return (
            <MainLayout {...this.props} title={formatMessage({ id: '使用文档' })}>
                <main id="main-container">
                    <div className="content content-full">
                        <KnowledgeSearchBar onSearch={(keyword) => this.onSearch(keyword)} />
                        {fetchLoading ? (
                            <div className="spinner-grow text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <KnowledgeArticleList
                                articlesByCategory={articlesByCategory}
                                queryId={queryId}
                            />
                        )}
                    </div>
                </main>
            </MainLayout>
        );
    }
}

export default connect((state: UserRootState) => ({ knowledge: state.knowledge }))(KnowledgePage);
