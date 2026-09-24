import React from 'react';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import { ticketDetailClassNames as styles } from '../../../styles/ticketDetail';
import TicketMessageList from './TicketMessageList';
import UserEditor from '../../user/components/UserEditor';
import TrafficPanel from '../../../components/user/TrafficPanel';
import type { TicketId, TicketRecord } from '../../../types/ticket';

export interface TicketDetailChatProps {
    ticket?: TicketRecord;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, clearMessage: () => void) => void;
}

export class TicketDetailChat extends React.Component<TicketDetailChatProps> {
    messageRef = React.createRef<HTMLInputElement>();

    render(): React.ReactNode {
        const { ticket } = this.props;
        return (
            <div>
                <div className="block-content-full bg-gray-lighter p-3">
                    <span className={styles.tag}>{ticket?.subject}</span>
                    <div className={styles.controls}>
                        <UserEditor userId={ticket?.user_id}>
                            <Tooltip title="用户管理" placement="left">
                                <Icon type="user" />
                            </Tooltip>
                        </UserEditor>
                        <Divider type="vertical" />
                        <TrafficPanel userId={ticket?.user_id as TicketId} key={ticket?.user_id}>
                            <Tooltip title="TA的流量记录" placement="left">
                                <Icon type="solution" />
                            </Tooltip>
                        </TrafficPanel>
                    </div>
                </div>
                <TicketMessageList messages={ticket?.message || []} />
                <div className={`js-chat-form block-content p-2 bg-body-dark ${styles.input}`}>
                    <input
                        ref={this.messageRef}
                        type="text"
                        className="js-chat-input bg-body-dark border-0 form-control form-control-alt"
                        placeholder="输入内容回复工单..."
                        onChange={this.props.onChange}
                        onKeyDown={(event) =>
                            this.props.onKeyDown(event, () => {
                                if (this.messageRef.current) this.messageRef.current.value = '';
                            })
                        }
                    />
                </div>
            </div>
        );
    }
}

export default TicketDetailChat;
