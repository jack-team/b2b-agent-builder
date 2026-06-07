export type EnableStatus = 'enabled' | 'disabled';

export interface BaseRecord {
  key: string;
}

export const isEnableStatus = (value: string): value is EnableStatus =>
  value === 'enabled' || value === 'disabled';

export const toEnableStatus = (enabled: boolean): EnableStatus =>
  enabled ? 'enabled' : 'disabled';
