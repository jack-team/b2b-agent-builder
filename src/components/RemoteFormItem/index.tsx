import { type FC, useMemo, Fragment } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, type FormItemProps } from 'antd';
import { ProFormText, ProFormList } from '@ant-design/pro-components';

type RemoteFormItemProps = Required<Pick<FormItemProps, 'name'>> & {

}

const RemoteFormItem: FC<RemoteFormItemProps> = (props) => {
  const { name } = props;

  const parentName = useMemo(() => {
    if (!Array.isArray(name)) return [name];
    return name;
  }, [name]);

  return (
    <Fragment>
      <ProFormText name={[...parentName, 'url']} label="URL" />
      <ProFormList
        label="Headers"
        initialValue={[{}]}
        name={[...parentName, 'headers']}

        creatorButtonProps={{
          type: 'link',
          icon: <PlusOutlined />,
          creatorButtonText: 'Add new header',
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <ProFormText name="key" placeholder="Key" />
          </Col>
          <Col span={12}>
            <ProFormText name="value" placeholder="Value" />
          </Col>
        </Row>
      </ProFormList>
    </Fragment>
  )
}

export default RemoteFormItem;