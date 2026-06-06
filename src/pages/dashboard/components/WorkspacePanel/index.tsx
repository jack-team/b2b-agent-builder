import type { FC } from 'react';
import { useSafeState } from 'ahooks';
import { useMemoizedFn } from 'ahooks';
import cls from 'classnames';
import { Button, Empty, Input, Space, Tabs } from 'antd';
import {
  FilterOutlined,
  SortAscendingOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { workspaceItems } from '../../mockData';
import type { WorkspaceItemType } from '../../types';
import WorkspaceCard from '../WorkspaceCard';
import styles from './styles.module.less';

type TabKey = WorkspaceItemType;

const tabTypeMap: Record<TabKey, WorkspaceItemType> = {
  orchestration: 'orchestration',
  agent: 'agent',
  capability: 'capability',
};

const newButtonKeyMap: Record<TabKey, string> = {
  orchestration: 'dashboardPage.newOrchestration',
  agent: 'dashboardPage.newAgent',
  capability: 'dashboardPage.newCapability',
};

const WorkspacePanel: FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useSafeState<TabKey>('orchestration');
  const [keyword, setKeyword] = useSafeState('');

  const getFilteredItems = useMemoizedFn((tabKey: TabKey) => {
    const type = tabTypeMap[tabKey];
    const normalizedKeyword = keyword.trim().toLowerCase();

    return workspaceItems.filter(item => {
      if (item.type !== type) {
        return false;
      }

      if (!normalizedKeyword) {
        return true;
      }

      return (
        item.title.toLowerCase().includes(normalizedKeyword) ||
        item.description.toLowerCase().includes(normalizedKeyword)
      );
    });
  });

  const handleSearch = useMemoizedFn((value: string) => {
    setKeyword(value);
  });

  const renderToolbar = (tabKey: TabKey) => (
    <div className={styles.toolbar}>
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder={t('dashboardPage.searchPlaceholder')}
        className={styles.searchInput}
        onChange={event => handleSearch(event.target.value)}
      />
      <Space size={8} wrap>
        <Button icon={<FilterOutlined />}>{t('dashboardPage.filter')}</Button>
        <Button icon={<SortAscendingOutlined />}>{t('dashboardPage.sort')}</Button>
        <Button type="primary" icon={<PlusOutlined />}>
          {t(newButtonKeyMap[tabKey])}
        </Button>
      </Space>
    </div>
  );

  const renderList = (tabKey: TabKey) => {
    const items = getFilteredItems(tabKey);

    return (
      <div className={styles.list}>
        {items.length > 0 ? (
          items.map(item => <WorkspaceCard key={item.key} item={item} />)
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t('dashboardPage.noResults')}
          />
        )}
      </div>
    );
  };

  const tabItems = (Object.keys(tabTypeMap) as TabKey[]).map(tabKey => ({
    key: tabKey,
    label: t(`dashboardPage.tabs.${tabKey}`),
    children: (
      <div className={styles.tabContent}>
        {renderToolbar(tabKey)}
        {renderList(tabKey)}
      </div>
    ),
  }));

  return (
    <div className={cls(styles.panel, 'card-tabs')}>
      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={key => setActiveTab(key as TabKey)}
      />
    </div>
  );
};

export default WorkspacePanel;
