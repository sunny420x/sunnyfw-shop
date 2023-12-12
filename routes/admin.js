module.exports = (app,sha256) => {
    const db = require('../database')
    const timeStamp = require('./modules/timestamp')

    app.get("/admin", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            db.query("SELECT id,title,price FROM products ORDER BY id DESC", (err,products) => {
                if(err) throw err;
                db.query("SELECT o.id, o.status, o.product_id, p.title, p.price, o.amount FROM orders as o JOIN products as p ON p.id = o.product_id ORDER BY o.id DESC", (err,orders) => {
                    if(err) throw err;
                    res.render("admin/home", {products:products,orders:orders,is_admin:is_admin})
                    res.end()
                })
            })
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })

    app.get("/admin/login", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            res.redirect("/admin")
            res.end()
        } else {
            res.render("admin/login")
            res.end()
        }
    })

    app.get('/admin/logout', (req,res) => {
        if (req.session.loggedin) {
            timeStamp('[+] '+req.signedCookies.login_info+' has been logged out.')
            req.session.destroy()
            res.clearCookie('login_info')
            res.cookie('alert', 'loggedout')
            res.redirect('/admin/login')
            res.end()
        } else {
            res.redirect('/admin/login')
            res.end()
        }
    })

    app.post("/admin/login", (req,res) => {
        var username = req.body.username
        var password_hash = sha256(req.body.password)
        var remember = req.body.remember
        
        if(remember == 1) {
            var expires = 29.6 * 24 * 60 * 60 * 1000
        } else { 
            var expires = 24 * 60 * 60 * 1000
        }

        db.query("SELECT * FROM admin WHERE username = ? and password = ?", [username,password_hash], (err,result) => {
            if(result.length == 1) {
                req.session.loggedin = true
                req.session.username = username
                res.cookie('login_info', username+":"+password_hash, {signed: true, maxAge: expires})
                res.cookie('alert', "loggedin")
                res.redirect('/admin')
                timeStamp('[+] Login Successfully for '+username)
                res.end()
            } else {
                res.cookie('alert', 'wrongpassword')
                res.redirect('/admin/login')
                res.end()
            }
        })
    })

    //START Create Edit Delete Contents
    app.get("/admin/products/add", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        var admin_info = require('./modules/get_admin_info')(req,res)
        if(is_admin == true) {
            res.render('admin/products/add', {
                is_admin:is_admin,
                admin_info:admin_info[0],
                is_admin:is_admin
            })
            res.end()
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })
    app.post("/admin/products/add", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            var title = req.body.title
            var contents = req.body.contents
            var price = req.body.price
            var cover = req.body.cover
            var category = req.body.category
            var is_show = req.body.is_show

            if(is_show != 1) {
                is_show = 0
            }

            db.query("INSERT INTO products(title,contents,price,cover,category,is_show) VALUES(?,?,?,?,?,?)", 
            [title,contents,price,cover,category,is_show], (err,result) => {
                if(err) throw err;
                timeStamp('[+] Inserted '+title+' into products')
                res.redirect('/admin')
                res.end()
            })
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })
    app.get("/admin/products/edit/:id", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            var id = req.params.id
            db.query("SELECT * FROM products WHERE id = ? LIMIT 1", [id], (err,product) => {
                if(err) throw err;
                if(product.length > 0) {
                    res.render('admin/products/edit', {product:product[0],is_admin:is_admin})
                    res.end()
                } else {
                    timeStamp("[!] Cannot Fetch product id = "+id)
                }
            })
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })
    app.post("/admin/products/edit", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            var id = req.body.id
            var title = req.body.title
            var content = req.body.content
            var price = req.body.price
            var cover = req.body.cover
            var category = req.body.category
            var is_show = req.body.is_show
            if(is_show != 1) {
                is_show = 0
            }
            db.query("UPDATE products SET title = ?, contents = ?, price = ?, cover = ?, category = ?, is_show = ? WHERE id = ?",
            [title,content,price,cover,category,is_show,id], (err,result) => {
                if(err) throw err
                res.cookie('alert', 'successfullyupdate')
                res.redirect('/admin/products/edit/'+id)
                res.end()
            })
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })

    app.get("/admin/products/delete/:id", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            var id = req.params.id
            db.query("DELETE FROM products WHERE id = ?", [id], (err,result) => {
                if(err) throw err
                res.cookie('alert', 'successfullydelete')
                res.redirect('/admin')
                res.end()
            })
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })
    //END Create Edit Delete Contents

    // Orders
    app.get("/admin/orders/edit/:id", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            var id = req.params.id
            db.query("SELECT id,status FROM orders WHERE id = ? LIMIT 1", [id], (err,order) => {
                if(err) throw err;
                if(order.length == 1) {
                    res.render('admin/orders/edit', {order:order[0],is_admin:is_admin})
                    res.end()
                }
            })
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })
    app.post("/admin/orders/edit", (req,res) => {
        var is_admin = require('./modules/check_admin')(req,res)
        if(is_admin == true) {
            var id = req.body.id
            var status = req.body.status

            db.query("UPDATE orders SET status = ? WHERE id = ?", [status,id], (err,result) => {
                if(err) throw err
                res.cookie('alert', 'successfullyupdate')
                res.redirect('/admin/orders/edit/'+id)
                res.end()
            })
        } else {
            res.redirect("/admin/login")
            res.end()
        }
    })
}