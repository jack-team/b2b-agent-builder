export type RiskLevel = 'critical' | 'high' | 'medium';

export type DataTypeCategory = 'identity' | 'personal' | 'location';

export type DetectionMethod = 'regex' | 'llm' | 'ner' | 'luhn';

export type OperationType = 'create' | 'modify' | 'import';

export interface PrivacyMaskingProps {
  onClose?: () => void;
}

export interface DataTypeRecord {
  key: string;
  name: string;
  description: string;
  category: DataTypeCategory;
  riskLevel: RiskLevel;
  regexPattern: string;
  enabled: boolean;
}

export interface MaskingRuleRecord {
  key: string;
  name: string;
  dataType: string;
  detectionMethods: DetectionMethod[];
  handlingStrategy: string;
  riskLevel: RiskLevel;
  enabled: boolean;
}

export interface MaskingTemplateRecord {
  key: string;
  name: string;
  description: string;
  method: DetectionMethod;
  strategy: string;
  usedCount: number;
}

export interface AuditLogRecord {
  key: string;
  time: string;
  operationType: OperationType;
  operator: string;
  targetRule: string;
  details: string;
}
