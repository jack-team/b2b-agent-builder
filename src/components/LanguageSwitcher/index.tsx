import { type FC } from 'react';
import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { type MenuProps } from 'antd';
import Dropdown from '@/components/Dropdown';
import { GlobalOutlined } from '@/components/BaseIcons';

const LANGUAGE_OPTIONS = [
  { key: 'en', labelKey: 'english' },
  { key: 'ja', labelKey: 'japanese' },
  { key: 'zh-CN', labelKey: 'chinese' },
  { key: 'zh-TW', labelKey: 'chineseTraditional' },
] as const;

type LanguageSwitcherProps = {
  className?: string;
};

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = useMemoizedFn((language: string) => {
    void i18n.changeLanguage(language);
  });

  const menuItems: MenuProps['items'] = LANGUAGE_OPTIONS.map(e => ({
    key: e.key,
    label: t(e.labelKey),
    onClick: () => handleLanguageChange(e.key),
  }));

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      menu={{
        selectable: true,
        items: menuItems,
        selectedKeys: [i18n.language]
      }}
    >
      <div className={classNames(className)}>
        <GlobalOutlined />
      </div>
    </Dropdown>
  );
};

export default LanguageSwitcher;
