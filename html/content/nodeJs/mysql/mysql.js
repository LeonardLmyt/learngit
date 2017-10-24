/*
����host��������ַ ��Ĭ�ϣ�localhost��
����user���û���
����password������
����port���˿ں� ��Ĭ�ϣ�3306��
����database�����ݿ���
����charset�������ַ�����Ĭ�ϣ�'UTF8_GENERAL_CI'��ע���ַ�������ĸ��Ҫ��д��
����localAddress����IP����TCP���ӣ���ѡ��
����socketPath�����ӵ�unix��·������ʹ�� host �� port ʱ�ᱻ����
����timezone��ʱ����Ĭ�ϣ�'local'��
����connectTimeout�����ӳ�ʱ��Ĭ�ϣ������ƣ���λ�����룩
����stringifyObjects���Ƿ����л�����Ĭ�ϣ�'false' ���밲ȫ���https://github.com/felixge/node-mysql/issues/501��
����typeCast���Ƿ���ֵת��Ϊ����JavaScript����ֵ ��Ĭ�ϣ�true��
����queryFormat���Զ���query����ʽ������ https://github.com/felixge/node-mysql#custom-format
����supportBigNumbers�����ݿ�֧��bigint��decimal������ʱ����Ҫ���optionΪtrue ��Ĭ�ϣ�false��
����bigNumberStrings��supportBigNumbers��bigNumberStrings���� ǿ��bigint��decimal����JavaScript�ַ������ͷ��أ�Ĭ�ϣ�false��
����dateStrings��ǿ��timestamp,datetime,data�������ַ������ͷ��أ�������JavaScript Date���ͣ�Ĭ�ϣ�false��
����debug���������ԣ�Ĭ�ϣ�false��
����multipleStatements���Ƿ���һ��query���ж��MySQL��� ��Ĭ�ϣ�false��
����flags�������޸����ӱ�־���������飺https://github.com/felixge/node-mysql#connection-flags
����ssl��ʹ��ssl��������crypto.createCredenitals������ʽһ������һ������ssl�����ļ����Ƶ��ַ�����Ŀǰֻ����Amazon RDS�������ļ�
*/

var mysql = require('mysql');  //����MySQLģ��

//����һ��connection
var connection = mysql.createConnection({
    host: 'localhost',          //����
    user: 'root',               //MySQL��֤�û���
    password: '12345678',       //MySQL��֤�û�����
    port: '3307'                //�˿ں�
});
//����һ��connection
connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect] succeed!');
});
//ִ��SQL���
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('The solution is: ', rows[0].solution);
});
//�ر�connection
connection.end(function (err) {
    if (err) {
        return;
    }
    console.log('[connection end] succeed!');
});
