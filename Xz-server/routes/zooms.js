var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
var zoomModel = mongoose.model('zoom');//引入模型
var URL = require('url'); //引入URL中间件，获取req中的参数需要
// const multer = require('multer');
// const avatarUpload = multer({ dest: 'public/avatar/' });


function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate.toString();
}
var datatime = 'public/images/' + getNowFormatDate();
//将图片放到服务器
var multer = require('multer')
var storage = multer.diskStorage({
  // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
  destination: datatime,
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var avatarUpload = multer({
  storage: storage
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 查询记录列表
router.get('/getRecordList', function (req, res, next) {
  // zoomModel.find().sort({'_id':-1}).limit(3).exec(function (err, record, count) {
  zoomModel.find().sort({ '_id': -1 }).exec(function (err, record, count) {
    // res.send(record);
    res.status(200).send({
      code: 200,
      data: record
    })
  });
});

// 图片上传
router.post('/uploadimage', avatarUpload.single('avatar'), function (req, res, next) {
  let avatar = req.avatar
  console.log(avatar)
  console.log(req.file)
  res.status(200).send({
    code: 200,
    result: true,
    data: {
      path: req.file.path
    }
  })
});

// 新增记录
router.post('/recordadd', function (req, res) {
  console.log('req.body', req.body);
  new zoomModel({ //实例化对象，新建数据
    title: req.body.data.title,
    content: req.body.data.content,
    image: req.body.data.image,
    name: req.body.data.name,
    updated_at: Date.now()

  }).save(function (err, zooms, count) { //保存数据
    res.status(200).send({
      code: 200,
      result: true,
      data: zooms
    })
  });
});

// 修改记录
router.post("/recordEdit", (req, res) => {
  let data = {};
  data.title = req.body.data.title;
  data.content = req.body.data.content;
  data.image = req.body.data.image;
  data.name = req.body.data.name;
  console.log(req.body);
  zoomModel.update({ _id: req.body.data._id }, data, function (error, zooms) {
    res.status(200).send({
      code: 200,
      result: true,
      data: zooms
    })
  });
});
// 删除单条记录
router.post('/recordDelete', function (req, res) {
  zoomModel.deleteOne({ _id: req.body.data._id }, function (err, record) {
    res.status(200).send({
      code: 200,
      result: true,
      message: '删除成功！',
      data: record
    })
  });
})
// 批量删除
router.post('/recordsDelete', function (req, res) {
  zoomModel.deleteMany({ _id: { $in: req.body.data } }, function (err, record) {
    res.status(200).send({
      code: 200,
      result: true,
      message: '删除成功！',
      data: record
    })
  });
})

// 搜索
router.post('/search', function (req, res) {
  zoomModel.find({ $or: [{ title: req.body.data.title }, { name: req.body.data.name }] }).sort({ '_id': -1 }).exec(function (err, record, count) {
    res.status(200).send({
      code: 200,
      message: '查询成功！',
      data: record
    })
  });
})
// 分页加载
router.post('/getRecordPageList', function (req, res) {
  zoomModel.
    find().skip((req.body.data.currentPage - 1) * req.body.data.pagesize)
    // .limit(req.body.data.pagesize)
    .limit(req.body.data.currentPage * req.body.data.pagesize)
    .sort({ '_id': -1 })
    .exec((err, doc) => {
      try {
        if (!err && doc) {
          return res.json({ code: 200, msg: '列表获取成功', data: doc })
        }
        res.json({ code: 1, msg: '后端出错' })
      } catch (e) {
        res.json({ code: 1, msg: '后端出错' })
      }
    })
})

module.exports = router;
