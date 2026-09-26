import React from 'react';
import { formatDate } from '@/components/common/DateTimeDisplay';
import { formatMessage } from '@/locales/i18n';
import KnowledgeDetailDrawer from './KnowledgeDetailDrawer';
import type { KnowledgeId, KnowledgeState } from '@/types/knowledgeContracts';

interface KnowledgeArticleListProps {
    articlesByCategory: KnowledgeState['knowledges'];
    queryId?: string;
}

function isRequestedArticle(articleId: KnowledgeId, queryId?: string): boolean {
    return parseInt(String(queryId)) === parseInt(String(articleId));
}

export default function KnowledgeArticleList({
    articlesByCategory,
    queryId,
}: KnowledgeArticleListProps) {
    return (
        <>
            {Object.keys(articlesByCategory).map((category) => (
                <div className="row mb-3 mb-md-0" key={category}>
                    <div className="col-md-12">
                        <div className="block block-rounded ">
                            <div className="block-header block-header-default">
                                <h3 className="block-title">{category}</h3>
                            </div>
                            <div className="list-group">
                                {articlesByCategory[category] &&
                                    articlesByCategory[category].map((article) => (
                                        <KnowledgeDetailDrawer
                                            key={String(article.id)}
                                            autoOpen={isRequestedArticle(article.id, queryId)}
                                            id={article.id}
                                        >
                                            <a
                                                className="list-group-item list-group-item-action"
                                                style={{
                                                    borderRadius: 'unset',
                                                    border: 'unset',
                                                    borderBottom: '1px solid #e2e8f2',
                                                }}
                                            >
                                                <h5 className="font-size-base mb-1">
                                                    {article.title}
                                                </h5>
                                                <small>
                                                    {formatMessage(
                                                        { id: '最后更新: {date}' },
                                                        { date: formatDate(article.updated_at) },
                                                    )}
                                                </small>
                                            </a>
                                        </KnowledgeDetailDrawer>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
