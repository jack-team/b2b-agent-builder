import type { FC } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { ProForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

const KnowledgeFilterForm: FC = () => {
  return (
    <ProForm
      layout="vertical"
      submitter={false}
    >
      <Row gutter={16}>
        <Col span={8}>
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
        <Col span={8}>
          <ProFormText label="Node name" name="nodeName" />
        </Col>
        <Col span={8}>
          <ProFormText label="Node label" name="nodeLabel" />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
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
        <Col span={8}>
          <ProFormText label="Related Node" name="relatedNode" />
        </Col>
        <Col span={8}>
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
      </Row>
      <Row gutter={16}>
        <Col span={8}>
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
        <Col span={8}>
          <ProFormText label="Max Records" name="maxRecords" />
        </Col>
      </Row>
      <Space size={12} className="mb-[16px]">
        <Button type="primary" size="small">
          Build query statement
        </Button>
        <Button type="primary" size="small">
          Query
        </Button>
        <Button type="default" size="small">
          Reset
        </Button>
      </Space>
      <ProFormTextArea
        rows={5}
        name="queryStatement"
        label="Query statement preview"
        initialValue="MATCH (m:User)-[r:Has]->(n) WHERE n.age > 18 RETURN * LIMIT 10"
        style={{ backgroundColor: '#fafafa' }}
      />
    </ProForm>
  );
};

export default KnowledgeFilterForm;
