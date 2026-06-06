import { Divider } from 'antd';
import { type FC, Fragment, useMemo } from 'react';
import { ProFormCascader } from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';
import Drawer from '@/components/Drawer';
import KnowledgeTypeManager from '../KnowledgeTypeManager';
import type { KnowledgeTypeSelectProps } from './types';

const mediaTypeValues = ['text', 'image', 'video'] as const;

const KnowledgeTypeSelect: FC<KnowledgeTypeSelectProps> = (props) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => mediaTypeValues.map((value) => ({
      label: t(`knowledgesPage.mediaTypes.${value}`),
      value,
    })),
    [t],
  );

  const renderNewTypeBtn = () => {
    return (
      <div className="py-[4px]">
        {t('knowledgeType.noTypeYet')}
        <Drawer trigger={<a>{t('knowledgeType.clickToAdd')}</a>}>
          <KnowledgeTypeManager />
        </Drawer>
      </div>
    );
  }

  return (
    <ProFormCascader
      {...props}
      fieldProps={{
        options: options,
        notFoundContent: renderNewTypeBtn(),
        popupRender: (menu) => (
          <Fragment>
            {menu}
            {options.length > 0 && (
              <Fragment>
                <Divider className="m-[0px]!" />
                <div className="py-[6px] px-[12px]">
                  {renderNewTypeBtn()}
                </div>
              </Fragment>
            )}
          </Fragment>
        )
      }}
    />
  )
}

export default KnowledgeTypeSelect;


