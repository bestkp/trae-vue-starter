// 默认设计稿宽度
const designWidth = 750
// 默认基准字体大小
const baseFontSize = 75

/**
 * 设置根元素字体大小
 * @param designWidth 设计稿宽度
 * @param baseFontSize 基准字体大小
 */
export function setRootFontSize(width: number = designWidth, base: number = baseFontSize) {
  const scale = document.documentElement.clientWidth / width
  document.documentElement.style.fontSize = `${base * Math.min(scale, 2)}px`

  // 监听窗口变化，动态调整字体大小
  window.addEventListener('resize', () => {
    const scale = document.documentElement.clientWidth / width
    document.documentElement.style.fontSize = `${base * Math.min(scale, 2)}px`
  })
}

/**
 * px转换为rem
 * @param px 像素值
 * @returns rem值
 */
export function px2rem(px: number): string {
  return `${px / baseFontSize}rem`
}

/**
 * rem转换为px
 * @param rem rem值
 * @returns 像素值
 */
export function rem2px(rem: number): number {
  return rem * baseFontSize
}