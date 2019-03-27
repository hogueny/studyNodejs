var express = require('express')
    , routes = require('./routes/router')
    , https = require('http')
    , path = require('path')
    , ejs = require('ejs');


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views',__dirname + '/views');
app.engine('.html',ejs.__express);
app.set('view engine','html');
app.use(express.static(path.join(__dirname, 'public')));

///
app.get('/',routes.index);
app.get('/login',routes.login);
app.get('/about',routes.about);
app.get('/join',routes.join);
//server start
https.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));;
    console.log('http://localhost:3000');
});