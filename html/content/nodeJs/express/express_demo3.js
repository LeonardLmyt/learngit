var express = require('express');
var app = express();

//express.static 可以用来直接访问 public 文件夹下的文件
app.use(express.static('public')); 

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})