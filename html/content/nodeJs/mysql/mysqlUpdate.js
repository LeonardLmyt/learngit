var mysql = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({
    host: 'localhost',          //主机
    user: 'root',               //MySQL认证用户名
    password: '12345678',       //MySQL认证用户密码
    port: '3307',               //端口号
    database: 'test',
});
connection.connect();

var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
var userModSql_Params = ['gb2312', '5678', 1];
//改
connection.query(userModSql, userModSql_Params, function (err, result) {
    if (err) {
        console.log('[UPDATE ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------UPDATE----------------------------');
    console.log('UPDATE affectedRows', result.affectedRows);
    console.log('-----------------------------------------------------------------\n\n');
});

connection.end();