import React from 'react';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Tooltip from 'antd/lib/tooltip';
import type { PlanPriceField, PlanRecord } from '../../../types/planContracts';

export const PLAN_PRICE_FIELDS: Array<[PlanPriceField, string]> = [
    ['month_price', '月付'],
    ['quarter_price', '季付'],
    ['half_year_price', '半年'],
    ['year_price', '年付'],
    ['two_year_price', '两年付'],
    ['three_year_price', '三年付'],
];

interface PlanPriceFieldsProps {
    record: PlanRecord;
    currencySymbol?: string;
    onPriceChange: (field: string, value: string) => void;
}

export default function PlanPriceFields({
    record,
    currencySymbol,
    onPriceChange,
}: PlanPriceFieldsProps) {
    return (
        <>
            <Divider orientation="center">
                售价设置{' '}
                <Tooltip placement="top" title="将金额留空则不会进行出售">
                    <Icon type="info-circle" />
                </Tooltip>
            </Divider>
            <Row gutter={10}>
                {PLAN_PRICE_FIELDS.map(([field, label]) => (
                    <Col md={4} key={field}>
                        <div className="form-group">
                            <label>{label}</label>
                            <Input
                                value={record[field] !== null ? record[field] : undefined}
                                onChange={(event) => onPriceChange(field, event.target.value)}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
            <Row gutter={10}>
                {(
                    [
                        ['onetime_price', '一次性'],
                        ['reset_price', '重置包'],
                    ] as const
                ).map(([field, label]) => (
                    <Col md={12} key={field}>
                        <div className="form-group">
                            <label>{label}</label>
                            <Input
                                addonAfter={currencySymbol}
                                value={record[field] !== null ? record[field] : undefined}
                                onChange={(event) => onPriceChange(field, event.target.value)}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    );
}
