module.exports = (app,sha256) => {
    let db = require('../database')
    const timeStamp = require('./modules/timestamp')

    //Home Page
    app.get("/", (req,res) => {
        const is_admin = require('./modules/check_admin')(req,res)
        db.query("SELECT * FROM products ORDER BY id DESC LIMIT 0,6", (err,products) => {
            if(err) throw err;
            db.query("SELECT category FROM products GROUP BY category", (err,category) => {
                if(err) throw err;
                if(is_admin != undefined) {
                    res.render('home', {
                        products:products,
                        category:category,
                        is_admin:is_admin
                    })
                } else {
                    res.render('home', {
                        products:products,
                        category:category
                    })
                }
                res.end()
            })
        })
    })

    app.get("/products", (req,res) => {
        const is_admin = require('./modules/check_admin')(req,res)
        db.query("SELECT * FROM products ORDER BY id DESC", (err,products) => {
            if(err) throw err;
            db.query("SELECT category FROM products GROUP BY category", (err,category) => {
                if(err) throw err;
                if(is_admin != undefined) {
                    res.render('products', {
                        products:products,
                        category:category,
                        is_admin:is_admin
                    })
                } else {
                    res.render('products', {
                        products:products,
                        category:category
                    })
                }
                res.end()
            })
        })
    })

    app.get("/install", (req,res) => {
        db.query("SELECT * FROM admin,products", (err,result) => {
            if(err) {
                if(err.code = "ER_NO_SUCH_TABLE") {
                    require('./install')(sha256)
                    res.cookie('alert', 'successfullyinstall')
                    res.redirect("/")
                    res.end()
                }
            } else {
                res.redirect("/")
                res.end()
            }
        })
    })

    //About Page
    app.get("/about", (req,res) => {
        const is_admin = require('./modules/check_admin')(req,res)
        if(is_admin != undefined) {
            res.render('about', {is_admin:is_admin})
        }
        res.end()
    })

    //Read Page
    app.get("/view/:id", (req,res) => {
        const is_admin = require('./modules/check_admin')(req,res)
        var id = req.params.id
        if(id != undefined) {
            db.query("SELECT * FROM products WHERE id = ? LIMIT 1", [id], (err,result) => {
                if(err) throw err;
                db.query("SELECT * FROM products WHERE id != ? ORDER BY id DESC LIMIT 5", [id],(err,more_products) => {
                    if(err) throw err;
                    res.render('view', {
                        result:result,
                        more_products:more_products,
                        is_admin:is_admin
                    })
                    res.end()
                })
            })
        }
    })
}