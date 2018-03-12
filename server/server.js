var http = require('http');
var express = require('express');
var app = express();

//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//设置静态资源托管
//当用户访问的url以/public开始,那么直接返回对应__dirname + '/public'下的文件
app.use(express.static(__dirname));


//bodyParser设置
app.use(bodyParser.urlencoded({
	extended: true
}));

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Max-Age, 3600');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');


	if (req.method == 'OPTIONS') {
		res.send(200);
		/让options请求快速返回/
	} else {
		next();
	}
});

var login = require('./api/login');



app.use('/', login);

var server = app.listen(5000, function(req, res) {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://localhost:5000', host, port);
});