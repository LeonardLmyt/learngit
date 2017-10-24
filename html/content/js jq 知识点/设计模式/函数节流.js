var throttle = function (fn,interval) {
    var __self = fn, //������Ҫ����ʱִ�еĺ���
        timer, //��ʱ��
        firstTime = true; //�Ƿ��һ�ε���

    return function () {
        var args = arguments,
            __me = this;

        if (firstTime) { //����ǵ�һ�ε��ã������ӳ�ִ��
            __self.apply(__me, args);
            return firstTime = false;
        }

        if (timer) { //�����ʱ�����ڣ�˵��ǰһ����ʱִ�л�û�����
            return false;
        }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);

        }, interval || 500);
    }
}

window.onresize = throttle(function () {
    console.log(1);
}, 500)