export type DecayCurveType = 'ebbinghaus_standard';

export type MemoryHalfLifeUnit = 'days' | 'hours' | 'weeks';

export type ArchiveTriggerUnit = 'days_of_inactivity';

export type MergeTriggerCondition = 'same_type_dormant_gt_30';

export type MergeStrategy = 'semantic_similarity';

export interface MemoryLifecyclePolicyFormValues {
  decayCurveType: DecayCurveType;
  memoryHalfLife: number;
  memoryHalfLifeUnit: MemoryHalfLifeUnit;
  dormantThreshold: number;
  archiveTriggerValue: number;
  archiveTriggerUnit: ArchiveTriggerUnit;
  mergeTriggerCondition: MergeTriggerCondition;
  offlineMergeEnabled: boolean;
  mergeStrategy: MergeStrategy;
}

export interface MemoryLifecyclePolicyProps {
  onClose?: () => void;
  record?: Partial<MemoryLifecyclePolicyFormValues>;
}
