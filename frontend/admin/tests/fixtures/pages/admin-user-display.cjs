// Original readonly email/online column, extracted unchanged; sorter/filter/action columns stay in the page.
module.exports = function (b) {
    return {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render: (e, t) => {
            return b.createElement(
                b.Tooltip,
                {
                    placement: 'top',
                    title: t.t
                        ? '最后在线'.concat(b.moment(1e3 * t.t).format('YYYY-MM-DD HH:mm:ss'))
                        : '从未在线',
                },
                b.createElement(b.Badge, {
                    status: new Date().getTime() / 1e3 - 600 > t.t ? 'default' : 'success',
                }),
                e,
            );
        },
    };
};
