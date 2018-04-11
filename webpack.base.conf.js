const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
	return path.resolve(__dirname, dir);
}
console.log(process.env.NODE_ENV)

module.exports = {
	entry: {
		"main": path.resolve(__dirname, 'src/main.js'),
		"vendor": [
			"react",
			"react-dom",
			"react-router-dom",
			"react-router-redux",
			"react-redux",
			"redux"
		],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'static/js/[name].[hash].js',
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: process.env.NODE_ENV === 'production' ? "/" : ""
	},
	resolve: {
		alias: {
			'components': resolve('src/components/'),
			'containers': resolve('src/containers/'),
			'common': resolve('src/common/'),
			'actions': resolve('src/actions/'),
			'images': resolve('src/images/'),
			'api': resolve('src/api/'),
			'constants': resolve('src/constants/'),
			'utils': resolve('src/utils/'),
            'config': resolve('config/')
		},
		extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
	},
	module: {
		rules: [{
			test: /\.css$/,
			include: [path.resolve(__dirname, 'node_modules/antd/es'), path.resolve(__dirname, 'src')],
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ['css-loader?importLoaders=1', 'postcss-loader']
			})


		}, {
			test: /\.scss$/,
			exclude: /(node_modules)/,
			include: path.resolve(__dirname, 'src'),
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				//resolve-url-loader may be chained before sass-loader if necessary
				use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader']
			})
		}, {
			test: /\.js$/,
			exclude: /(node_modules)/,
			include: path.resolve(__dirname, 'src'),
			use: [{
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					presets: ["react", "es2015", "stage-0"],
					plugins: [
						["import", {
							"libraryName": "antd",
							"libraryDirectory": "es",
							"style": "css"
						}] // 配置按需加载 当`style: true` 会加载 less 文件
					]
				}
			}]
		}, {
			test: /\.(png|jpg|jepg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'static/img/[name].[hash:7].[ext]'
				}
			}, {
				loader: 'image-webpack-loader', //新增image-webpack-loader 
				options: {
					mozjpeg: { //设置对jpg格式的图片压缩的程度设置 
						progressive: true,
						quality: 60
					},
				}
			}]
		}, {
			test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10240,
				name: 'static/media/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	}
}