var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';    
 
var updateData = function(db, callback) {  
    //���ӵ���  
    var collection = db.collection('site');
    //��������
    var whereStr = {"name":'hch'};
    var updateStr = {$set: { "url" : "https://www.baidu.com" }};
    collection.update(whereStr,updateStr, function(err, result) {
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
    updateData(db, function(result) {
        console.log(result);
        db.close();
    });
});