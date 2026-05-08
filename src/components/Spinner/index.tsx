import { type FC, useMemo } from 'react';
import classNames from 'classnames';
import Icon from '@ant-design/icons';
import { InfinitySpin, RotatingLines } from 'react-loader-spinner';
import type { SpinnerProps } from './types';
import SpinnerSvg from './spinner.svg?react';
import styles from './styles.module.less';

const Spinner: FC<SpinnerProps> = (props) => {
  const { className, type = 'spinner' } = props;

  const loader = useMemo(() => {
    switch (type) {
      case 'spinner': {
        return <Icon component={SpinnerSvg} />;
      }
      case 'infinity-spin': {
        return (
          <InfinitySpin
            color="currentColor"
            gradientType="radial"
          />
        );
      }
      case 'rotating-lines': {
        return <RotatingLines color="currentColor" />;
      }
    }
  }, [type]);

  return (
    <div className={classNames(styles[type], className)}>
      {loader}
    </div>
  );
};

export default Spinner;
