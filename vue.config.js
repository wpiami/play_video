const path = require('path')
const _ = require('underscore');
// const { proxy, proxyIp, localIp, restartIp, smallRoutineIp } = require('./app/config')
const proxyList = [];
const target = "http://172.17.13.101:12580/"; //测试ip地址

module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    //filenameHashing: false,
    // eslint-loader 是否在保存的时候检查
    //lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.plugins.delete('prefetch')
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))

        //config.resolve.alias.set("~theme", path.join(__dirname, 'src/assets/theme') )
    },
    configureWebpack: config => {
        // Object.assign(config,{
        //   resolve: {
        //     alias: {
        //       '@': path.resolve(__dirname, './src'),
        //       '@c': path.resolve(__dirname, './src/components'),
        //       '@theme': '@/assets/theme'
        //     }
        //   }
        // })
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            stylus: {
                localIdentName: '[name]-[hash]',
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "@/assets/css/variables.styl"';`
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    //dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    //pwa: {},
    // webpack-dev-server 相关配置
    devServer: {

        proxy: _.reduce([...['/node', '/xserver', '/fileManager']], (obj, url) => {
            obj[url + '/'] = {
                target: target,
                toProxy: true,
                changeOrigin: true
            };
            // obj['/static/views' + url] = {
            //     target: target,
            //     changeOrigin: true
            // }
            return obj;
        }, {})
    },
    // 第三方插件配置
    //  pluginOptions: {

    //  },
    //  pages: {
    //     index: {
    //       // page 的入口
    //       entry: 'src/main.js',
    //       // 模板来源
    //       template: 'public/index.html',
    //       // 在 dist/index.html 的输出
    //       filename: 'index.html',
    //       // 当使用 title 选项时，
    //       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //       title: 'Index Page',
    //       // 在这个页面中包含的块，默认情况下会包含
    //       // 提取出来的通用 chunk 和 vendor chunk。
    //       chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     }
    //   }
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/css/variables.styl'),
                path.resolve(__dirname, './src/assets/css/common.styl'),
            ],
        })
}