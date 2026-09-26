import React from 'react';
import Result from 'antd/lib/result';
import type { ResultProps } from 'antd/lib/result';
import { formatMessage } from '@/locales/i18n';
import { router } from '@/app/navigationService';
export function orderResultProps(status?: number): ResultProps | undefined {
    switch (status) {
        case 1:
            return {
                status: 'info',
                title: formatMessage({
                    id: '开通中',
                }),
                subTitle: formatMessage({
                    id: '订单系统正在进行处理，请稍等1-3分钟。',
                }),
            };
        case 2:
            return {
                status: 'warning',
                title: formatMessage({
                    id: '已取消',
                }),
                subTitle: formatMessage({
                    id: '订单由于超时支付已被取消。',
                }),
            };
        case 3:
        case 4:
            return {
                status: 'success',
                title: formatMessage({
                    id: '已完成',
                }),
                subTitle: formatMessage({
                    id: '订单已支付并开通。',
                }),
                extra: [
                    // eslint-disable-next-line react/jsx-key -- element list mirrors the bundle, which passed no keys
                    <button
                        type={'button'}
                        onClick={() => router.push('/knowledge')}
                        className={'btn btn-primary btn-sm btn-danger btn-rounded px-3'}
                    >
                        <i className={'nav-main-link-icon si si-book-open mr-1'}></i>
                        {formatMessage({
                            id: '查看使用教程',
                        })}
                    </button>,
                ],
            };
    }
}
export default function OrderStatusResult({ status }: { status?: number }) {
    return <Result className="py-4" {...orderResultProps(status)} />;
}
