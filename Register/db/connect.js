//连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Register', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db is ok!')
});