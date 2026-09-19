import React from 'react';
import { formatDate } from '../components/DateTimeDisplay.jsx';
import { Input, Modal, notification } from '../vendor/ui.js';
import MainLayout from '../layouts/MainLayout.jsx';
import { connect } from '../vendor/reactRedux.js';
import { formatMessage, getLocale } from '../vendor/i18n.js';
import { Icon } from '../vendor/Icon.js';
import { MarkdownIt } from '../vendor/utilities.js';
import { copyToClipboard } from '../vendor/siteHelpers.js';
import '../vendor/dateTime.js';

const markdownRenderer = new MarkdownIt({ html: true, linkify: true, typographer: true });

export class KnowledgeDetailModal extends React.Component {
  state = { visible: false };

  componentDidMount() {
    if (this.props.autoOpen) this.show();
  }

  getKnowledge(id) {
    this.props.dispatch({ type: 'knowledge/fetchById', id, language: getLocale() });
  }

  show() {
    this.getKnowledge(this.props.id);
    this.setState({ visible: true });
    window.copy = text => {
      copyToClipboard(text);
      notification.success(formatMessage({ id: '复制成功' }));
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
        <Modal visible={visible} title={knowledge.title || 'Loading...'} width="80%" onClose={() => this.hide()}>
          {fetchByIdLoading ? <Icon type="loading" /> : (
            <div
              className="custom-html-style"
              dangerouslySetInnerHTML={{ __html: markdownRenderer.render(knowledge.body || '') }}
            />
          )}
        </Modal>
      </>
    );
  }
}

const ConnectedKnowledgeDetailModal = connect(state => ({ knowledge: state.knowledge }))(KnowledgeDetailModal);

export class KnowledgePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'knowledge/fetch', language: getLocale() });
    this.inputDelayTimer = undefined;
  }

  onSearch(keyword) {
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
                        <ConnectedKnowledgeDetailModal
                          autoOpen={parseInt(queryId) === parseInt(article.id)}
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
                        </ConnectedKnowledgeDetailModal>
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

export default connect(state => ({ knowledge: state.knowledge }))(KnowledgePage);
