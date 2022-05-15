const userForm = document.querySelector("#user-form");
const userNameInput = document.querySelector("#user-form input[type=text]");
const loginButton = document.querySelector("#user-form button");
const gretting = document.querySelector(".greeting");

let userName;

const USER_KEY = "user";

let logOut = ({ target }) => {
  // by 민형, 여기서 target은 로그아웃 버튼_220515
  target.remove();

  gretting.innerText = "";
  userNameInput.classList.remove("hidden");
  loginButton.classList.remove("hidden");
};

let logoutButtonMake = () => {
  const logoutButton = document.createElement("button");
  logoutButton.innerText = "로그아웃";
  logoutButton.addEventListener("click", logOut);
  userForm.append(logoutButton);
};

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

  logoutButtonMake();
  greetingRender();
  userLocalSave();
};

userForm.addEventListener("submit", receiveName);

// by 민형, program 시작_220515
const bringLocalUser = localStorage.getItem(USER_KEY);
if (bringLocalUser !== null) {
  userName = JSON.parse(bringLocalUser);
  logoutButtonMake();
  greetingRender();
}
