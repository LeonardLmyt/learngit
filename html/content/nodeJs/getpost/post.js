var http = require('http');
var querystring = require('querystring');

var postHTML =
  '<html><head><meta charset="utf-8"><title>Node.js</title></head>' +
  '<body>' +
  '<form method="post">' +
  'name: <input name="name"><br>' +
  'URL: <input name="url"><br>' +
  '<input type="submit" value="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        // ��������
        body = querystring.parse(body);
        console.log(body);
        // ������Ӧͷ����Ϣ������
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

        if (body.name && body.url) { // ����ύ������
            res.write("name:" + body.name);
            res.write("<br>");
            res.write("URL:" + body.url);
        } else {  // �����
            res.write(postHTML);
        }
        res.end();
    });
}).listen(3000);