Function.prototype.before = function (beforefn) {
    var __self = this; //����ԭ����������
    return function () { //���ذ�����ԭ�������º����ġ���������
        beforefn.apply(this, arguments);  // ִ���º������ұ�֤this �����ٳ֣��º������ܵĲ���
                                          // Ҳ�ᱻԭ�ⲻ���ش���ԭ�������º�����ԭ����֮ǰִ��
        return __self.apply(this, arguments); // ִ��ԭ����������ԭ������ִ�н����
                                              // ���ұ�֤this �����ٳ�
    }
}

Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this.arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}


var func = function () {
    console.log(2);
}

func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
})

func();

