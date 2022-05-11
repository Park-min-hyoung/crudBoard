const stickerForm = document.querySelector("#board-form");
const stickerTitle = document.querySelector("#board-form input[type=text]");
const stickerContent = document.querySelector("#board-form textarea");
const stickerBoard = document.querySelector(".board-container");

function makeSticker(event) {
  event.preventDefault();
  stickerDiv = document.createElement("div");
  stickerDiv.classList.add("board-container__sticker");

  titleDiv = document.createElement("div");
  titleDiv.innerText = stickerTitle.value;
  contentDiv = document.createElement("div");
  contentDiv.innerText = stickerContent.value;

  stickerDiv.append(titleDiv);
  stickerDiv.append(contentDiv);
  stickerBoard.append(stickerDiv);

  stickerTitle.value = "";
  stickerContent.value = "";
}

stickerForm.addEventListener("submit", makeSticker);
