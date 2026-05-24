import { type FC } from 'react';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { DrawerContainer } from '@/components/Drawer';

const KnowledgeTypeEdit: FC = () => {
  return (
    <DrawerContainer
      title="Knowledge type"
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
        >
          Save
        </Button>
      }
    >

    </DrawerContainer>
  )
}

export default KnowledgeTypeEdit;