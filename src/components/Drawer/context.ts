import { createContext } from 'react';
import type { DrawerContextTypes } from './types';

/** 连接 Drawer 与其 children，传递实例级 EventEmitter */
export const DrawerContext = createContext<DrawerContextTypes>({});
