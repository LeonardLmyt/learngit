var net = require('net');
var client = net.connect({port: 9632}, function() {
   console.log('���ӵ���������');  
});
client.on('data', function(data) {
   console.log(data.toString());
   client.end();
});
client.on('end', function() { 
   console.log('�Ͽ��������������');
});