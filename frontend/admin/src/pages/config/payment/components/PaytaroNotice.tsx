import React from 'react';

export interface PaytaroNoticeProps {
    paymentMethod?: string;
}

export function PaytaroNotice({ paymentMethod }: PaytaroNoticeProps): React.ReactElement | null {
    if (!paymentMethod?.includes('Paytaro')) return null;

    return (
        <div className="alert alert-warning mb-0" role="alert">
            <p className="mb-0">
                客服TG{' '}
                <a href="https://t.me/paytaro" target="_blank" rel="noopener noreferrer">
                    @paytaro
                </a>
                <br />
                机器人{' '}
                <a href="https://t.me/paytarorobot" target="_blank" rel="noopener noreferrer">
                    @paytarorobot
                </a>
                <br />
                官方网站{' '}
                <a href="https://v3.paytaro.com/#/docs" target="_blank" rel="noopener noreferrer">
                    https://v3.paytaro.com
                </a>
            </p>
        </div>
    );
}
