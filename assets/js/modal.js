const modalOpenButton = document.querySelector(".modal-open__btn");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCloseIcon = document.querySelector(".modal-close__icon");
const makeStickerButton = document.querySelector(
  ".board-form-container button"
);
const modalContentTitle = document.querySelector(".board-form-container input");
const modalContentTextArea = document.querySelector(
  ".board-form-container textarea"
);

function openModal() {
  modal.classList.remove(HIDDEN);
}

function closeModal() {
  modal.classList.add(HIDDEN);
}

// by 민형, 스티커 생성 폼에 제목과 내용을 작성했을 때만 closeModal 호출_220605
function makebuttonCloseModal() {
  if (modalContentTitle.value !== "" && modalContentTextArea.value !== "") {
    closeModal();
  }
}

modalOpenButton.addEventListener("click", openModal);
modalOverlay.addEventListener("click", closeModal);
modalCloseIcon.addEventListener("click", closeModal);
makeStickerButton.addEventListener("click", makebuttonCloseModal);
