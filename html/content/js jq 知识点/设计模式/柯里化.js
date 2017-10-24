/*
    currying �ֳƲ�����ֵ��һ��currying�ĺ������Ȼ����һЩ��������������Щ����֮�󣬸ú���������������ֵ��
    ���Ǽ�����������һ���������ղŴ���Ĳ����ں����γɵıհ��б���������������������������Ҫ��ֵ��ʱ��֮
    ǰ����Ĳ�������һ����������ֵ��
*/


var cont = (function () {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            var money = 0;
            for (var i = 0, l = args.length; i < l; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args,arguments);
        }
    }
})();

cont(1);
cont(2);
cont(3);
console.log(cont());
