var os = require("os");

// CPU ���ֽ���
console.log('endianness : ' + os.endianness());

// ����ϵͳ��
console.log('type : ' + os.type());

// ����ϵͳ��
console.log('platform : ' + os.platform());

// ϵͳ�ڴ�����
console.log('total memory : ' + os.totalmem() + " bytes.");

// ����ϵͳ�����ڴ���
console.log('free memory : ' + os.freemem() + " bytes.");