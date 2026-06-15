/** 字号、间距、圆角等布局 token，不随主题切换 */
export const layoutTokens = {
  /** 字号 */
  textXs: '12px',
  textSm: '13px',
  textBase: '14px',
  textMd: '16px',
  textLg: '18px',
  textXl: '22px',
  text2xl: '28px',
  text3xl: '36px',
  /** 字重 */
  fontNormal: 400,
  fontMedium: 500,
  fontSemibold: 600,
  fontBold: 700,
  /** 行高 */
  leadingTight: 1.2,
  leadingSnug: 1.3,
  leadingNormal: 1.4,
  leadingRelaxed: 1.5,
  leadingLoose: 1.6,
  /** 间距 */
  space0: 0,
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space8: '32px',
  space10: '40px',
  space12: '48px',
  space16: '64px',
  /** 圆角 */
  radiusNone: 0,
  radiusSm: '4px',
  radiusMd: '6px',
  radiusLg: '8px',
  radiusXl: '12px',
  radiusFull: '9999px',
  /** 图标 */
  iconXs: '16px',
  iconSm: '20px',
  iconMd: '24px',
  iconLg: '32px',
  /** 按钮 */
  btnHeightSm: '32px',
  btnHeightMd: '36px',
  btnHeightLg: '44px',
  /** 输入框 */
  inputHeightSm: '32px',
  inputHeightMd: '36px',
  inputHeightLg: '44px',
  /** 侧边栏 */
  sidebarWidth: '224px',
  /** 头部 */
  headerHeight: '64px',
  /** 最大内容宽度 */
  maxContentWidth: '1280px',
  /**logo 高度 */
  logoHeight: '28px',
} as const;
