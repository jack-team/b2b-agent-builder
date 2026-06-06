import type { FC } from 'react';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import type { RiskLevel } from './types';

const riskLevelColorMap: Record<RiskLevel, string> = {
  critical: 'error',
  high: 'warning',
  medium: 'gold',
};

interface RiskLevelTagProps {
  level: RiskLevel;
}

const RiskLevelTag: FC<RiskLevelTagProps> = ({ level }) => {
  const { t } = useTranslation();

  return (
    <Tag color={riskLevelColorMap[level]}>
      {t(`privacyMasking.riskLevel.${level}`)}
    </Tag>
  );
};

export default RiskLevelTag;
