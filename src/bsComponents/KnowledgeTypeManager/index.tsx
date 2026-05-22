import type { FC } from 'react';
import { Tag, Button, Space, Empty } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-table';
import { DrawerContainer } from '@/components/Drawer';

interface KnowledgeType {
  key: string;
  typeName: string;
  code: string;
  description: string;
  status: string;
}

const mockData: KnowledgeType[] = [
  {
    key: '1',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '2',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '3',
    typeName: 'User',
    code: 'user',
    description: 'The User type identifies a person, account, or agent ...',
    status: 'enabled',
  },
  {
    key: '4',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
  {
    key: '5',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
  {
    key: '6',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '7',
    typeName: 'User',
    code: 'user',
    description: 'The User type identifies a person, account, or agent ...',
    status: 'enabled',
  },
  {
    key: '8',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
  {
    key: '9',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '10',
    typeName: 'User',
    code: 'user',
    description: 'The User type identifies a person, account, or agent ...',
    status: 'enabled',
  },
  {
    key: '11',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
  {
    key: '12',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '13',
    typeName: 'User',
    code: 'user',
    description: 'The User type identifies a person, account, or agent ...',
    status: 'enabled',
  },
  {
    key: '14',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
  {
    key: '15',
    typeName: 'Product',
    code: 'product',
    description: 'Any tangible or intangible item that is offered for ...',
    status: 'enabled',
  },
  {
    key: '16',
    typeName: 'User',
    code: 'user',
    description: 'The User type identifies a person, account, or agent ...',
    status: 'enabled',
  },
  {
    key: '17',
    typeName: 'Company',
    code: 'company',
    description: 'A commercial organization or business entity, such ...',
    status: 'disabled',
  },
];

const columns: ProColumns<KnowledgeType>[] = [
  {
    title: 'Type Name',
    dataIndex: 'typeName',
    search: {
      placeholder: 'Type Name',
    },
  },
  {
