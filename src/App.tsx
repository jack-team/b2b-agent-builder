import { type FC, Fragment } from 'react';
import en_US from 'antd/es/locale/en_US';
import { ConfigProvider, App as AntApp } from 'antd';
import StyledVariables from './components/StyledVariables';
import { useThemeStore } from '@/store/theme';
import { AppRouter } from './routes';
import './App.less';

const App: FC = () => {
  const appTheme = useThemeStore(s => s.appTheme);
  const antdTheme = useThemeStore(s => s.antdTheme);

  return (
    <Fragment>
      <StyledVariables variables={appTheme} />
      <ConfigProvider theme={antdTheme} locale={en_US}>
        <AntApp className="h-full">
          <AppRouter />
        </AntApp>
      </ConfigProvider>
    </Fragment>
  );
};

export default App;
