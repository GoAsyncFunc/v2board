// Original method body, dependency injection only.
module.exports = function (y, g) {
    return function (e, t) {
        switch (e) {
            case 'shadowsocks':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#489851',
                    },
                    t,
                );
            case 'vmess':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#CB3180',
                    },
                    t,
                );
            case 'trojan':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#EAB854',
                    },
                    t,
                );
            case 'hysteria':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#1A1A1A',
                    },
                    t,
                );
            case 'tuic':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#9400D3',
                    },
                    t,
                );
            case 'vless':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#4080FF',
                    },
                    t,
                );
            case 'anytls':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#FF8C00',
                    },
                    t,
                );
            case 'v2node':
                return y.a.createElement(
                    g['a'],
                    {
                        color: '#FF0000',
                    },
                    t,
                );
        }
    };
};
