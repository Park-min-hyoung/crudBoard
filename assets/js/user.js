const userForm = document.querySelector("#user-form");
const userLoginDiv = document.querySelector("#user-form .user-login");
const userNameInput = document.querySelector("#user-form input[type=text]");
const loginButton = document.querySelector("#user-form button");
const logoutButtonDiv = document.querySelector(".user-header");
const logoutButton = document.querySelector(".user-header button");
const greeting = document.querySelector(".greeting");
const stickerFormDisplay = document.querySelector("#board-form");
const stickerBoardDisplay = document.querySelector(".board-container");
const stickerBoardUserName = document.querySelectorAll(
  ".sticker-cotainer__user"
);
const searchFormDisplay = document.querySelector("#search-form");

let userName;

const USER_KEY = "user";

// by 민형, 로그인 유무에 따라 board 정보 랜더링_220515
let boardDisplay = () => {
  stickerBoardDisplay.classList.toggle("hidden");
  searchFormDisplay.classList.toggle("hidden");
};

let logOut = ({ target }) => {
  localStorage.removeItem(USER_KEY);

  userNameInput.value = "";
  userLoginDiv.classList.remove("hidden");
  stickerFormDisplay.classList.add("hidden");

  // by 민형, board.js에서 변수 및 메소드 가져와서 사용, 나중에 export로 수정_220606
  // 검색 후 로그아웃 하고 다시 로그인 하면 검색 결과가 그대로 남아있는 문제 발생
  // 검색 결과 제거 작업에 있어 검색 결과가 있을 때는 allRemoveSticker(), 결과가 없을 때는 그림 제거
  // 스티커 또는 사진 제거 후 다시 스티커 붙이기
  allRemoveSticker();
  noSearchNotice.classList.add(HIDDEN);
  stickers.forEach(attachSticker);

  boardDisplay();
};

let userLocalSave = () => {
  localStorage.setItem(USER_KEY, JSON.stringify(userName));
};

let usernameRender = () => {
  greeting.innerHTML = `<i class="fa-solid fa-user"></i> ${
    userName[0].toUpperCase() + userName.slice(1)
  }`;
  stickerBoardUserName.forEach((item) => {
    item.innerHTML = `${userName[0].toUpperCase() + userName.slice(1)}`;
  });

  userLoginDiv.classList.add("hidden");
};

// by 민형, 로그인 할 떄_220515
let receiveName = (event) => {
  event.preventDefault();
  userName = userNameInput.value;
  stickerFormDisplay.classList.remove("hidden");

  usernameRender();
  boardDisplay();
  userLocalSave();
};

userForm.addEventListener("submit", receiveName);
logoutButton.addEventListener("click", logOut);

// by 민형, program 시작_220515
const bringLocalUser = localStorage.getItem(USER_KEY);
if (bringLocalUser !== null) {
  userName = JSON.parse(bringLocalUser);
  usernameRender();
  boardDisplay();
}
