import dayjs from 'dayjs';

// 16 进制转 rgba
export function hexToRgba(hex: string, opacity = 1) {
  // 移除#符号并处理3位简写格式（如#FFF → #FFFFFF）
  hex = hex.toLowerCase().replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  // 提取并转换分量
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// 获取 url 参数
export const getUrlParams = (name: string) => {
  const search = location.search.substring(1);
  const pairs = search.split('&');
  for (const pair of pairs) {
    let [key, value] = pair.split('=') || [];
    if (key) key = decodeURIComponent(key);
    if (value) value = decodeURIComponent(value);
    if (key === name) return value;
  }
}

// 格式化日期
export function formatDate(date: string | number) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

// 支持多种协议的验证
export function isURL(string: string, protocols = ['http', 'https', 'ftp']) {
  const pattern = protocols.join('|');
  const regex = new RegExp(`^(${pattern}):\\/\\/[^\\s/$.?#].[^\\s]*$`, 'i');
  return regex.test(string);
}

export const openUrl = (url: string, target = '_blank') => {
  const $body = document.body;
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.target = target;
  $body.appendChild(a);
  a.click();
  $body.removeChild(a);
}