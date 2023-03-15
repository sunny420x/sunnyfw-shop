module.exports = (sha256) => {
    const db = require('../database')
    const timeStamp = require('./modules/timestamp')

    //default admin account
    const username = "admin"
    const password = sha256(process.env.DEFAULT_PASSWORD)

    //SQL Commands.
    sql1 = "CREATE TABLE products(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, title VARCHAR(200) NOT NULL, contents MEDIUMTEXT NOT NULL, category VARCHAR(50) NOT NULL, price DOUBLE NOT NULL, cover VARCHAR(200) NOT NULL DEFAULT '/image/default.jpeg', is_show INT(1) DEFAULT 0 NOT NULL)"
    sql2 = "CREATE TABLE admin(id INT(6) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(200) NOT NULL)"
    sql3 = "INSERT INTO admin(username,password) VALUES(?,?)"

    //Install Products Table.
    db.query(sql1, (err,result) => {
        if(err) throw err;
        timeStamp("[+] Create Table products Successful!")
    })
    //Install Admin Table.
    db.query(sql2, (err,result) => {
        if(err) throw err;
        timeStamp("[+] Create Table admin Successful!")
    })
    db.query(sql3, [username,password], (err,result) => {
        if(err) throw err;
        timeStamp("[+] Create admin account Successful!")
    })
}