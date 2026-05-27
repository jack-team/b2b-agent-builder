import type { FC } from 'react';
import { Button, Space, Row, Col } from 'antd';
import { UndoOutlined, SaveOutlined } from '@ant-design/icons';
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
import { AdditionMethodMap, AdditionMethod } from './enum';

type UpdateKnowledgeProps = {
  form?: FormInstance
}

const UpdateKnowledge: FC<UpdateKnowledgeProps> = (props) => {
  return (
    <DrawerContainer
      title="Update Knowledge"
      extra={
        <Space size={16}>
          <Button icon={<UndoOutlined />}>Reset</Button>
          <Button type="primary" icon={<SaveOutlined />} loading>Save</Button>
        </Space>
      }
    >
      <ProForm
        submitter={false}
        form={props.form}
      >
        <Row gutter={16}>
          <Col span={11}>
            <ProCard size="small" title="Learn New Knowledge">
              <KnowledgeTypeSelect
                name="knowledge_type"
                label="Knowledge Type"
                rules={[
                  { required: true }
                ]}
              />
              <ProFormRadio.Group
                name="addition_method"
                label="Addition method"
                valueEnum={AdditionMethodMap}
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
                          label="Document"
                          rules={[
                            { required: true }
                          ]}
                        />
                      );
                    case AdditionMethod.Remote:
                      return (
                        <div className="gay-box mb-[16px]">
                          <ProCard size="small" title="Remote document">
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
                label="Title"
                extra="不填写标题，标题将会在保存之后自动生成。"
              />
              <ProForm.Item
                name="knowledge_tags"
                label="Tags"
                extra="不填写标签，标签将会在保存之后自动生成。"
              >
                <TagsInput />
              </ProForm.Item>
              <ProFormSelect
                name="link_to_existing_knowledge"
                label="Link to existing knowledge"
              />
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormCheckbox
                    name="automatic_vectorization"
                    label="Automatic vectorization"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="auto_over_duplicates"
                    label="Auto-overwrite duplicates"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="data_cleaning"
                    label="Data cleaning"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
              </Row>
            </ProCard>
            <ProCard size="small" title="Data Cleaning Rules" className="mt-[16px]">
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormCheckbox
                    name="strip_blanks"
                    label="Strip blanks"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="remove_special_characters"
                    label="Remove special characters"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="merge_extra_line_breaks"
                    label="Merge extra line breaks"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="blocked_word_filtering"
                    label="Blocked word filtering"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
              </Row>
              <ProFormText
                name="custom_clean_regex"
                label="Custom clean regex"
              />
            </ProCard>
          </Col>
          <Col span={13}>
            <ProCard size="small" title="Extraction rules">
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormCheckbox
                    name="entity_extraction_rules"
                    label="Entity extraction"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="relation_extraction_rules"
                    label="Relation extraction"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="keyword_extraction_rules"
                    label="Keyword extraction"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
                <Col span={12}>
                  <ProFormCheckbox
                    name="summarize"
                    label="Summarize"
                  >
                    Enable
                  </ProFormCheckbox>
                </Col>
              </Row>
              <ProFormSlider
                name="extraction_depth"
                label="Extraction depth"
                min={0}
                max={10}
                step={1}
                initialValue={1}
              />
            </ProCard>
            <ProCard size="small" title="Vector config" className="mt-[16px]">
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormSelect
                    name="vector_model"
                    label="Model"
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="embedding_dimension"
                    label="Embedding dimension"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="chunk_size"
                    label="Chunk size"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="chunk_overlap_size"
                    label="Chunk overlap size"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="vector_store_type"
                    label="Vector store type"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="top_k"
                    label="Top K"
                  />
                </Col>
              </Row>
            </ProCard>
            <ProCard size="small" title="Knowledge Graph Schema" className="mt-[16px]">
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormSelect
                    name="entity_type"
                    label="Entity type"
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="entity_relation_type"
                    label="Entity relation type"
                  />
                </Col>
              </Row>
              <Row gutter={12}>
                <Col span={12}>
                  <ProFormSelect
                    name="graph_store_engine"
                    label="Graph store engine"
                  />
                  <ProForm.Item
                    name="required_entity_attributes"
                    label=" Required entity attributes"
                  >
                    <TagsInput />
                  </ProForm.Item>
                </Col>
                <Col span={12}>
                  <ProFormTextArea
                    name="schema"
                    label="Schema (JSON)"
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
