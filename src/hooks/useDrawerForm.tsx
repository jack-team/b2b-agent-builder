import { useMemo, useRef } from 'react';
import { Button } from 'antd';
import { SaveOutlined } from '@/components/BaseIcons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';

type UseDrawerFormOptions<T> = {
  onFinish: (values: T) => void | Promise<void>;
};

export const useDrawerForm = <T,>({
  onFinish,
}: UseDrawerFormOptions<T>) => {
  const { t } = useTranslation();
  const formRef = useRef<ProFormInstance<T>>(null);

  const handleFinish = useMemoizedFn(onFinish);
  const submit = useMemoizedFn(() => {
    formRef.current?.submit();
  });

  const saveButton = useMemo(
    () => (
      <Button type="primary" icon={<SaveOutlined />} onClick={submit}>
        {t('common.save')}
      </Button>
    ),
    [t, submit],
  );

  return { formRef, handleFinish, submit, saveButton };
};
