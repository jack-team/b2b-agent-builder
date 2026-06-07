import type { ComponentType } from 'react';

export type PageLoader = () => Promise<{ default: ComponentType }>;

export type AppPageConfig = {
  path: string;
  load: PageLoader;
};