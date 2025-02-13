import type { ValidateRule, ValidationResult } from '../types'

/**
 * 验证单个值
 * @param value 需要验证的值
 * @param rule 验证规则
 * @returns 验证结果
 */
export const validateValue = (value: any, rule: ValidateRule): ValidationResult => {
  const errors: string[] = []

  // 必填验证
  if (rule.required && (value === undefined || value === null || value === '')) {
    errors.push(rule.message || '该字段为必填项')
    return { valid: false, errors }
  }

  // 类型验证
  if (rule.type && value !== undefined && value !== null) {
    const actualType = Array.isArray(value) ? 'array' : typeof value
    if (actualType !== rule.type) {
      errors.push(rule.message || `类型必须为 ${rule.type}`)
    }
  }

  // 长度/大小验证
  if (typeof value === 'string' || Array.isArray(value)) {
    if (rule.min !== undefined && value.length < rule.min) {
      errors.push(rule.message || `长度不能小于 ${rule.min}`)
    }
    if (rule.max !== undefined && value.length > rule.max) {
      errors.push(rule.message || `长度不能大于 ${rule.max}`)
    }
  } else if (typeof value === 'number') {
    if (rule.min !== undefined && value < rule.min) {
      errors.push(rule.message || `数值不能小于 ${rule.min}`)
    }
    if (rule.max !== undefined && value > rule.max) {
      errors.push(rule.message || `数值不能大于 ${rule.max}`)
    }
  }

  // 正则验证
  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    errors.push(rule.message || '格式不正确')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 批量验证对象
 * @param obj 需要验证的对象
 * @param rules 验证规则对象
 * @returns 验证结果
 */
export const validateObject = (obj: Record<string, any>, rules: Record<string, ValidateRule>): Record<string, ValidationResult> => {
  const results: Record<string, ValidationResult> = {}

  Object.entries(rules).forEach(([key, rule]) => {
    results[key] = validateValue(obj[key], rule)
  })

  return results
}

/**
 * 检查对象是否通过所有验证
 * @param validationResults 验证结果对象
 * @returns 是否全部通过
 */
export const isValid = (validationResults: Record<string, ValidationResult>): boolean => {
  return Object.values(validationResults).every(result => result.valid)
}