import React from 'react';
import { Hysteria2Fields } from './ProtocolSpecific/Hysteria2Fields';
import { TuicFields } from './ProtocolSpecific/TuicFields';
import { ShadowsocksFields } from './ProtocolSpecific/ShadowsocksFields';
import { VlessFields } from './ProtocolSpecific/VlessFields';
import type { ServerRecord } from '../../../../../types/server';
import type { OpenV2NodeSettings, UpdateV2Node } from './types';

interface V2NodeProtocolSpecificFieldsProps {
    server: ServerRecord;
    onChange: UpdateV2Node;
    onOpenSettings: OpenV2NodeSettings;
}

export default function V2NodeProtocolSpecificFields({
    server,
    onChange,
    onOpenSettings,
}: V2NodeProtocolSpecificFieldsProps): React.ReactElement {
    switch (server.protocol) {
        case 'hysteria2':
            return <Hysteria2Fields server={server} onChange={onChange} />;
        case 'tuic':
            return <TuicFields server={server} onChange={onChange} />;
        case 'shadowsocks':
            return <ShadowsocksFields server={server} onChange={onChange} />;
        case 'vless':
            return (
                <VlessFields server={server} onChange={onChange} onOpenSettings={onOpenSettings} />
            );
        default:
            return <></>;
    }
}
