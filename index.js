// var path = require('path');
// var express = require('express');
// var app = express();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// app.set('views', path.join(__dirname, 'views')); // 设置存放模板文件的目录
// app.set('view engine', 'ejs'); // 设置模板引擎为 ejs

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// app.listen(3000, function() {
//     console.log('listeing on port 3000');
// })


// 中间件
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    console.log('1');
    next(new Error('jaaja'));
});
app.use(function(req, res, next) {
    console.log('2');
    res.status(200).end();
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something broke!')
})
app.listen(3000);