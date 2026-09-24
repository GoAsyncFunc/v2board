import { createServerProtocolModel } from './createServerProtocolModel';

export const serverAnyTLS = createServerProtocolModel({
    namespace: 'serverAnyTLS',
    protocol: 'anytls',
});
export const serverHysteria = createServerProtocolModel({
    namespace: 'serverHysteria',
    protocol: 'hysteria',
});
export const serverShadowsocks = createServerProtocolModel({
    namespace: 'serverShadowsocks',
    protocol: 'shadowsocks',
});
export const serverTrojan = createServerProtocolModel({
    namespace: 'serverTrojan',
    protocol: 'trojan',
});
export const serverTuic = createServerProtocolModel({ namespace: 'serverTuic', protocol: 'tuic' });
export const serverV2node = createServerProtocolModel({
    namespace: 'serverV2node',
    protocol: 'v2node',
});
export const serverVless = createServerProtocolModel({
    namespace: 'serverVless',
    protocol: 'vless',
});
export const serverVmess = createServerProtocolModel({
    namespace: 'serverVmess',
    protocol: 'vmess',
});

export const serverProtocolModels = {
    serverAnyTls: serverAnyTLS,
    serverHysteria,
    serverShadowsocks,
    serverTrojan,
    serverTuic,
    serverV2Node: serverV2node,
    serverVless,
    serverVmess,
};
