import React from 'react';
import Button from 'antd/lib/button';
import Drawer from 'antd/lib/drawer';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import { connect } from 'react-redux';
import KnowledgeForm from './KnowledgeForm';
import type { AdminDispatch, AdminRootState } from '../../../types/store';
import type { KnowledgeRecord, KnowledgeState } from '../../../types/knowledge';

export interface KnowledgeEditorProps {
    children: React.ReactElement;
    dispatch: AdminDispatch;
    id?: string | number;
    knowledge: KnowledgeState;
}

interface KnowledgeEditorState {
    visible: boolean;
}

export class KnowledgeEditor extends React.Component<KnowledgeEditorProps, KnowledgeEditorState> {
    state: KnowledgeEditorState = { visible: false };
    editorKey = Math.random();

    formChange<Field extends keyof KnowledgeRecord>(
        field: Field,
        value: KnowledgeRecord[Field],
    ): void {
        this.props.dispatch({
            type: 'knowledge/setState',
            payload: { knowledge: { ...this.props.knowledge.knowledge, [field]: value } },
        });
    }

    show(): void {
        if (this.props.id) this.props.dispatch({ type: 'knowledge/fetchById', id: this.props.id });
        this.editorKey = Math.random();
        this.setState({ visible: true });
    }

    hide(): void {
        this.props.dispatch({ type: 'knowledge/setState', payload: { knowledge: {} } });
        this.setState({ visible: false });
    }

    save(): void {
        this.props.dispatch({
            type: 'knowledge/save',
            callback: () => message.success('保存成功'),
        });
    }

    render(): React.ReactNode {
        const { visible } = this.state;
        const { knowledge } = this.props;
        const article = knowledge.knowledge;

        return (
            <>
                {React.cloneElement(this.props.children, { onClick: () => this.show() })}
                <Drawer
                    width="80%"
                    visible={visible}
                    title={this.props.id ? '编辑知识' : '新增知识'}
                    onClose={() => this.hide()}
                >
                    {knowledge.fetchByIdLoading ? (
                        <Icon type="loading" />
                    ) : (
                        <KnowledgeForm
                            article={article}
                            editorKey={this.editorKey}
                            onChange={(field, value) => this.formChange(field, value)}
                        />
                    )}
                    <div className="v2board-drawer-action">
                        <Button style={{ marginRight: 8 }} onClick={() => this.hide()}>
                            取消
                        </Button>
                        <Button
                            loading={knowledge.saveLoading}
                            onClick={() => this.save()}
                            type="primary"
                        >
                            提交
                        </Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

const ConnectedKnowledgeEditor = connect((state: AdminRootState) => ({
    knowledge: state.knowledge,
}))(KnowledgeEditor);

export default ConnectedKnowledgeEditor;
