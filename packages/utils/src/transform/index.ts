import type { DeepCloneable, TreeNode, TreeOptions } from '../types'

/**
 * 深拷贝对象
 * @param obj 需要拷贝的对象
 * @returns 拷贝后的对象
 */
export const deepClone = <T extends DeepCloneable>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj

  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof RegExp) return new RegExp(obj) as unknown as T

  const clone = (Array.isArray(obj) ? [] : {}) as T
  Object.keys(obj as object).forEach(key => {
    ;(clone as any)[key] = deepClone((obj as any)[key])
  })

  return clone
}

/**
 * 扁平化数组
 * @param arr 需要扁平化的数组
 * @param depth 扁平化深度，默认为Infinity
 * @returns 扁平化后的数组
 */
export const flatten = <T>(arr: T[], depth = Infinity): T[] => {
  return depth > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val),
        [] as T[]
      )
    : arr.slice()
}

/**
 * 将对象数组转换为键值对映射
 * @param arr 对象数组
 * @param key 作为键的属性名
 * @returns 键值对映射
 */
export const arrayToMap = <T extends object, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T> => {
  return arr.reduce((acc, item) => {
    const keyValue = String(item[key])
    acc[keyValue] = item
    return acc
  }, {} as Record<string, T>)
}

/**
 * 将数组转换为树形结构
 * @param arr 扁平数组
 * @param options 配置选项
 * @returns 树形结构数组
 */
export const arrayToTree = <T extends Record<string, any>>(
  arr: T[],
  options: TreeOptions = {}
): TreeNode<T>[] => {
  const {
    id = 'id',
    parentId = 'parentId',
    children = 'children'
  } = options

  const map = new Map<any, TreeNode<T>>()
  const result: TreeNode<T>[] = []

  arr.forEach(item => map.set(item[id], { ...item, [children]: [] }))

  map.forEach(item => {
    const parent = map.get(item[parentId])
    if (parent) {
      parent[children].push(item)
    } else {
      result.push(item)
    }
  })

  return result
}