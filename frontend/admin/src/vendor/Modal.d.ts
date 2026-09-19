import type React from 'react';

export interface ModalInfoOptions {
  title: string;
  content: React.ReactNode;
  centered?: boolean;
  okText?: string;
  onOk?: () => void;
}

export const Modal: {
  info(options: ModalInfoOptions): unknown;
};

export default Modal;
