function dbCon(){

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "test2"
});
}


function createDatabase(){
  con.query("CREATE DATABASE test2", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
}

function createTable() {
  var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    })
  };

function insertUser(){
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function selectUser(){
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}

function deleteUser(){
  var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
}

function updateUser(){
  var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
}
dbCon();
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //createTable();
  //insertUser();
  selectUser();
  //deleteUser();
  //updateUser();
});


