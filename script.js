// Cart functionality using localStorage
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            let product = button.parentElement;
            let productId = product.getAttribute("data-id");
            let productName = product.getAttribute("data-name");
            let productPrice = product.getAttribute("data-price");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${productName} added to cart!`);
        });
    });
});

document.getElementById("filter-btn").addEventListener("click", function() {
    let minPrice = parseInt(document.getElementById("min-price").value) || 0;
    let maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;

    document.querySelectorAll(".product").forEach(product => {
        let price = parseInt(product.getAttribute("data-price"));

        if (price >= minPrice && price <= maxPrice) {
            product.style.display = "block"; // Show product
        } else {
            product.style.display = "none"; // Hide product
        }
    });
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalCount;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("filter-btn").addEventListener("click", function () {
        let minPrice = parseInt(document.getElementById("min-price").value) || 0;
        let maxPrice = parseInt(document.getElementById("max-price").value) || Infinity;

        document.querySelectorAll(".product").forEach(product => {
            let price = parseInt(product.getAttribute("data-price"));

            if (price >= minPrice && price <= maxPrice) {
                product.style.display = "block"; // Show product
            } else {
                product.style.display = "none"; // Hide product
            }
        });
    });
});

