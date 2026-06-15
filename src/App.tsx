import { type FC, useLayoutEffect, Fragment } from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import Spinner from '@/components/Spinner';
import Suspense from '@/components/Suspense';
import ThemeStyles from '@/components/ThemeStyles';
import { useAntdLocale } from '@/hooks/useAntdLocale';
import { useThemeStore } from '@/store/theme';
import { applyThemeToDom } from '@/theme/applyThemeToDom';
import { AppRouter } from '@/router';
import '@/App.less';

const AppContent = () => {
  const antdLocale = useAntdLocale();
  const antdTheme = useThemeStore(s => s.antdTheme);

  return (
    <ConfigProvider
      theme={antdTheme}
      locale={antdLocale}
      button={{ loadingIcon: <Spinner /> }}
    >
      <AntApp className="h-[100vh]">
        <AppRouter />
      </AntApp>
    </ConfigProvider>
  );
};

const App: FC = () => {
  const mode = useThemeStore(s => s.mode);

  // 同步 body 等节点（head 内联脚本仅设置了 documentElement）
  useLayoutEffect(() => {
    applyThemeToDom(mode);
  }, [mode]);

  return (
    <Fragment>
      <ThemeStyles />
      <Suspense>
        <AppContent />
      </Suspense>
    </Fragment>
  );
};

export default App;
