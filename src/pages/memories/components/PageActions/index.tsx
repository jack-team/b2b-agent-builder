import type { FC } from 'react';
import { lazy } from 'react';
import {
  ControlOutlined,
  EyeInvisibleOutlined,
  MergeCellsOutlined,
  UserSwitchOutlined,
} from '@/components/BaseIcons';
import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import Drawer from '@/components/Drawer';
import LazyDrawerContent from '@/components/LazyDrawerContent';

const ConflictMemoryResolution = lazy(() => import('@/bsComponents/ConflictMemoryResolution'));
const MemoryLifecyclePolicy = lazy(() => import('@/bsComponents/MemoryLifecyclePolicy'));
const PermissionDomain = lazy(() => import('@/bsComponents/PermissionDomain'));
const PrivacyMasking = lazy(() => import('@/bsComponents/PrivacyMasking'));

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
        <LazyDrawerContent>
          <ConflictMemoryResolution />
        </LazyDrawerContent>
      </Drawer>
      <Drawer
        size="medium"
        trigger={(
          <Button type="primary" icon={<ControlOutlined />}>
            {t('memoriesPage.lifecyclePolicy')}
          </Button>
        )}
      >
        <LazyDrawerContent>
          <MemoryLifecyclePolicy />
        </LazyDrawerContent>
      </Drawer>
      <Drawer
        size="large"
        trigger={(
          <Button type="primary" icon={<UserSwitchOutlined />}>
            {t('memoriesPage.permissionDomain')}
          </Button>
        )}
      >
        <LazyDrawerContent>
          <PermissionDomain />
        </LazyDrawerContent>
      </Drawer>
      <Drawer
        size="large"
        trigger={(
          <Button type="primary" icon={<EyeInvisibleOutlined />}>
            {t('memoriesPage.privacyMasking')}
          </Button>
        )}
      >
        <LazyDrawerContent>
          <PrivacyMasking />
        </LazyDrawerContent>
      </Drawer>
    </Space>
  );
};

export default PageActions;
