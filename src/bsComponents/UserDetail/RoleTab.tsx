import type { FC } from 'react';
import { useState } from 'react';
import { Button, Tag } from 'antd';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import type { UserRole } from '@/bsComponents/UserConfig/types';
import type { UserDetailData } from './types';
import { assignableRoles, isRoleKey } from './utils';
import styles from './styles.module.less';

const roleTagColor: Record<UserRole, string> = {
  super_admin: 'error',
  admin: 'processing',
  audit_admin: 'success',
};

type RoleTabProps = {
  data: UserDetailData;
};

const getRoleLabel = (roleKey: string) =>
  assignableRoles.find((item) => item.key === roleKey)?.label ?? roleKey;

const RoleTab: FC<RoleTabProps> = ({ data }) => {
  const [assignedRoles, setAssignedRoles] = useState<string[]>(data.assignedRoles);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(data.assignedRoles);

  const handleRemoveRole = useMemoizedFn((roleKey: string) => {
    setAssignedRoles((prev) => prev.filter((item) => item !== roleKey));
    setSelectedKeys((prev) => prev.filter((key) => key !== roleKey));
  });

  const handleToggleRole = useMemoizedFn((roleKey: string) => {
    setSelectedKeys((prev) => {
      const next = prev.includes(roleKey)
        ? prev.filter((key) => key !== roleKey)
        : [...prev, roleKey];

      setAssignedRoles((roles) => {
        if (!next.includes(roleKey)) {
          return roles.filter((item) => item !== roleKey);
        }
        if (isRoleKey(roleKey) && !roles.includes(roleKey)) {
          return [...roles, roleKey];
        }
        return roles;
      });

      return next;
    });
  });

  return (
    <div className="p-[16px]">
      <div className={styles.role_section}>
        <h4 className={styles.section_title}>Role</h4>
        <div className={styles.role_tags}>
          {assignedRoles.map((roleKey) => (
            <Tag
              key={roleKey}
              closable
              color={isRoleKey(roleKey) ? roleTagColor[roleKey] : 'default'}
              onClose={() => handleRemoveRole(roleKey)}
            >
              {getRoleLabel(roleKey)}
            </Tag>
          ))}
          <Button type="link" icon={<PlusOutlined />} className="px-0">
            Assign Role
          </Button>
        </div>
      </div>
      <div>
        <h4 className={styles.section_title}>Assignable Roles</h4>
        {assignableRoles.map((role) => {
          const selected = selectedKeys.includes(role.key);
          return (
            <div
              key={role.key}
              className={styles.role_option}
              onClick={() => handleToggleRole(role.key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleToggleRole(role.key);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span
                className={styles.role_dot}
                style={{ backgroundColor: role.dotColor }}
              />
              <span>{role.label}</span>
              {selected && <CheckOutlined className={styles.role_check} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleTab;
