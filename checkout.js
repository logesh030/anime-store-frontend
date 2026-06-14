let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
    total += item.price * item.quantity;
});

document.getElementById("checkoutTotal")
.innerText = total;

document.getElementById("checkoutForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    const order = {
        customerName:
            document.getElementById("customerName").value,

        address:
            document.getElementById("address").value,

        phone:
            document.getElementById("phone").value,

        payment:
            document.querySelector(
                'input[name="payment"]:checked'
            ).value,

        items: cart,

        total: total,

        date:
            new Date().toLocaleString()
    };

    orders.push(order);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    localStorage.setItem(
        "cart",
        JSON.stringify([])
    );

    alert("Order placed successfully!");

    window.location.href =
        "orders.html";
});
const order = {
    total: totalPrice,
    date: new Date().toLocaleString()
};

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

orders.push(order);

localStorage.setItem("orders",
JSON.stringify(orders));