/**
 * i18n 国际化配置文件
 * 
 * 使用 i18next + react-i18next 实现多语言支持
 * 
 * 主要功能：
 * - 自动检测用户语言偏好
 * - 支持多种语言切换方式
 * - 异步加载语言资源文件
 * - 持久化用户语言选择
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// 初始化 i18n 配置
i18n
  // 加载语言资源的后端插件
  // 会从 public/locales/{{lng}}/{{ns}}.json 加载语言文件
  .use(Backend)
  
  // 语言检测插件
  // 自动检测用户的语言偏好设置
  .use(LanguageDetector)
  
  // React 绑定插件
  // 提供 useTranslation hook 等 React 相关功能
  .use(initReactI18next)
  
  // 配置选项
  .init({
    // 默认回退语言
    // 当检测到的语言不存在或加载失败时使用
    fallbackLng: 'zh-CN',
    
    // 是否开启调试模式
    // 开发环境下会在控制台输出调试信息
    debug: import.meta.env.DEV,
    
    // 插值配置
    interpolation: {
      // 是否转义 HTML 标签
      // 设置为 false 允许在翻译文本中使用 HTML
      escapeValue: false,
    },
    
    // 语言检测配置
    detection: {
      // 检测语言的顺序
      // 优先级从高到低：URL参数 > Cookie > LocalStorage > 浏览器语言 > HTML标签
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      
      // 持久化存储的方式
      // 将用户选择的语言保存到 LocalStorage 和 Cookie
      caches: ['localStorage', 'cookie'],
      
      // URL 参数名（默认为 'lng'）
      // 例如: http://example.com?lng=en
      lookupQuerystring: 'lng',
      
      // Cookie 名称（默认为 'i18next'）
      lookupCookie: 'i18next',
      
      // LocalStorage 键名（默认为 'i18nextLng'）
      lookupLocalStorage: 'i18nextLng',
      
      // HTML 标签属性（默认为 'lang'）
      // 例如: <html lang="zh-CN">
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    },
    
    // 支持的语言列表
    supportedLngs: ['zh-CN', 'zh-TW', 'en', 'ja'],
    
    // 命名空间配置
    // 默认使用 'translation' 命名空间
    defaultNS: 'translation',
    
    // 是否允许回退到其他语言
    // 例如：如果 'zh-CN' 不存在某个翻译，会尝试 'zh'
    nonExplicitSupportedLngs: false,
    
    // 加载语言资源的路径模板
    // Backend 插件会根据此模板构建 URL
    // 默认为 '/locales/{{lng}}/{{ns}}.json'
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;

/**
 * 使用说明：
 * 
 * 1. 在组件中使用：
 *    import { useTranslation } from 'react-i18next'
 *    
 *    const MyComponent = () => {
 *      const { t, i18n } = useTranslation()
 *      
 *      // 使用翻译
 *      const greeting = t('welcome')
 *      
 *      // 切换语言
 *      const changeLang = () => i18n.changeLanguage('en')
 *      
 *      return <div>{greeting}</div>
 *    }
 * 
 * 2. 添加新语言：
 *    - 在 public/locales 目录下创建新语言文件夹（如 'ja'）
 *    - 在该文件夹中创建 translation.json 文件
 *    - 在 supportedLngs 数组中添加语言代码
 * 
 * 3. 语言切换方式：
 *    - URL 参数: ?lng=en
 *    - 调用 i18n.changeLanguage('en')
 *    - 修改 localStorage 中的 i18nextLng 值
 *    - 修改 Cookie 中的 i18next 值
 */
