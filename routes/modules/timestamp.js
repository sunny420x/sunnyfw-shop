module.exports = (message) => {
    console.log('[' + new Date().toLocaleString('en-GB', {
        timezone:'Asia/Bangkok'
    }).substring(11,23) + ' ] ->', message)
}