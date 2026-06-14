const orderContainer = document.getElementById("orderContainer");

const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
    orderContainer.innerHTML = "<h2>No orders found</h2>";
} else {

    orders.forEach((order, index) => {

        orderContainer.innerHTML += `
        <div class="order-card">
            <h3>Order #${index + 1}</h3>
            <p>Total: ₹${order.total}</p>
            <p>Status: Delivered ✅</p>
            <p>Date: ${order.date}</p>
        </div>
        `;
    });

}