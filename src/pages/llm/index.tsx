import type { FC } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Table, Tag, Button } from 'antd';
import Chart from '@/components/Chart';



const datas = Array.from({ length: 30 }).map((_, i) => {
  const d = dayjs().subtract(i, 'day');
  return {
    date: d.format('YYYY-MM-DD'),
    value: Math.floor(Math.random() * 100) + 1
  }
}).reverse();

const LLM: FC = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => <Button type="link">Configure</Button>,
    },
  ];

  const data = [
    { id: '1', model: 'GPT-4', provider: 'OpenAI', status: 'active' },
    { id: '2', model: 'Claude-3', provider: 'Anthropic', status: 'active' },
    { id: '3', model: 'Llama-2', provider: 'Meta', status: 'inactive' },
    { id: '4', model: 'ERNIE', provider: 'Baidu', status: 'active' },
  ];

  return (
    <div className="p-6" style={{background: '#333'}}>
      <h1 className="text-2xl font-bold mb-6">{t('menu.largeLanguageModels')}</h1>

      <div style={{ height: 240, width: 550, background: '#222', margin: 'auto', padding:'10px 0' }}>
        <Chart 
        datas={datas}
         lineColor="#73d13d" 
         padding={{
          left: '40px'
         }}
         />
      </div>

      {/* <Table columns={columns} dataSource={data} rowKey="id" /> */}
    </div>
  );
};

export default LLM;
