const stickerForm = document.querySelector("#board-form");
const stickerTitle = document.querySelector("#board-form input[type=text]");
const stickerContent = document.querySelector("#board-form textarea");
const stickerBoard = document.querySelector(".board-container");

const STIKER_KEY = "sticker";

let stickers = [];

let stickerLocalSave = () => {
  localStorage.setItem(STIKER_KEY, JSON.stringify(stickers));
};

let removeSticker = (event) => {
  const rmSticker = event.target.parentElement.parentElement;
  rmSticker.remove();
};

let makeSticker = (sticker) => {
  stickerDiv = document.createElement("div");
  stickerDiv.classList.add("board-container__sticker");

  titleDiv = document.createElement("div");
  titleDiv.innerText = sticker.title;
  contentDiv = document.createElement("div");
  contentDiv.innerText = sticker.content;
  closeSpan = document.createElement("span");
  closeSpan.insertAdjacentHTML(
    "beforeend",
    `<i class="fa-solid fa-xmark fa-2x"></i>`
  );
  closeSpan.addEventListener("click", removeSticker);

  stickerDiv.append(titleDiv);
  stickerDiv.append(contentDiv);
  stickerDiv.append(closeSpan);
  stickerBoard.append(stickerDiv);

  stickerTitle.value = "";
  stickerContent.value = "";
};

// by 민형, 사용자가 작성한 내용을 받아 처리_220512
let receiveValue = (event) => {
  event.preventDefault();
  const stickerObj = {
    title: stickerTitle.value,
    content: stickerContent.value,
  };

  stickers.push(stickerObj);
  stickerLocalSave(stickerObj);
  makeSticker(stickerObj);
};

stickerForm.addEventListener("submit", receiveValue);

// by 민형, program start_220512
const bringLocalSticker = localStorage.getItem(STIKER_KEY);
if (bringLocalSticker !== null) {
  stickers = JSON.parse(bringLocalSticker);
  stickers.forEach(makeSticker);
}
