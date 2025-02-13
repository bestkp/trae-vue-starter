import dayjs from 'dayjs'
import type { DateInput } from '../types'
import type { DateFormat } from '../types'

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式化模式
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: DateInput, format: DateFormat = 'YYYY-MM-DD'): string => {
  return dayjs(date).format(format)
}

/**
 * 获取相对时间
 * @param date 日期
 * @param baseDate 基准日期，默认为当前时间
 * @returns 相对时间字符串
 */
export const getRelativeTime = (date: DateInput, baseDate?: DateInput): string => {
  const now = baseDate ? dayjs(baseDate) : dayjs()
  const target = dayjs(date)
  const diff = now.diff(target, 'second')

  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}个月前`
  return `${Math.floor(diff / 31536000)}年前`
}

/**
 * 比较两个日期
 * @param date1 日期1
 * @param date2 日期2
 * @returns -1: date1 < date2, 0: date1 = date2, 1: date1 > date2
 */
export const compareDate = (date1: DateInput, date2: DateInput): number => {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  if (d1.isBefore(d2)) return -1
  if (d1.isAfter(d2)) return 1
  return 0
}

/**
 * 获取日期范围
 * @param start 开始日期
 * @param end 结束日期
 * @returns 日期范围数组
 */
export const getDateRange = (start: DateInput, end: DateInput): Date[] => {
  const dates: Date[] = []
  let current = dayjs(start)
  const endDate = dayjs(end)

  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    dates.push(current.toDate())
    current = current.add(1, 'day')
  }

  return dates
}