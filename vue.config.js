module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    disableHostCheck: true,
    // productionSourceMap: false,
    public: '10.3.0.27',
    proxy: {
      // 请求时匹配到command 
      '/command/': {
        target: 'http://api-sandbox.tiejin.cn/command/',
        changeOrigin: true,
        secure: false
      },
      '/file/upload/public': {
        target: 'http://file-sandbox.tiejin.cn',
        changeOrigin: true,
        secure: false
      }
    }
  }
}