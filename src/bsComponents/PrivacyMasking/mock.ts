import type {
  AuditLogRecord,
  DataTypeRecord,
  MaskingRuleRecord,
  MaskingTemplateRecord,
} from './types';

export const mockDataTypes: DataTypeRecord[] = [
  {
    key: '1',
    name: 'ID Number',
    description: 'National identity document number',
    category: 'identity',
    riskLevel: 'critical',
    regexPattern: '^[A-Z]{1,2}\\d{6,9}$',
    enabled: true,
  },
  {
    key: '2',
    name: 'Phone Number',
    description: 'Mobile or landline phone number',
    category: 'personal',
    riskLevel: 'high',
    regexPattern: '^\\+?\\d{10,15}$',
    enabled: true,
  },
  {
    key: '3',
    name: 'Address',
    description: 'Physical residential or mailing address',
    category: 'location',
    riskLevel: 'medium',
    regexPattern: '^[\\w\\s,.-]{5,200}$',
    enabled: true,
  },
];

export const mockMaskingRules: MaskingRuleRecord[] = [
  {
    key: '1',
    name: 'ID Card Number Recognition',
    dataType: 'ID Number',
    detectionMethods: ['regex'],
    handlingStrategy: 'generalizedRetentionVector',
    riskLevel: 'critical',
    enabled: true,
  },
  {
    key: '2',
    name: 'Phone Number Auto-Masking',
    dataType: 'Phone Number',
    detectionMethods: ['llm'],
    handlingStrategy: 'completeBlock',
    riskLevel: 'high',
    enabled: true,
  },
  {
    key: '3',
    name: 'Address Partial Masking',
    dataType: 'Address',
    detectionMethods: ['ner'],
    handlingStrategy: 'hashStorage',
    riskLevel: 'medium',
    enabled: true,
  },
];

export const mockMaskingTemplates: MaskingTemplateRecord[] = [
  {
    key: '1',
    name: 'Mobile Number Template',
    description:
      'Pre-configured template for detecting and masking mobile phone numbers using regex patterns with partial masking strategy.',
    method: 'regex',
    strategy: 'partialMasking',
    usedCount: 156,
  },
  {
    key: '2',
    name: 'ID Card Template',
    description:
      'Template for national ID card recognition using NER with generalized retention vector strategy.',
    method: 'ner',
    strategy: 'generalizedRetention',
    usedCount: 89,
  },
  {
    key: '3',
    name: 'Bank Card Template',
    description:
      'Bank card number detection using Luhn algorithm validation with hash storage strategy.',
    method: 'luhn',
    strategy: 'hashStorage',
    usedCount: 42,
  },
];

export const mockAuditLogs: AuditLogRecord[] = [
  {
    key: '1',
    time: '2026-04-27 21:30:15',
    operationType: 'create',
    operator: 'Admin',
    targetRule: 'Phone Number Auto-Masking',
    details: 'Created new masking rule',
  },
  {
    key: '2',
    time: '2026-04-27 20:15:42',
    operationType: 'modify',
    operator: 'Oliver Brown',
    targetRule: 'ID Card Number Recognition',
    details: 'Modified recognition method: Added LLM',
  },
  {
    key: '3',
    time: '2026-04-27 18:45:30',
    operationType: 'import',
    operator: 'Admin',
    targetRule: 'Batch Import',
    details: 'Batch import: 5 succeeded, 1 failed',
  },
];
