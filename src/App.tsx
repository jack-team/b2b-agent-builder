import { ConfigProvider } from 'antd';
import { AppRouter } from './routes';
import { useThemeStore } from '@/store/theme';
import './App.less';

const App = () => {
  const antdTheme = useThemeStore(s => s.antdTheme);
  return (
    <ConfigProvider theme={antdTheme}>
      <AppRouter />
    </ConfigProvider>
  );
};

export default App;
