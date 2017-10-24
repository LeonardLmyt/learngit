var mysql = require('mysql');  //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({
    host: 'localhost',       //主机
    user: 'root',               //MySQL认证用户名
    password: '12345678',        //MySQL认证用户密码
    port: '3307',                   //端口号
    database: 'test',                //数据库
});

connection.connect();
var userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(1,?,?)';
var userAddSql_Params = ['Wilson', 'abc'];
//锟斤拷
connection.query(userAddSql, userAddSql_Params, function (err, result) {
    if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
    }
    console.log('--------------------------INSERT----------------------------');
    //console.log('INSERT ID:',result.insertId);         
    console.log('INSERT ID:', result);
    console.log('-----------------------------------------------------------------\n\n');
});
connection.end();