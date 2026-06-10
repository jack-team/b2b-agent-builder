import type { FC } from 'react';
import { useMemo } from 'react';
import { Button, Space, Row, Col } from 'antd';
import { UndoOutlined, SaveOutlined } from '@/components/BaseIcons';
import { useTranslation } from 'react-i18next';
import {
  ProForm,
  ProCard,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormSlider,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormDependency,
  type FormInstance
} from '@ant-design/pro-components';

import TagsInput from '@/components/TagsInput';
import { DrawerContainer } from '@/components/Drawer';
import KnowledgeTypeSelect from '@/bsComponents/KnowledgeTypeSelect';
import RemoteFormItem from '@/components/RemoteFormItem';
import { AdditionMethod } from './enum';

type UpdateKnowledgeProps = {
  form?: FormInstance
}

const UpdateKnowledge: FC<UpdateKnowledgeProps> = (props) => {
  const { t } = useTranslation();

  const additionMethodValueEnum = useMemo(() => ({
    [AdditionMethod.Manual]: t('knowledge.additionManual'),
    [AdditionMethod.Remote]: t('knowledge.additionRemote'),
  }), [t]);

  return (
    <DrawerContainer
      title={t('knowledge.updateKnowledge')}
      extra={
        <Space size={16}>
          <Button icon={<UndoOutlined />}>{t('common.reset')}</Button>
          <Button type="primary" icon={<SaveOutlined />}>{t('common.save')}</Button>
        </Space>
      }
    >
      <ProForm
        submitter={false}
        form={props.form}
      >
        <Row gutter={16}>
          <Col span={11}>
            <ProCard size="small" title={t('knowledge.learnNewKnowledge')}>
              <KnowledgeTypeSelect
                name="knowledge_type"
                label={t('knowledge.knowledgeType')}
                rules={[
                  { required: true }
                ]}
              />
              <ProFormRadio.Group
                name="addition_method"
                label={t('knowledge.additionMethod')}
                valueEnum={additionMethodValueEnum}
                initialValue={AdditionMethod.Manual}
                rules={[
                  { required: true }
                ]}
              />
              <ProFormDependency name={['addition_method']}>
                {(values) => {
                  const { addition_method } = values;
                  switch (addition_method) {
                    case AdditionMethod.Manual:
                      return (
                        <ProFormTextArea
                          name="document"
                          label={t('knowledge.document')}
                          rules={[
                            { required: true }
                          ]}
                        />
                      );
                    case AdditionMethod.Remote:
                      return (
                        <div className="gay-box mb-[16px]">
                          <ProCard size="small" title={t('knowledge.remoteDocument')}>
                            <RemoteFormItem name="remote_doc" />
                          </ProCard>
                        </div>
                      );
                    default:
                      return null;
                  }
                }}
              </ProFormDependency>
              <ProFormText
                name="knowledge_name"
                label={t('knowledge.title')}
                extra={t('knowledge.titleAutoGenerateHint')}
              />
              <ProForm.Item
                name="knowledge_tags"
                label={t('knowledge.tags')}
                extra={t('knowledge.tagsAutoGenerateHint')}
              >
                <TagsInput />
              </ProForm.Item>
              <ProFormSelect
                name="link_to_existing_knowledge"
                label={t('knowledge.linkToExisting')}
              />
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormCheckbox
                    name="automatic_vectorization"
                    label={t('knowledge.automaticVectorization')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="auto_over_duplicates"
                    label={t('knowledge.autoOverwriteDuplicates')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="data_cleaning"
                    label={t('knowledge.dataCleaning')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
              </Row>
            </ProCard>
            <ProCard size="small" title={t('knowledge.dataCleaningRules')} className="mt-[16px]">
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormCheckbox
                    name="strip_blanks"
                    label={t('knowledge.stripBlanks')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="remove_special_characters"
                    label={t('knowledge.removeSpecialChars')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="merge_extra_line_breaks"
                    label={t('knowledge.mergeExtraLineBreaks')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="blocked_word_filtering"
                    label={t('knowledge.blockedWordFiltering')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
              </Row>
              <ProFormText
                name="custom_clean_regex"
                label={t('knowledge.customCleanRegex')}
              />
            </ProCard>
          </Col>
          <Col span={13}>
            <ProCard size="small" title={t('knowledge.extractionRules')}>
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormCheckbox
                    name="entity_extraction_rules"
                    label={t('knowledge.entityExtraction')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="relation_extraction_rules"
                    label={t('knowledge.relationExtraction')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="keyword_extraction_rules"
                    label={t('knowledge.keywordExtraction')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="summarize"
                    label={t('knowledge.summarize')}
                  >
                    {t('common.enable')}
                  </ProFormCheckbox>
                </Col>
              </Row>
              <ProFormSlider
                name="extraction_depth"
                label={t('knowledge.extractionDepth')}
                min={0}
                max={10}
                step={1}
                initialValue={1}
              />
            </ProCard>
            <ProCard size="small" title={t('knowledge.vectorConfig')} className="mt-[16px]">
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormSelect
                    name="vector_model"
                    label={t('knowledge.model')}
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="embedding_dimension"
                    label={t('knowledge.embeddingDimension')}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="chunk_size"
                    label={t('knowledge.chunkSize')}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="chunk_overlap_size"
                    label={t('knowledge.chunkOverlapSize')}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="vector_store_type"
                    label={t('knowledge.vectorStoreType')}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="top_k"
                    label={t('knowledge.topK')}
                  />
                </Col>
              </Row>
            </ProCard>
            <ProCard size="small" title={t('knowledge.knowledgeGraphSchema')} className="mt-[16px]">
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormSelect
                    name="entity_type"
                    label={t('knowledge.entityType')}
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="entity_relation_type"
                    label={t('knowledge.entityRelationType')}
                  />
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormSelect
                    name="graph_store_engine"
                    label={t('knowledge.graphStoreEngine')}
                  />
                  <ProForm.Item
                    name="required_entity_attributes"
                    label={t('knowledge.requiredEntityAttributes')}
                  >
                    <TagsInput />
                  </ProForm.Item>
                </Col>
                <Col span={12}>
                  <ProFormTextArea
                    name="schema"
                    label={t('knowledge.schemaJson')}
                  />
                </Col>
              </Row>
            </ProCard>
          </Col>
        </Row>
      </ProForm>
    </DrawerContainer>
  );
};

export default UpdateKnowledge;
