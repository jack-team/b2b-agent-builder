import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { Space, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

type TableActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  showEdit?: boolean;
  showDel?: boolean;
  renderEditBtn?: (btn: ReactElement) => ReactElement;
  renderDelBtn?: (btn: ReactElement) => ReactElement;
}

const TableActions: FC<PropsWithChildren<TableActionsProps>> = (props) => {
  const { t } = useTranslation();
  const {
    children,
    showEdit = true,
    showDel = true,
    renderEditBtn,
    renderDelBtn
  } = props;

  const editBtn = (
    <Tooltip title={t('common.edit')}>
      <Button
        size="small"
        color="default"
        variant="filled"
        onClick={props.onEdit}
      >
        <EditOutlined />
      </Button>
    </Tooltip>
  );

  const delBtn = (
    <Tooltip title={t('common.delete')}>
      <Button
        size="small"
        color="danger"
        variant="filled"
        onClick={props.onDelete}
      >
        <DeleteOutlined />
      </Button>
    </Tooltip>
  );

  return (
    <Space size={12}>
      {showEdit && renderEditBtn?.(editBtn) || editBtn}
      {showDel && renderDelBtn?.(delBtn) || delBtn}
      {children}
    </Space>
  );
}

export default TableActions;
