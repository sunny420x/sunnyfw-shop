function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

var cart = [];
if(getCookie("Cart") != null) {
    cart = getCookie("Cart");
    cart = cart.split(",");
}

function addtocart(id) {
    var amount = document.getElementById(`${id}_amount`).value
    if(id != "") {
        cart.push(id+":"+parseInt(amount));
        document.cookie = `Cart=${cart}`;
        Swal.fire({
            icon: 'success',
            title: 'Your item is added to cart!',
        })
    }
}

function removefromcart(id) {
    if(id != "") {
        cart = cart.filter((row) => {
            return row !== id;
        })
        document.cookie = "Cart="+cart;
        Swal.fire({
            icon: 'success',
            title: 'Your item is removed from cart!',
        }).then(() => {
            location.reload();
        })
    }
}