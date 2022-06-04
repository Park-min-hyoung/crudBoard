const userForm = document.querySelector("#user-form");
const userLoginDiv = document.querySelector("#user-form .user-login");
const userNameInput = document.querySelector("#user-form input[type=text]");
const loginButton = document.querySelector("#user-form button");
const logoutButtonDiv = document.querySelector(".user-header");
const gretting = document.querySelector(".greeting");
const stickerFormDisplay = document.querySelector("#board-form");
const stickerBoardDisplay = document.querySelector(".board-container");
const searchFormDisplay = document.querySelector("#search-form");

let userName;

const USER_KEY = "user";

// by 민형, 로그인 유무에 따라 board 정보 랜더링_220515
let boardDisplay = () => {
  stickerBoardDisplay.classList.toggle("hidden");
  // by 민형, board.js의 searchForm 변수 사용_220526
  searchFormDisplay.classList.toggle("hidden");
};

let logOut = ({ target }) => {
  // by 민형, 여기서 target은 로그아웃 버튼_220515
  target.remove();
  localStorage.removeItem(USER_KEY);

  userNameInput.value = "";
  userLoginDiv.classList.remove("hidden");
  stickerFormDisplay.classList.add("hidden");

  boardDisplay();
};

let logoutButtonMake = () => {
  const logoutButton = document.createElement("button");
  logoutButton.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i> LOGOUT`;

  logoutButton.addEventListener("click", logOut);
  logoutButtonDiv.append(logoutButton);
};

let userLocalSave = () => {
  localStorage.setItem(USER_KEY, JSON.stringify(userName));
};

let greetingRender = () => {
  gretting.innerHTML = `<i class="fa-solid fa-user"></i> ${
    userName[0].toUpperCase() + userName.slice(1)
  }`;

  userLoginDiv.classList.add("hidden");
};

// by 민형, 로그인 할 떄_220515
let receiveName = (event) => {
  event.preventDefault();
  userName = userNameInput.value;
  stickerFormDisplay.classList.remove("hidden");

  logoutButtonMake();
  greetingRender();
  boardDisplay();
  userLocalSave();
};

userForm.addEventListener("submit", receiveName);

// by 민형, program 시작_220515
const bringLocalUser = localStorage.getItem(USER_KEY);
if (bringLocalUser !== null) {
  userName = JSON.parse(bringLocalUser);
  logoutButtonMake();
  greetingRender();
  boardDisplay();
}
