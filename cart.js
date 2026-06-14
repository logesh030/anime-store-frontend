let cart =
JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();
displayCart();

function updateCartCount()
{
    const totalItems = cart.reduce(
        (sum,item) => sum + item.quantity,
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if(cartCount)
    {
        cartCount.innerText = totalItems;
    }
}

function displayCart()
{
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");
   
        if(!cartItems || !totalPrice)
    {
        return;
    }
    cartItems.innerHTML = "";

    if(cart.length === 0)
    {
        cartItems.innerHTML =
            "<h3>Your cart is empty 🛒</h3>";

        totalPrice.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item,index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
<div class="cart-item">

    <div class="cart-product">
        <img src="${item.image}" alt="${item.name}">
        <div>
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
        </div>
    </div>

    <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
    </div>

    <span class="item-total">
        ₹${item.price * item.quantity}
    </span>

    <button class="remove-btn"
        onclick="removeFromCart(${index})">
        ❌
    </button>

</div>
`;
    });

    totalPrice.textContent = total;
}
function removeFromCart(index)
{
    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}
function increaseQuantity(index)
{
    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
    displayCart();
}
function decreaseQuantity(index)
{
    if(cart[index].quantity>1)
    {
        cart[index].quantity--;
    }
    else{
        cart.splice(index,1);
    }
    localStorage.setItem(
        "cart",JSON.stringify(cart)
    );
    updateCartCount();
    displayCart();
}
function checkout()
{
    if(cart.length === 0)
    {
        alert("Your cart is empty!");
        return;
    }
    const popup =
document.getElementById("successPopup");

if(popup)
{
    popup.classList.add("show");
}

    cart=[];

    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartCount();
    displayCart();

    setTimeout(() => {
    if(popup)
    {
        popup.classList.remove("show");
    }
},3000);
}