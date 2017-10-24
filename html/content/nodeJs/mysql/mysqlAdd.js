var mysql = require('mysql');  //����MySQLģ��

//����һ��connection
var connection = mysql.createConnection({
    host: 'localhost',       //����
    user: 'root',               //MySQL��֤�û���
    password: '12345678',        //MySQL��֤�û�����
    port: '3307',                   //�˿ں�
    database: 'test',                //���ݿ�
});

connection.connect();
var userAddSql = 'INSERT INTO userinfo(Id,UserName,UserPass) VALUES(1,?,?)';
var userAddSql_Params = ['Wilson', 'abc'];
//��
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