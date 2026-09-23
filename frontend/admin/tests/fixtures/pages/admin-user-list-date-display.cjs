module.exports = function renderOriginalUserDates(moment) {
    return {
        expiration: (value) => ({
            color:
                value !== null && value !== undefined && Number(value) < 1700000000
                    ? 'red'
                    : 'green',
            text: value
                ? moment(1000 * Number(value)).format('YYYY/MM/DD HH:mm')
                : value === null
                  ? '长期有效'
                  : '-',
        }),
        createdAt: (value) => moment(1000 * value).format('YYYY/MM/DD HH:mm'),
    };
};
