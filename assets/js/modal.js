import * as importBoard from "./board.js";

const modalOpenButton = document.querySelector(".modal-open__btn");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCloseIcon = document.querySelector(".modal-close__icon");
const makeStickerButton = document.querySelector(
  ".board-form-container button"
);

const openModal = () => {
  // by 민형, board.js의 HIDDEN 사용_220611
  modal.classList.remove(importBoard.HIDDEN);
};

const closeModal = () => {
  modal.classList.add(importBoard.HIDDEN);
};

// by 민형, 스티커 생성 폼에 제목과 내용을 작성했을 때만 closeModal 호출_220605
const isValueCloseModal = () => {
  if (
    importBoard.stickerTitle.value !== "" &&
    importBoard.stickerContent.value !== ""
  ) {
    closeModal();
  }
};

modalOpenButton.addEventListener("click", openModal);
modalOverlay.addEventListener("click", closeModal);
modalCloseIcon.addEventListener("click", closeModal);
makeStickerButton.addEventListener("click", isValueCloseModal);
