const stickerForm = document.querySelector("#board-form");
const stickerTitle = document.querySelector("#board-form input[type=text]");
const stickerContent = document.querySelector("#board-form textarea");
const stickerBoard = document.querySelector(".board-container");

let removeSticker = (event) => {
  const rmSticker = event.target.parentElement.parentElement;
  rmSticker.remove();
};

let makeSticker = (event) => {
  event.preventDefault();
  stickerDiv = document.createElement("div");
  stickerDiv.classList.add("board-container__sticker");

  titleDiv = document.createElement("div");
  titleDiv.innerText = stickerTitle.value;
  contentDiv = document.createElement("div");
  contentDiv.innerText = stickerContent.value;
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

stickerForm.addEventListener("submit", makeSticker);
