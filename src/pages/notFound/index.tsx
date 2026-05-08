import type { FC } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
