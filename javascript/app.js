if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./serviceworker.js")
            .catch((error) => console.error("Error al registrar el service worker:", error));
    });
}

const coffeeList = document.querySelector("#coffee-list");

coffeeList.innerHTML = coffees.map((coffee, index) => `
    <article class="card">
        <img src="images/imagen${index + 1}.jpg" alt="${coffee.name}">
        <div class="card-info">
            <h2>${coffee.name}</h2>
            <span>$${coffee.price}</span>
            <a class="details-button" href="coffee-detail.html?coffee=${index}">Ver información</a>
        </div>
    </article>
`).join("");
