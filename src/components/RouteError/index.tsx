import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMemoizedFn } from 'ahooks';
import styles from './styles.module.less';

const RouteError = () => {
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
        title="Oops, the server is down"
        subTitle="We apologize for the inconvenience You can take the following actions"
        extra={[
          <Button
            key="back"
            onClick={backHomePage}
          >
            Return to Home
          </Button>,
          <Button
            type="primary"
            key="refresh"
            onClick={refreshPage}
          >
           Refresh the page
          </Button>
        ]}
      />
    </div>
  );
};

export default RouteError;