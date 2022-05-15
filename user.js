const userForm = document.querySelector("#user-form");
const userNameInput = document.querySelector("#user-form input[type=text]");
const loginButton = document.querySelector("#user-form button");
const gretting = document.querySelector(".greeting");

let userName;

const USER_KEY = "user";

let userLocalSave = () => {
  localStorage.setItem(USER_KEY, JSON.stringify(userName));
};

let greetingRender = (event) => {
  event.preventDefault();
  userName = userNameInput.value;
  gretting.innerText = `${userName}님 환영합니다~~~`;

  userLocalSave();

  userNameInput.classList.add("hidden");
  loginButton.classList.add("hidden");
};

userForm.addEventListener("submit", greetingRender);
