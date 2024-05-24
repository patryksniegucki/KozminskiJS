document.addEventListener("DOMContentLoaded", function () {
  // Pobierz dane z localStorage
  const carId = localStorage.getItem("carId");
  const carTitle = localStorage.getItem("carTitle");
  const carBrand = localStorage.getItem("carBrand");
  const carModel = localStorage.getItem("carModel");
  const totalPrice = localStorage.getItem("totalPrice");
  const deliveryDate = localStorage.getItem("deliveryDate");
  const name = localStorage.getItem("name"); 
  const surname = localStorage.getItem("surname"); 
  const address = localStorage.getItem("address");
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

  // Wyświetl dane w formularzu
  document.getElementById("carId").textContent = carId;
  document.getElementById("carTitle").textContent = carTitle;
  document.getElementById("carBrand").textContent = carBrand;
  document.getElementById("carModel").textContent = carModel;
  document.getElementById("totalPrice").textContent = totalPrice;
  document.getElementById("deliveryDate").textContent = deliveryDate;
  document.getElementById("fullName").textContent = `${name} ${surname}`;
  document.getElementById("address").textContent = address;
  document.getElementById("selectedItems").textContent =
    selectedItems.join(", ");
});

// document.getElementById("goBackButton").addEventListener("click", goBack);

document.getElementById("goBackButton").addEventListener("click", () => {
  // console.log("czy to sie klika?");
  window.location.href = "main.html";
  document.getElementById("goBackButton").addEventListener("click", goBack);
});
