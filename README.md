### Ana-Blog
- 环境安装
 + Nodejs nrm 
 + MongoDB [MongoDB安装](https://www.mongodb.com/download-center?jmp=nav) 
 + 进入安装后的bin目录 启动服务 mongod.exe --dbpath d:\data\db
 + Robomongo [MongoDB 可视化管理工具](https://robomongo.org/download) 
- require
 + [require() 解读](http://www.ruanyifeng.com/blog/2015/05/require.html)    
 ```
 require 用来加载代码，而 exports 和 module.exports 则用来导出代码。

exports 和 module.exports 的区别:
1. module.exports 初始值为一个空对象 {}
2. exports 是指向的 module.exports 的引用
3. require() 返回的是 module.exports 而不是 exports
 ```
#### exports = module.exports = {...}

我们经常看到这样的写法：
```
exports = module.exports = {...}
```
上面的代码等价于:
```
module.exports = {...}
exports = module.exports
```
原理很简单：module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports。

> 小提示：ES6 的 import 和 export可以去学习阮一峰老师的[《ECMAScript6入门》](http://es6.ruanyifeng.com/)。

- Promise
```
1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise （基础）
2. http://liubin.org/promises-book/ （开源 Promise 迷你书）
3. http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/ （进阶）
4. https://promisesaplus.com/ （官方定义规范）

Promise 用于异步流程控制，生成器与 yield 也能实现流程控制（基于 co），但不在本教程讲解范围内，读者可参考我的另一部教程 [N-club](https://github.com/nswbmw/N-club)。async/await 结合 Promise 也可以实现流程控制，有兴趣请查阅 [《ECMAScript6入门》](http://es6.ruanyifeng.com/#docs/async#async函数)。

### 深入 Promise

- [深入 Promise(一)——Promise 实现详解](https://zhuanlan.zhihu.com/p/25178630)
- [深入 Promise(二)——进击的 Promise](https://zhuanlan.zhihu.com/p/25198178)
- [深入 Promise(三)——命名 Promise](https://zhuanlan.zhihu.com/p/25199781)
```

- 初始化
```
npm init 
npm i express@4.14.0 --save

index.js
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('hello, express');
});

app.listen(3000);

在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：

npm install -g supervisor
运行 supervisor --harmony index 启动程序
supervisor 会监听当前目录下 node 和 js 后缀的文件，当这些文件发生改动时，supervisor 会自动重启程序。

```