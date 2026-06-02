export interface AssociatedAgent {
  key: string;
  agentName: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface LLMAgentsProps {
  modelName?: string;
  onClose?: () => void;
}
