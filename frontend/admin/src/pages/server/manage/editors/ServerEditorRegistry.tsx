import React from 'react';
import Menu from 'antd/lib/menu';
import AnyTlsEditor from './AnyTlsEditor';
import HysteriaEditor from './HysteriaEditor';
import ShadowsocksEditor from './ShadowsocksEditor';
import TrojanEditor from './TrojanEditor';
import TuicEditor from './TuicEditor';
import V2NodeEditor from './V2NodeEditor';
import VlessEditor from './VlessEditor';
import VmessEditor from './VmessEditor';
import { renderServerTypeTag } from '../components/ServerTypeTag';
import type { ServerProtocolType, ServerRecord } from '../../../../types/server';

type ServerEditorComponent = React.ComponentType<{
    children: React.ReactElement;
    record?: ServerRecord;
}>;

export type ServerProtocolModelNamespace =
    | 'serverAnyTLS'
    | 'serverHysteria'
    | 'serverShadowsocks'
    | 'serverTrojan'
    | 'serverTuic'
    | 'serverV2node'
    | 'serverVless'
    | 'serverVmess';

interface ServerEditorDefinition {
    type: ServerProtocolType;
    filterLabel: string;
    menuLabel: string;
    modelNamespace: ServerProtocolModelNamespace;
    Editor: ServerEditorComponent;
}

const SERVER_EDITOR_DEFINITIONS: readonly ServerEditorDefinition[] = [
    {
        type: 'v2node',
        filterLabel: 'V2node',
        menuLabel: 'V2node',
        modelNamespace: 'serverV2node',
        Editor: V2NodeEditor,
    },
    {
        type: 'shadowsocks',
        filterLabel: 'Shadowsocks',
        menuLabel: 'Shadowsocks',
        modelNamespace: 'serverShadowsocks',
        Editor: ShadowsocksEditor,
    },
    {
        type: 'vmess',
        filterLabel: 'Vmess',
        menuLabel: 'VMess',
        modelNamespace: 'serverVmess',
        Editor: VmessEditor,
    },
    {
        type: 'trojan',
        filterLabel: 'Trojan',
        menuLabel: 'Trojan',
        modelNamespace: 'serverTrojan',
        Editor: TrojanEditor,
    },
    {
        type: 'hysteria',
        filterLabel: 'Hysteria',
        menuLabel: 'Hysteria',
        modelNamespace: 'serverHysteria',
        Editor: HysteriaEditor,
    },
    {
        type: 'tuic',
        filterLabel: 'Tuic',
        menuLabel: 'Tuic',
        modelNamespace: 'serverTuic',
        Editor: TuicEditor,
    },
    {
        type: 'vless',
        filterLabel: 'Vless',
        menuLabel: 'VLess',
        modelNamespace: 'serverVless',
        Editor: VlessEditor,
    },
    {
        type: 'anytls',
        filterLabel: 'AnyTLS',
        menuLabel: 'AnyTLS',
        modelNamespace: 'serverAnyTLS',
        Editor: AnyTlsEditor,
    },
];

const SERVER_EDITOR_BY_TYPE = new Map(
    SERVER_EDITOR_DEFINITIONS.map((definition) => [definition.type, definition]),
);

export const SERVER_TYPE_FILTERS = SERVER_EDITOR_DEFINITIONS.map(({ type, filterLabel }) => ({
    text: filterLabel,
    value: type,
}));

export function serverModelNamespace(
    type: ServerRecord['type'],
): ServerProtocolModelNamespace | undefined {
    return type ? SERVER_EDITOR_BY_TYPE.get(type)?.modelNamespace : undefined;
}

export function renderServerEditor(
    server: ServerRecord | undefined,
    trigger: React.ReactElement,
    key: React.Key = server?.id || 'new',
): React.ReactElement | null {
    if (!server?.type) return null;
    const definition = SERVER_EDITOR_BY_TYPE.get(server.type);
    if (!definition) return null;
    const { Editor } = definition;
    return (
        <Editor key={key} record={server}>
            {trigger}
        </Editor>
    );
}

export function createNewServerMenu(): React.ReactElement {
    return (
        <Menu>
            {SERVER_EDITOR_DEFINITIONS.map(({ type, menuLabel, Editor }) => (
                <Menu.Item key={type}>
                    <Editor>
                        <a>{renderServerTypeTag(type, menuLabel)}</a>
                    </Editor>
                </Menu.Item>
            ))}
        </Menu>
    );
}
