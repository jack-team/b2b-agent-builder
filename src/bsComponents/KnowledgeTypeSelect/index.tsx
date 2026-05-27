import { Divider } from 'antd';
import { type FC, Fragment } from 'react';
import { ProFormCascader } from '@ant-design/pro-components';
import Drawer from '@/components/Drawer';
import KnowledgeTypeManager from '../KnowledgeTypeManager';
import type { KnowledgeTypeSelectProps } from './types';

const KnowledgeTypeSelect: FC<KnowledgeTypeSelectProps> = (props) => {

  const options = [
    {
      label: 'Text',
      value: 'text',
    },
    {
      label: 'Image',
      value: 'image',
    },
    {
      label: 'Video',
      value: 'video',
    },
  ];

  const renderNewTypeBtn = () => {
    return (
      <div className="py-[4px]">
        还没有知识库类型，
        <Drawer trigger={<a>点击添加</a>}>
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




