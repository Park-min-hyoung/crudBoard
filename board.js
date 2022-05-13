const stickerForm = document.querySelector("#board-form");
const stickerTitle = document.querySelector("#board-form input[type=text]");
const stickerContent = document.querySelector("#board-form textarea");
const stickerBoard = document.querySelector(".board-container");

const STIKER_KEY = "sticker";

let stickers = [];

let stickerLocalSave = () => {
  localStorage.setItem(STIKER_KEY, JSON.stringify(stickers));
};

let allRemoveSticker = () => {
  const stickerContainer = document.querySelector(".board-container");
  while (stickerContainer.hasChildNodes()) {
    stickerContainer.removeChild(stickerContainer.firstChild);
  }
};

let removeSticker = (event) => {
  const rmSticker = event.target.parentElement.parentElement;
  stickers = stickers.filter((item) => item.id !== parseInt(rmSticker.id));
  stickerLocalSave(stickers);
  rmSticker.remove();
};

let makeSticker = (toMakeSticker, stickerInfo) => {
  toMakeSticker.insertAdjacentHTML(
    "beforeend",
    `<div class="sticker-cotainer__title">${stickerInfo.title}</div>`
  );

  const contentDiv = document.createElement("div");
  contentDiv.innerText = stickerInfo.content;
  contentDiv.classList.add("sticker-cotainer__content");

  const updateButton = document.createElement("button");
  updateButton.innerText = "내용 수정";
  updateButton.classList.add("sticker-cotainer__update-btn");

  const updateTextArea = document.createElement("textarea");
  updateTextArea.placeholder = "수정할 내용을 입력해주세요";
  updateTextArea.rows = 10;
  updateTextArea.cols = 40;
  updateTextArea.classList.add("sticker-cotainer__update-text", "hidden");

  const confirmButton = document.createElement("button");
  confirmButton.innerText = "확인";
  confirmButton.classList.add("sticker-cotainer__confirm-btn", "hidden");

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "취소";
  cancelButton.classList.add("sticker-cotainer__cancel-btn", "hidden");

  const deleteSpan = document.createElement("span");
  deleteSpan.insertAdjacentHTML(
    "beforeend",
    `<i class="fa-solid fa-xmark fa-2x"></i>`
  );

  toMakeSticker.append(contentDiv);
  toMakeSticker.append(updateButton);
  toMakeSticker.append(updateTextArea);
  toMakeSticker.append(confirmButton);
  toMakeSticker.append(cancelButton);
  toMakeSticker.append(deleteSpan);

  let elementHiddenModify = () => {
    contentDiv.classList.toggle("hidden");
    updateButton.classList.toggle("hidden");
    updateTextArea.classList.toggle("hidden");
    confirmButton.classList.toggle("hidden");
    cancelButton.classList.toggle("hidden");
  };

  updateButton.addEventListener("click", elementHiddenModify);
  confirmButton.onclick = ({ target }) => {
    updateDiv = target.parentElement;

    // by 민형, 모든 스티커 삭제_220513
    allRemoveSticker();
    for (let item of stickers) {
      if (item.id === parseInt(updateDiv.id)) {
        item.content = updateTextArea.value;
        stickerLocalSave();
        elementHiddenModify();
        // by 민형, 스티커 내용 수정 후 다시 스티커 붙이기_220513
        stickers.forEach(attachSticker);
        break;
      }
    }
  };
  cancelButton.addEventListener("click", elementHiddenModify);
  deleteSpan.addEventListener("click", removeSticker);

  return toMakeSticker;
};

let attachSticker = (stickerInfo) => {
  const stickerDiv = document.createElement("div");
  stickerDiv.id = stickerInfo.id;
  stickerDiv.classList.add("board-container__sticker");

  const madeSticker = makeSticker(stickerDiv, stickerInfo);
  stickerBoard.append(madeSticker);

  stickerTitle.value = "";
  stickerContent.value = "";
};

// by 민형, 사용자가 작성한 내용을 받아 처리_220512
let receiveValue = (event) => {
  event.preventDefault();
  const stickerObj = {
    title: stickerTitle.value,
    content: stickerContent.value,
    id: Date.now(),
  };

  stickers.push(stickerObj);
  stickerLocalSave(stickerObj);
  attachSticker(stickerObj);
};

stickerForm.addEventListener("submit", receiveValue);

// by 민형, program start_220512
const bringLocalSticker = localStorage.getItem(STIKER_KEY);
if (bringLocalSticker !== null) {
  stickers = JSON.parse(bringLocalSticker);
  stickers.forEach(attachSticker);
}
