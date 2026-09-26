// Original order filter keys, extracted unchanged from the bundle's OrderPage render
// (webpack module 70693341); the FilterDrawer props object is reduced to the keys array.
module.exports = function () {
    return [
        {
            key: 'trade_no',
            title: '\u8ba2\u5355\u53f7',
            condition: ['\u6a21\u7cca', '='],
        },
        {
            key: 'status',
            title: '\u8ba2\u5355\u72b6\u6001',
            type: 'select',
            condition: ['='],
            options: [
                {
                    key: '\u672a\u652f\u4ed8',
                    value: 0,
                },
                {
                    key: '\u5df2\u652f\u4ed8',
                    value: 1,
                },
                {
                    key: '\u5df2\u53d6\u6d88',
                    value: 2,
                },
                {
                    key: '\u5df2\u5b8c\u6210',
                    value: 3,
                },
                {
                    key: '\u5df2\u6298\u62b5',
                    value: 4,
                },
            ],
        },
        {
            key: 'commission_status',
            title: '\u4f63\u91d1\u72b6\u6001',
            type: 'select',
            condition: ['='],
            options: [
                {
                    key: '\u5f85\u786e\u8ba4',
                    value: 0,
                },
                {
                    key: '\u53d1\u653e\u4e2d',
                    value: 1,
                },
                {
                    key: '\u5df2\u53d1\u653e',
                    value: 2,
                },
                {
                    key: '\u65e0\u6548',
                    value: 3,
                },
            ],
        },
        {
            key: 'user_id',
            title: '\u7528\u6237ID',
            condition: ['='],
        },
        {
            key: 'invite_user_id',
            title: '\u9080\u8bf7\u4ebaID',
            condition: ['=', '!='],
        },
        {
            key: 'callback_no',
            title: '\u56de\u8c03\u5355\u53f7',
            condition: ['\u6a21\u7cca'],
        },
        {
            key: 'commission_balance',
            title: '\u4f63\u91d1\u91d1\u989d',
            condition: ['>', '<', '=', '!=', '>=', '<='],
        },
    ];
};
