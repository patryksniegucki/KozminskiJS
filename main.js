document.addEventListener("DOMContentLoaded", () => {
  const carTableBody = document.getElementById("carTableBody");

  fetch("carList.json")
    .then((response) => response.json())
    .then((data) => {
      window.carData = data;
      displayCars(data);
    })
    .catch((error) => console.error("Wystąpił błąd:", error));
});

const displayCars = (cars) => {
  const carTableBody = document.getElementById("carTableBody");
  carTableBody.innerHTML = ""; // Clear existing rows
  cars.forEach((car) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${car.title}</strong></td>
      <td><strong>${car.brand}</strong></td>
      <td><strong>${car.model}</strong></td>
      <td><strong>${car.dateProd}</strong></td>
      <td><strong>${car.color}</strong></td>
      <td><strong>${car.mileage} KM</strong></td>
      <td><strong>${car.carPrice}</strong></td>
      <td><strong>${car.horsePower} HP</strong></td>
      <td><strong>${car.engineCapacity} L</strong></td>
      <td><strong>${car.description}</strong></td>
      <td><strong><button onclick="showDetails(${car.id})">Szczegóły</button></strong></td>
    `;
    carTableBody.appendChild(row);
  });
};

const filterCars = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  if (searchInput.length < 2) {
    displayCars(window.carData);
    return;
  }
  const filteredCars = window.carData.filter((car) => {
    return (
      car.brand.toLowerCase().includes(searchInput) ||
      car.model.toLowerCase().includes(searchInput) ||
      car.title.toLowerCase().includes(searchInput)
    );
  });
  displayCars(filteredCars);
};

function showDetails(carId) {
  window.location.href = `details.html?id=${carId}`;
}
