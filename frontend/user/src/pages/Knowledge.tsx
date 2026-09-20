import React from 'react';
import { formatDate } from '../components/DateTimeDisplay';
import Input from 'antd/lib/input';
import Drawer from 'antd/lib/drawer';
import message from 'antd/lib/message';
import MainLayout from '../layouts/MainLayout';
import { connect } from 'react-redux';
import { formatMessage, getLocale } from '../locales/i18n';
import Icon from 'antd/lib/icon';
import MarkdownIt from 'markdown-it';
import type { KnowledgeId, KnowledgeState } from '../types/knowledge';
import type { UserDispatch } from '../types/store';
import { copyToClipboard } from '../utils/siteHelpers';

const markdownRenderer = new MarkdownIt({ html: true, linkify: true, typographer: true });

interface KnowledgeStateProps { knowledge: KnowledgeState; }
interface KnowledgeDetailProps extends KnowledgeStateProps {
  id: KnowledgeId;
  autoOpen?: boolean;
  children: React.ReactElement;
  dispatch: UserDispatch;
}

export class KnowledgeDetailDrawer extends React.Component<KnowledgeDetailProps, { visible: boolean }> {
  state = { visible: false };

  componentDidMount() {
    if (this.props.autoOpen) this.show();
  }

  getKnowledge(id: KnowledgeId) {
    this.props.dispatch({ type: 'knowledge/fetchById', id, language: getLocale() });
  }

  show() {
    this.getKnowledge(this.props.id);
    this.setState({ visible: true });
    window.copy = text => {
      copyToClipboard(text);
      message.success(formatMessage({ id: '复制成功' }));
    };
    window.jump = id => this.getKnowledge(id);
  }

  hide() {
    this.props.dispatch({ type: 'knowledge/setState', payload: { knowledge: {} } });
    this.setState({ visible: false });
    window.copy = undefined;
    window.jump = undefined;
  }

  render() {
    const { visible } = this.state;
    const { knowledge, fetchByIdLoading } = this.props.knowledge;
    return (
      <>
        {React.cloneElement(this.props.children, { onClick: () => this.show() })}
        <Drawer visible={visible} title={knowledge.title || 'Loading...'} width="80%" onClose={() => this.hide()}>
          {fetchByIdLoading ? <Icon type="loading" /> : (
            <div
              className="custom-html-style"
              dangerouslySetInnerHTML={{ __html: markdownRenderer.render(knowledge.body || '') }}
            />
          )}
        </Drawer>
      </>
    );
  }
}

const ConnectedKnowledgeDetailDrawer = connect((state: KnowledgeStateProps) => ({ knowledge: state.knowledge }))(KnowledgeDetailDrawer);

interface KnowledgePageProps extends KnowledgeStateProps {
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
            <div className="v2board-knowledge-search-bar">
              <Input.Search
                onChange={event => this.onSearch(event.target.value)}
                className="mb-3"
                size="large"
                enterButton
                placeholder={formatMessage({ id: '搜索文档' })}
              />
            </div>
            {fetchLoading ? (
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : Object.keys(articlesByCategory).map(category => (
              <div className="row mb-3 mb-md-0">
                <div className="col-md-12">
                  <div className="block block-rounded ">
                    <div className="block-header block-header-default">
                      <h3 className="block-title">{category}</h3>
                    </div>
                    <div className="list-group">
                      {articlesByCategory[category] && articlesByCategory[category].map(article => (
                        <ConnectedKnowledgeDetailDrawer
                          autoOpen={parseInt(String(queryId)) === parseInt(String(article.id))}
                          id={article.id}
                        >
                          <a
                            className="list-group-item list-group-item-action"
                            style={{ borderRadius: 'unset', border: 'unset', borderBottom: '1px solid #e2e8f2' }}
                          >
                            <h5 className="font-size-base mb-1">{article.title}</h5>
                            <small>
                              {formatMessage({ id: '最后更新: {date}' }, { date: formatDate(article.updated_at) })}
                            </small>
                          </a>
                        </ConnectedKnowledgeDetailDrawer>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </MainLayout>
    );
  }
}

export default connect((state: KnowledgeStateProps) => ({ knowledge: state.knowledge }))(KnowledgePage);
