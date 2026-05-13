// =============================
// 🌐 RENDER API BASE URL
// =============================
const API_URL = "https://autobill-frontend-a0m5.onrender.com";

// =============================
// 📦 TRACK STATE
// =============================
let InitialCount = -1;

// =============================
// 🔄 LOAD PRODUCTS (LIVE CART)
// =============================
const loadProducts = async () => {
    try {
        let res = await axios.get(`${API_URL}/cart`);
        let data = res.data;

        let products = data.cart;
        let total = data.grand_total;

        // Prevent re-render if no new items
        if (products.length <= InitialCount) return;

        let html = "";

        products.forEach(product => {
            html += `
            <div class="card">
                <h3>${product.label}</h3>

                <p><b>Price:</b> $${product.price}</p>
                <p><b>Quantity:</b> ${product.taken}</p>
                <p><b>Total:</b> $${product.total}</p>
            </div>
            `;
        });

        document.getElementById("home").innerHTML = html;
        document.getElementById("2").innerHTML = "CHECKOUT $" + total;

        InitialCount = products.length;

    } catch (err) {
        console.log("Load error:", err);
    }
};

// =============================
// 🔁 AUTO REFRESH (LIVE MODE)
// =============================
setInterval(loadProducts, 1500);

// =============================
// 🧹 CHECKOUT FUNCTION
// =============================
const checkout = async () => {
    try {
        document.getElementById("2").innerHTML =
            "<span>Processing Payment...</span>";

        await axios.delete(`${API_URL}/clear`);

        alert("Payment Successful!");

        location.reload();

    } catch (err) {
        console.log("Checkout error:", err);
    }
};
