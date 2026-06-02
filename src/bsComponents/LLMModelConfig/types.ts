export interface LLMModel {
  key: string;
  modelName: string;
  modelId: string;
  apiUrl: string;
  status: string;
}

export interface LLMModelFormValues {
  modelName: string;
  modelId: string;
  apiProtocol: string;
  status?: boolean;
  apiUrl: string;
  apiKey: string;
  secret?: string;
  headers?: Array<{ key?: string; value?: string }>;
  timeout: number;
  maxContext: number;
  temperature: number;
  maxOutput: number;
  topP: number;
  stopSequences?: string;
}

export interface LLMModelConfigRecord {
  modelName: string;
  modelId: string;
  apiUrl: string;
  status: string;
}

export interface LLMModelConfigProps {
  onClose?: () => void;
  record?: LLMModelConfigRecord;
}
