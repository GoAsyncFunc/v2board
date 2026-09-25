import React from 'react';
import DatePicker from 'antd/lib/date-picker';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import moment from 'moment';
import type { FilterField, FilterItem, FilterValue } from '../../types/filterContracts';

interface FilterValueInputProps {
    filterItem: FilterItem;
    index: number;
    field: FilterField;
    onChange: (index: number, field: keyof FilterItem, value: FilterValue) => void;
}

export function FilterValueInput({
    filterItem,
    index,
    field,
    onChange,
}: FilterValueInputProps): React.ReactElement {
    if (field.type === 'select') {
        if (!field.options) throw new TypeError('Filter select options were not provided');
        return (
            <Select
                value={filterItem.value || undefined}
                style={{ width: '100%' }}
                placeholder="请选择值"
                onChange={(value) => onChange(index, 'value', value)}
            >
                {field.options.map((option) => (
                    <Select.Option
                        key={`${option.key}-${option.value}`}
                        value={option.value ?? undefined}
                    >
                        {option.key}
                    </Select.Option>
                ))}
            </Select>
        );
    }

    if (field.type === 'date') {
        return (
            <DatePicker
                style={{ width: '100%' }}
                onChange={(date) => onChange(index, 'value', date && date.format('X'))}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            />
        );
    }

    return (
        <Input
            style={{ width: '100%' }}
            value={filterItem.value || undefined}
            placeholder="值"
            onChange={(event) => onChange(index, 'value', event.target.value)}
        />
    );
}

export default FilterValueInput;
