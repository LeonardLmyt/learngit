/*
    对象池维护一个装载空闲对象的池子，如果需要对象的时候，不是直接new，而是转从对象池里获取。如
	果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后， 再进入
	池子等待被下次获取。
*/

var objectPoolFactory = function(createObjFn) {
		var objectPool = [];
		return {
			create: function() {
				var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
				return obj;
			},
			recover: function(obj) {
				objectPool.push(obj);
			}
		}
	};

var iframeFactory = objectPoolFactory(function() {
	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	iframe.onload = function() {
		iframe.onload = null; // 防止iframe 重复加载的bug
		iframeFactory.recover(iframe); // iframe 加载完成之后回收节点
	}
	return iframe;
});

var iframe1 = iframeFactory.create();
iframe1.src = 'http://www.baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http://www.QQ.com';
setTimeout(function() {
	var iframe3 = iframeFactory.create();
	iframe3.src = 'http://www.163.com';
}, 3000);








