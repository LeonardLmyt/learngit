//迭代器模式是提供一种方法访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示


//var agg = (function () {
//    var index = 0,
//    data = [1, 2, 3, 4, 5],
//    length = data.length;

//    return {
//        next: function () {
//            var element;
//            if (!this.hasNext()) {
//                return null;
//            }
//            element = data[index];
//            index = index + 2;
//            return element;
//        },

//        hasNext: function () {
//            return index < length;
//        },

//        rewind: function () {
//            index = 0;
//        },

//        current: function () {
//            return data[index];
//        }

//    };
//}());
////使用方法和平时C#里的方式是一样的：

//// 迭代的结果是：1,3,5
//while (agg.hasNext()) {
//    console.log(agg.next());
//}
////当然，你也可以通过额外的方法来重置数据，然后再继续其它操作：

//// 重置
//agg.rewind();
//console.log(agg.current()); // 1



/**********************迭代器**************************/
var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        if (callback(i, ary[i]) === false) { // 把下标和元素当作参数传给 callback 函数
            break; //callback 的执行结果返回 false，提前终止迭代
        }
    }
};

each([10, 2, 3, 4, 5], function (i, n) {
    if (i > 3) { // n 大于 3 的时候终止循环
        return false;
    }
    console.log(n);
})


/***********************倒序迭代器***************************/
var reverseEach = function (ary, callback) {
    for (var l = ary.length - 1; l >= 0; l--) {
        callback(l, ary[l]);
    }
};

reverseEach([0, 1, 2], function (i, n) {
    console.log(n); // 分别输出：2, 1 ,0 
});


/********************外部迭代器************************/
var Iterator = function (obj) {
    var current = 0;
    var next = function () {
        current += 1;
    };
    var isDone = function () {
        return current >= obj.length;
    };
    var getCurrItem = function () {
        return obj[current];
    };
    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem
    }
};

var compare = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
            throw new Error('iterator1 和 iterator2 不相等');
        }
        iterator1.next();
        iterator2.next();
    }
    console.log('iterator1 和 iterator2 相等');
}

var iterator1 = Iterator([1, 2, 3]);
var iterator2 = Iterator([1, 2, 3]);
compare(iterator1, iterator2); // 输出：iterator1 和 iterator2 相等 
