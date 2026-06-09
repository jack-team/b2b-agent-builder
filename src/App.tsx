import { type FC, useEffect, Fragment } from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import Spinner from '@/components/Spinner';
import Suspense from '@/components/Suspense';
import StyledVariables from '@/components/StyledVariables';
import { useAntdLocale } from '@/hooks/useAntdLocale';
import { useThemeStore } from '@/store/theme';
import { AppRouter } from '@/router';
import '@/App.less';

const $doc = document.documentElement;
const $body = document.body;

const AppContent = () => {
  const antdLocale = useAntdLocale();
  // Ant Design 组件主题，随 store 中的 mode 变化而更新
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
  const appTheme = useThemeStore(s => s.appTheme);

  // 同步到 DOM，供 CSS [data-theme] 选择器与浏览器原生控件（滚动条等）使用
  useEffect(() => {
    $doc.style.colorScheme = mode;
    $doc.setAttribute('data-theme', mode);
    $body.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <Fragment>
      {/* 将 appTheme 注入为 :root CSS 变量，供 Less/Tailwind 引用 */}
      <StyledVariables variables={appTheme} />
      <Suspense>
        <AppContent />
      </Suspense>
    </Fragment>
  );
};

export default App;
