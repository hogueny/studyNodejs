var http = require('http');
var server = http.createServer();

var host = "192.168.0.1";
var port = 3000;
server.listen(port,3000,function () {
    console.log('server start');

});

server.on('request', function (req, res) {
    console.log('access');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("hello");
    res.end();
});

server.on('close',function () {
    console.log('end')


});

