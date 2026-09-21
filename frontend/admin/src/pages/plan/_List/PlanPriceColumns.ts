// Prices arrive in display units from the plan model. Do not coerce or default:
// the original render throws for undefined/string values, and only null means '-'.
export function formatPlanPrice(value: number | null): string {
    return value !== null ? value.toFixed(2) : '-';
}
export function createReadonlyPlanPriceColumns() {
    return {
        month_price: {
            title: '月付',
            dataIndex: 'month_price',
            key: 'month_price',
            render: formatPlanPrice,
        },
        quarter_price: {
            title: '季付',
            dataIndex: 'quarter_price',
            key: 'quarter_price',
            render: formatPlanPrice,
        },
        half_year_price: {
            title: '半年付',
            dataIndex: 'half_year_price',
            key: 'half_year_price',
            render: formatPlanPrice,
        },
        year_price: {
            title: '年付',
            dataIndex: 'year_price',
            key: 'year_price',
            render: formatPlanPrice,
        },
        two_year_price: {
            title: '两年付',
            dataIndex: 'two_year_price',
            key: 'two_year_price',
            render: formatPlanPrice,
        },
        three_year_price: {
            title: '三年付',
            dataIndex: 'three_year_price',
            key: 'three_year_price',
            render: formatPlanPrice,
        },
        onetime_price: {
            title: '一次性',
            dataIndex: 'onetime_price',
            key: 'onetime_price',
            render: formatPlanPrice,
        },
        reset_price: {
            title: '重置包',
            dataIndex: 'reset_price',
            key: 'reset_price',
            render: formatPlanPrice,
        },
    };
}
