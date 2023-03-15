module.exports = (req,res) => {
    var timeStamp = require('../modules/timestamp')
    
    //If admin has cookie
    if(req.signedCookies.login_info != undefined) {
        if(!req.session.loggedin) {
            //Assign Session "loggedin"
            req.session.loggedin = req.signedCookies.login_info
            timeStamp('[+] '+req.signedCookies.login_info+' is logged in!')
        }
    }
    
    if(req.session.loggedin) {
        is_admin = true
    } else {
        is_admin = false
    }

    return is_admin
}