import type { FC } from 'react';
import { Timeline } from 'antd';
import { operationLogs } from './utils';

const OperationLogsTab: FC = () => (
  <div className="p-[16px]">
    <Timeline
      items={operationLogs.map((log) => ({
        key: log.key,
        color: log.color,
        children: (
          <div>
            <div className="text-[13px] font-medium text-[var(--primaryColor)]">
              {log.content}
            </div>
            <div className="text-[12px] text-[#616161] mt-[4px]">{log.time}</div>
          </div>
        ),
      }))}
    />
  </div>
);

export default OperationLogsTab;
