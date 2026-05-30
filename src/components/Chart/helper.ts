import dayjs, { type Dayjs } from 'dayjs';
import type { ChartDataType } from './types';

/**
 * 分割后的区间（日期仍以字符串形式输出）
 */
type DateSegment  = {
  startDate: string;
  endDate: string;
}

/**
 * 使用 dayjs 解析日期字符串（支持 'YYYY-M-D' 或 'YYYY-MM-DD'），返回 dayjs 对象（本地时间）
 */
function parseDate(dateStr: string): Dayjs {
  const d = dayjs(dateStr);
  if (!d.isValid()) {
    throw new Error(`无效的日期格式: ${dateStr}`);
  }
  // 返回当天开始时间（避免时区偏移干扰）
  return d.startOf('day');
}

/**
 * 格式化 dayjs 对象为 YYYY-MM-DD 字符串
 */
function formatDate(date: Dayjs): string {
  return date.format('YYYY-MM-DD');
}

/**
 * 判断日期 a 是否等于或晚于日期 b
 */
function isSameOrAfter(a: Dayjs, b: Dayjs): boolean {
  return a.isAfter(b) || a.isSame(b);
}

/**
 * 判断日期 a 是否等于或早于日期 b
 */
function isSameOrBefore(a: Dayjs, b: Dayjs): boolean {
  return a.isBefore(b) || a.isSame(b);
}

/**
 * 根据收益列表，按每 60 天一段进行分割（从最近日期向过去划分）
 * 自动处理收益列表不足 180 天的情况，最后一个区间可能不足 60 天。
 *
 * @param earnings 收益列表（应包含最近 180 天内的数据，但实际范围以列表中的最小/最大日期为准）
 * @returns 日期区间数组，按时间从近到远排列，每个区间包含 startDate 和 endDate（字符串格式 YYYY-MM-DD）
 */
export function splitIntoSegments(earnings: ChartDataType[]): DateSegment[] {
  if (!earnings.length) {
    return [];
  }

  // 1. 解析所有日期，找到最早和最晚日期（dayjs 对象）
  let minDate: Dayjs | null = null;
  let maxDate: Dayjs | null = null;

  for (const item of earnings) {
    const date = parseDate(item.date);
    if (minDate === null || date.isBefore(minDate)) minDate = date;
    if (maxDate === null || date.isAfter(maxDate)) maxDate = date;
  }

  if (!minDate || !maxDate) {
    return [];
  }

  const segments: DateSegment[] = [];
  let currentEnd: Dayjs = maxDate; // 当前区间的结束日期，从最近日期开始

  // 2. 从最近日期向过去不断切分，直到覆盖最早日期
  while (isSameOrAfter(currentEnd, minDate)) {
    // 当前区间的理论起始日期 = 结束日期 - 59 天（区间包含 60 天）
    const startCandidate = currentEnd.subtract(59, 'day');
    let currentStart: Dayjs;

    // 如果候选开始日期早于或等于最早日期，则区间起始截断为最早日期（最后一个区间可能不足 60 天）
    if (isSameOrBefore(startCandidate, minDate)) {
      currentStart = minDate;
    } else {
      currentStart = startCandidate;
    }

    segments.push({
      startDate: formatDate(currentStart),
      endDate: formatDate(currentEnd),
    });

    // 下一个区间的结束日期 = 当前区间开始日期的前一天
    const nextEnd = currentStart.subtract(1, 'day');
    if (nextEnd.isBefore(minDate)) {
      break;
    }
    currentEnd = nextEnd;
  }

  return segments.reverse();
}