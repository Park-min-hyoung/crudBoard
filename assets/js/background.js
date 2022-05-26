const images = [
  "../assets/images/1.jpg",
  "../assets/images/2.jpg",
  "../assets/images/3.jpg",
  "../assets/images/4.jpg",
  "../assets/images/5.jpg",
  "../assets/images/6.jpg",
  "../assets/images/7.jpg",
  "../assets/images/8.jpg",
  "../assets/images/9.jpg",
  "../assets/images/10.jpg",
];

const choseImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `${choseImage}`;
bgImage.classList.add("background-img");

document.body.appendChild(bgImage);
