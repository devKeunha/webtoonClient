const serverUrl = "http://172.30.1.16:8080/video";
const videoList = [
  {
    name: "010115-001-carib-1080p.mp4",
    fileName: "010115-001-carib-1080p.mp4",
  },
  {
    name: "010115-001-carib-1080p.mp4",
    fileName: "010115-001-carib-1080p.mp4",
  },
  {
    name: "010115-772-carib-1080p.mp4",
    fileName: "010115-772-carib-1080p.mp4",
  },
  {
    name: "010315-773-carib-1080p.mp4",
    fileName: "010315-773-carib-1080p.mp4",
  },
  {
    name: "011015-780-carib-1080p.mp4",
    fileName: "011015-780-carib-1080p.mp4",
  },
  { name: "011715_01-10mu-1080p.mp4", fileName: "011715_01-10mu-1080p.mp4" },
  { name: "012315_080.mp4", fileName: "012315_080.mp4" },
  {
    name: "012415-792-carib-1080p.mp4",
    fileName: "012415-792-carib-1080p.mp4",
  },
  {
    name: "040313-304-carib-whole_psp.mp4",
    fileName: "040313-304-carib-whole_psp.mp4",
  },
  {
    name: "040513-306-carib-whole_psp.mp4",
    fileName: "040513-306-carib-whole_psp.mp4",
  },
  {
    name: "041113_568-1pon-whole1_hd.mp4",
    fileName: "041113_568-1pon-whole1_hd.mp4",
  },
  {
    name: "042018-644-carib-1080p.mp4",
    fileName: "042018-644-carib-1080p.mp4",
  },
  { name: "heyzo_hd_0325_full.mp4", fileName: "heyzo_hd_0325_full.mp4" },
  { name: "heyzo_hd_0393_full.mp4", fileName: "heyzo_hd_0393_full.mp4" },
  { name: "heyzo_hd_0415_full.mp4", fileName: "heyzo_hd_0415_full.mp4" },
  { name: "heyzo_hd_0727_full.mp4", fileName: "heyzo_hd_0727_full.mp4" },
  { name: "heyzo_hd_0762_full.mp4", fileName: "heyzo_hd_0762_full.mp4" },
  { name: "heyzo_hd_0763_full.mp4", fileName: "heyzo_hd_0763_full.mp4" },
  { name: "heyzo_hd_0777_full.mp4", fileName: "heyzo_hd_0777_full.mp4" },
  { name: "heyzo_hd_0783_full.mp4", fileName: "heyzo_hd_0783_full.mp4" },
  { name: "heyzo_hd_0800_full.mp4", fileName: "heyzo_hd_0800_full.mp4" },
  { name: "heyzo_hd_0801_full.mp4", fileName: "heyzo_hd_0801_full.mp4" },
  { name: "heyzo_hd_0802_full.mp4", fileName: "heyzo_hd_0802_full.mp4" },
  { name: "heyzo_hd_0931_full.mp4", fileName: "heyzo_hd_0931_full.mp4" },
  { name: "heyzo_hd_2034_full.mp4", fileName: "heyzo_hd_2034_full.mp4" },
  { name: "heyzo_lt_0325_full.mp4", fileName: "heyzo_lt_0325_full.mp4" },
  { name: "heyzo_lt_0393_full.mp4", fileName: "heyzo_lt_0393_full.mp4" },
  { name: "heyzo_lt_0415_full.mp4", fileName: "heyzo_lt_0415_full.mp4" },
  { name: "heyzo_mb_0325_full.mp4", fileName: "heyzo_mb_0325_full.mp4" },
  { name: "heyzo_mb_0393_full.mp4", fileName: "heyzo_mb_0393_full.mp4" },
  { name: "heyzo_mb_0415_full.mp4", fileName: "heyzo_mb_0415_full.mp4" },
  {
    name: "hjd2048.com_heyzo_hd_2014-5.mp4",
    fileName: "hjd2048.com_heyzo_hd_2014-5.mp4",
  },
  { name: "SHKD-857.mp4", fileName: "SHKD-857.mp4" },
  { name: "SHKD-861.mp4", fileName: "SHKD-861.mp4" },
  { name: "ss-143.mp4", fileName: "ss-143.mp4" },
  { name: "ss-148.mp4", fileName: "ss-148.mp4" },
  { name: "SSNI-228_HD.mp4", fileName: "SSNI-228_HD.mp4" },
  { name: "SSNI-441.mp4", fileName: "SSNI-441.mp4" },
  { name: "SSNI-569.mp4", fileName: "SSNI-569.mp4" },
  { name: "SSNI-682.mp4", fileName: "SSNI-682.mp4" },
  { name: "SSNI-687.mp4", fileName: "SSNI-687.mp4" },
  { name: "ssni-703.mp4", fileName: "ssni-703.mp4" },
  { name: "ssni-719.mp4", fileName: "ssni-719.mp4" },
  { name: "ssni-737.mp4", fileName: "ssni-737.mp4" },
  { name: "ssni-789-C.mp4", fileName: "ssni-789-C.mp4" },
  { name: "SSNI-826.mp4", fileName: "SSNI-826.mp4" },
  {
    name: "맛있는세자매2018.1080p.KOR.HDRip.H264.AAC-H2O.mp4",
    fileName: "맛있는세자매2018.1080p.KOR.HDRip.H264.AAC-H2O.mp4",
  },
];

const list = document.getElementById("video-playlist");
videoList.forEach((data) => {
  const li = document.createElement("li");
  li.innerText = data.fileName;
  list.appendChild(li);
});

const videoItems = document.querySelectorAll("#video-playlist > li");
const videoSource = document.querySelector(".video-player > source");
const video = document.querySelector(".video-player");

videoItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    videoItems.forEach((i) => i.classList.remove("active"));
    e.target.classList.add("active");

    const url = `${serverUrl}/${e.target.innerText}`;
    videoSource.src = url;

    video.load();
    video.play();
  });
});
