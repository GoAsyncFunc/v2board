import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import { formatMoney } from '../../common/MoneyDisplay';
import TransferCommissionModal from '../TransferCommissionModal';
import WithdrawModal from '../WithdrawModal';
import { formatMessage } from '../../../locales/i18n';
import type { InviteConfig } from '../../../types/invitationContracts';

interface InviteCommissionWalletProps {
    blockClassName: string;
    commissionBalance?: number;
    config: InviteConfig;
}

export default function InviteCommissionWallet({
    blockClassName,
    commissionBalance,
    config,
}: InviteCommissionWalletProps) {
    return (
        <div className="row mb-3 mb-md-0">
            <div className="col-md-12">
                <div className={blockClassName}>
                    <div className="block-content pb-3">
                        <i className="fa fa-user-plus fa-2x text-gray-light float-right" />
                        <div className="pb-sm-3">
                            <p className="text-muted w-75">{formatMessage({ id: '我的邀请' })}</p>
                            <p className="display-4 text-black font-w300 mb-2">
                                {formatMoney(commissionBalance)}
                                <span className="font-size-h5 text-muted ml-4">
                                    {config.currency}
                                </span>
                            </p>
                            <span className="text-muted" style={{ cursor: 'pointer' }}>
                                {formatMessage({ id: '当前剩余佣金' })}
                            </span>
                            <div className="pt-3">
                                <TransferCommissionModal>
                                    <Button type="primary" className="mr-2">
                                        <Icon type="transaction" /> {formatMessage({ id: '划转' })}
                                    </Button>
                                </TransferCommissionModal>
                                {!config.withdraw_close && (
                                    <WithdrawModal>
                                        <Button>
                                            <Icon type="pay-circle" />{' '}
                                            {formatMessage({ id: '推广佣金提现' })}
                                        </Button>
                                    </WithdrawModal>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
