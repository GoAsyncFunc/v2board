import message from 'antd/lib/message';
import desktopNotification from 'antd/lib/notification';
import { isMobile } from '@/utils/siteHelpers';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export function notify(type: NotificationType = 'success', title = '', description?: string): void {
    if (isMobile()) {
        message[type](description);
        return;
    }
    desktopNotification[type]({ message: title, description, duration: 1.5 });
}
