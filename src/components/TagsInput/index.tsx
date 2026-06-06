import type { FC, ChangeEvent } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { Input, Tag, Space, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';

type TagsInputProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const TagsInput: FC<TagsInputProps> = (props) => {
  const { value = [], onChange } = props;
  const [text, setText] = useSafeState<string>('');
  const { t } = useTranslation();

  const handleAdd = useMemoizedFn(() => {
    const txt = text.trim();
    if (value.findIndex(v => v === txt) > -1) {
     return message.error(t('tagsInput.duplicateError'));
    }
    onChange?.([...value, txt]);
    requestAnimationFrame(() => setText(''));
  });

  const handleChange = useMemoizedFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    }
  );

  const onDelete = useMemoizedFn((tag: string) => {
    if (onChange) {
      onChange(value.filter((item) => item !== tag));
    }
  });

  return (
    <div className="w-full">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mb-[12px]">
          {value.map((tag) => (
            <Tag
              key={tag}
              closable
              onClose={() => onDelete(tag)}
              className="bg-[var(--bg-color-secondary)]"
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}
      <Space.Compact className="w-full">
        <Input
          value={text}
          onChange={handleChange}
          placeholder={t('common.pleaseEnter')}
        />
        <Button
          type="primary"
          onClick={handleAdd}
          disabled={!text.trim()}
        >
          {t('common.add')}
        </Button>
      </Space.Compact>
    </div>
  );
};

export default TagsInput;
