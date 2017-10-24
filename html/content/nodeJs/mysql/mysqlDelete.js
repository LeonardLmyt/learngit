var mysql = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({
    host: 'localhost',       //主机
    user: 'root',               //MySQL认证用户名
    password: '12345678',        //MySQL认证用户密码
    port: '3307',                   //端口号
    database: 'test'
});

connection.connect();

var userDelSql = 'DELETE FROM userinfo';
//删
connection.query(userDelSql, function (err, result) {
    if (err) {
        console.log('[DELETE ERROR] - ', err.message);
        return;
    }

    console.log('--------------------------DELETE----------------------------');
    console.log('DELETE affectedRows', result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});

connection.end();



