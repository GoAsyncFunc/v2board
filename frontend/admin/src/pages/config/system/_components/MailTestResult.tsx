import React from 'react';
import notification from 'antd/lib/message';
import type { MailTestLog } from '../../../../types/config';

interface MailTestResultProps {
    log: MailTestLog;
}

export default function MailTestResult({ log }: MailTestResultProps): React.ReactElement {
    return (
        <div>
            {log.error && (
                <div>
                    <span>失败原因:</span>
                    <span>{log.error}</span>
                </div>
            )}
            <div>
                <span>收信地址:</span>
                <span>{log.email}</span>
            </div>
            <div>
                <span>发信服务器:</span>
                <span>{log.config?.host}</span>
            </div>
            <div>
                <span>发信端口:</span>
                <span>{log.config?.port}</span>
            </div>
            <div>
                <span>发信加密方式:</span>
                <span>{log.config?.encryption}</span>
            </div>
            <div>
                <span>发信用户名:</span>
                <span>{log.config?.username}</span>
            </div>
        </div>
    );
}

interface LegacyMessageApi {
    error(options: { title: string; content: React.ReactNode }): void;
    success(options: { title: string; content: React.ReactNode }): void;
}

const message = notification as LegacyMessageApi;

export function showMailTestResult(log: MailTestLog): void {
    const error = log.error;
    message[error ? 'error' : 'success']({
        title: error ? '发送失败' : '发送成功',
        content: <MailTestResult log={log} />,
    });
}
