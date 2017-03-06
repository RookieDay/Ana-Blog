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

- 路由
初始化一个express项目 -- 官网：http://www.expressjs.com.cn/
- 安装模版引擎ejs 
```
npm i ejs --save
app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

通过调用 res.render 函数渲染 ejs 模板，res.render 第一个参数是模板的名字，这里是 users 则会匹配 views/users.ejs，第二个参数是传给模板的数据，这里传入 name，则在 ejs 模板中可使用 name。res.render 的作用就是将模板和数据结合生成 html，同时设置响应头中的 Content-Type: text/html，告诉浏览器我返回的是 html，不是纯文本，要按 html 展示。
```

ejs 有 3 种常用标签：
1. <% code %>：运行 JavaScript 代码，不输出
2. <%= code %>：显示转义后的 HTML内容
3. <%- code %>：显示原始 HTML 内容

>注意：<%= code %> 和 <%- code %> 都可以是 JavaScript 表达式生成的字符串，当变量 code 为普通字符串时，两者没有区别。当 code 比如为 <h1>hello</h1> 这种字符串时，<%= code %> 会原样输出 <h1>hello</h1>，而 <%- code %> 则会显示 H1 大的 hello 字符串。

includes
我们使用模板引擎通常不是一个页面对应一个模板，这样就失去了模板的优势，而是把模板拆成可复用的模板片段组合使用，如在 views 下新建 header.ejs 和 footer.ejs，并修改 users.ejs：

我们将原来的 users.ejs 拆成出了 header.ejs 和 footer.ejs，并在 users.ejs 通过 ejs 内置的 include 方法引入，从而实现了跟以前一个模板文件相同的功能。

> 小提示：拆分模板组件通常有两个好处：
>
> 1. 模板可复用，减少重复代码
> 2. 主模板结构清晰

> 注意：要用 `<%- include('header') %>` 而不是 `<%= include('header') %>`

- 中间件
express 中的中间件（middleware）就是用来处理请求的，当一个中间件处理完，可以通过调用 next() 传递给下一个中间件，如果没有调用 next()，则请求不会往下传递，如内置的 res.render 其实就是渲染完 html 直接返回给客户端，没有调用 next()，从而没有传递给下一个中间件。看个小例子。
错误处理：
应用程序为我们自动返回了错误栈信息（express 内置了一个默认的错误处理器），假如我们想手动控制返回的错误内容，则需要加载一个自定义错误处理的中间件