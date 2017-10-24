/*
    这种给对象动态地增加职责的方式称为装饰者（decorator）模式。装饰者模式能够在不改变对象自身的基础上，
    在程序运行期间给对象动态地添加职责。
*/


//JavaScript 语言动态改变对象相当容易，我们可以直接改写对象或者对象的某个方法，并不需要使用“类”来实现装饰者模式，代码如下：
var plane = {
    fire: function () {
        console.log('发射普通子弹');
    }
}
var missileDecorator = function () {
    console.log('发射导弹');
}
var atomDecorator = function () {
    console.log('发射原子弹');
}

var fire1 = plane.fire;
plane.fire = function () {
    fire1();
    missileDecorator();
}
var fire2 = plane.fire;
plane.fire = function () {
    fire2();
    atomDecorator();
}
plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹 