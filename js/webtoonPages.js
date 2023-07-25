const webToonListDiv = document.getElementById("contens-webtoons-container");
import {
  WebSite,
  BaseUrl,
  getWebtoonPageList,
  fileReDownloads,
} from "./server.js";
const urlParams = new URLSearchParams(window.location.search);
const site = urlParams.get("site");
const webToonid = urlParams.get("webtoonId");
const maxPageNo = urlParams.get("maxPageNo");
let isDownloading = false;

const webtoonLink = document.getElementById("otherToonWebsite");
webtoonLink.setAttribute("href", WebSite);

async function writeWebToonList(toonId) {
  const list = await getWebtoonPageList(toonId);
  list.map((webtoon) => {
    webToonListDiv.innerHTML += templateWebtoon(webtoon);
  });
  subscribeEvent();
}

function templateWebtoon(webToon) {
  const tempDate = Date.parse(webToon.updateAt);
  const date = new Date(tempDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const strDate = [year, month, day].join("-");

  const tempPageDate = Date.parse(webToon.viewAt ?? "0000-01-01");
  const pageDate = new Date(tempPageDate);
  const viewDate = [
    pageDate.getFullYear(),
    String(pageDate.getMonth() + 1).padStart(2, "0"),
    String(pageDate.getDate()).padStart(2, "0"),
  ].join("-");

  return `
  <li>
    <div class="webtoon">
        <div class="webtoon-header">
            <a href='/webtoonView.html?webtoonId=${webToon.webtoonID}&pageNo=${webToon.pageNo}&maxPageNo=${maxPageNo}'>
                <div class="webtoon-page-info">
                    <span class="webtoon-info-page">${webToon.pageNo}.</span>
                    <span class="webtoon-info-title">${webToon.title}</span>
                    <span class="webtoon-info-date">${strDate}</span>
                    <span class="webtoon-info-date">${viewDate}</span>
                </div>
            </a>
            <div class="webtoon-more">
                <i class='bx bx-chevron-up'></i>
            </div>
        </div>
        <div class="webtoon-function hidden">
            <i webtoonid=${webToon.webtoonID} pageno=${webToon.pageNo}
                class='bx bx-refresh refreshWebtoon'></i>
        </div>
    </div>
</li>`;
}

function subscribeEvent() {
  const moreButton = document.querySelectorAll(".webtoon-more > i");
  moreButton.forEach(function (e) {
    e.addEventListener("click", function (args) {
      args.preventDefault;
      const functionNode =
        args.target.parentNode.parentNode.parentNode.querySelector(
          "div.webtoon-function"
        );
      functionNode.classList.toggle("hidden");
      args.target.classList.toggle("bx-chevron-up");
      args.target.classList.toggle("bx-chevron-down");
    });
  });

  const removeBtn = document.querySelectorAll(".refreshWebtoon");
  removeBtn.forEach(function (e) {
    e.addEventListener("click", async function (args) {
      args.preventDefault();
      const webtoonID = args.target.attributes.webtoonid.value;
      const page = args.target.attributes.pageno.value;
      await downloadWebToons(webtoonID, page);
    });
  });
}

async function downloadWebToons(codID, pageNo) {
  alert("다운로드 시작");
  isDownloading = true;
  const url = `${BaseUrl}/redownload/${site.toLowerCase()}`;
  await fileReDownloads(url, codID, pageNo);
  isDownloading = false;
}

writeWebToonList(webToonid);
