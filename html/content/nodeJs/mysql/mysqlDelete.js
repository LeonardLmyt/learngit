var mysql = require('mysql');  //����MySQLģ��

//����һ��connection
var connection = mysql.createConnection({
    host: 'localhost',       //����
    user: 'root',               //MySQL��֤�û���
    password: '12345678',        //MySQL��֤�û�����
    port: '3307',                   //�˿ں�
    database: 'test'
});

connection.connect();

var userDelSql = 'DELETE FROM userinfo';
//ɾ
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



