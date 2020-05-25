var mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://localhost/xzoom'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 
var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});

var ListSchema = new mongoose.Schema({
    user_id: String, //定义一个属性user_id，类型为String
    content: String, //定义一个属性content，类型为String
    updated_at: Date //定义一个属性updated_at，类型为Date
}, {
    versionKey: false
});
var ZoomSchema = new mongoose.Schema({
    title: String,
    name: String,
    image: String,
    content: String,
    updated_at: Date
    // meta: {
    //     createAt: {
    //         type: Date,
    //         default: Date.now()
    //     },
    //     updateAt: {
    //         type: Date,
    //         default: Date.now()
    //     }
    // }
}, {
    versionKey: false
});

var TodoSchema = new mongoose.Schema({
    title: String,
    status: Boolean

}, {
    versionKey: false
})
// ZoomSchema.pre('save', function (next) {
//     if (this.isNew) {
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     } else {
//         this.meta.updateAt = Date.now();
//     }
//     next();
// })
mongoose.model('user', ListSchema); //将该Schema发布为Model,user就是集合名称
mongoose.model('zoom', ZoomSchema); //将该Schema发布为Model,zoom就是集合名称
mongoose.model('todo', TodoSchema);//将该Schema发布为Model,todo就是集合的名称

module.exports = mongoose;