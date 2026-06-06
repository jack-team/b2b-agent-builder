import type { FC } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
            label={t('knowledgesPage.filter.matchingMethod')}
            name="matchingMethod"
            options={[
              { value: 'MATCH', label: 'MATCH' },
              { value: 'OPTIONAL_MATCH', label: 'OPTIONAL MATCH' },
              { value: 'MERGE', label: 'MERGE' },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormText label={t('knowledgesPage.filter.nodeName')} name="nodeName" />
        </Col>
        <Col span={6}>
          <ProFormText label={t('knowledgesPage.filter.nodeLabel')} name="nodeLabel" />
        </Col>
        <Col span={6}>
          <ProFormSelect
            label={t('knowledgesPage.filter.relationType')}
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
            label={t('knowledgesPage.filter.relatedNode')}
            name="relatedNode"
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            label={t('knowledgesPage.filter.returnFields')}
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
            label={t('knowledgesPage.filter.matchConditions')}
            name="matchConditions"
            options={[
              { value: 'n.age > 18', label: 'n.age > 18' },
              { value: 'n.age >= 18', label: 'n.age >= 18' },
              { value: 'n.name =~ ".*John.*"', label: 'n.name =~ ".*John.*"' },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormText label={t('knowledgesPage.filter.maxRecords')} name="maxRecords" />
        </Col>
      </Row>
      <Space size={12} className="mb-[16px]">
        <Button type="primary" size="small">
          {t('knowledgesPage.filter.buildQuery')}
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={onSubmit}
        >
          {t('common.query')}
        </Button>
        <Button
          type="default"
          size="small"
          onClick={onReset}
        >
          {t('common.reset')}
        </Button>
      </Space>
      <ProFormTextArea
        rows={5}
        readonly
        name="queryStatement"
        label={t('knowledgesPage.filter.queryPreview')}
        initialValue="MATCH (m:User)-[r:Has]->(n) WHERE n.age > 18 RETURN * LIMIT 10"
        style={{ backgroundColor: 'var(--bg-color-primary)' }}
      />
    </ProForm>
  );
};

export default KnowledgeFilterForm;
