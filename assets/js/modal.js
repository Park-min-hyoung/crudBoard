const modalOpenButton = document.querySelector(".modal-open__btn");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCloseIcon = document.querySelector(".modal-close__icon");
const makeStickerButton = document.querySelector(
  ".board-form-container button"
);
const formInputTitle = document.querySelector(".board-form-container input");
const formInputTextArea = document.querySelector(
  ".board-form-container textarea"
);

function openModal() {
  // board.js의 HIDDEN 사용
  modal.classList.remove(HIDDEN);
}

function closeModal() {
  // board.js의 HIDDEN 사용
  modal.classList.add(HIDDEN);
}

// by 민형, 스티커 생성 폼에 제목과 내용을 작성했을 때만 closeModal 호출_220605
function isValueCloseModal() {
  if (formInputTitle.value !== "" && formInputTextArea.value !== "") {
    closeModal();
  }
}

modalOpenButton.addEventListener("click", openModal);
modalOverlay.addEventListener("click", closeModal);
modalCloseIcon.addEventListener("click", closeModal);
makeStickerButton.addEventListener("click", isValueCloseModal);
