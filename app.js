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
       <p class="descr">${item.descr}</p>
       <button class="price">🛒${item.price}</button>

       </div>`;

       const btnPrics=card.querySelector(".price");
btnPrics.addEventListener("click", () =>{
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


function showDetails(item){
    localStorage.setItem("selectedItem", JSON.stringify(item));
    window.location.href = "shipping.html";

}
loadMenu();
