
//Define Cart Array.
var cart = [];

function addtocart(id) {
    if(id != "") {
        cart.push(id);
        document.cookie = "Cart="+cart;
    }
}

function removefromcart(id) {
    if(id != "") {
        cart = cart.filter((row) => {
            return row !== id;
        })
    }
}