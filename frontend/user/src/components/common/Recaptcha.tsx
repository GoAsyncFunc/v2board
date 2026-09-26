import React from 'react';
import { connect } from 'react-redux';
import Modal from 'antd/lib/modal';
import type { GuestState, RecaptchaToken } from '@/types/authenticationContracts';
import type { UserRootState } from '@/types/storeContracts';

interface RecaptchaApi {
    render(container: HTMLElement, options: RecaptchaRenderOptions): number;
    reset(widgetId: number): void;
}

interface RecaptchaRenderOptions {
    sitekey?: string;
    callback: (value: RecaptchaToken) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
}

interface RecaptchaProps {
    callback?: (value?: RecaptchaToken) => void;
    children: React.ReactElement;
    guest: GuestState;
    visible?: boolean;
}

interface RecaptchaState {
    visible: boolean;
}

let scriptPromise: Promise<RecaptchaApi> | undefined;

function loadRecaptchaScript(): Promise<RecaptchaApi> {
    if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
    if (scriptPromise) return scriptPromise;

    scriptPromise = new Promise((resolve, reject) => {
        const callbackName = `recaptchaLoaded_${Date.now()}`;
        const script = document.createElement('script');
        Reflect.set(window, callbackName, () => {
            Reflect.deleteProperty(window, callbackName);
            if (window.grecaptcha) resolve(window.grecaptcha);
            else reject(new Error('reCAPTCHA loaded without exposing its API'));
        });
        script.src = `https://www.recaptcha.net/recaptcha/api.js?onload=${callbackName}&render=explicit`;
        script.async = true;
        script.onerror = reject;
        document.body.appendChild(script);
    });
    return scriptPromise;
}

export class Recaptcha extends React.Component<RecaptchaProps, RecaptchaState> {
    state: RecaptchaState = { visible: false };
    widgetContainer = React.createRef<HTMLDivElement>();
    widgetId: number | null = null;

    show = (): void => {
        if (!this.props.visible) {
            this.props.callback?.();
            return;
        }
        this.setState({ visible: true });
    };

    hide = (): void => this.setState({ visible: false });

    handleChange = (value: RecaptchaToken): void => {
        setTimeout(() => {
            this.hide();
            this.props.callback?.(value);
        }, 500);
    };

    componentDidUpdate(_previousProps: RecaptchaProps, previousState: RecaptchaState): void {
        if (!previousState.visible && this.state.visible) void this.renderWidget();
    }

    componentWillUnmount(): void {
        if (this.widgetId !== null && window.grecaptcha) window.grecaptcha.reset(this.widgetId);
    }

    async renderWidget(): Promise<void> {
        const grecaptcha = await loadRecaptchaScript();
        if (!this.state.visible || !this.widgetContainer.current || this.widgetId !== null) return;
        this.widgetId = grecaptcha.render(this.widgetContainer.current, {
            sitekey: this.props.guest.commConfig.recaptcha_site_key,
            callback: this.handleChange,
            'expired-callback': () => this.handleChange(null),
            'error-callback': () => this.handleChange(null),
        });
    }

    render(): React.ReactNode {
        return (
            <>
                {React.cloneElement(this.props.children, { onClick: this.show })}
                <Modal
                    visible={this.state.visible}
                    onCancel={this.hide}
                    footer={false}
                    closable={false}
                    centered
                >
                    <div ref={this.widgetContainer} />
                </Modal>
            </>
        );
    }
}

export default connect((state: UserRootState) => ({ guest: state.guest }))(Recaptcha);
