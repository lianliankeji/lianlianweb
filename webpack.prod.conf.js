var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
//清除dist文件下的文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
var config = require('./config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf.js');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
//优雅控制台
var DashboardPlugin = require('webpack-dashboard/plugin');

const BrowerlicPath = 'http://dev.fengfeng.com:8080';


module.exports = merge(baseWebpackConfig, {
    devtool: '#source-map',

    plugins: [
        new webpack.DefinePlugin({ //设置环境变量
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('static/css/style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"],
            minChunks: Infinity,
            filename: 'static/js/vendor-[hash].min.js',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new htmlWebpackPlugin({
            title: "楼兰loulanchains",
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            hash: true,
            favicon: 'src/images/favicon.ico',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new CleanWebpackPlugin(
            ['dist'], 　 //匹配删除的文件
            {
                root: __dirname,
                　　　　　　　　　　 //根目录
                verbose: true,
                　　　　　　　　　　 //开启在控制台输出信息
                dry: false　　　　　　　　　　 //启用删除文件
            }
        )
    ]
});