import type React from 'react';

export interface UserEditorProps {
  userId?: string | number;
  children: React.ReactElement;
}

declare const UserEditor: React.ComponentType<UserEditorProps>;

export default UserEditor;
