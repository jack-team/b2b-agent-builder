import type { FC } from 'react';
import cls from 'classnames';
import { ToolFilled } from '@/components/BaseIcons';

type ToolProps = {
  title: string;
  selected: boolean;
  onSelect: () => void;
};

const dcls = 'h-[40px] flex items-center text-[16px] px-[8px] gap-[6px] border border-[var(--border-color-primary)] rounded-[8px] cursor-pointer';

const Tool: FC<ToolProps> = ({ title, selected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={cls(dcls, selected && 'bg-[var(--color-primary)] text-[var(--text-color-inverse)]')}
    >
      <ToolFilled />
      <span className="text-[12px]">{title}</span>
    </div>
  );
};

export default Tool;