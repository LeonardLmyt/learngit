/*
    模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式。在传统的面向对象语
	言中，一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以我们把
	这部分逻辑抽象到父类的模板方法里面。而子类的方法具体怎么实现则是可变的，于是我们把这
	部分变化的逻辑封装到子类中。通过增加新的子类，我们便能给系统增加新的功能，并不需要改
	动抽象父类以及其他子类，这也是符合开放封闭原则的。
*/

var Beverage = function(param) {
		var boilWater = function() {
				console.log('把水煮沸');
			};
		var brew = param.brew || function() {
			throw new Error('必须传递brew 方法');
		};
		var pourInCup = param.pourInCup || function() {
			throw new Error('必须传递pourInCup 方法');
		};
		var addCondiments = param.addCondiments || function() {
			throw new Error('必须传递addCondiments 方法');
		};
		var F = function() {};
		F.prototype.init = function() {
			boilWater();
			brew();
			pourInCup();
			addCondiments();
		};
		return F;
	};
var Coffee = Beverage({
	brew: function() {
		console.log('用沸水冲泡咖啡');
	},
	pourInCup: function() {
		console.log('把咖啡倒进杯子');
	},
	addCondiments: function() {
		console.log('加糖和牛奶');
	}
});
var Tea = Beverage({
	brew: function() {
		console.log('用沸水浸泡茶叶');
	},
	pourInCup: function() {
		console.log('把茶倒进杯子');
	},
	addCondiments: function() {
		console.log('加柠檬');
	}
});
var coffee = new Coffee();
coffee.init();
var tea = new Tea();
tea.init();

