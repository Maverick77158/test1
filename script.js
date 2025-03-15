// Cart functionality using localStorage
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            let product = button.parentElement;
            let productId = product.getAttribute("data-id");
            let productName = product.getAttribute("data-name");
            let productPrice = parseInt(product.getAttribute("data-price"));

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

    // Attach filter event listener
    document.getElementById("filter-btn").addEventListener("click", applyFilter);
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = totalCount;
}

function applyFilter() {
    let minPrice = document.getElementById("min-price").value;
    let maxPrice = document.getElementById("max-price").value;

    minPrice = minPrice ? parseInt(minPrice) : 0;
    maxPrice = maxPrice ? parseInt(maxPrice) : Infinity;

    document.querySelectorAll(".product").forEach(product => {
        let price = parseInt(product.getAttribute("data-price"));

        if (!isNaN(price) && price >= minPrice && price <= maxPrice) {
            product.style.display = "block"; // Show matching products
        } else {
            product.style.display = "none"; // Hide others
        }
    });
}
