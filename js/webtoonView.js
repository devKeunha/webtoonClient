import { getImageList, SeverUrl } from "./server.js";

const divImageContainer = document.querySelector("div.image-gallery");
const divLocation = document.getElementById("locationCheck");
const urlParams = new URLSearchParams(window.location.search);
const webToonid = urlParams.get("webtoonId");
let pageNo = urlParams.get("pageNo");
const maxPageNo = urlParams.get("maxPageNo");
let isLoading = false;

async function loadImageList() {
  const list = await getImageList(webToonid, pageNo).then((html) =>
    html.json()
  );

  if (list.length <= 0) {
    return;
  }
  list.map((data) => {
    const div = document.createElement("div");
    div.classList.add("image-container");
    const image = document.createElement("img");
    image.classList.add("lazy");
    image.src = `${SeverUrl}${data.serverUrl}`;
    div.appendChild(image);

    divImageContainer.appendChild(div);
  });
}

window.addEventListener("scroll", async function (e) {
  if (isLoading) return;
  else if (Number(pageNo) > Number(maxPageNo)) return;

  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = divImageContainer.scrollHeight;
  const location = `${scrollTop}: ${clientHeight}: ${scrollHeight}`;
  divLocation.innerText = location;
  if (scrollTop + clientHeight >= scrollHeight - 150) {
    pageNo++;
    isLoading = true;
    await loadImageList();
    isLoading = false;
  }
});

loadImageList();
