var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('zip.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('zip.txt.gz'));
  
console.log("zip success");