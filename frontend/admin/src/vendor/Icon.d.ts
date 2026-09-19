import type React from 'react';

export interface IconProps {
  type: string;
  [key: string]: unknown;
}

export const Icon: React.ComponentType<IconProps>;
export default Icon;
