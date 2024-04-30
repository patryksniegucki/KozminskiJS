document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");

  fetch("plik.json")
    .then((response) => response.json())
    .then((data) => {
      const car = data.find((car) => car.id === parseInt(carId));
      if (car) {
        // Wyświetlanie szczegółów wybranego wcześniej samochodu
        document.getElementById("carId").textContent = car.id;
        document.getElementById("carTitle").textContent = car.title;
        document.getElementById("carBrand").textContent = car.brand;
        document.getElementById("carModel").textContent = car.model;
        document.getElementById("carDateProd").textContent = car.dateProd;
        document.getElementById("carColor").textContent = car.color;
        document.getElementById("carMileage").textContent = car.mileage;
        document.getElementById("carPrice").textContent = car.carPrice;
        document.getElementById("carHorsePower").textContent = car.horsePower;
        document.getElementById("carEngineCapacity").textContent =
          car.engineCapacity;
        document.getElementById("carDescription").textContent = car.description;

        // Ukrywanie tabeli z listą samochodów
        document.getElementById("carTableBody").style.display = "none";
      } else {
        console.error("Samochód o podanym ID nie został znaleziony.");
      }
    })
    .catch((error) => console.error("Wystąpił błąd:", error));
});

function toggleConfigurator() {
  const section = document.getElementById("configuratorSection");
  section.style.display = section.style.display === "none" ? "block" : "none";

  fetch("optionalThings.json")
    .then((response) => response.json())
    .then((data) => {
      const optionalThingsTableBody = document.getElementById(
        "optionalThingsTableBody"
      );
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${item.item}</td>
                  <td>${item.price}</td>
                  <td class="quantityCell">0</td>
                  <td><button class="plusButton">+</button></td>
                `;
        optionalThingsTableBody.appendChild(row);
      });
    });
}



document.getElementById("goBackButton").addEventListener("click", goBack);

function goBack() {
  console.log("czy to sie klika?");
  window.location.href = "main.html";
  document.getElementById("goBackButton").addEventListener("click", goBack);
}
