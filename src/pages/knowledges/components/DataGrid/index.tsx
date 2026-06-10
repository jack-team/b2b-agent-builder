import type { FC } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import NiceTable from '@/components/NiceTable';

const mockData = [
  {
    key: '1',
    name: 'Emma Johnson',
    phone: '+1 (555) 123-4567',
    address: '2847 Maple Street, Austin, TX 78701, USA',
  },
  {
    key: '2',
    name: "Emma O'Connor",
    phone: '+1 (555) 7700 123456',
    address: '2847 Maple Street, London W1U 6RD, United Kingdom',
  },
  {
    key: '3',
    name: "Liam O'Connor",
    phone: '+44 7700 123456',
    address: '12 Baker Street, London W1U 6RD, United Kingdom',
  },
  {
    key: '4',
    name: 'Sophia Martinez',
    phone: '+1 (310) 555-9876',
    address: '891 Ocean Avenue, Santa Monica, CA 90401, USA',
  },
  {
    key: '5',
    name: 'James Wilson',
    phone: '+61 2 9876 5432',
    address: '42 Wallaby Way, Sydney NSW 2000, Australia',
  },
  {
    key: '6',
    name: 'Olivia Brown',
    phone: '+33 1 2345 6789',
    address: '78 Rue du Faubourg, Paris 75008, France',
  },
  {
    key: '7',
    name: 'William Davis',
    phone: '+81 3 1234 5678',
    address: '1-2-3 Nihombashi, Chuo-ku, Tokyo 103-0027, Japan',
  },
  {
    key: '8',
    name: 'Isabella Garcia',
    phone: '+55 11 98765-4321',
    address: 'Avenida Paulista, 1000, São Paulo SP 01310-100, Brazil',
  },
];

const DataGrid: FC = () => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    { dataIndex: 'name', title: t('knowledgesPage.columns.name'), width: '33.3%' },
    { dataIndex: 'phone', title: t('knowledgesPage.columns.phone'), width: '33.3%' },
    { dataIndex: 'address', title: t('knowledgesPage.columns.address'), width: '33.3%' },
  ], [t]);

  return (
    <NiceTable
      search={false}
      toolBarRender={false}
      dataSource={mockData}
      columns={columns}
    />
  );
};

export default DataGrid;
