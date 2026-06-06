import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.less';

const RouteError = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const refreshPage = useMemoizedFn(() => {
    location.reload();
  })

  const backHomePage = useMemoizedFn(() => {
    navigate('/', { replace: true });
  });

  return (
    <div className={styles.error_page}>
      <Result
        status="500"
        title={t('routeError.title')}
        subTitle={t('routeError.subtitle')}
        extra={[
          <Button
            key="back"
            onClick={backHomePage}
          >
            {t('routeError.returnToHome')}
          </Button>,
          <Button
            type="primary"
            key="refresh"
            onClick={refreshPage}
          >
            {t('routeError.refreshPage')}
          </Button>
        ]}
      />
    </div>
  );
};

export default RouteError;
