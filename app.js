// express 기본 모듈
var express = require('express')
    , routes = require('./routes/router')
    , https = require('http')
    , path = require('path');
// express 미들웨어
var ejs = require('ejs')
    , static = require('serve-static')
    , bodyParser = require('body-parser');
var app = express();

//기본속성
app.set('port', process.env.PORT || 3000);
//app.set('views',__dirname + '/views');
app.engine('.html',ejs.__express);
app.set('view engine','html');
//app.use(express.static(path.join(__dirname, 'public')));

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/view',static(path.join(__dirname,'view'))); 


///라우팅
app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/about',routes.about);
app.get('/join',routes.join);
app.get('/join_ok',routes.join_ok);

// 미들웨어
app.use(function(req,res,next){
    console.log('파라미터 주고받기 미들웨어');

    var parID = req.body.id || req.query.id;
    var parPW = req.body.pw || req.query.pw;
    
    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과</h1>');
    res.write('<div><p>ParID : '+parID+'</p></div>');
    res.write('<div><p>ParPW : '+parPW+'</p></div>');
    res.end();

})



//server start
https.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));;
    console.log('http://localhost:3000');
});