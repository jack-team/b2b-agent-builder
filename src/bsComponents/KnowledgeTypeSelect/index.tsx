import type { FC } from 'react';
import { Divider } from 'antd';
import { ProFormSelect } from '@ant-design/pro-components';
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
      <div className="px-[8px] py-[4px]">
        还没有知识库类型，
        <Drawer trigger={<a>点击添加</a>}>
          <KnowledgeTypeManager />
        </Drawer>
      </div>
    );
  }

  return (
    <ProFormSelect
      {...props}
      options={options}
      fieldProps={{
        notFoundContent: renderNewTypeBtn(),
        dropdownRender: (menu) => (
          <>
            {menu}
            {options.length && (
              <>
                <Divider className="my-[4px]" />
                {renderNewTypeBtn()}
              </>
            )}
          </>
        ),
      }}
    />
  )
}

export default KnowledgeTypeSelect;




