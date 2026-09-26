import React from 'react';
import Divider from 'antd/lib/divider';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import type { FilterField, FilterItem, FilterValue } from '@/types/filterContracts';
import FilterValueInput from './FilterValueInput';

interface FilterConditionProps {
    filterItem: FilterItem;
    index: number;
    fields: FilterField[];
    field: FilterField;
    onChange: (index: number, field: keyof FilterItem, value: FilterValue) => void;
    onRemove: (index: number) => void;
}

export function FilterCondition({
    filterItem,
    index,
    fields,
    field,
    onChange,
    onRemove,
}: FilterConditionProps): React.ReactElement {
    return (
        <React.Fragment>
            <Divider type="horizontal">
                条件{index + 1}{' '}
                <Icon type="delete" style={{ color: '#ff4d4f' }} onClick={() => onRemove(index)} />
            </Divider>
            <div className="form-group">
                <label>字段名</label>
                <Select
                    value={filterItem.key}
                    style={{ width: '100%' }}
                    onChange={(key) => onChange(index, 'key', key)}
                >
                    {fields.map((option) => (
                        <Select.Option key={option.key} value={option.key}>
                            {option.title}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="form-group">
                <label>条件</label>
                <Select
                    value={filterItem.condition}
                    style={{ width: '100%' }}
                    onChange={(condition) => onChange(index, 'condition', condition)}
                >
                    {field.condition.map((condition) => (
                        <Select.Option key={condition} value={condition}>
                            {condition}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="form-group">
                <label>欲检索内容</label>
                <FilterValueInput
                    filterItem={filterItem}
                    index={index}
                    field={field}
                    onChange={onChange}
                />
            </div>
        </React.Fragment>
    );
}

export default FilterCondition;
