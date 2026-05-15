import type { FC, ChangeEvent } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { Input, Tag, Space, Button } from 'antd'

type TagsInputProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const TagsInput: FC<TagsInputProps> = (props) => {
  const { value = [], onChange } = props;
  const [text, setText] = useSafeState<string>('');

  const handleAdd = useMemoizedFn(() => {
    if (text && onChange) {
      onChange([...value, text]);
      setText('');
    }
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
              className="bg-[var(--bg-color-primary)]"
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
          placeholder="Please enter"
        />
        <Button
          type="primary"
          onClick={handleAdd}
          disabled={!text.trim()}
        >
          Add
        </Button>
      </Space.Compact>
    </div>
  );
};

export default TagsInput;
