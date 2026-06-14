

let products= [];
let cart =
JSON.parse(localStorage.getItem("cart")) || [];

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


updateCartCount();

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

    updateCartCount();

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
function updateCartCount()
{
    const totalItems = cart.reduce((sum, item) => sum+item.quantity, 0);
    const cartCount =
document.getElementById("cartCount");

if(cartCount)
{
    cartCount.innerText = totalItems;
}
}
