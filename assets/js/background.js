class imageProduce {
  constructor() {
    // by 민형, json 파일이(raw 버튼)나 jpg(download 버튼)도 GitHub에서 가져옴으로써 정상적으로 사용할 수 있음_220619
    this.imageURL =
      "https://raw.githubusercontent.com/Park-min-hyoung/crudBoard/master/assets/data/data.json";
    this.setInitVariables();
    this.setInitData(this.imageURL);
  }

  setInitVariables() {
    this.bgImage = document.createElement("img");
  }

  setInitData(imageURL) {
    this.getData(imageURL, this.setBackgroundImg.bind(this));
  }

  getData(imageURL, fn) {
    const oReq = new XMLHttpRequest();

    oReq.addEventListener("load", () => {
      const imageDataList = JSON.parse(oReq.responseText).body;
      fn(imageDataList);
    });

    oReq.open("GET", imageURL);
    oReq.send();
  }

  setBackgroundImg(imageList) {
    const choseImage =
      imageList[Math.floor(Math.random() * imageList.length)].url;
    // by 민형, choseImage가 문자열이므로 Template 사용안해도 됨_220612
    this.bgImage.src = choseImage;
    this.bgImage.classList.add("background-img");
    document.body.append(this.bgImage);
  }
}

new imageProduce();
