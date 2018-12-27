function dbCon(){

    var mysql = require('mysql');
    
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1111",
      database: "test2"
    });
    
    con.connect(function(err) {
    if (err) throw err;
        console.log("Connected!");
        //createTable();
        //insertUser();
        selectUser();
        //deleteUser();
        //updateUser();
    });
}

function createDatabase(){
    con.query("CREATE DATABASE test2", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  }
  
  function createTable() {
    
    
  
  function insertUser(){
   
  }
  
  function selectUser(){
   
  }
  
  function deleteUser(){
  
  }
  
  function updateUser(){
    
  }