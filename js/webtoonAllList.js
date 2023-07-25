const webToonListDiv = document.getElementById("contens-webtoons-container");
import { WebSite, getAllWebToons, addRegistry } from "./server.js";

const webtoonLink = document.getElementById("otherToonWebsite");
webtoonLink.setAttribute("href", WebSite);

let pageNo = 1;
let isLoading = false;

async function writeWebToonList(keyword) {
  if (keyword === undefined) keyword = "";
  const list = await getAllWebToons(pageNo, keyword);
  list.map((webtoon) => {
    webToonListDiv.innerHTML += templateWebtoon(webtoon);
  });
  subscribeEvent();
}

function templateWebtoon(webToon) {
  const siteName =
    webToon.websiteCode === "WEB_NAVER"
      ? "NAVER"
      : webToon.websiteCode === "WEB_COMIC"
      ? "COMIC"
      : "OTHER";
  const siteSimbol = webToon.websiteCode === "WEB_COMIC" ? "C" : "N";
  const tempDate = Date.parse(webToon.updateAt);
  const date = new Date(tempDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const strDate = [year, month, day].join("-");

  return `
<li>
  <div class="webtoon">
      <div class="webtoon-header">
        <p class='${siteName.toLowerCase()}'>${siteSimbol}</p>
        <a href="${webToon.siteUrl}">
          <div class="webtoon-info">
              <h3>${webToon.title}</h3>
              <p>${strDate}</p>
          </div>
        </a>
        <div class="weboton-more">
          <i webtoonid=${webToon.webtoonID} class='bx bx-plus-circle' ></i>
        </div>
      </div>
  </div>
</li>`;
}

function subscribeEvent() {
  const buttons = document.querySelectorAll("div.weboton-more");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (args) => {
      args.preventDefault();
      const webtoonID = args.target.attributes.webtoonid.value;
      downloadWebToons(webtoonID);
      webToonListDiv.removeChild(
        args.target.parentNode.parentNode.parentNode.parentNode
      );
    });
  });
}

async function downloadWebToons(codID) {
  await addRegistry(codID);
}

window.addEventListener("scroll", async function (e) {
  if (isLoading) return;

  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = webToonListDiv.scrollHeight;

  if (scrollTop + clientHeight >= scrollHeight - 150) {
    pageNo++;
    isLoading = true;
    await writeWebToonList();
    isLoading = false;
  }
});

const searchFom = document.getElementById("form-search");
searchFom.addEventListener("submit", async function (e) {
  e.preventDefault();

  const keywordText = document.getElementById("search-keyword").value;
  pageNo = 1;
  isLoading = true;
  webToonListDiv.innerHTML = "";
  await writeWebToonList(keywordText);
  isLoading = false;
});

writeWebToonList();
