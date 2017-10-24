var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob'; // ���ݿ�Ϊ runoob
 
var insertData = function(db, callback) {  
    //���ӵ��� site
    var collection = db.collection('site');
    //��������
    var data = [{"name":"hch","url":"www.cjhch.com"},{"name":"runiu","url":"www.runiulahuo.com"}];
    collection.insert(data, function(err, result) { 
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}
 
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("Connect Success");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});