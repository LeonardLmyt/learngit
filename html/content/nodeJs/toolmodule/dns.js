var dns = require('dns');

dns.lookup('www.cjhch.com', function onLookup(err, address, family) {
    console.log('ip ��ַ:', address);
    dns.reverse(address, function (err, hostnames) {
        if (err) {
           console.log(err.stack);
        }

        console.log('������� ' + address + ': ' + JSON.stringify(hostnames));
     });  
}); 