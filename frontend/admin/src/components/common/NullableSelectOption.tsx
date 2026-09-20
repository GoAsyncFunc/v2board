import React from 'react';
import Select from 'antd/lib/select';

type SelectOptionProps = React.ComponentProps<typeof Select.Option>;

export type NullableSelectOptionProps = Omit<SelectOptionProps, 'value'> & {
    value: React.Key | null;
};

// Ant Design v3 accepts null as an empty option at runtime but omits it from its declaration.
const NullableSelectOption = Select.Option as React.ComponentType<NullableSelectOptionProps>;

export default NullableSelectOption;
