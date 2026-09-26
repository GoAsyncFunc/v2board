import React from 'react';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import type { AdminDispatch } from '@/types/storeContracts';
import type { NoticeRecord, NoticeState } from '@/types/noticeContracts';
import { NoticeContentFields } from './NoticeContentFields';
import { NoticeMetadataFields } from './NoticeMetadataFields';

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
                    <NoticeContentFields
                        notice={submit}
                        onChange={(field, value) => this.updateField(field, value)}
                    />
                    <NoticeMetadataFields
                        notice={submit}
                        onChange={(field, value) => this.updateField(field, value)}
                    />
                </div>
            </Modal>
        );
    }
}

export default NoticeEditor;
