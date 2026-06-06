import type { UploadFile } from 'antd';

export type OrchestrationType =
  | 'internet_ecommerce'
  | 'manufacturing'
  | 'finance'
  | 'healthcare';

export interface OrchestrationConstraintItem {
  value: string;
}

export interface OrchestrationBasicInfoFormValues {
  name: string;
  type: OrchestrationType;
  status: boolean;
  avatar?: UploadFile[];
  description: string;
  constraints: OrchestrationConstraintItem[];
}

export interface OrchestrationBasicInfoRecord {
  name: string;
  description: string;
  status: 'enabled' | 'disabled';
  type?: OrchestrationType;
  constraints?: OrchestrationConstraintItem[];
}

export interface OrchestrationBasicInfoProps {
  onClose?: () => void;
  onNext?: (values: OrchestrationBasicInfoFormValues) => void;
  record?: OrchestrationBasicInfoRecord;
}
