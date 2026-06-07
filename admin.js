const token =
localStorage.getItem("token");

if(!token)
{
    window.location.href =
    "admin-login.html";
}
const adminProducts =
document.getElementById("adminProducts");

async function loadProducts()
{
    const response =
        await fetch("http://localhost:8080/products");

    const products =
        await response.json();

       animateCounter(
    "totalProducts",
    products.length
);

const categories =
[...new Set(products.map(p => p.category))];

document.getElementById("totalCategories").textContent =
categories.length;

const totalValue =
products.reduce(
    (sum,p)=>sum+p.price,
    0
);

document.getElementById("inventoryValue").textContent =
"₹" + totalValue;

    adminProducts.innerHTML = "";

    products.forEach(product => {

        adminProducts.innerHTML += `
        <div class="card">

            <img src="${product.image}" width="100">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <button onclick="editProduct(${product.id})">Edit</button>

            <button onclick="deleteProduct(${product.id})">
                Delete
            </button>

        </div>
        `;
    });
}

document.getElementById("productForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const product = {

        name:
        document.getElementById("name").value,

        price:
        Number(document.getElementById("price").value),

        category:
        document.getElementById("category").value,

        image:
        document.getElementById("image").value
    };

    console.log(localStorage.getItem("token"));

    await fetch(
        "http://localhost:8080/products",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },

            body: JSON.stringify(product)
        }
    );
    document.getElementById("productForm").reset();

    loadProducts();
});

async function deleteProduct(id)
{
    await fetch(
        `http://localhost:8080/products/${id}`,
        {
    method: "DELETE",

    headers: {
        "Authorization":
        `Bearer ${localStorage.getItem("token")}`
    }
}
    );

    loadProducts();
}

loadProducts();

async function editProduct(id)
{
    const name = prompt("Enter new name:");
    const price = prompt("Enter new price:");
    const category = prompt("Enter new category:");
    const image = prompt("Enter new image URL:");

    const updatedProduct = {
        name: name,
        price: Number(price),
        category: category,
        image: image
    };

    console.log("Sending:", updatedProduct);

    const response = await fetch(
        `http://localhost:8080/products/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(updatedProduct)
        }
    );

    console.log("Status:", response.status);

    if(response.ok){
        const data = await response.json();
        console.log("Updated:", data);
    }

    loadProducts();
}

function animateCounter(id,target)
{
    let count=0;

    const speed=Math.ceil(target/40);

    const interval=setInterval(()=>{

        count+=speed;

        if(count>=target)
        {
            count=target;
            clearInterval(interval);
        }

        document.getElementById(id)
        .textContent=count;

    },20);
}

function logout()
{
    localStorage.removeItem(
        "token"
    );

    window.location.href =
    "admin-login.html";
}