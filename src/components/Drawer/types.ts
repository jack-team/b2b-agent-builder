import type { JSX } from 'react';
import type { DrawerProps } from 'antd';
import type EventEmitter from 'eventemitter3';

export type DrawerEventType = 'close' | 'afterOpen' | 'afterClose';

export type CustomDrawerSize = 'large' | 'medium' | 'small';

export type CustomDrawerProps = {
  trigger: JSX.Element;
  size?: CustomDrawerSize
} & Omit<DrawerProps, 'open' | 'mask' | 'size'>;

export type DrawerContextTypes = {
  isRoot?: boolean;
  emitter?: EventEmitter<DrawerEventType>;
};


export type DrawerContainerProps = {
  title?: string;
  loading?: boolean;
  extra?: JSX.Element;
  onClose?: () => void;
  onCloseBefore?: () => Promise<boolean>;
}
