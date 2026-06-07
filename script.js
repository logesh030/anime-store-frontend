

let products= [];


const productContainer =
document.getElementById("productContainer");

async function loadProducts()
{
    try{
        console.log("Fetching products...");

        const response = await fetch("http://localhost:8080/products");

        console.log("Response:", response);

        products = await response.json();

        console.log("Products:", products);

        displayProducts(products);
    }
    catch(error)
    {
        console.error("Error loading products:", error);
    }
}

function displayProducts(productList){
productContainer.innerHTML = "";

productList.forEach(product => {
    productContainer.innerHTML +=`
    <div class="card">
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button onclick="addToCart(${product.id})">
    Add To Cart
    </button>
    </div>
    `;
});
}

let cart=JSON.parse(localStorage.getItem("cart")) || [];
document.getElementById("cartCount").innerText = cart.length;
displayCart();
function addToCart(id)
{
    const selectedProduct = products.find(
        product => product.id === id
    );
    const existingItem = cart.find(item => item.id === id);
    if(existingItem)
    {
        existingItem.quantity++;
    }
    else{

    cart.push({...selectedProduct, quantity: 1});
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    document.getElementById("cartCount").innerText =
        cart.length;

    showToast(
        selectedProduct.name + " added to cart!"
    );

    displayCart();
}

function showToast(message){
    const toast=document.getElementById("toast");
    toast.innerText=message;
    toast.classList.add("show");
    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);
}

const searchInput=document.getElementById("searchInput");
searchInput.addEventListener("input", ()=>{
    const value= searchInput.value.toLowerCase();
    const filteredProducts= products.filter(product =>
        product.name.toLowerCase().includes(value)
    );
    displayProducts(filteredProducts);
});
const themeBtn=document.getElementById("themeBtn");
if(themeBtn){
if(localStorage.getItem("theme")=== "dark"){
    document.body.classList.add("dark-mode");
}
themeBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode"))
    {
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
});
}
function displayCart()
{
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";

    let total=0;
    cart.forEach((item,index) => {
        total+=item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">
    <span>${item.name}</span>

    <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
    </div>

    <span>₹${item.price * item.quantity}</span>

    <button onclick="removeFromCart(${index})">
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
    localStorage.setItem("cart", JSON.stringify(cart));

document.getElementById("cartCount").innerText =
cart.length;

displayCart();
}
document.getElementById("cartCount").innerText =
cart.length;

displayCart();


function filterProducts(category)
{
    if(category === "All")
    {
        displayProducts(products);
        return;
    }
    const filteredProducts = products.filter(
        product => product.category === category
    );
    displayProducts(filteredProducts);

    
}
function increaseQuantity(index)
{
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
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
    document.getElementById("cartCount").innerText = cart.length;
    displayCart();
}
function checkout()
{
    if(cart.length === 0)
    {
        alert("Your cart is emptyt!");
        return;
    }
    document.getElementById("successPopup").classList.add("show");

    cart=[];

    localStorage.setItem("cart",JSON.stringify(cart));
    document.getElementById("cartCount").innerText=0;

    displayCart();

    setTimeout(() => {
        document.getElementById("successPopup").classList.remove("show");
    },3000);
}
const banners=[
    {
        title: "Naruto Collection",
        text: "Discover legendry ninja figures."
    },
    {
        title: "One Piece Collection",
        text: "Set sail with tha Straw Hats."
    },
    {
        title: "Dragon Ball Collection",
        text: "Power up with Saiyan warriors."
    },
];
let currentBanner=0;

const heroTitle= document.getElementById("heroTitle");
const heroText=document.getElementById("heroText");

setInterval(() => {
      currentBanner++;
      if(currentBanner >= banners.length)
      {
        currentBanner =0;
      }
      heroTitle.textContent = banners[currentBanner].title;

      heroText.textContent = banners[currentBanner].text;
}, 3000);
loadProducts();
