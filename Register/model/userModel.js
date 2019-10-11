const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    us : {type: String, required: true},
    ps : {type: String, required: true},
    age : Number,
    sex : {type: Number, dafault: 0}
})
//将Schema对象转换为模型
var User = mongoose.model('Register', userSchema);

module.exports = User