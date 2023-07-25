const webToonListDiv = document.getElementById("contens-webtoons-container");
import {
  WebSite,
  BaseUrl,
  getWebtoonList,
  fileDownloads,
  removeWebtoon,
} from "./server.js";
let isDownloading = false;

async function writeWebToonList() {
  const list = await getWebtoonList();
  list.map((webtoon) => {
    webToonListDiv.innerHTML += templateWebtoon(webtoon);
  });
  subscribeEvent();
}

const webtoonLink = document.getElementById("otherToonWebsite");
webtoonLink.setAttribute("href", WebSite);

function templateWebtoon(webToon) {
  const siteName = webToon.data === "WEB_NAVER" ? "NAVER" : "OTHER";
  const tempDate = Date.parse(webToon.updateAt);
  const date = new Date(tempDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const strDate = [year, month, day].join("-");

  const tempPageDate = Date.parse(webToon.pageLastDate);
  const pageDate = new Date(tempPageDate);
  const strPageDate = [
    pageDate.getFullYear(),
    String(pageDate.getMonth() + 1).padStart(2, "0"),
    String(pageDate.getDate()).padStart(2, "0"),
  ].join("-");

  return `
<li>
  <div class="webtoon">
      <div class="webtoon-header">          
          <p class='${siteName.toLowerCase()}'>N</p>
          <a href="/webtoonPages.html?site=${siteName.toLowerCase()}&webtoonId=${
    webToon.webtoonID
  }&pageNo=${webToon.viewLastPageNo}&maxPageNo=${webToon.maxPageNum}">
            <div class="webtoon-info">
                <h3>${webToon.title}</h3>
                <p>${strDate} ( ${strPageDate} )</p>
            </div>
          </a>
          <div class="webtoon-more">
              <i class='bx bx-chevron-up'></i>
          </div>
      </div>
      <div class="webtoon-function hidden">
          <i site=${siteName} webtoonid=${
    webToon.webtoonID
  } class='bx bx-minus removeWebtoon'></i>
          <i site=${siteName} webtoonid=${
    webToon.webtoonID
  } class='bx bx-download webtoonSync'></i>
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

  const removeBtn = document.querySelectorAll(".removeWebtoon");
  removeBtn.forEach(function (e) {
    e.addEventListener("click", async function (args) {
      args.preventDefault();
      const webtoonID = args.target.attributes.webtoonid.value;
      await removeWebtoon(webtoonID);
      webToonListDiv.removeChild(args.target.parentNode.parentNode.parentNode);
    });
  });

  const syncBtn = document.querySelectorAll(".webtoonSync");
  syncBtn.forEach(function (e) {
    e.addEventListener("click", function (args) {
      args.preventDefault();
      if (isDownloading) return;

      const webtoonID = args.target.attributes.webtoonid.value;
      const site = args.target.attributes.site.value;
      downloadWebToons(site, webtoonID);
    });
  });
}

async function downloadWebToons(site, codID) {
  alert("다운로드 시작");
  isDownloading = true;
  const url = `${BaseUrl}/download/${site.toLowerCase()}`;
  await fileDownloads(url, codID);
  isDownloading = false;
}

writeWebToonList();
