module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75, // 基准字体大小，对应设计稿的1/2
      propList: ['*'], // 需要转换的属性，这里表示全部都进行转换
      selectorBlackList: [], // 不进行px转换的选择器
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i
    }
  }
}