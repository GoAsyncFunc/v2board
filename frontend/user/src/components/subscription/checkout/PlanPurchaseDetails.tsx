import React from 'react';
import { PeriodSelector } from '@/components/commerce/checkout/Pricing';
import { parseJson } from '@/utils/siteHelpers';
import type { PlanRecord } from '@/types/userDomainContracts';
import type { PlanFeature, PlanPeriod } from '@/types/planContracts';

interface PlanPurchaseDetailsProps {
    currencySymbol?: string;
    onSelectPeriod: (period: PlanPeriod) => void;
    period?: PlanPeriod;
    plan: PlanRecord;
}

function PlanDescription({ plan }: { plan: PlanRecord }) {
    const content = parseJson<PlanFeature[]>(String(plan.content || ''));

    return (
        <div
            className="block block-link-pop block-rounded py-3"
            style={{ backgroundColor: '#fff' }}
        >
            <h4 className="mb-0 px-3">{plan.name}</h4>
            {content && typeof content === 'object' ? (
                <div className="v2board-plan-content px-3">
                    {content.map((feature, index) => (
                        <div
                            key={index}
                            style={{
                                textAlign: 'left',
                                marginBottom: 8,
                                opacity: feature.support ? 1 : 0.3,
                            }}
                        >
                            <i
                                className={
                                    feature.support
                                        ? 'si si-check text-primary'
                                        : 'si si-close text-primary'
                                }
                                style={{ fontSize: 21, verticalAlign: 'sub' }}
                            />
                            <span style={{ paddingLeft: 8 }}>{feature.feature}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    dangerouslySetInnerHTML={{ __html: String(plan.content || '') }}
                    className="v2board-plan-content"
                />
            )}
        </div>
    );
}

export default function PlanPurchaseDetails({
    currencySymbol,
    onSelectPeriod,
    period,
    plan,
}: PlanPurchaseDetailsProps) {
    return (
        <div className="col-md-8 col-sm-12">
            <PlanDescription plan={plan} />
            <PeriodSelector
                plan={plan}
                period={period}
                currencySymbol={currencySymbol}
                onSelect={onSelectPeriod}
            />
        </div>
    );
}
