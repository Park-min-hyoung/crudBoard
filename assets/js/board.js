const stickerProduceForm = document.querySelector("#board-form");
export const stickerTitle = document.querySelector("#board-form input");
export const stickerContent = document.querySelector("#board-form textarea");
const stickerBoard = document.querySelector(".board-container");
const searchForm = document.querySelector("#search-form");
const searchContent = document.querySelector("#search-form input[type=text]");
export const noSearchNotice = document.querySelector("#no-search");

const STIKER_KEY = "sticker";
export const HIDDEN = "hidden";

export let stickers = [];

let stickerLocalSave = () => {
  localStorage.setItem(STIKER_KEY, JSON.stringify(stickers));
};

// by 민형, 게시판에 있는 모든 스티커 삭제_220514
export let allRemoveSticker = () => {
  while (stickerBoard.hasChildNodes()) {
    stickerBoard.removeChild(stickerBoard.firstChild);
  }
};

// by 민형, x버튼 누르면 스티커 삭제_220514
let removeSticker = ({ target }) => {
  // by 민형, Destructuring 문법 사용_220614
  // PointerEvent 객체의 target(HTMLElement)만 가져와서 사용
  const rmSticker = target.parentElement;
  stickers = stickers.filter(
    (sticker) => sticker.id !== parseInt(rmSticker.id)
  );
  stickerLocalSave(stickers);
  rmSticker.parentElement.remove();
};

// by 민형, div 태그(빈 스티커)에 항목들 생성 및 기능 추가_220514
let makeSticker = (toMakeSticker, stickerInfo) => {
  // by 민형, sticker-cotainer__user 클래스 태그를 태그만 생성_220605
  // const stickerUserName = JSON.parse(localStorage.getItem("user")); => 프로그램이 시작할 때 user key에 대한 value가 없으므로 null
  // stickerUserName[0].toUpperCase() + stickerUserName.slice(1) => null에 있어 메소드를 적용하니 오류가 발생 그러므로 태그만 생성 후 user.js에서 처리
  toMakeSticker.insertAdjacentHTML(
    "beforeend",
    `
      <div class="sticker-container__header">
        <div class="sticker-cotainer__title">${stickerInfo.title}</div>
        <div class="sticker-cotainer__user"></div>
      </div>
    `
  );

  const contentDiv = document.createElement("div");
  contentDiv.innerText = stickerInfo.content;
  contentDiv.classList.add("sticker-cotainer__content");

  const updateButton = document.createElement("button");
  updateButton.innerHTML = `<i class="fa-solid fa-pencil fa-lg"></i>Update Content`;
  updateButton.classList.add("sticker-cotainer__update-btn");

  const updateTextArea = document.createElement("textarea");
  updateTextArea.placeholder = "수정할 내용을 입력해주세요";
  updateTextArea.rows = 8;
  updateTextArea.cols = 35;
  updateTextArea.classList.add("sticker-cotainer__update-text", HIDDEN);

  const confirmButton = document.createElement("button");
  confirmButton.innerText = "확인";
  confirmButton.classList.add("sticker-cotainer__confirm-btn", HIDDEN);

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "취소";
  cancelButton.classList.add("sticker-cotainer__cancel-btn", HIDDEN);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("sticker-cotainer__delete-btn");
  deleteButton.insertAdjacentHTML(
    "beforeend",
    `<i class="fa-solid fa-xmark fa-lg"></i> Sticker Delete`
  );

  toMakeSticker.append(contentDiv);
  toMakeSticker.append(updateButton);
  toMakeSticker.append(updateTextArea);
  toMakeSticker.append(confirmButton);
  toMakeSticker.append(cancelButton);
  toMakeSticker.append(deleteButton);

  let elementHiddenModify = () => {
    contentDiv.classList.toggle(HIDDEN);
    updateButton.classList.toggle(HIDDEN);
    updateTextArea.classList.toggle(HIDDEN);
    confirmButton.classList.toggle(HIDDEN);
    cancelButton.classList.toggle(HIDDEN);
  };

  let updateStickerContent = ({ target }) => {
    const updateStickerDiv = target.parentElement;

    // by 민형, 모든 스티커 삭제_220513
    allRemoveSticker();
    // by 민형, for ~ of 사용_220616
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
  deleteButton.addEventListener("click", removeSticker);

  return toMakeSticker;
};

export let attachSticker = (stickerInfo) => {
  // by 민형, 스티커를 적절하게 배치하기 위한 공간 생성위해 추가_220603
  const stickersDiv = document.createElement("div");
  stickersDiv.classList.add("board-container__stickers");
  const stickerDiv = document.createElement("div");
  stickerDiv.id = stickerInfo.id;
  stickerDiv.classList.add("board-container__sticker");

  const madeSticker = makeSticker(stickerDiv, stickerInfo);
  stickersDiv.append(madeSticker);
  stickerBoard.append(stickersDiv);
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
  const findStickerContent = searchContent.value;
  searchContent.value = "";

  const searchResultStickers = stickers.filter(
    (sticker) =>
      // by 민형, 검색 정보에 해당하는 제목과 내용이 있다면_220610
      sticker.title.includes(findStickerContent) ||
      sticker.content.includes(findStickerContent)
  );
  allRemoveSticker();
  // by 민형, 사용자가 입력한 정보가 포함된 스티거가 한개라도 있다면_220516
  if (searchResultStickers.length > 0) {
    noSearchNotice.classList.add(HIDDEN);
    // by 민형, 검색 정보가 포함된 스티커들을 게시판에 붙이기_220610
    searchResultStickers.forEach(attachSticker);
  } else {
    noSearchNotice.classList.remove(HIDDEN);
  }
};

stickerProduceForm.addEventListener("submit", receiveValue);
searchForm.addEventListener("submit", searchSticker);

// by 민형, program start_220512
const bringLocalSticker = localStorage.getItem(STIKER_KEY);
if (bringLocalSticker !== null) {
  stickers = JSON.parse(bringLocalSticker);
  stickers.forEach(attachSticker);
}
