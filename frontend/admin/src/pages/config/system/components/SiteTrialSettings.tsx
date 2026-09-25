import React from 'react';
import ConfigRow from './ConfigRow';
import type {
    ConfigChangeHandler,
    SiteConfig,
    PlanSummary,
} from '../../../../types/systemConfigurationContracts';

interface SiteTrialSettingsProps {
    site: SiteConfig;
    plans: PlanSummary[];
    onChange: ConfigChangeHandler<SiteConfig>;
}

export default function SiteTrialSettings({
    site,
    plans,
    onChange,
}: SiteTrialSettingsProps): React.ReactElement {
    return (
        <>
            <ConfigRow
                title="注册试用"
                description="选择需要试用的订阅，如果没有选项请先前往订阅管理添加。"
            >
                <select
                    className="form-control"
                    value={site.try_out_plan_id}
                    onChange={(event) => onChange('try_out_plan_id', event.target.value)}
                >
                    <option value={0}>关闭</option>
                    {plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </select>
            </ConfigRow>
            {site.try_out_plan_id !== 0 && (
                <ConfigRow isChildren title="试用时间(小时)">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="请输入"
                        defaultValue={site.try_out_hour}
                        onChange={(event) => onChange('try_out_hour', event.target.value)}
                    />
                </ConfigRow>
            )}
        </>
    );
}
