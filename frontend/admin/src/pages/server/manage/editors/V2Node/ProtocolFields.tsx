import React from 'react';
import { Fragment } from 'react';
import type { ServerRecord } from '../../../../../types/serverContracts';
import type { OpenV2NodeSettings, UpdateV2Node } from '../serverEditorTypes';
import V2NodeProtocolSelectionFields from './ProtocolSelectionFields';
import V2NodeTransportFields from './TransportFields';

interface V2NodeProtocolFieldsProps {
    server: ServerRecord;
    onChange: UpdateV2Node;
    onOpenSettings: OpenV2NodeSettings;
}

export default function V2NodeProtocolFields({
    server,
    onChange,
    onOpenSettings,
}: V2NodeProtocolFieldsProps): React.ReactElement {
    return (
        <Fragment>
            <V2NodeProtocolSelectionFields
                server={server}
                onChange={onChange}
                onOpenSettings={onOpenSettings}
            />
            <V2NodeTransportFields
                server={server}
                onChange={onChange}
                onOpenSettings={onOpenSettings}
            />
        </Fragment>
    );
}
