const API_URL = "https://autobill-backend-n01b.onrender.com";

// ============================================
// 🛒 LOAD PRODUCTS
// ============================================

async function loadProducts() {

    try {

        let res = await axios.get(`${API_URL}/cart`);

        let data = res.data;

        let products = data.cart;

        let total = data.grand_total;

        let home = document.getElementById("home");

        home.innerHTML = "";

        products.forEach(product => {

            home.innerHTML += `

            <div class="card">

                <h2>${product.label}</h2>

                <p>Price: RM ${product.price}</p>

                <p>Total: RM ${product.total}</p>

            </div>

            `;

        });

        document.getElementById("totalText").innerHTML =
            `CHECKOUT RM ${total}`;

    }

    catch (err) {

        console.log(err);

    }
}

// Auto refresh cart
setInterval(loadProducts, 1500);

loadProducts();

// ============================================
// 💳 CHECKOUT
// ============================================

function checkout() {

    // Hide cart
    document.getElementById("home").style.display = "none";

    // Hide checkout button
    document.getElementById("checkoutBtn").style.display = "none";

    // Show QR section
    document.getElementById("qr-section").style.display = "block";
}

// ============================================
// ⏳ VERIFY PAYMENT
// ============================================

async function nextStep() {

    // Hide next button
    document.getElementById("nextBtn").style.display = "none";

    // Show verifying message
    document.getElementById("verifyingText").style.display = "block";

    // Fake payment verification
    setTimeout(async () => {

        // Hide QR section
        document.getElementById("qr-section").style.display = "none";

        // Show thank you message
        document.getElementById("success-message").style.display = "block";

        // Clear backend cart
        await axios.delete(`${API_URL}/clear`);

        // ============================================
        // ⏳ AFTER 1 SECOND RETURN TO MAIN PAGE
        // ============================================

        setTimeout(() => {

            // Show cart again
            document.getElementById("home").style.display = "flex";

            // Show checkout button again
            document.getElementById("checkoutBtn").style.display = "inline-block";

            // Hide thank you message
            document.getElementById("success-message").style.display = "none";

            // Reset QR section
            document.getElementById("qr-section").style.display = "none";

            // Show next button again
            document.getElementById("nextBtn").style.display = "inline-block";

            // Hide verifying text
            document.getElementById("verifyingText").style.display = "none";

            // Reload products
            loadProducts();

        }, 1000);

    }, 4000);
}
