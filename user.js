const userForm = document.querySelector("#user-form");
const userNameInput = document.querySelector("#user-form input[type=text]");
const loginButton = document.querySelector("#user-form button");
const gretting = document.querySelector(".greeting");

let userName;

const USER_KEY = "user";

let userLocalSave = () => {
  localStorage.setItem(USER_KEY, JSON.stringify(userName));
};

let greetingRender = () => {
  gretting.innerText = `${userName}님 환영합니다~~~`;

  userNameInput.classList.add("hidden");
  loginButton.classList.add("hidden");
};

let receiveName = (event) => {
  event.preventDefault();
  userName = userNameInput.value;

  greetingRender();
  userLocalSave();
};

userForm.addEventListener("submit", receiveName);

// by 민형, program 시작_220515
const bringLocalUser = localStorage.getItem(USER_KEY);
if (bringLocalUser !== null) {
  userName = JSON.parse(bringLocalUser);
  greetingRender();
}
