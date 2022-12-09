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

const checkboxes = document.querySelectorAll(".products__checkbox");
const checkall = document.querySelector("#catalog");

console.log("checkboxes :>> ", checkboxes);
console.log("checkall :>> ", checkall);
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
