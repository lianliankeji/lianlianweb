// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    production: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
        baseUrl: "/",
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report
	},
	test: {
        env: require('./test.env'),
        baseUrl: "https://test.loulan.lianlianchains.com/",
	},
	development: {
		env: require('./dev.env'),
        baseUrl: "/",
		port: 8080,
		inline: true,
		progress: true,
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
            '/loulan/chain/savecontract': {
                target: 'https://www.lianlianchains.com/',
                changeOrigin: true,
                secure: false
            },
            '/loulan/chain/updatecontract': {
                target: 'https://www.lianlianchains.com/',
                changeOrigin: true,
                secure: false
            },
            '/loulan': {
                target: 'https://www.lianlianchains.com/',
                changeOrigin: true,
                secure: false
            },
            "/llchain": {
                target: 'https://192.168.10.108/',
                changeOrigin: true,
                secure: false
            },
            "/retailtest": {
                target: "https://192.168.10.107/",
                changeOrigin: true,
                secure: false
            },
            "/mogaotest": {
                target: "https://192.168.10.107/",
                changeOrigin: true,
                secure: false
            },
            "/usr": {
                target: "https://192.168.10.107/",
                changeOrigin: true,
                secure: false
            }
		},
		cssSourceMap: false
	}
}