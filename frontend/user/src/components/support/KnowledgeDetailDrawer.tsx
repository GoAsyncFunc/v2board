import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import MarkdownIt from 'markdown-it';
import { formatMessage, getLocale } from '../../locales/i18n';
import { copyToClipboard } from '../../utils/siteHelpers';
import type { KnowledgeId, KnowledgeState } from '../../types/knowledge';
import type { UserDispatch, UserRootState } from '../../types/store';

const markdownRenderer = new MarkdownIt({ html: true, linkify: true, typographer: true });

interface KnowledgeDetailProps {
    knowledge: KnowledgeState;
    id: KnowledgeId;
    autoOpen?: boolean;
    children: React.ReactElement;
    dispatch: UserDispatch;
}

export class KnowledgeDetailDrawer extends React.Component<
    KnowledgeDetailProps,
    { visible: boolean }
> {
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
        window.copy = (text) => {
            copyToClipboard(text);
            message.success(formatMessage({ id: '复制成功' }));
        };
        window.jump = (id) => this.getKnowledge(id);
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
                <Drawer
                    visible={visible}
                    title={knowledge.title || 'Loading...'}
                    width="80%"
                    onClose={() => this.hide()}
                >
                    {fetchByIdLoading ? (
                        <Icon type="loading" />
                    ) : (
                        <div
                            className="custom-html-style"
                            dangerouslySetInnerHTML={{
                                __html: markdownRenderer.render(knowledge.body || ''),
                            }}
                        />
                    )}
                </Drawer>
            </>
        );
    }
}

export default connect((state: UserRootState) => ({ knowledge: state.knowledge }))(
    KnowledgeDetailDrawer,
);
