import { formatMessage } from '@/locales/i18n';
import { setRequestFailurePresenter, type RequestFailurePresentation } from '@/services/apiClient';
import { notify } from './notifications';

export function presentRequestFailure({
    titleMessageId,
    description,
}: RequestFailurePresentation): void {
    notify('error', formatMessage({ id: titleMessageId }), description);
}

export function configureRequestPresentation(): void {
    setRequestFailurePresenter(presentRequestFailure);
}
