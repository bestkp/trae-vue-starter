// 日期处理工具类型
export type DateFormat = string
export type DateInput = Date | string | number

// 数据转换工具类型
export type DeepCloneable = any
export type TreeNode<T> = T & {
  children?: TreeNode<T>[]
}
export interface TreeOptions {
  id?: string
  parentId?: string
  children?: string
}

// 字符串操作工具类型
export type StringCase = 'camel' | 'pascal' | 'snake' | 'kebab'
export type StringTrimMode = 'both' | 'start' | 'end'

// 数学计算工具类型
export type NumberRange = [number, number]
export type MathRoundingMode = 'floor' | 'ceil' | 'round'

// 验证工具类型
export type ValidateRule = {
  required?: boolean
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object'
  min?: number
  max?: number
  pattern?: RegExp
  message?: string
}

export type ValidationResult = {
  valid: boolean
  errors: string[]
}