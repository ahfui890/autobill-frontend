const API_URL = "https://autobill-backend-n01b.onrender.com";

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

    } catch (err) {

        console.log(err);

    }
}

setInterval(loadProducts, 1500);

loadProducts();

async function checkout() {

    // Hide cart
    document.getElementById("home").style.display = "none";

    // Hide button
    document.querySelector("button").style.display = "none";

    // Show QR
    document.getElementById("qr-section").style.display = "block";

    // Wait 15 sec then clear
    setTimeout(async () => {

        // Hide QR
        document.getElementById("qr-section").style.display = "none";

        // Show success
        document.getElementById("success-message").style.display = "block";

        // Clear backend cart
        await axios.delete(`${API_URL}/clear`);

    }, 15000);
}
