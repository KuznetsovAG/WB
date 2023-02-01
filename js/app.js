const form = document.getElementById("form");
const username = document.getElementById("username");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const index = document.getElementById("index");

const errors = {
  username: true,
  surname: true,
  email: true,
  telephone: true,
  index: true,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();

  const isValid = isValidForm();

  if (isValid) {
    resetForm();
  }
});

const setError = (element, message) => {
  const { id } = element;
  errors[id] = true;

  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const { id } = element;
  errors[id] = false;

  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidForm = () =>
  Object.values(errors).every((value) => value === false);

const resetForm = () => {
  username.value = "";
  surname.value = "";
  email.value = "";
  telephone.value = "";
  index.value = "";
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidTelephone = (telephone) => {
  const re = /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/g;
  return re.test(telephone);
};

const isValidNameAndSurname = (name) => {
  const req = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
  return req.test(String(name).toLowerCase());
};

const isValidIndex = (index) => {
  const req = /[0-9]/;
  return req.test(index);
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const indexValue = index.value;
  const telephoneValue = telephone.value;
  const userSurname = surname.value.trim();

  if (usernameValue === "") {
    setError(username, "Укажите имя");
  } else if (!isValidNameAndSurname(usernameValue)) {
    setError(username, "Укажите корректное имя");
  } else {
    setSuccess(username);
  }

  if (userSurname === "") {
    setError(surname, "Укажите фамилию");
  } else if (!isValidNameAndSurname(userSurname)) {
    setError(surname, "Укажите корректно фамилию");
  } else {
    setSuccess(surname);
  }

  if (emailValue === "") {
    setError(email, "Укажите электронную почту");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Проверьте адрес электронной почты");
  } else {
    setSuccess(email);
  }

  if (telephoneValue === "") {
    setError(telephone, "Укажите телефон");
  } else if (!isValidTelephone(telephoneValue)) {
    setError(telephone, "Формат: +9 (999) 999 99 99");
  } else {
    setSuccess(telephone);
  }

  if (indexValue === "") {
    setError(index, "Укажите индекс");
  } else if (!isValidIndex(indexValue)) {
    setError(index, "Формат: 1234567");
  } else {
    setSuccess(index);
  }
};

/////////////////////////////////////////////////

const checkboxes = document.querySelectorAll(".products__checkbox");
const checkall = document.querySelector("#catalog");

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].onclick = function () {
    let checkedCount = document.querySelectorAll("input.thing:checked").length;

    checkall.checked = checkedCount > 0;
    checkall.indeterminate =
      checkedCount > 0 && checkedCount < checkboxes.length;
  };
}

checkall.onclick = function () {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = this.checked;
  }
};

//////////////////////////////////////////////
let isVisible = true;

function visibleProduct(button) {
  button.addEventListener("click", () => {
    button.style.transform =
      button.style.transform == "rotate(180deg)"
        ? "rotate(0deg)"
        : "rotate(180deg)";
    let activeProduct = button.closest(".products__catalog-wrapper");
    let currenProduct = activeProduct.querySelector(".product__wrapper");
    isVisible = !isVisible;
    currenProduct.style.display = isVisible ? "grid" : "none";
  });
}

const pushButton = document.querySelectorAll("#push");

pushButton.forEach((button) => visibleProduct(button));

///////////////Counter///////////////////////////

