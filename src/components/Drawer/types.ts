import type { JSX } from 'react';
import type { DrawerProps } from 'antd';
import type EventEmitter from 'eventemitter3';

export type DrawerEventType = 'close' | 'afterOpen' | 'afterClose';

export type CustomDrawerProps = {
  trigger: JSX.Element;
} & Omit<DrawerProps, 'open' | 'mask'>;

export type DrawerContextTypes = {
  isRoot?: boolean;
  emitter?: EventEmitter<DrawerEventType>;
};


export type DrawerContainerProps = {
  title?: string;
  extra?: JSX.Element;
  onClose?: () => void;
  onCloseBefore?: () => Promise<boolean>;
}
