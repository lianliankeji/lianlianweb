var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
//清除dist文件下的文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf.js');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
//优雅控制台
var DashboardPlugin = require('webpack-dashboard/plugin');

const BrowerlicPath = 'http://dev.fengfeng.com:8081';


module.exports = merge(baseWebpackConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        // contentBase: "./dist",
        // open: true,  //自动打开默认浏览器
        port: 8081, //端口号
        inline: true,
        progress: true,
        proxy: {
            '/loulan': {
                target: 'https://loulan.lianlianchains.com/',
                changeOrigin: true,
                secure: false
            },
            "/llchain": {
                target: 'https://192.168.10.108/',
                changeOrigin: true,
                secure: false
            },
            "/retail": {
                target: "https://192.168.10.107/",
                changeOrigin: true,
                secure: false
            }
        },
        disableHostCheck: true //新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new OpenBrowserPlugin({ //自动打开默认浏览器
            url: BrowerlicPath
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"],
            minChunks: Infinity,
            filename: 'vendor-[hash].min.js',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new htmlWebpackPlugin({
            title: "链链",
            filename: 'index.html',
            hash: true,
            favicon: 'src/images/favicon.ico',
            template: path.resolve(__dirname, 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: false,
            },
        }),
        //热更新
        new webpack.HotModuleReplacementPlugin(),
    ]
});