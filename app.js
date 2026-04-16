const btn = document.getElementById("toggleBtn");
const navbar = document.querySelector(".navbar");
function openToggle() {
    navbar.classList.toggle('show')
}
window.onclick = function (event) {
    if (!event.target.matches('#toggleBtn') && !event.target.closest('.navbar')) {
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
        }
    }
}

async function loadMenu() {
    try {
        const res = await axios.get('app.json');
        const allItems = res.data;
        const container = document.getElementById("menuContainer");
        container.innerHTML = "";
        const croissants = allItems.filter(item => item.category === "croissants");
        const Desserts = allItems.filter(item => item.category === "Desserts");
        const coffee = allItems.filter(item => item.category === "Coffee");
        const artisan = allItems.filter(item => item.category === "Artisan Bread");
        function render(title, items, categoryId) {
            if (items.length === 0) return;
            const sectiontitle = document.createElement('h1');
            sectiontitle.className = "header";
            sectiontitle.textContent = title;
            sectiontitle.id = categoryId;
            container.appendChild(sectiontitle);
            items.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('croissantsCard');
                card.innerHTML = `
       <img class="imgCroissants" src="${item.photo}" alt="${item.name}">
       <div class="inf">
       <h3 class="nameItem"> ${item.name}</h3>
       <p class="price">${item.price}</p>

       </div>`;

                const btnPrics = card.querySelector(".imgCroissants");
                btnPrics.addEventListener("click", () => {
                    showDetails(item);
                }

                )
                container.appendChild(card);
            });
        }

        render("Our Fresh Croissants", allItems.filter(item => item.category === "croissants"), "croissants");
        render("Sweet Desserts", allItems.filter(item => item.category === "Desserts"), "desserts");
        render("Specialty Coffee", allItems.filter(item => item.category === "Coffee"), "coffee");
        render("Artisan Bread", allItems.filter(item => item.category === "Artisan Bread"), "artisan");
    } catch (e) {
        console.log("error:", e)
    }

}


function showDetails(item) {
    localStorage.setItem("selectedItem", JSON.stringify(item));
    window.location.href = "shipping.html";

}
loadMenu();

let qnty = 1;
const savedItem = localStorage.getItem("selectedItem");
if (savedItem) {
    const item = JSON.parse(savedItem);
    const pricecontainer = document.querySelector(".pricecontainer");

    pricecontainer.innerHTML = `
            <section class="seperate">
                           <div>
                            <img class="imgCroissants2" src="${item.photo}">
</div>
            <div class="priceDiv">
                <div>
                                  <h2 class="nameItem2">${item.name}</h2>
                                  <p class="price">${item.price}</p>
                                  <p>Tax included fees are calcualted at checkout.</p>
                                  <p style="font-weight:bold;">Qunatity:</p>
                                
                                  <button class="qty">1</button>
                                    <DIV class="btnHolders">
                                  <button class="cart">ADD TO CART</button>
                                                                    <button class="cta">BUY IT NOW</button>
                                                                    </div>

             <p  class="descr2">${item.descr}</p>
        
                </section>
 
         
     
            `;
    const qtyBtn = document.querySelector(".qty");
    let cartCount = 0;

    qtyBtn.addEventListener("click", () => {
        qnty++;
        qtyBtn.textContent = qnty;

    })
    const cartBtn = document.querySelector(".cart");

    cartBtn.addEventListener("click", () => {
        let addCart = document.querySelector(".countBtn");
        cartCount++;
        const bill = calcTotal(qnty);

        if (!addCart) {
            addCart = document.createElement("button")
            addCart.className = "countBtn";
            addCart.style.borderRadius = "30px";
            addCart.style.padding = "10px";
            addCart.style.float = "right";
            addCart.style.margin = "20px";
            addCart.style.border = "none";
            addCart.style.backgroundColor = "red";
            addCart.style.color = "white";
            document.body.appendChild(addCart);
        }
        addCart.textContent = cartCount + "🛒";
        document.querySelector(".subtotal").textContent = `$${bill.ttl}`;
        document.querySelector(".taxs").textContent = `$${bill.tax}`;
        document.querySelector(".totalbill").textContent = `$${bill.total}`;

    })
    pricecontainer.scrollIntoView({ behavior: "smooth" });

} else {
    console.error("No item found in localStorage");
}
let item;

function calcTotal(qnty) {
    const ttl = item.price * qnty;
    const taxRate = 0.14;
    const tax = ttl * item.taxRate;
    const total = ttl + tax;
    return {
        ttl: ttl.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

const cta = document.querySelector(".cta");
cta.addEventListener("click", () => {
    const bill = calcTotal(qnty || 1);
    localStorage.setItem("userBill", JSON.stringify(bill));

    window.location.href = "checkout.html";
});

