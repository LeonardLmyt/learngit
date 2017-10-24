//单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点

var getSingle = function (fn) {
    var result;
    return function () { 
        return result || (result = fn.apply(this,arguments));
    }
}

/*
    创建对象的方法fn当成参数动态传入getSingle函数，封装在getSingle中
*/

var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是悬浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById("button").onclick = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}