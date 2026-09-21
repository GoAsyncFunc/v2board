import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Select from 'antd/lib/select';
import type { AdminDispatch } from '../../../types/store';
import type { NoticeRecord, NoticeState } from '../../../types/notice';

interface NoticeEditorProps {
    dispatch: AdminDispatch;
    notice: NoticeState;
    record?: NoticeRecord;
    visible: boolean;
    onClose: () => void;
}

interface NoticeEditorState {
    submit: NoticeRecord;
}

export class NoticeEditor extends React.Component<NoticeEditorProps, NoticeEditorState> {
    state: NoticeEditorState = { submit: { ...this.props.record } };

    componentDidUpdate(previousProps: NoticeEditorProps): void {
        if (
            previousProps.record !== this.props.record ||
            (!previousProps.visible && this.props.visible)
        ) {
            this.setState({ submit: { ...this.props.record } });
        }
    }

    updateField<Field extends keyof NoticeRecord>(field: Field, value: NoticeRecord[Field]): void {
        this.setState(({ submit }) => ({ submit: { ...submit, [field]: value } }));
    }

    save(): void {
        this.props.dispatch({
            type: 'notice/save',
            params: { ...this.state.submit },
            callback: this.props.onClose,
        });
    }

    render(): React.ReactNode {
        const { submit } = this.state;
        const { notice } = this.props;
        return (
            <Modal
                title={submit.id ? '编辑公告' : '新建公告'}
                visible={this.props.visible}
                onCancel={this.props.onClose}
                onOk={() => !notice.saveLoading && this.save()}
                okText={notice.saveLoading ? <Icon type="loading" /> : '提交'}
                cancelText="取消"
            >
                <div>
                    <div className="form-group">
                        <label htmlFor="notice-title">标题</label>
                        <Input
                            id="notice-title"
                            placeholder="请输入公告标题"
                            value={submit.title}
                            onChange={(event) => this.updateField('title', event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notice-content">公告内容</label>
                        <Input.TextArea
                            id="notice-content"
                            rows={12}
                            value={submit.content}
                            placeholder="请输入公告内容"
                            onChange={(event) => this.updateField('content', event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notice-tags">公告标签</label>
                        <Select
                            id="notice-tags"
                            mode="tags"
                            value={submit.tags || []}
                            style={{ width: '100%' }}
                            placeholder="输入后回车添加标签"
                            onChange={(tags: string[]) =>
                                this.updateField('tags', tags.length > 0 ? tags : null)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notice-image">图片URL</label>
                        <Input
                            id="notice-image"
                            placeholder="请输入图片URL"
                            value={submit.img_url}
                            onChange={(event) => this.updateField('img_url', event.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default NoticeEditor;
