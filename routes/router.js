exports.index = function(req,res){
    res.render('index.html');
}

exports.login = function(req,res){
    res.render('login.html');
}

exports.about = function(req,res){
    res.render('about.html');
}

exports.join = function(req,res){
    res.render('join.html');
}
