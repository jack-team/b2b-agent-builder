import type { FC } from 'react';
import cls from 'classnames';
import type { FormListOperation } from 'antd';
import { CloseCircleOutlined } from '@/components/BaseIcons';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';
import RangeGroup from './rangeGroup';
import styles from './styles.module.less';

type StageItemProps = {
  index: number;
  count: number;
  actions: FormListOperation;
}

const StageItem: FC<StageItemProps> = (props) => {
  const { index, actions } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.stage_item}>
      <div
        className={styles.close_btn}
        onClick={() => actions.remove(index)}
      >
        <CloseCircleOutlined />
      </div>
      <div className={styles.flex_row}>
        <div className={cls(styles.label, styles.required)}>{t('userConfig.currentLevel')}</div>
        <div className={cls(styles.content, styles.top)}>
          <div className={styles.left_area}>
            <RangeGroup title="aaa" showLabel={false} />
          </div>
          <div className={styles.right_area} />
        </div>
      </div>
      <ProFormList
        name="levels"
        initialValue={[{}]}
        copyIconProps={false}
        creatorButtonProps={{ type: 'link' }}
      >
        {(_, index) => {
          return (
            <div className={styles.flex_row}>
              <ProForm.Item label={t('userConfig.level')} required>
                <div className={cls(styles.label, styles.level)}>{index + 1}</div>
              </ProForm.Item>
              <div className={cls(styles.content)}>
                <div className={styles.left_area}>
                  <RangeGroup title="aaa" showLabel={!index} />
                </div>
                <div className={styles.right_area}>
                  <ProFormText required name="fee" label={t('userConfig.fee')} />
                </div>
              </div>
            </div>
          );
        }}
      </ProFormList>
    </div>
  );
};

export default StageItem;