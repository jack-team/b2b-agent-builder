import { type FC, Fragment } from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import Spinner from '@/components/Spinner';
import StyledVariables from '@/components/StyledVariables';
import { useAntdLocale } from '@/hooks/useAntdLocale';
import { useThemeStore } from '@/store/theme';
import { AppRouter } from '@/router';
import '@/App.less';

const App: FC = () => {
  const appTheme = useThemeStore(s => s.appTheme);
  const antdTheme = useThemeStore(s => s.antdTheme);
  const antdLocale = useAntdLocale();

  return (
    <Fragment>
      <StyledVariables variables={appTheme} />
      <ConfigProvider
        theme={antdTheme}
        locale={antdLocale}
        button={{ loadingIcon: <Spinner /> }}
      >
        <AntApp className="h-[100vh]">
          <AppRouter />
        </AntApp>
      </ConfigProvider>
    </Fragment>
  );
};

export default App;
