/*
    currying 又称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，
    而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之
    前传入的参数都会一次性用于求值。
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
