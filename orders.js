const orders =
JSON.parse(localStorage.getItem("orders")) || [];

const ordersList =
document.getElementById("ordersList");

if(orders.length === 0)
{
    ordersList.innerHTML =
    "<h2>No orders found 📭</h2>";
}
else
{
    orders.reverse().forEach((order,index) => {

        let itemsHTML = "";

        order.items.forEach(item => {
            itemsHTML += `
                <li>
                    ${item.name}
                    x${item.quantity}
                    - ₹${item.price * item.quantity}
                </li>
            `;
        });

        ordersList.innerHTML += `
        <div class="order-card">

            <h2>Order #${orders.length - index}</h2>

            <p>
                <strong>Date:</strong>
                ${order.date}
            </p>

            <p>
                <strong>Name:</strong>
                ${order.customerName}
            </p>

            <p>
                <strong>Payment:</strong>
                ${order.payment}
            </p>

            <ul>
                ${itemsHTML}
            </ul>

            <h3>Total: ₹${order.total}</h3>

        </div>
        `;
    });
}