import * as importBoard from "./board.js";

const userForm = document.querySelector(".user-form");
const userNameInput = document.querySelector(".user-form input[type=text]");
const boardHeader = document.querySelector(".user-header");
const modalButton = document.querySelector("aside");
const headerUserName = document.querySelector(".greeting");
const logoutButton = document.querySelector(".user-header button");
const mainPage = document.querySelector("main");
const stickerUserNames = document.querySelectorAll(".sticker-cotainer__user");
const avoidBlanksNotice = document.querySelector(".user-login__avoid-blanks");

let userName;

const USER_KEY = "user";

// by 민형, 로그인 유무에 따라 board 정보 랜더링 여부 결정_220611
// board.js에서 HIDDEN 가져와서 사용
let boardDisplay = () => {
  // 로그인 떄는 hidden을 추가(안보이게)하고 로그아웃 때는 hidden을 제거(보이게)
  userForm.classList.toggle(importBoard.HIDDEN);
  // 로그인 떄는 hidden을 제거(보이게)하고 로그아웃 때는 hidden을 추가(안보이게)
  boardHeader.classList.toggle(importBoard.HIDDEN);
  modalButton.classList.toggle(importBoard.HIDDEN);
  mainPage.classList.toggle(importBoard.HIDDEN);
};

let logOut = () => {
  localStorage.removeItem(USER_KEY);
  userNameInput.value = "";
  // by 민형, 로그인 폼에 공백 금지 공지가 있을 수도 있으므로 공지를 제거_220622
  avoidBlanksNotice.classList.add(importBoard.HIDDEN);

  // by 민형, board.js에서 변수 및 메소드 가져와서 사용, 나중에 export로 수정_220606
  // 검색 후 로그아웃 하고 다시 로그인 하면 검색 결과가 그대로 남아있는 문제 발생
  // 검색 결과 제거 작업에 있어 검색 결과가 있을 때는 allRemoveSticker(), 결과가 없을 때는 그림 제거
  // 스티커 또는 사진 제거 후 다시 스티커 붙이기
  importBoard.allRemoveSticker();
  importBoard.noSearchNotice.classList.add(importBoard.HIDDEN);
  importBoard.stickers.forEach(importBoard.attachSticker);

  boardDisplay();
};

let userLocalSave = () => {
  localStorage.setItem(USER_KEY, JSON.stringify(userName));
};

let usernameRender = () => {
  headerUserName.innerHTML = `<i class="fa-solid fa-user"></i> ${
    userName[0].toUpperCase() + userName.slice(1)
  }`;
  // by 민형, 로그인 하기전에 이미 스티커가 붙여지기 때문에 로그인 시 작성자 이름 부여_220610
  stickerUserNames.forEach((stickerUserName) => {
    stickerUserName.innerHTML = `${
      userName[0].toUpperCase() + userName.slice(1)
    }`;
  });
};

// by 민형, 로그인 할 떄_220515
let receiveName = (event) => {
  event.preventDefault();
  userName = userNameInput.value;
  // by 민형, 사용자가 입력한 id에 공백이 포함되어 있다면 다시 입력받도록 한다_220622
  if (userName.replace(/\s/g, "") !== userName) {
    avoidBlanksNotice.classList.remove(importBoard.HIDDEN);
    return;
  }

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