const sumCounter = (countItem) => {
  const productElement = countItem.closest(".products__stock");
  const currentPrice = productElement.querySelector(".product");
  const priceElement = productElement.querySelector(".price__sale > span");

  const price = (priceElement.innerHTML = currentPrice.dataset.price);
  const countEl = countItem.querySelector(".counter__count");
  const incrementButton = countItem.querySelector(".counter__increment");
  const decrementButton = countItem.querySelector(".counter__decrement");

  const quantityInStockElement = productElement.querySelector(
    ".counter__description"
  );
  let quantityInStock = quantityInStockElement
    ? Number(quantityInStockElement.dataset.quantity)
    : 0;

  let counter = Number(countEl.textContent);

  const priceWithoutSaleElement =
    productElement.querySelector("[data-priceSale]");
  const priceWithoutSale = Number(priceWithoutSaleElement.dataset.pricesale);

  incrementButton.addEventListener("click", () => {
    const basketSum = document.querySelector(".description__price-title");
    const totalSum = Number(basketSum.dataset.sum);

    const basketElement = basketSum.closest(".description__price");
    const totalSumWithoutSaleElement = basketElement.querySelector(
      "[data-sumwithoutsale]"
    );

    const descriptionSale = document.querySelector(".description__sale");

    const numberOfItemsInTheCart = document.querySelector(".basket__count");
    const mobileShoppingCart = document.querySelector(".basket__count-mobile");
    const totalQuallity = document.querySelector(".goods");
    let totalQuantityOfGoods = Number(totalQuallity.dataset.quantity);

    if (quantityInStockElement && counter > quantityInStock + 1) {
      return;
    }

    counter++;
    quantityInStock--;
    countEl.textContent = counter;

    if (quantityInStockElement) {
      quantityInStockElement.innerText = `Осталось ${quantityInStock} шт.`;
    }

    priceWithoutSaleElement.innerText = `${priceWithoutSale * counter} сом`;

    const resultSum = Number(price) * counter;
    const totalPrice = totalSum + Number(price);
    basketSum.dataset.sum = totalSum + Number(price);
    const totalQuallityProduct = totalQuantityOfGoods + 1;
    totalQuallity.dataset.quantity = totalQuantityOfGoods + 1;
    priceElement.textContent = resultSum;
    basketSum.textContent = `${totalPrice} сом`;
    totalQuallity.textContent = `${totalQuallityProduct} товара`;
    numberOfItemsInTheCart.textContent = totalQuallityProduct;
    mobileShoppingCart.textContent = totalQuallityProduct;
    const updatetTotalSumWithoutSale = Array.from(
      document.querySelectorAll("[data-pricesale]")
    ).reduce((acc, element) => {
      const price = parseInt(element.innerText);
      return acc + price;
    }, 0);

    const amountDiscount = updatetTotalSumWithoutSale - totalPrice;
    descriptionSale.textContent = `-${amountDiscount} сом`;

    totalSumWithoutSaleElement.innerHTML = `${updatetTotalSumWithoutSale} сом`;
  });

  decrementButton.addEventListener("click", function () {
    if (counter > 0) {
      const basketSum = document.querySelector(".description__price-title");
      const basketElement = basketSum.closest(".description__price");
      const totalSumWithoutSaleElement = basketElement.querySelector(
        "[data-sumwithoutsale]"
      );

      const totalSum = Number(basketSum.dataset.sum);
      const totalQuallity = document.querySelector(".goods");
      const totalQuantityOfGoods = Number(totalQuallity.dataset.quantity);

      const descriptionSale = document.querySelector(".description__sale");
      const mobileShoppingCart = document.querySelector(
        ".basket__count-mobile"
      );
      const numberOfItemsInTheCart = document.querySelector(".basket__count");

      if (quantityInStockElement && counter < quantityInStock - 1) {
        return;
      }

      counter--;
      quantityInStock++;
      countEl.textContent = counter;

      if (quantityInStockElement) {
        quantityInStockElement.innerText = `Осталось ${quantityInStock} шт.`;
      }

      priceWithoutSaleElement.innerText = `${priceWithoutSale * counter} сом`;

      const resultSum = Number(price) * counter;
      const totalPrice = totalSum - Number(price);
      basketSum.dataset.sum = totalSum - Number(price);
      const totalQuallityProduct = totalQuantityOfGoods - 1;
      totalQuallity.dataset.quantity = totalQuantityOfGoods - 1;

      priceElement.textContent = resultSum;
      basketSum.textContent = `${totalPrice} сом`;
      totalQuallity.textContent = `${totalQuallityProduct} товара`;
      numberOfItemsInTheCart.textContent = totalQuallityProduct;

      const updatetTotalSumWithoutSale = Array.from(
        document.querySelectorAll("[data-pricesale]")
      ).reduce((acc, element) => {
        const price = parseInt(element.innerText);
        return acc + price;
      }, 0);

      const amountDiscount = updatetTotalSumWithoutSale - totalPrice;
      descriptionSale.textContent =
        amountDiscount > 0 ? `-${amountDiscount} сом` : `${amountDiscount} сом`;

      totalSumWithoutSaleElement.innerHTML = `${updatetTotalSumWithoutSale} сом`;
      mobileShoppingCart.textContent = totalQuallityProduct;
    }
  });
};

let counters = document.querySelectorAll(".counters");
counters.forEach((item) => sumCounter(item));

///////////////////////////////////////////////////////

let modal = document.querySelector(".modal");
let modalShipping = document.querySelector(".modal__shipping");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");
let closeDelivery = document.querySelector(".close-delivery");
let shippingChange = document.querySelector(".shipping__change");

const toggleModal = () => {
  modal.classList.toggle("show-modal");
};

const toggleChange = () => {
  modalShipping.classList.toggle("show-modal");
};

const windowOnClick = (event) => {
  if (event.target === modal) {
    toggleModal();
  }
  if (event.target === modalShipping) {
    toggleChange();
  }
};

shippingChange.addEventListener("click", toggleChange);
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
closeDelivery.addEventListener("click", toggleChange);
window.addEventListener("click", windowOnClick);
