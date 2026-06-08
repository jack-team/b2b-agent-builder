import { type FC } from 'react';
import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { type MenuProps } from 'antd';
import { MoonOutlined, SunOutlined } from '@/components/BaseIcons';
import Dropdown from '@/components/Dropdown';
import { useThemeStore } from '@/store/theme';
import type { ThemeMode } from '@/theme';

/** 可选主题列表：浅色（太阳）/ 深色（月亮） */
const THEME_OPTIONS = [
  { key: 'light', labelKey: 'theme.light', icon: SunOutlined },
  { key: 'dark', labelKey: 'theme.dark', icon: MoonOutlined },
] as const;

type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { t } = useTranslation();
  const mode = useThemeStore(s => s.mode);
  const setMode = useThemeStore(s => s.setMode);

  const handleThemeChange = useMemoizedFn((themeMode: string) => {
    setMode(themeMode as ThemeMode);
  });

  const menuItems: MenuProps['items'] = THEME_OPTIONS.map(option => ({
    key: option.key,
    label: t(option.labelKey),
    icon: <option.icon />,
    onClick: () => handleThemeChange(option.key),
  }));

  // 按钮图标随当前模式切换，便于用户识别当前主题
  const ActiveIcon = THEME_OPTIONS.find(option => option.key === mode)?.icon ?? SunOutlined;

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      menu={{
        selectable: true,
        items: menuItems,
        selectedKeys: [mode],
      }}
    >
      <div className={classNames(className)} aria-label={t('theme.switch')}>
        <ActiveIcon />
      </div>
    </Dropdown>
  );
};

export default ThemeSwitcher;
