module.exports = {
  lintOnSave: false,
  chainWebpack (config) {
    // 卸载 vue-cli 自带的 glsl:file-loader
    config.module
      .rule('glsl')
      .test(/\.glsl$/)
      .use('glsl-shader-loader')
      .loader('glsl-shader-loader')
      .end()
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
    ]
  },
  filenameHashing: true
}
