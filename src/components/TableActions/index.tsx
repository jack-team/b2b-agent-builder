import { type FC, type PropsWithChildren } from 'react';
import { Space, Button, Tooltip } from 'antd';
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
        <Tooltip title="Edit">
          <Button
            size="small"
            color="default"
            variant="filled"
            onClick={onEdit}
          >
            <EditOutlined />
          </Button>
        </Tooltip>

      )}
      {!!onDelete && (
        <Tooltip title="Delete">
          <Button
            size="small"
            color="danger"
            variant="filled"
            onClick={onDelete}
          >
            <DeleteOutlined />
          </Button>
        </Tooltip>
      )}
      {children}
    </Space>
  );
}

export default TableActions;