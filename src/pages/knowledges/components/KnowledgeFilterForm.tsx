import type { FC } from 'react';
import { Row, Col, Button, Space } from 'antd';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  type FormInstance
} from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';

type KnowledgeFilterFormProps = {
  form: FormInstance;
  onSearch?: (formData: Record<string, any>) => void;
}

const KnowledgeFilterForm: FC<KnowledgeFilterFormProps> = (props) => {
  const { form } = props;

  const onReset = useMemoizedFn(() => {
    form.resetFields();
    onSubmit();
  });

  const onSubmit = useMemoizedFn(() => {
    const formData = form.getFieldsValue();
    props.onSearch?.(formData);
  });

  return (
    <ProForm
      form={form}
      layout="vertical"
      submitter={false}
    >
      <Row gutter={16}>
        <Col span={6}>
          <ProFormSelect
            label="Matching method"
            name="matchingMethod"
            options={[
              { value: 'MATCH', label: 'MATCH' },
              { value: 'OPTIONAL_MATCH', label: 'OPTIONAL MATCH' },
              { value: 'MERGE', label: 'MERGE' },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormText label="Node name" name="nodeName" />
        </Col>
        <Col span={6}>
          <ProFormText label="Node label" name="nodeLabel" />
        </Col>
        <Col span={6}>
          <ProFormSelect
            label="Relation type"
            name="relationType"
            options={[
              { value: 'Has', label: 'Has' },
              { value: 'BelongsTo', label: 'BelongsTo' },
              { value: 'CreatedBy', label: 'CreatedBy' },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormText
            label="Related Node"
            name="relatedNode"
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            label="Return fields"
            name="returnFields"
            mode="multiple"
            options={[
              { value: 'name', label: 'name' },
              { value: 'phone', label: 'phone' },
              { value: 'address', label: 'address' },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            label="Match conditions"
            name="matchConditions"
            options={[
              { value: 'n.age > 18', label: 'n.age > 18' },
              { value: 'n.age >= 18', label: 'n.age >= 18' },
              { value: 'n.name =~ ".*John.*"', label: 'n.name =~ ".*John.*"' },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormText label="Max Records" name="maxRecords" />
        </Col>
      </Row>
      <Space size={12} className="mb-[16px]">
        <Button type="primary" size="small">
          Build query statement
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={onSubmit}
        >
          Query
        </Button>
        <Button
          type="default"
          size="small"
          onClick={onReset}
        >
          Reset
        </Button>
      </Space>
      <ProFormTextArea
        rows={5}
        readonly
        name="queryStatement"
        label="Query statement preview"
        initialValue="MATCH (m:User)-[r:Has]->(n) WHERE n.age > 18 RETURN * LIMIT 10"
        style={{ backgroundColor: '#fafafa' }}
      />
    </ProForm>
  );
};

export default KnowledgeFilterForm;
