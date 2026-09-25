import React from 'react';
import Drawer from 'antd/lib/drawer';

export interface ServerEditorDrawerProps extends React.ComponentProps<typeof Drawer> {
    id?: string;
}

export default function ServerEditorDrawer(props: ServerEditorDrawerProps): React.ReactElement {
    return <Drawer {...props} />;
}
