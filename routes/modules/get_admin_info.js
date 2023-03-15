module.exports = (req,res) => {
    const db = require('../../database')
    var admin_info = req.signedCookies.login_info
    admin_info = admin_info.split(":")
    return admin_info;
}