import React from 'react';
import { formatDateTime } from '../../../utils/dateTime';
import type { TicketMessage } from '../../../types/ticketContracts';
import { ticketDetailClassNames as styles } from '../../../styles/ticketDetailStyles';

interface TicketMessageListProps {
    messages: TicketMessage[];
}

export class TicketMessageList extends React.Component<TicketMessageListProps> {
    displayedMessageCount = 0;
    chatRef = React.createRef<HTMLDivElement>();

    componentDidMount(): void {
        this.scrollToLatestMessage();
    }

    componentDidUpdate(): void {
        const messageCount = this.props.messages.length;
        if (this.displayedMessageCount !== messageCount) {
            this.displayedMessageCount = messageCount;
            this.scrollToLatestMessage();
        }
    }

    scrollToLatestMessage(): void {
        const chat = this.chatRef.current;
        if (chat) chat.scrollTo(0, chat.scrollHeight);
    }

    renderMessage(message: TicketMessage, index: number): React.ReactNode {
        return (
            <div key={message.id || index}>
                <div
                    className={`font-size-sm text-muted my-2${message.is_me ? ' text-right' : ''}`}
                >
                    {formatDateTime(message.created_at)}
                </div>
                <div className={message.is_me ? 'text-right ml-4' : 'mr-4'}>
                    <div
                        className={`d-inline-block px-3 py-2 mb-2 mw-100 rounded text-left ${message.is_me ? 'bg-gray-lighter' : 'bg-success-lighter'}`}
                    >
                        {message.message}
                    </div>
                </div>
            </div>
        );
    }

    render(): React.ReactNode {
        return (
            <div
                ref={this.chatRef}
                className={`bg-white js-chat-messages block-content block-content-full text-wrap-break-word overflow-y-auto ${styles.content}`}
            >
                {this.props.messages.map((message, index) => this.renderMessage(message, index))}
            </div>
        );
    }
}

export default TicketMessageList;
