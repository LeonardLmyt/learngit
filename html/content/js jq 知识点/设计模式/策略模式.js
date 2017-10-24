//策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并且它们可以相互替换。

var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
}

var calculatBonus = function (level,salary) {
    return strategies[level](salary);
}

console.log(calculatBonus('S', 3000));
console.log(calculatBonus('A', 3000));