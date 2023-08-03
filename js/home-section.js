// 처음 화면 로드 시 전체 비디오 리스트 가져오기

getVideoList().then(createVideoItem);

/** 비디오 리스트를 받아오는 함수 */
async function getVideoList() {
  let response = await fetch("http://oreumi.appspot.com/video/getVideoList");
  let videoListData = await response.json();
  return videoListData;
}

/** 비디오 id를 가지고 비디오에 대한 정보를 가져오는 함수 */
async function getVideoInfo(videoId) {
  let url = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
  let response = await fetch(url);
  let videoData = await response.json();
  return videoData;
}

//채널 캐시정보 담을 객체 선언
let channelCache = {};

/** 채널 정보를 가져오는 함수 */
async function getChannelInfo(channelName) {
  // 캐시에 채널 정보가 있는지 확인
  if (channelCache[channelName]) {
    return channelCache[channelName];
  }

  let url = `http://oreumi.appspot.com/channel/getChannelInfo`;

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ video_channel: channelName }),
  });

  let channelData = await response.json();

  // 캐시에 채널 정보 저장
  channelCache[channelName] = channelData;

  return channelData;
}

// 피드 비디오 리스트 로드
async function createVideoItem(videoList) {
  let feed = document.getElementById("video-containers");
  let feedItems = "";

  let videoInfoPromises = videoList.map((video) =>
    getVideoInfo(video.video_id)
  );
  let videoInfoList = await Promise.all(videoInfoPromises);

  for (let i = 0; i < videoList.length; i++) {
    let videoId = videoList[i].video_id;
    let videoInfo = videoInfoList[i];
    let channelInfo = await getChannelInfo(videoList[i].video_channel);

    let channelURL = `channel.html?channel_name=${videoList[i].video_channel}`;
    let videoURL = `video.html?id=${videoId}`;

    feedItems += `
      <div class="video-container">
        <div class="video-thumbnail" onclick="navigateToVideo('${videoURL}')">
          <img src=${videoInfo.image_link} alt="Video Thumbnail">
          <p class="video-time">0:10</p>
        </div>
        <div class="video-profile-container" onclick="navigateToChannel('${channelURL}')">
          <img src='${channelInfo.channel_profile}' alt="Video Profile" class="video-profile"onclick="navigateToChannel('${channelURL}')">
        </div>
        <div class="video-info-container">
          <div class="video-title-container" onclick="navigateToVideo('${videoURL}')">
              <h3 class="video-title">${videoInfo.video_title}</h3>
          </div>
          <div class="video-name-subinfo-container">
            <h4 class="channel-name" onclick="navigateToChannel('${channelURL}')">${videoInfo.video_channel}</h4>
            <h5 class="video-sub-info">${formatViews(videoInfo.views)} · ${formatDate(videoInfo.upload_date)}</h5>
          </div>
        </div>
      </div>
    `;
  }

  // 화면에 추가
  feed.innerHTML = feedItems;
}

function navigateToVideo(videoURL) {
    window.location.href = videoURL;
}

/** channel html로 바로가기 위한 함수 */
function navigateToChannel(channelURL) {
    window.location.href = channelURL;
}


let searchButton = document.getElementById("search-box-icon");
let searchBox = document.getElementById("search-box-input-text");
let topmenu = document.querySelectorAll(".top-menu-li");

// 검색 버튼 클릭 시 필터링 실행
searchButton.addEventListener("click", function () {
  let searchKeyword = searchBox.value;
  getVideoList().then((videoList) => {
    let filteredVideoList = videoList.filter((video) =>
      video.video_title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    createVideoItem(filteredVideoList);
  });
});

searchBox.addEventListener("keypress", function (event) {
  // 엔터 키의 키 코드 = 13
  if (event.key === 13) {
    let searchKeyword = searchBox.value;
    getVideoList().then((videoList) => {
      let filteredVideoList = videoList.filter((video) =>
        video.video_title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      createVideoItem(filteredVideoList);
    });
  }
});

topmenu.forEach(item => {
    item.addEventListener("click", function() {
        topmenu.forEach(menuItem => {
            menuItem.classList.remove("active");
        });


        item.classList.add("active");
        let tagword = item.textContent;
        if (tagword === "동물") {
            tagword = ["토끼", "판다쌍둥이푸바오아이바오러바오"];
        }
        getVideoList().then((videoList) => {
            let filteredVideoList;
            if (tagword === "전체") {
                filteredVideoList = videoList;
            }
            else if (Array.isArray(tagword)) {
                filteredVideoList = videoList.filter((video) =>
                    video.video_tag.some(tag => tagword.includes(tag.toLowerCase()))
                );
            }
            else {
                filteredVideoList = videoList.filter((video) =>
                video.video_tag[0].toLowerCase().includes(tagword.toLowerCase()));
            }
            createVideoItem(filteredVideoList);
        });
    });
});

/** 날짜 포맷 정하는 함수 */
function formatDate(dateStr) {
    // 입력된 날짜 문자열을 파싱하여 Date 객체를 생성
    function parseDate(dateStr) {
        const parts = dateStr.split("/");
        // parts[0]은 년도, parts[1]은 월, parts[2]는 일
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    /** 두 날짜간 차이 계산 */
    function calculateDifference(currentDate, pastDate) {
        const diffMilliseconds = currentDate - pastDate;
        const diffSeconds = diffMilliseconds / 1000;
        const diffMinutes = diffSeconds / 60;
        const diffHours = diffMinutes / 60;
        const diffDays = diffHours / 24;
        const diffWeeks = diffDays / 7;
        const diffMonths = diffDays / 30.44; // 평균적으로 한 달은 30.44일로 계산

        if (diffMonths >= 1) {
            return Math.round(diffMonths) + "개월 전";
        } else if (diffWeeks >= 1) {
            return Math.round(diffWeeks) + "주 전";
        } else if (diffDays >= 1) {
            return Math.round(diffDays) + "일 전";
        } else if (diffHours >= 1) {
            return Math.round(diffHours) + "시간 전";
        } else {
            return Math.round(diffMinutes) + "분 전";
        }
    }

    const pastDate = parseDate(dateStr);
    const currentDate = new Date();
    return calculateDifference(currentDate, pastDate);
}

/** 조회수 형식을 정하는 함수 */
function formatViews(views) {
    // 1만 이상
    if (views >= 10000) {
        return `조회수 ${Math.round(views / 10000)}만회`;
    }
    // 1천 이상
    else if (views.length >= 4) {
        return `조회수 ${Math.round(views)}천회`;
    }
    // 1천 미만
    else {
        return `조회수 ${views}회`;
    }
}

