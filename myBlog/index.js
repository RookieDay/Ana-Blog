var path = require('path');
var express = require('express');
var seesion = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');

var app = express();

//设置模版目录
app.set('views', path.join(__dirname, 'views'));
//设置模版引擎为ejs
app.set('view engine', 'ejs');

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//seesion 中间件
app.use(session({
    name: config.seesion.key, //设置cookie中保存session id的字段名称
    secret: config.session.secret, //通过设置secret来计算hash值并放在cookie中，使产生的siginedCookie防篡改
    resave: true, //强制更新session
    saveUninitialized: false, //设置为false,强制创建一个seesion, 即使用户未登录
    cookie: {
        maxAge: config.session.maxAge //过期时间，过期后cookie中的session id自动删除
    },
    store: new MongoStore({ //session存储到mongodb
        url: config.mongodb //mongodb 地址
    })
}));

// flash中间件，用来显示通知
app.use(flash());

// 路由
routes(app);

//监听端口 启动程序
app.listen(config.port, function() {
    console.log(`${pkg.name} listening on port ${config.port}`);
});

// 注意：中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；flash 中间件应该放到 session 中间件之后加载，因为 flash 是基于 session 的。