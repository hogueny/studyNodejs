exports.index = function(req,res){
    res.render('index.html');
}

exports.login = function(req,res){
    res.render('login.html');
}

exports.login_ok = function(req,res){
    res.render('login_ok.html');
}

exports.about = function(req,res){
    res.render('about.html');
}

exports.join = function(req,res){
    res.render('join.html');
}

exports.join_ok = function(req,res){
    res.render('join_ok.html');
}