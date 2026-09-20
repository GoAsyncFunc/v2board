import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import { Select } from '../vendor/ui.js';
import { Input } from '../vendor/ui.js';
import { Table } from '../vendor/ui.js';
import Icon from 'antd/lib/icon';
import MainLayout from '../layouts/MainLayout';
import { formatMessage } from '../vendor/i18n.js';
import { createReadonlyTicketColumns } from '../components/TicketReadonlyColumns';
import type { TicketDraft, TicketState } from '../types/ticket';
import type { UserDispatch } from '../types/store';


interface TicketStateProps { ticket: TicketState; }

export class TicketPage extends React.Component<TicketStateProps & { dispatch: UserDispatch }> {
  setSaveData<Key extends keyof TicketDraft>(key: Key, value: TicketDraft[Key]) {
    const { saveData } = this.props.ticket;
    this.props.dispatch({
      type: 'ticket/setState',
      payload: { saveData: { ...saveData, [key]: value } },
    });
  }

  componentDidMount() {
    this.props.dispatch({ type: 'ticket/fetch' });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'ticket/empty' });
  }

  save() {
    this.props.dispatch({ type: 'ticket/save' });
  }

  close(id: number) {
    this.props.dispatch({ type: 'ticket/close', id });
  }

  toChat(id: number) {
    const url = `${window.location.origin}${window.location.pathname}#/ticket/${id}`;
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (!userAgent.includes('mobile') && !userAgent.includes('ipad')) {
      window.open(url, 'newwindow', 'height=600,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    } else {
      window.location.href = url;
    }
  }

  render() {
    const {
      tickets,
      fetchLoading,
      saveData,
      newTicketModalVisible,
      saveLoading,
    } = this.props.ticket;
    const levels = [formatMessage({ id: '低' }), formatMessage({ id: '中' }), formatMessage({ id: '高' })];
    const columns = createReadonlyTicketColumns(levels);

    return (
      <MainLayout {...this.props} title={formatMessage({ id: '我的工单' })}>
        <main id="main-container">
          <div className="content content-full">
            <div className={`block block-rounded js-appear-enabled ${fetchLoading ? 'block-mode-loading' : ''}`}>
              <div className="block-header block-header-default">
                <h3 className="block-title">{formatMessage({ id: '工单历史' })}</h3>
                <div className="block-options">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-primary btn-rounded px-3"
                    onClick={() => this.props.dispatch({
                      type: 'ticket/setState',
                      payload: { newTicketModalVisible: true },
                    })}
                  >
                    {saveLoading ? <Icon type="loading" /> : formatMessage({ id: '新的工单' })}
                  </button>
                </div>
              </div>
              <div className="block-content p-0">
                <Table tableLayout="auto" dataSource={tickets} columns={columns} pagination={false} scroll={{ x: 900 }} />
              </div>
            </div>
          </div>
        </main>
        <Modal
          title={formatMessage({ id: '新的工单' })}
          visible={newTicketModalVisible}
          onCancel={() => this.props.dispatch({
            type: 'ticket/setState',
            payload: { newTicketModalVisible: false },
          })}
          maskClosable
          onOk={() => saveLoading || this.save()}
          okText={saveLoading ? <Icon type="loading" /> : formatMessage({ id: '确认' })}
          cancelText={formatMessage({ id: '取消' })}
        >
          <div>
            <div className="form-group">
              <label htmlFor="ticket-subject">{formatMessage({ id: '主题' })}</label>
              <Input
                id="ticket-subject"
                placeholder={formatMessage({ id: '请输入工单主题' })}
                onChange={event => this.setSaveData('subject', event.target.value)}
                value={saveData.subject}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ticket-level">{formatMessage({ id: '工单等级' })}</label>
              <Select<number>
                id="ticket-level"
                placeholder={formatMessage({ id: '请选择工单等级' })}
                style={{ width: '100%' }}
                onChange={value => this.setSaveData('level', value)}
                value={saveData.level}
              >
                {levels.map((level, index) => <Select.Option key={index} value={index}>{level}</Select.Option>)}
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="ticket-message">{formatMessage({ id: '消息' })}</label>
              <Input.TextArea
                id="ticket-message"
                rows={5}
                placeholder={formatMessage({ id: '请描述你遇到的问题' })}
                onChange={event => this.setSaveData('message', event.target.value)}
                value={saveData.message}
              />
            </div>
          </div>
        </Modal>
      </MainLayout>
    );
  }
}

export default connect((state: TicketStateProps) => ({ ticket: state.ticket }))(TicketPage);
