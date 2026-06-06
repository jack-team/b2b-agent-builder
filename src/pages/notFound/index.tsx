import type { FC } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle={t('pageNotFoundDesc')}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {t('backToHome')}
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
