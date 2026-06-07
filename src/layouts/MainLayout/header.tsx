import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Space } from 'antd';
import { QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';
import { useBreadcrumb } from './hooks';
import styles from './styles.module.less';

const LayoutHeader: FC = () => {
  const { breadcrumbItems } = useBreadcrumb();

  return (
    <Layout.Header className="flex items-center justify-between border-b border-[var(--border-color-primary)]">
      <Breadcrumb
        items={breadcrumbItems}
        itemRender={(item) => <Link to={item.path}>{item.title}</Link>}
      />
      <Space size={16}>
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