var fs = require("fs");
var zlib = require('zlib');

// 解压 zip.txt.gz 文件为 zip.txt
fs.createReadStream('zip.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('zip.txt'));
  
console.log("Unzip success");