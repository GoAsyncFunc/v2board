import notification from 'antd/lib/notification';
import { setRequestFailurePresenter, type RequestFailurePresentation } from '../services/request';

export function presentRequestFailure({
    title,
    description,
    durationSeconds,
}: RequestFailurePresentation): void {
    notification.error({
        message: title,
        description,
        duration: durationSeconds,
    });
}

export function configureRequestPresentation(): void {
    setRequestFailurePresenter(presentRequestFailure);
}
