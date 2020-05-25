var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
var TodoModel = mongoose.model('user');//引入模型
var URL = require('url'); //引入URL中间件，获取req中的参数需要

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/getUserInfo', function (req, res, next) {
    console.log('请求成功')
    res.status(200).send({
        code: 200,
        data: {
            name: 'zhangwei'
        }
    })
});

router.get('/getList', function (req, res, next) {
    console.log('请求成功')
    res.status(200).send({
        code: 200,
        data: {
            imgList: [
                {
                    text: "Xzoom1",
                    img: "../../static/1.jpg"
                },
                {
                    text: "Xzoom2",
                    img: "../../static/2.jpg"
                },
                {
                    text: "Xzoom3",
                    img: "../../static/3.jpg"
                },
                {
                    text: "Xzoom4",
                    img: "../../static/linedrawing.png"
                },
                {
                    text: "Xzoom1",
                    img: "../../static/1.jpg"
                },
                {
                    text: "Xzoom1",
                    img: "../../static/1.jpg"
                },
                {
                    text: "Xzoom1",
                    img: "../../static/1.jpg"
                },
                {
                    text: "Xzoom1",
                    img: "../../static/1.jpg"
                },
                {
                    text: "Xzoom1",
                    img: "../../static/1.jpg"
                }
            ],
        }
    })
});

router.post('/create', function (req, res) {
    console.log('req.body', req.body);
    new TodoModel({ //实例化对象，新建数据
        content: req.body.content,
        updated_at: Date.now()
    }).save(function (err, users, count) { //保存数据
        console.log('内容', users, '数量', count); //打印保存的数据
        res.redirect('/'); //返回首页
    });
});

router.post("/edit3", (req, res) => {
    console.log(req.body);
    TodoModel.update({ _id: req.body._id }, { content: req.body.content }, function (error) {
        // res.send("更新成功！！")
        res.redirect('/'); //返回首页
    });
});

router.get('/search', function (req, res, next) {
    TodoModel.
        find().
        sort('updated_at').
        exec(function (err, aa, count) {
            res.send(aa);
            // res.status(200).send({
            //     code: 200,
            //     data: {
            //         count: count,
            //         data: aa
            //     }
            // })
        });
});

router.post('/destroy', function (req, res) {
    var params = URL.parse(req.url, true).query;
    console.log(params);
    // //根据待办事项的id 来删除它
    // TodoModel.findById(params.id, function (err, xzoom) {
    //     xzoom.remove(function (err, xzoom) {
    //         res.redirect('/');
    //     });
    // });
    TodoModel.deleteOne({ _id: req.body._id }, function (err) {
        res.redirect('/'); //返回首页
        // res.send("删除成功！！")
    });
})
router.post('/deletemany', function (req, res) {
    console.log(req.body)
    TodoModel.deleteMany({ _id: { $in: req.body } });
})

module.exports = router;