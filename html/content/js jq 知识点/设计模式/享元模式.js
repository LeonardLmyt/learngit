/*
    享元（flyweight）模式是一种用于性能优化的模式，“fly”在这里是苍蝇的意思，意为蝇量
	级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。
	如果系统中因为创建了大量类似的对象而导致内存占用过高，享元模式就非常有用了。在
	JavaScript 中，浏览器特别是移动端的浏览器分配的内存并不算多，如何节省内存就成了一件非
	常有意义的事情。
*/






//明确了uploadType 作为内部状态之后，我们再把其他的外部状态从构造函数中抽离出来，Upload 构造函数中只保留uploadType 参数：

var Upload = function(uploadType) {
		this.uploadType = uploadType;
	};
	
//Upload.prototype.init 函数也不再需要，因为upload 对象初始化的工作被放在了upload-Manager.add 函数里面，接下来只需要定义Upload.prototype.del 函数即可：
Upload.prototype.delFile = function(id) {
	uploadManager.setExternalState(id, this); // (1)
	if (this.fileSize < 3000) {
		return this.dom.parentNode.removeChild(this.dom);
	}
	if (window.confirm('确定要删除该文件吗? ' + this.fileName)) {
		return this.dom.parentNode.removeChild(this.dom);
	}
};
/*
	 在开始删除文件之前，需要读取文件的实际大小，而文件的实际大小被储存在外部管理器
	uploadManager 中，所以在这里需要通过uploadManager.setExternalState 方法给共享对象设置正确
	的fileSize，上段代码中的(1)处表示把当前id 对应的对象的外部状态都组装到共享对象中。
*/

//接下来定义一个工厂来创建upload 对象，如果某种内部状态对应的共享对象已经被创建过，那么直接返回这个对象，否则创建一个新的对象：
var UploadFactory = (function() {
	var createdFlyWeightObjs = {};
	return {
		create: function(uploadType) {
			if (createdFlyWeightObjs[uploadType]) {
				return createdFlyWeightObjs[uploadType];
			}
			return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
		}
	}
})();


/*
    现在我们来完善前面提到的uploadManager 对象，它负责向UploadFactory 提交创建对象的请
	求，并用一个uploadDatabase 对象保存所有upload 对象的外部状态，以便在程序运行过程中给
	upload 共享对象设置外部状态，代码如下：
*/
var uploadManager = (function() {
	var uploadDatabase = {};
	return {
		add: function(id, uploadType, fileName, fileSize) {
			var flyWeightObj = UploadFactory.create(uploadType);
			var dom = document.createElement('div');
			dom.innerHTML = '<span>文件名称:' + fileName + ', 文件大小: ' + fileSize + '</span>' + '<button class="delFile">删除</button>';
			dom.querySelector('.delFile').onclick = function() {
				flyWeightObj.delFile(id);
			}
			document.body.appendChild(dom);
			uploadDatabase[id] = {
				fileName: fileName,
				fileSize: fileSize,
				dom: dom
			};
			return flyWeightObj;
		},
		setExternalState: function(id, flyWeightObj) {
			var uploadData = uploadDatabase[id];
			for (var i in uploadData) {
				flyWeightObj[i] = uploadData[i];
			}
		}
	}
})();


//然后是开始触发上传动作的startUpload 函数：
var id = 0;
window.startUpload = function(uploadType, files) {
	for (var i = 0, file; file = files[i++];) {
		var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
	}
};

//测试：
startUpload('plugin', [{
	fileName: '1.txt',
	fileSize: 1000
}, {
	fileName: '2.html',
	fileSize: 3000
}, {
	fileName: '3.txt',
	fileSize: 5000
}]);
startUpload('flash', [{
	fileName: '4.txt',
	fileSize: 1000
}, {
	fileName: '5.html',
	fileSize: 3000
}, {
	fileName: '6.txt',
	fileSize: 5000
}]);








/*
    享元模式是一种很好的性能优化方案，但它也会带来一些复杂性的问题，从前面两组代码的
	比较可以看到，使用了享元模式之后，我们需要分别多维护一个factory 对象和一个manager 对
	象，在大部分不必要使用享元模式的环境下，这些开销是可以避免的。
	享元模式带来的好处很大程度上取决于如何使用以及何时使用，一般来说，以下情况发生时
	便可以使用享元模式。
	 一个程序中使用了大量的相似对象。
	 由于使用了大量对象，造成很大的内存开销。
	 对象的大多数状态都可以变为外部状态。
	 剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。
	可以看到，文件上传的例子完全符合这四点。
*/