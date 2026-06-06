import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Checkbox, Input, Tag } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';

import { getInitials } from '@/bsComponents/UserDetail/utils';
import type { MemberCandidate } from './types';
import styles from './styles.module.less';

interface MemberPickerProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  candidates: MemberCandidate[];
}

const MemberPicker: FC<MemberPickerProps> = ({ value = [], onChange, candidates }) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');

  const candidateMap = useMemo(
    () => new Map(candidates.map((item) => [item.key, item])),
    [candidates],
  );

  const selectedMembers = useMemo(
    () => value
      .map((key) => candidateMap.get(key))
      .filter((item): item is MemberCandidate => Boolean(item)),
    [candidateMap, value],
  );

  const filteredCandidates = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return candidates;
    }
    return candidates.filter(
      (item) => item.name.toLowerCase().includes(normalizedKeyword)
        || item.userId.toLowerCase().includes(normalizedKeyword),
    );
  }, [candidates, keyword]);

  const handleToggle = useMemoizedFn((memberKey: string, checked: boolean) => {
    if (checked) {
      onChange?.([...value, memberKey]);
      return;
    }
    onChange?.(value.filter((key) => key !== memberKey));
  });

  const handleRemove = useMemoizedFn((memberKey: string) => {
    onChange?.(value.filter((key) => key !== memberKey));
  });

  return (
    <div className={styles.member_picker}>
      {selectedMembers.length > 0 && (
        <div className={styles.selected_tags}>
          {selectedMembers.map((member) => (
            <Tag
              key={member.key}
              closable
              closeIcon={<CloseOutlined />}
              onClose={() => handleRemove(member.key)}
              className={styles.member_tag}
            >
              {member.name}
            </Tag>
          ))}
        </div>
      )}
      <Input
        allowClear
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder={t('createSharedDomain.memberSearchPlaceholder')}
        prefix={<SearchOutlined className={styles.search_icon} />}
        className={styles.member_search}
      />
      <div className={styles.member_list}>
        {filteredCandidates.map((member) => (
          <label key={member.key} className={styles.member_option}>
            <Checkbox
              checked={value.includes(member.key)}
              onChange={(event) => handleToggle(member.key, event.target.checked)}
            />
            <Avatar
              className={styles.member_avatar}
              size={32}
              style={{ backgroundColor: member.avatarColor }}
            >
              {getInitials(member.name)}
            </Avatar>
            <span className={styles.member_name}>{member.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MemberPicker;
