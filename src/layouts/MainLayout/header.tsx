import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Space } from 'antd';
import { QuestionCircleOutlined, BellOutlined } from '@/components/BaseIcons';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import type { MenuItem } from '@/configs/menus';
import { useBreadcrumb } from './hooks';
import styles from './styles.module.less';

const LayoutHeader: FC = () => {
  const { breadcrumbItems } = useBreadcrumb();

  return (
    <Layout.Header className="flex items-center justify-between border-b border-[var(--border-color-primary)]">
      <Breadcrumb
        items={breadcrumbItems}
        itemRender={item => {
          const e = item as MenuItem;
          if (e.disabled) return e.title;
          return <Link to={e.path!}>{e.title}</Link>;
        }}
      />
      <Space size={16}>
        <ThemeSwitcher className={styles.header_tool_btn} />
        <LanguageSwitcher className={styles.header_tool_btn} />
        <div className={styles.header_tool_btn}>
          <BellOutlined />
        </div>
        <div className={styles.header_tool_btn}>
          <QuestionCircleOutlined />
        </div>
      </Space>
    </Layout.Header>
  );
}

export default LayoutHeader;