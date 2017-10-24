//命令模式是最简单和优雅的模式之一，命令模式中的命令（command）指的是一个执行某些特定事情的指令。
//javascript 命令模式的由来，其实是回调（callback）函数的一个面向对象的替代品。

var command = function (receiverObj) {
    this.receiver = receiverObj;
}
command.prototype = {
    exec: function () {
        this.receiver.doSomthing();//接收者的具体操作
    },
    undo: function () {
        this.reciver.backout();//撤销操作
    }
};

var invoker = function (cmdObj) {
    this.command = cmdObj;
}
invoker.prototype = {
    handle: function () {//调用者的一个操作
        this.command.exec();
        //不需要知道操作的对象是谁，有接收者负责，仅执行操作即可，
        //这样可以随意更改command参数，只要它实现了exec方法；
    }
};

