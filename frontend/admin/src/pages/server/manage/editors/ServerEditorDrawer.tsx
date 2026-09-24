import Drawer from 'antd/lib/drawer';

export interface ServerEditorDrawerProps extends React.ComponentProps<typeof Drawer> {
    id?: string;
}

export default Drawer as React.ComponentType<ServerEditorDrawerProps>;
