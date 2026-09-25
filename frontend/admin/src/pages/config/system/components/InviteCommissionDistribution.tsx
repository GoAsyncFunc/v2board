import React from 'react';
import ConfigRow from './ConfigRow';
import type {
    ConfigChangeHandler,
    InviteConfig,
    ConfigValue,
} from '../../../../types/systemConfigurationContracts';

interface InviteCommissionDistributionProps {
    invite: InviteConfig;
    onChange: ConfigChangeHandler<InviteConfig>;
    TextSetting: React.ComponentType<{
        title: string;
        value?: Exclude<ConfigValue, null>;
        onChange: (value: ConfigValue) => void;
        isChildren?: boolean;
    }>;
}

export default function InviteCommissionDistribution({
    invite,
    onChange,
    TextSetting,
}: InviteCommissionDistributionProps): React.ReactElement | null {
    if (!parseInt(String(invite.commission_distribution_enable), 10)) return null;

    return (
        <>
            <TextSetting
                isChildren
                title="一级邀请人比例"
                value={invite.commission_distribution_l1}
                onChange={(value) => onChange('commission_distribution_l1', value)}
            />
            <TextSetting
                isChildren
                title="二级邀请人比例"
                value={invite.commission_distribution_l2}
                onChange={(value) => onChange('commission_distribution_l2', value)}
            />
            <TextSetting
                isChildren
                title="三级邀请人比例"
                value={invite.commission_distribution_l3}
                onChange={(value) => onChange('commission_distribution_l3', value)}
            />
        </>
    );
}
