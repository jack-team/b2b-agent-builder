import { type FC, useMemo, Fragment } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, type FormItemProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { ProFormText, ProFormList } from '@ant-design/pro-components';

type RemoteFormItemProps = Required<Pick<FormItemProps, 'name'>> & {

}

const RemoteFormItem: FC<RemoteFormItemProps> = (props) => {
  const { t } = useTranslation();
  const { name } = props;

  const parentName = useMemo(() => {
    if (!Array.isArray(name)) return [name];
    return name;
  }, [name]);

  return (
    <Fragment>
      <ProFormText
        label={t('remoteForm.url')}
        name={[...parentName, 'url']}
        rules={[{ required: true }]}
      />
      <ProFormList
        label={t('remoteForm.headers')}
        initialValue={[{}]}
        name={[...parentName, 'headers']}
        creatorButtonProps={{
          type: 'link',
          icon: <PlusOutlined />,
          creatorButtonText: t('remoteForm.addNewHeader'),
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <ProFormText
              name="key"
              label={t('remoteForm.key')}
              rules={[{ required: true }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="value"
              label={t('remoteForm.value')}
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </ProFormList>
    </Fragment>
  )
}

export default RemoteFormItem;
