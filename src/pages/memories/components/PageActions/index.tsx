import type { FC } from 'react';
import {
  ControlOutlined,
  EyeInvisibleOutlined,
  MergeCellsOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import Drawer from '@/components/Drawer';
import ConflictMemoryResolution from '@/bsComponents/ConflictMemoryResolution';
import MemoryLifecyclePolicy from '@/bsComponents/MemoryLifecyclePolicy';
import PermissionDomain from '@/bsComponents/PermissionDomain';
import PrivacyMasking from '@/bsComponents/PrivacyMasking';

const PageActions: FC = () => {
  const { t } = useTranslation();

  return (
    <Space size={16}>
      <Drawer
        size="large"
        trigger={(
          <Button type="primary" icon={<MergeCellsOutlined />}>
            {t('memoriesPage.conflictResolution')}
          </Button>
        )}
      >
        <ConflictMemoryResolution />
      </Drawer>
      <Drawer
        size="medium"
        trigger={(
          <Button type="primary" icon={<ControlOutlined />}>
            {t('memoriesPage.lifecyclePolicy')}
          </Button>
        )}
      >
        <MemoryLifecyclePolicy />
      </Drawer>
      <Drawer
        size="large"
        trigger={(
          <Button type="primary" icon={<UserSwitchOutlined />}>
            {t('memoriesPage.permissionDomain')}
          </Button>
        )}
      >
        <PermissionDomain />
      </Drawer>
      <Drawer
        size="medium"
        trigger={(
          <Button type="primary" icon={<EyeInvisibleOutlined />}>
            {t('memoriesPage.privacyMasking')}
          </Button>
        )}
      >
        <PrivacyMasking />
      </Drawer>
    </Space>
  );
};

export default PageActions;
