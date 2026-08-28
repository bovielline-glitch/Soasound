/* =====================================================
   SOASOUND - SENILA.JS
   ===================================================== */


/* ================= VARIABLES ================= */

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const emptyCart = document.getElementById("empty-cart");

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("search");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");



/* ================= MOBILE MENU ================= */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* Fermer le menu après clic */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show");

        const icon = menuBtn?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});



/* ================= SEARCH ================= */

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        searchPanel.classList.toggle("show");

        if (searchPanel.classList.contains("show")) {

            searchInput.focus();

        }

    });

}


if (closeSearch) {

    closeSearch.addEventListener("click", () => {

        searchPanel.classList.remove("show");

        searchInput.value = "";

        filterProducts();

    });

}


/* ================= FILTER PRODUCTS ================= */

function filterProducts() {

    const value = searchInput.value
        .toLowerCase()
        .trim();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        const name =
            product.dataset.name?.toLowerCase() || "";

        const category =
            product.dataset.category?.toLowerCase() || "";

        const text =
            product.innerText.toLowerCase();

        if (
            name.includes(value) ||
            category.includes(value) ||
            text.includes(value)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* Recherche en temps réel */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}



/* ================= CART ================= */

function openCart() {

    cartSidebar.classList.add("show");
    cartOverlay.classList.add("show");

    document.body.classList.add("no-scroll");

}


function closeCartSidebar() {

    cartSidebar.classList.remove("show");
    cartOverlay.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartSidebar
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartSidebar
    );

}


const continueShopping =
    document.getElementById("continueShopping");

if (continueShopping) {

    continueShopping.addEventListener(
        "click",
        closeCartSidebar
    );

}



/* ================= ADD TO CART ================= */

function addToCart(name, price) {

    const existingProduct =
        cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });

    }

    updateCart();

    showToast(
        `${name} a été ajouté au panier.`
    );

    openCart();

}



/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let quantity = 0;


    if (cart.length === 0) {

        emptyCart.style.display = "flex";

    } else {

        emptyCart.style.display = "none";

    }


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        quantity += item.quantity;


        const li =
            document.createElement("li");

        li.className = "cart-item";


        li.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ${formatPrice(item.price)}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="cart-remove"
                onclick="removeFromCart(${index})"
                aria-label="Supprimer">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(li);

    });


    cartTotal.textContent =
        formatPrice(total);

    cartCount.textContent =
        quantity;

}



/* ================= REMOVE FROM CART ================= */

function removeFromCart(index) {

    if (index < 0 || index >= cart.length) {
        return;
    }

    const productName = cart[index].name;

    cart.splice(index, 1);

    updateCart();

    showToast(
        `${productName} a été retiré du panier.`
    );

}



/* ================= PRICE ================= */

function formatPrice(price) {

    const number = Number(price);

    if (Number.isNaN(number)) {
        return "0 Ar";
    }

    return number.toLocaleString(
        "fr-FR"
    ) + " Ar";

}



/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}



/* ================= FAVORITES ================= */

document
    .querySelectorAll(".favorite-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const icon =
                    button.querySelector("i");

                if (
                    icon.classList.contains(
                        "fa-regular"
                    )
                ) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                    button.style.color =
                        "#8d1f3d";

                    showToast(
                        "Produit ajouté aux favoris."
                    );

                } else {

                    icon.classList.remove(
                        "fa-solid"
                    );

                    icon.classList.add(
                        "fa-regular"
                    );

                    button.style.color =
                        "";

                    showToast(
                        "Produit retiré des favoris."
                    );

                }

            }
        );

    });



/* ================= SCROLL ACTIVE MENU ================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".navbar a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${current}`
            ) {

                link.classList.add("active");

            }

        });

    }
);



/* ================= HEADER SCROLL ================= */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 8px 30px rgba(0,0,0,.06)";

        } else {

            header.style.boxShadow =
                "none";

        }

    }
);



/* ================= CHECKOUT ================= */

const checkoutBtn =
    document.querySelector(
        ".checkout-btn"
    );


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "Votre panier est vide."
                );

                return;

            }


            showToast(
                "La commande sera disponible avec le backend."
            );

        }
    );

}



/* ================= INITIALISATION ================= */

updateCart();