import { type FC, type PropsWithChildren } from 'react';
import { Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

type TableActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void
}

const TableActions: FC<PropsWithChildren<TableActionsProps>> = (props) => {
  const { children, onDelete, onEdit } = props;

  return (
    <Space size={12}>
      {!!onEdit && (
        <Button
          size="small"
          color="default"
          variant="filled"
          onClick={onEdit}
        >
          <EditOutlined />
        </Button>
      )}
      {!!onDelete && (
        <Button
          size="small"
          color="danger"
          variant="filled"
          onClick={onDelete}
        >
          <DeleteOutlined />
        </Button>
      )}
      {children}
    </Space>
  )
}

export default TableActions;