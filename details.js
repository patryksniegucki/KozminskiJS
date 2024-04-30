document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");

  fetch("plik.json")
    .then((response) => response.json())
    .then((data) => {
      const car = data.find((car) => car.id === parseInt(carId));
      if (car) {
        document.getElementById("carPhoto").src = car.carPhoto;
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

        document.getElementById("carTableBody").style.display = "none";
      } else {
        console.error("Samochód o podanym ID nie został znaleziony.");
      }
    })
    .catch((error) => console.error("Wystąpił błąd:", error));
});

const toggleConfigurator = () => {
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

      document.querySelectorAll(".plusButton").forEach((button) => {
        button.addEventListener("click", () => {
          const row = button.parentNode.parentNode;
          const quantityCell = row.querySelector("td:nth-child(3)");
          const quantity = parseInt(quantityCell.textContent);
          if (quantity === 0) {
            quantityCell.textContent = "1";
            button.textContent = "-";
          } else {
            quantityCell.textContent = "0";
            button.textContent = "+";
          }
          calculateAdditionalCost();
        });
      });
    });

  const handlePaymentTypeChange = () => {
    const selectedRadioButton = document.querySelector(
      'input[name="paymentType"]:checked'
    );
    if (selectedRadioButton) {
      const paymentType = selectedRadioButton.value;
      console.log("Wybrany rodzaj płatności:", paymentType);
      localStorage.setItem("paymentType", paymentType);
    } else {
      console.log("Żaden radiobutton nie jest wybrany.");
    }
  };

  document.querySelectorAll('input[name="paymentType"]').forEach((radio) => {
    radio.addEventListener("change", handlePaymentTypeChange);
  });

  const handleInputChange = () => {
    const name = document.getElementById("imie").value;
    const surname = document.getElementById("nazwisko").value;
    const address = document.getElementById("adres").value;
    console.log("Imię:", name);
    console.log("Nazwisko:", surname);
    console.log("Adres:", address);
    localStorage.setItem("name", name);
    localStorage.setItem("surname", surname);
    localStorage.setItem("address", address);
  };

  document.getElementById("imie").addEventListener("input", handleInputChange);
  document
    .getElementById("nazwisko")
    .addEventListener("input", handleInputChange);
  document.getElementById("adres").addEventListener("input", handleInputChange);

  const storedName = localStorage.getItem("name");
  const storedSurname = localStorage.getItem("surname");
  const storedAddress = localStorage.getItem("address");
  if (storedName && storedSurname && storedAddress) {
    document.getElementById("imie").value = storedName;
    document.getElementById("nazwisko").value = storedSurname;
    document.getElementById("adres").value = storedAddress;
  }

  const storedPaymentType = localStorage.getItem("paymentType");
  if (storedPaymentType) {
    document.querySelector(
      `input[name="paymentType"][value="${storedPaymentType}"]`
    ).checked = true;
  }

  const changeQuantity = (button, isAddition) => {
    const row = button.parentNode.parentNode;
    const quantityCell = row.querySelector(".quantityCell");
    let quantity = parseInt(quantityCell.textContent);

    if (isAddition) {
      if (quantity < 1) quantity++;
    } else {
      if (quantity > 0) quantity--;
    }

    quantityCell.textContent = quantity;
    calculateAdditionalCost();
  };

  const calculateAdditionalCost = () => {
    let totalCost = 0;
    document
      .querySelectorAll(".quantityCell")
      .forEach((quantityCell, index) => {
        const quantity = parseInt(quantityCell.textContent);
        const priceCell = quantityCell.previousElementSibling;
        const price = parseFloat(priceCell.textContent);
        totalCost += quantity * price;
      });
    document.getElementById("additionalCost").textContent =
      totalCost.toFixed(2);
  };

  document.querySelectorAll(".plusButton").forEach((button) => {
    button.addEventListener("click", () => {
      const isAddition = button.textContent === "+";
      changeQuantity(button, isAddition);
    });
  });
};

const selectDate = document.createElement("select");
selectDate.id = "selectDate";
document.body.insertBefore(selectDate, document.getElementById("configureCar"));

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate());

for (let i = 0; i < 15; i++) {
  const date = new Date(tomorrow);
  date.setDate(date.getDate() + i);
  const option = document.createElement("option");
  option.value = date.toISOString().split("T")[0];
  const displayDate = date.toLocaleDateString("pl", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  option.textContent = displayDate;
  selectDate.appendChild(option);
}

const validatePurchase = () => {
  const selectedRadioButton = document.querySelector(
    'input[name="paymentType"]:checked'
  );
  const nameInput = document.getElementById("imie");
  const surnameInput = document.getElementById("nazwisko");
  const addressInput = document.getElementById("adres");

  if (!selectedRadioButton) {
    alert("Wybierz rodzaj płatności");
    return false;
  }

  if (
    !nameInput.value.trim() ||
    !surnameInput.value.trim() ||
    !addressInput.value.trim()
  ) {
    alert("Wprowadź imię i nazwisko oraz adres");
    return false;
  }

  return true;
};

const buyCar = () => {
  document.getElementById("buyButton").addEventListener("click", buyCar);

  if (!validatePurchase()) {
    return;
  }

  const carId = document.getElementById("carId").textContent;
  const carTitle = document.getElementById("carTitle").textContent;
  const carBrand = document.getElementById("carBrand").textContent;
  const carModel = document.getElementById("carModel").textContent;
  const carPrice = parseFloat(document.getElementById("carPrice").textContent);
  const additionalCost = parseFloat(
    document.getElementById("additionalCost").textContent
  );
  const deliveryDate = document.getElementById("selectDate").value;

  let totalPrice = carPrice + additionalCost;

  localStorage.setItem("carId", carId);
  localStorage.setItem("carTitle", carTitle);
  localStorage.setItem("carBrand", carBrand);
  localStorage.setItem("carModel", carModel);
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("deliveryDate", deliveryDate);

  window.location.href = "buyPage.html";
};

document.getElementById("buyButton").addEventListener("click", buyCar);

document.getElementById("goBackButton").addEventListener("click", () => {
  console.log("czy to sie klika?");
  window.location.href = "main.html";
  document.getElementById("goBackButton").addEventListener("click", goBack);
});
