var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';    
 
var selectData = function(db, callback) {  
  //���ӵ���  
  var collection = db.collection('site');
  //��ѯ����
  var whereStr = {"name":'hch'};
  collection.find(whereStr).toArray(function(err, result) {
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
  selectData(db, function(result) {
    console.log(result);
    db.close();
  });
});