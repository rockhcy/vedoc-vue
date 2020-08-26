'use strict'
// eslint-disable-next-line no-undef,no-unused-vars
const path = require('path')
module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 基本路径
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  // baseUrl: '/',
  // 输出文件目录,将构建好的文件输出到哪里
  outputDir: 'dist',
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  // lintOnSave: true,
  // 使用带有浏览器内编译器的完整构建版本,查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  //compiler: false,
  // webpack配置,参考https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: () => { },
  // configureWebpack: () => { },
  //如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },
  // vue-loader 配置项， 参考：https://vue-loader.vuejs.org/en/options.html
  //vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // css相关配置
  //css: {
  // 是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  // 开启 CSS source maps?
  //   sourceMap: false,
  // css预设器配置项
  //   loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  // modules: false
  // },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`，在多核机器下会默认开启。
  //parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  //   pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '192.168.50.143',
    port: 8081,
    https: false,
    hotOnly: false,
    // proxy: {  //配置跨域
    //   '/api': {
    //     target: 'http://localhost:5001',  //这里后台的地址模拟的;应该填写你们真实的后台接口
    //     ws: true,
    //     changOrigin: true,  //允许跨域
    //     pathRewrite: {
    //       '^/api': ''  //请求的时候使用这个api就可以
    //     }
    //   }, // 设置代理
    //   before: app => { }
    // },
    // // 第三方插件配置
    // pluginOptions: {
    //   // ...
    // }
  }
}