var mysql = require('mysql');  //����MySQLģ��

//����һ��connection
var connection = mysql.createConnection({
    host: 'localhost',          //����
    user: 'root',               //MySQL��֤�û���
    password: '12345678',       //MySQL��֤�û�����
    port: '3307',               //�˿ں�
    database: 'test',
});
connection.connect();

var userModSql = 'UPDATE userinfo SET UserName = ?,UserPass = ? WHERE Id = ?';
var userModSql_Params = ['gb2312', '5678', 1];
//��
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