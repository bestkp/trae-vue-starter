import type { StringCase, StringTrimMode } from '../types'

/**
 * 转换字符串大小写
 * @param str 输入字符串
 * @param caseType 目标大小写类型
 * @returns 转换后的字符串
 */
export const changeCase = (str: string, caseType: StringCase): string => {
  switch (caseType) {
    case 'camel':
      return str.replace(/[-_]([a-z])/g, (_, c) => c.toUpperCase())
    case 'pascal':
      return str
        .replace(/[-_]([a-z])/g, (_, c) => c.toUpperCase())
        .replace(/^[a-z]/, c => c.toUpperCase())
    case 'snake':
      return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
    case 'kebab':
      return str
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')
    default:
      return str
  }
}

/**
 * 截取字符串
 * @param str 输入字符串
 * @param start 起始位置
 * @param end 结束位置
 * @returns 截取后的字符串
 */
export const substring = (str: string, start: number, end?: number): string => {
  return str.slice(start, end)
}

/**
 * 去除字符串空格
 * @param str 输入字符串
 * @param mode 去除模式
 * @returns 处理后的字符串
 */
export const trim = (str: string, mode: StringTrimMode = 'both'): string => {
  switch (mode) {
    case 'start':
      return str.replace(/^\s+/, '')
    case 'end':
      return str.replace(/\s+$/, '')
    case 'both':
    default:
      return str.trim()
  }
}

/**
 * 生成指定长度的随机字符串
 * @param length 字符串长度
 * @returns 随机字符串
 */
export const randomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}