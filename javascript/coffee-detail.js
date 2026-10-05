const detailContainer = document.querySelector("#coffee-detail");
const coffeeIndex = Number(new URLSearchParams(window.location.search).get("coffee"));
const coffee = coffees[coffeeIndex];

if (!coffee) {
    detailContainer.innerHTML = `
        <h2>Café no encontrado</h2>
        <p>La información solicitada no está disponible.</p>
        <a class="details-button" href="index.html">Volver al menú</a>
    `;
} else {
    detailContainer.innerHTML = `
        <img src="images/imagen${coffeeIndex + 1}.jpg" alt="${coffee.name}">
        <div class="coffee-detail-info">
            <h2>${coffee.name}</h2>
            <p class="coffee-description">${coffee.description}</p>
            <p>${coffee.details}</p>
            <dl class="coffee-specs">
                <div><dt>Origen</dt><dd>${coffee.origin}</dd></div>
                <div><dt>Intensidad</dt><dd>${coffee.intensity}</dd></div>
                <div><dt>Preparación</dt><dd>${coffee.preparation}</dd></div>
                <div><dt>Ingredientes</dt><dd>${coffee.ingredients}</dd></div>
                <div><dt>Tamaño</dt><dd>${coffee.size}</dd></div>
            </dl>
            <strong>$${coffee.price}</strong>
        </div>
    `;
}
