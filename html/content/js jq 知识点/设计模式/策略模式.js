//����ģʽ�Ķ����ǣ�����һϵ�е��㷨��������һ������װ�������������ǿ����໥�滻��

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