const stickerForm = document.querySelector("#board-form");
const stickerTitle = document.querySelector("#board-form input[type=text]");
const stickerContent = document.querySelector("#board-form textarea");
const stickerBoard = document.querySelector(".board-container");
const searchForm = document.querySelector("#search-form");
const searchContent = document.querySelector("#search-form input[type=text]");
const noSearchNotice = document.querySelector("#no-search");

const STIKER_KEY = "sticker";
const HIDDEN = "hidden";

let stickers = [];

let stickerLocalSave = () => {
  localStorage.setItem(STIKER_KEY, JSON.stringify(stickers));
};

// by 민형, 게시판에 있는 모든 스티커 삭제_220514
let allRemoveSticker = () => {
  while (stickerBoard.hasChildNodes()) {
    stickerBoard.removeChild(stickerBoard.firstChild);
  }
};

// by 민형, x버튼 누르면 스티커 삭제_220514
let removeSticker = (event) => {
  const rmSticker = event.target.parentElement.parentElement;
  stickers = stickers.filter(
    (sticker) => sticker.id !== parseInt(rmSticker.id)
  );
  stickerLocalSave(stickers);
  rmSticker.remove();
};

// by 민형, div 태그(빈 스티커)에 항목들 생성 및 기능 추가_220514
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
  updateTextArea.classList.add("sticker-cotainer__update-text", HIDDEN);

  const confirmButton = document.createElement("button");
  confirmButton.innerText = "확인";
  confirmButton.classList.add("sticker-cotainer__confirm-btn", HIDDEN);

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "취소";
  cancelButton.classList.add("sticker-cotainer__cancel-btn", HIDDEN);

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
    contentDiv.classList.toggle(HIDDEN);
    updateButton.classList.toggle(HIDDEN);
    updateTextArea.classList.toggle(HIDDEN);
    confirmButton.classList.toggle(HIDDEN);
    cancelButton.classList.toggle(HIDDEN);
  };

  let updateStickerContent = ({ target }) => {
    updateStickerDiv = target.parentElement;

    // by 민형, 모든 스티커 삭제_220513
    allRemoveSticker();
    for (let sticker of stickers) {
      if (sticker.id === parseInt(updateStickerDiv.id)) {
        sticker.content = updateTextArea.value;
        stickerLocalSave();
        elementHiddenModify();
        // by 민형, 스티커 내용 수정 후 다시 스티커 붙이기_220513
        stickers.forEach(attachSticker);
        break;
      }
    }
  };

  updateButton.addEventListener("click", elementHiddenModify);
  confirmButton.addEventListener("click", updateStickerContent);
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
};

// by 민형, 사용자가 작성한 내용을 받아 처리_220512
let receiveValue = (event) => {
  event.preventDefault();
  const stickerObj = {
    title: stickerTitle.value,
    content: stickerContent.value,
    id: Date.now(),
  };
  stickerTitle.value = "";
  stickerContent.value = "";

  stickers.push(stickerObj);
  stickerLocalSave(stickerObj);
  attachSticker(stickerObj);
};

let searchSticker = (event) => {
  event.preventDefault();
  // by 민형, 검색 시에 게시물 작성 폼 제거_220516
  stickerForm.classList.add("hidden");
  const findStickerContent = searchContent.value;
  searchContent.value = "";

  searchStickerArr = stickers.filter(
    (sticker) =>
      sticker.content.includes(findStickerContent) ||
      sticker.title.includes(findStickerContent)
  );
  allRemoveSticker();
  // by 민형, 사용자가 입력한 정보가 포함된 스티거가 한개라도 있다면_220516
  if (searchStickerArr.length > 0) {
    noSearchNotice.classList.add(HIDDEN);
    searchStickerArr.forEach(attachSticker);
  } else {
    noSearchNotice.classList.remove(HIDDEN);
  }
};

stickerForm.addEventListener("submit", receiveValue);
searchForm.addEventListener("submit", searchSticker);

// by 민형, program start_220512
const bringLocalSticker = localStorage.getItem(STIKER_KEY);
if (bringLocalSticker !== null) {
  stickers = JSON.parse(bringLocalSticker);
  stickers.forEach(attachSticker);
}
