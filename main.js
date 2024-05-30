document.addEventListener("DOMContentLoaded", function () {
  const carTableBody = document.getElementById("carTableBody");

  fetch("carList.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((car) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td><strong>${car.title}</td>
                  <td><strong>${car.brand}</td>
                  <td><strong>${car.model}</td>
                  <td><strong>${car.dateProd}</td>
                  <td><strong>${car.color}</td>
                  <td><strong>${car.mileage} KM </td>
                  <td><strong>${car.carPrice}</td>
                  <td><strong>${car.horsePower} HP </td>
                  <td><strong>${car.engineCapacity} L</td>
                  <td><strong>${car.description}</td>
                  <td><strong><button onclick="showDetails(${car.id})">Szczegóły</button></td>
              `;
        carTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Wystąpił błąd:", error));
});

function showDetails(carId) {
  window.location.href = `details.html?id=${carId}`;
}
