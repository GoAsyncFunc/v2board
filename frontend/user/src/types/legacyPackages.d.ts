declare module 'qrcode.react' {
  import * as React from 'react';

  export interface QRCodeImageSettings {
    src: string;
    height: number;
    width: number;
    excavate?: boolean;
    x?: number;
    y?: number;
  }

  export interface QRCodeProps {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    bgColor?: string;
    fgColor?: string;
    includeMargin?: boolean;
    imageSettings?: QRCodeImageSettings;
    renderAs?: 'canvas' | 'svg';
  }

  export default class QRCode extends React.PureComponent<QRCodeProps> {}
}

declare module 'react-loadable' {
  import * as React from 'react';

  export interface LoadingComponentProps {
    error: Error | null;
    pastDelay: boolean;
    retry: () => void;
    timedOut: boolean;
  }

  export interface LoadableOptions<Props> {
    loader: () => Promise<{ default: React.ComponentType<Props> }>;
    loading: React.ComponentType<LoadingComponentProps>;
    delay?: number | false;
    timeout?: number;
    modules?: string[];
    webpack?: () => string[];
  }

  export type LoadableComponent<Props> = React.ComponentType<Props> & {
    preload: () => Promise<{ default: React.ComponentType<Props> }>;
  };

  export default function loadable<Props>(options: LoadableOptions<Props>): LoadableComponent<Props>;
}
