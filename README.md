### Ana-Blog
- Promise / RESTful / Session Cookie / 中间件
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

- 博客开始

对应文件及文件夹的用处：
1. `models`: 存放操作数据库的文件
2. `public`: 存放静态文件，如样式、图片等
3. `routes`: 存放路由文件
4. `views`: 存放模板文件
5. `index.js`: 程序主文件
6. `package.json`: 存储项目名、描述、作者、依赖等等信息

运行以下命令安装所需模块：

```
npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save
```
对应模块的用处：

1. `express`: web 框架
2. `express-session`: session 中间件
3. `connect-mongo`: 将 session 存储于 mongodb，结合 express-session 使用
4. `connect-flash`: 页面通知提示的中间件，基于 session 实现
5. `ejs`: 模板
6. `express-formidable`: 接收表单及文件的上传中间件
7. `config-lite`: 读取配置文件
8. `marked`: markdown 解析
9. `moment`: 时间格式化
10. `mongolass`: mongodb 驱动
11. `objectid-to-timestamp`: 根据 ObjectId 生成时间戳
12. `sha1`: sha1 加密，用于密码加密
13. `winston`: 日志
14. `express-winston`: 基于 winston 的用于 express 的日志中间件

- 配置
不管是小项目还是大项目，将配置与代码分离是一个非常好的做法。我们通常将配置写到一个配置文件里，如 config.js 或 config.json ，并放到项目的根目录下。但通常我们都会有许多环境，如本地开发环境、测试环境和线上环境等，不同的环境的配置不同，我们不可能每次部署时都要去修改引用 config.test.js 或者 config.production.js。config-lite 模块正是你需要的。

[config-lite](https://www.npmjs.com/package/config-lite) 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（`NODE_ENV`）的不同从当前执行进程目录下的 config 目录加载不同的配置文件。如果不设置 `NODE_ENV`，则读取默认的 default 配置文件，如果设置了 `NODE_ENV`，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 `NODE_ENV=test node app` 启动，则通过 `require('config-lite')` 会依次降级查找 `config/test.js`、`config/test.json`、`config/test.node`、`config/test.yml`、`config/test.yaml` 并合并 default 配置; 如果程序以 `NODE_ENV=production node app` 启动，则通过 `require('config-lite')` 会依次降级查找 `config/production.js`、`config/production.json`、`config/production.node`、`config/production.yml`、`config/production.yaml` 并合并 default 配置。

```
default.js
1. port: 程序启动要监听的端口号
2. session: express-session 的配置信息，后面介绍
3. mongodb: mongodb 的地址，myblog 为 db 名

```

-  api 的设计应尽量遵循 restful 风格
1. http://www.ruanyifeng.com/blog/2011/09/restful
2. http://www.ruanyifeng.com/blog/2014/05/restful_api.html
3. http://developer.51cto.com/art/200908/141825.htm
4. http://blog.jobbole.com/41233/

会话
由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）

我们通过引入 express-session 中间件实现对会话的支持：
```
app.use(session(options))
```
session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 `{}`，当我们登录后设置 `req.session.user = 用户信息`，返回浏览器的头信息中会带上 `set-cookie` 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 `req.session.user`。

页面通知
我们还需要这样一个功能：当我们操作成功时需要显示一个成功的通知，如登录成功跳转到主页时，需要显示一个 登陆成功 的通知；当我们操作失败时需要显示一个失败的通知，如注册时用户名被占用了，需要显示一个 用户名已占用 的通知。通知只显示一次，刷新后消失，我们可以通过 connect-flash 中间件实现这个功能。
[connect-flash](https://www.npmjs.com/package/connect-flash) 是基于 session 实现的，它的原理很简单：设置初始值 `req.session.flash={}`，通过 `req.flash(name, value)` 设置这个对象下的字段和值，通过 `req.flash(name)` 获取这个对象下的值，同时删除这个字段。

权限控制
不管是论坛还是博客网站，我们没有登录的话只能浏览，登陆后才能发帖或写文章，即使登录了你也不能修改或删除其他人的文章，这就是权限控制。我们也来给博客添加权限控制，如何实现页面的权限控制呢？我们可以把用户状态的检查封装成一个中间件，在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制。在 myblog 下新建 middlewares 文件夹，在该目录下新建 check.js，添加如下代码：

- 页面设计
我们使用 jQuery + Semantic-UI 实现前端页面的设计
我们可以将模板拆分成一些组件，然后使用 ejs 的 include 方法将组件组合起来进行渲染。

app.locals 和 res.locals ->express 中有两个对象可用于模板的渲染

- 链接数据库
我们使用 Mongolass 这个模块操作 mongodb 进行增删改查

node-mongodb-native 、Mongoose、Mongolass

- 注册与文件上传
我们使用 express-formidable 处理 form 表单（包括文件上传）

- 测试
修改package.json如下：
```
  "scripts": {
    "test": "mocha --harmony test"
  }
```
mocha 和 suptertest 是常用的测试组合，通常用来测试 restful 的 api 接口，这里我们也可以用来测试我们的博客应用。在 myblog 下新建 test 文件夹存放测试文件，以注册为例讲解 mocha 和 supertest 的用法

我们写测试肯定想覆盖所有的情况（包括各种出错的情况及正确时的情况），但光靠想需要写哪些测试是不行的，总也会有疏漏，最简单的办法就是可以直观的看出测试是否覆盖了所有的代码，这就是测试覆盖率，即被测试覆盖到的代码行数占总代码行数的比例。

>注意：即使测试覆盖率达到 100% 也不能说明你的测试覆盖了所有的情况，只能说明基本覆盖了所有的情况。
>istanbul 是一个常用的生成测试覆盖率的库，它会将测试的结果报告生成 html 页面，并放到项目根目录的 coverage 目录下。
修改package.json如下
```
"scripts": {
  "test": "node --harmony ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha"
}
```