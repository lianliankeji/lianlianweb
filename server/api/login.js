var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log(req.body)
    console.log('Time: ', Date.now());
    next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
    var respongsData = {
        code: 200,
        msg: "登陆成功"
    }
    res.json(respongsData);
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('About birds');
});

router.post('/exchange/exchange/save', function(req, res){
    console.log(req.body)
    res.json(req.body);
})

module.exports = router;