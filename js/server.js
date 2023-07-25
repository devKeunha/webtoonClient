const BASE_URL = "http://172.30.1.16:8080/webtoon";
const BASE_SERVER = "http://172.30.1.16:8080";
// const BASE_URL = "http://127.0.0.1:8080/webtoon";
// const BASE_SERVER = "http://127.0.0.1:8080";

export const BaseUrl = BASE_URL;
export const SeverUrl = BASE_SERVER;

export const getWebtoonList = async function () {
  const url = BASE_URL + "/getList";
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json()) // cons;ole.log(`response: ${res.json()}`))
    .catch((err) => console.log(`error: ${err}`));
  return result;
};

export const getWebtoonPageList = async function (toonId) {
  const url = BASE_URL + `/getPageList/${toonId}`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(`error: ${err}`));
  return result;
};

export const getAllWebToons = async function (pageNum, keyword) {
  const url = `${BASE_URL}/getAllList/${pageNum}?keyword=${keyword}`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json()) // cons;ole.log(`response: ${res.json()}`))
    .catch((err) => console.log(`error: ${err}`));
  return result;
};

export const fileDownloads = async function (url, codID) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      webtoonid: codID,
    }),
  });
};

export const fileReDownloads = async function (url, codID, num) {
  console.log(num);
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      webtoonid: codID,
      pageNo: num,
    }),
  });
};

export const addRegistry = async function (toonID) {
  const url = BASE_URL + "/updateStatus";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      webtoonid: toonID,
      statusCode: "10",
    }),
  });
};

export const removeWebtoon = async function (toonID) {
  const url = BASE_URL + "/updateStatus";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      webtoonid: toonID,
      statusCode: "00",
    }),
  });
};

export const getImageList = async function (webtoonID, pageNo) {
  const url = BASE_URL + `/getList/${webtoonID}/${pageNo}`;
  const result = await fetch(url).then((html) => html);
  return result;
};

export const WebSite = "https://newtoki298.com/";
