import type React from 'react';

export interface MainLayoutProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: unknown;
}

declare const MainLayout: React.ComponentType<MainLayoutProps>;

export default MainLayout;
