import type { NumberRange, MathRoundingMode } from '../types'

/**
 * 生成指定范围内的随机数
 * @param range 数值范围
 * @param mode 舍入模式
 * @returns 随机数
 */
export const random = (range: NumberRange, mode: MathRoundingMode = 'round'): number => {
  const [min, max] = range
  const num = Math.random() * (max - min) + min
  switch (mode) {
    case 'floor':
      return Math.floor(num)
    case 'ceil':
      return Math.ceil(num)
    case 'round':
    default:
      return Math.round(num)
  }
}

/**
 * 计算数组平均值
 * @param numbers 数字数组
 * @returns 平均值
 */
export const average = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

/**
 * 计算数组中位数
 * @param numbers 数字数组
 * @returns 中位数
 */
export const median = (numbers: number[]): number => {
  if (numbers.length === 0) return 0
  const sorted = [...numbers].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

/**
 * 计算数组众数
 * @param numbers 数字数组
 * @returns 众数数组
 */
export const mode = (numbers: number[]): number[] => {
  if (numbers.length === 0) return []
  
  const frequency = new Map<number, number>()
  let maxFreq = 0
  
  numbers.forEach(num => {
    const freq = (frequency.get(num) || 0) + 1
    frequency.set(num, freq)
    maxFreq = Math.max(maxFreq, freq)
  })
  
  return Array.from(frequency.entries())
    .filter(([_, freq]) => freq === maxFreq)
    .map(([num]) => num)
    .sort((a, b) => a - b)
}