import { type FC } from 'react';
import classNames from 'classnames';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { MoonFilled, SunOutlined } from '@/components/BaseIcons';
import { useThemeStore } from '@/store/theme';

const icons = {
  light: SunOutlined,
  dark: MoonFilled,
}

type ThemeSwitcherProps = {
  className?: string;
};

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { t } = useTranslation();
  const mode = useThemeStore(s => s.mode);
  const setMode = useThemeStore(s => s.setMode);

  const toggleTheme = useMemoizedFn(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  });

  const ActiveIcon = icons[mode];

  return (
    <div
      className={classNames(className)}
      aria-label={t('theme.switch')}
      onClick={toggleTheme}
    >
      <ActiveIcon />
    </div>
  );
};

export default ThemeSwitcher;
