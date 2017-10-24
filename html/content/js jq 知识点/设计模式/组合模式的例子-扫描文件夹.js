/*
    组合模式如果运用得当，可以大大简化客户的代码。一般来说，组合模式适用于以下这两种
	情况。
	 表示对象的部分整体层次结构。组合模式可以方便地构造一棵树来表示对象的部分整
	体结构。特别是我们在开发期间不确定这棵树到底存在多少层次的时候。在树的构造最
	终完成之后，只需要通过请求树的最顶层对象，便能对整棵树做统一的操作。在组合模
	式中增加和删除树的节点非常方便，并且符合开放封闭原则。
	 客户希望统一对待树中的所有对象。组合模式使客户可以忽略组合对象和叶对象的区别，
	客户在面对这棵树的时候，不用关心当前正在处理的对象是组合对象还是叶对象，也就
	不用写一堆if、else 语句来分别处理它们。组合对象和叶对象会各自做自己正确的事情，
	这是组合模式最重要的能力。
	

    文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，又可以
	包含其他文件夹，最终可能组合成一棵树，组合模式在文件夹的应用中有以下两层好处。
	 例如，我在同事的移动硬盘里找到了一些电子书，想把它们复制到F 盘中的学习资料文
	件夹。在复制这些电子书的时候，我并不需要考虑这批文件的类型，不管它们是单独的
	电子书还是被放在了文件夹中。组合模式让Ctrl+V、Ctrl+C 成为了一个统一的操作。
	 当我用杀毒软件扫描该文件夹时，往往不会关心里面有多少文件和子文件夹，组合模式
	使得我们只需要操作最外层的文件夹进行扫描。
*/
var Folder = function(name) {
		this.name = name;
		this.parent = null; //增加this.parent 属性
		this.files = [];
	};
Folder.prototype.add = function(file) {
	file.parent = this; //设置父对象
	this.files.push(file);
};
Folder.prototype.scan = function() {
	console.log('开始扫描文件夹: ' + this.name);
	for (var i = 0, file, files = this.files; file = files[i++];) {
		file.scan();
	}
};

//接下来增加Folder.prototype.remove 方法，表示移除该文件夹：
Folder.prototype.remove = function() {
	if (!this.parent) { //根节点或者树外的游离节点
		return;
	}
	for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
		var file = files[l];
		if (file === this) {
			files.splice(l, 1);
		}
	}
};
var File = function(name) {
		this.name = name;
		this.parent = null;
	};
File.prototype.add = function() {
	throw new Error('不能添加在文件下面');
};
File.prototype.scan = function() {
	console.log('开始扫描文件: ' + this.name);
};
File.prototype.remove = function() {
	if (!this.parent) { //根节点或者树外的游离节点
		return;
	}
	for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
		var file = files[l];
		if (file === this) {
			files.splice(l, 1);
		}
	}
};

//下面测试一下我们的移除文件功能：
var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file1 = new Folder('深入浅出Node.js');

folder1.add(new File('JavaScript 设计模式与开发实践'));
folder.add(folder1);
folder.add(file1);
folder1.remove(); //移除文件夹


//运用了组合模式之后，扫描整个文件夹的操作也是轻而易举的，我们只需要操作树的最顶端对象：
folder.scan();