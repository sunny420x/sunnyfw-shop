module.exports = (sha256) => {
    var db = require('../database')
    var timeStamp = require('./modules/timestamp')

    //default admin account
    var username = "admin"
    var password = sha256(process.env.DEFAULT_PASSWORD)

    //SQL Commands.
    var sql1 = "CREATE TABLE products(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, title VARCHAR(200) NOT NULL, contents MEDIUMTEXT NOT NULL, category VARCHAR(50) NOT NULL, price DOUBLE NOT NULL, cover VARCHAR(200) NOT NULL DEFAULT '/image/default.jpeg', is_show INT(1) DEFAULT 0 NOT NULL)"
    var sql2 = "CREATE TABLE admin(id INT(6) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(200) NOT NULL)"
    var sql3 = "INSERT INTO admin(username,password) VALUES(?,?)"
    var sql4 = "CREATE TABLE orders(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, product_id INT(6) NOT NULL, amount INT(6) NOT NULL, status INT(1) DEFAULT 0)"

    //Install Products Table.
    function install_products_table() {
        db.query(sql1, (err,result) => {
            if(err) throw err;
            timeStamp("[+] Create Table products Successful!")
        })
    }
    //Install Admin Table.
    function install_admin_table() {
        db.query(sql2, (err,result) => {
            if(err) throw err;
            timeStamp("[+] Create Table admin Successful!")
        })
        db.query(sql4, (err,result) => {
            if(err) throw err;
            timeStamp("[+] Create admin account Successful!")
        })
    }

    function install_orders_table() {
        db.query(sql3, [username,password], (err,result) => {
            if(err) throw err;
            timeStamp("[+] Create Table orders Successful!")
        })
    }
}