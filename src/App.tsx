import { type FC, Fragment } from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import Spinner from '@/components/Spinner';
import Suspense from '@/components/Suspense';
import StyledVariables from '@/components/StyledVariables';
import { useAntdLocale } from '@/hooks/useAntdLocale';
import { useThemeStore } from '@/store/theme';
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
}

const App: FC = () => {
  const appTheme = useThemeStore(s => s.appTheme);

  return (
    <Fragment>
      <StyledVariables variables={appTheme} />
      <Suspense>
        <AppContent />
      </Suspense>
    </Fragment>
  );
};

export default App;
