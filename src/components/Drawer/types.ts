import type { JSX } from 'react';
import type { DrawerProps } from 'antd';
import type EventEmitter from 'eventemitter3';

/** Drawer 内部事件：close 由子组件触发，afterOpen/afterClose 在动画结束后触发 */
export type DrawerEventType = 'close' | 'afterOpen' | 'afterClose';

/** 预设宽度，对应 styles.module.less 中的 CSS 变量 */
export type CustomDrawerSize = 'large' | 'medium' | 'small' | 'full';

export type CustomDrawerProps = {
  /** 点击后打开 Drawer 的触发元素 */
  trigger: JSX.Element;
  size?: CustomDrawerSize;
} & Omit<DrawerProps, 'open' | 'mask' | 'size'>;

export type DrawerContextTypes = {
  emitter?: EventEmitter<DrawerEventType>;
};

export type DrawerContainerProps = {
  title?: string;
  loading?: boolean;
  extra?: JSX.Element;
  /** 关闭确认通过后的回调（如重置表单、通知父组件） */
  onClose?: () => void;
  /** 关闭前拦截，返回 false 阻止关闭（如未保存提示） */
  onCloseBefore?: () => Promise<boolean>;
};
