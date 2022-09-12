


module.exports = {
  lintOnSave: false,
  // 以下是优化打包的体积的
  productionSourceMap: false, // 关闭打包生成 .map文件
  // configureWebpack: {
  //   externals: {
  //     vue: 'Vue'           // cdn引入Vue，打包不会打 externals 声明的包
  //   }
  // }
}