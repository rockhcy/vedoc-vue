//vue.config.js
module.exports = {
  outputDir: 'dist',
  devServer: {
    port: 8081,
    proxy: 'http://localhost:10002'
  }
}