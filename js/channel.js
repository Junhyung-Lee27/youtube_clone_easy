
const currentURL = new URL(window.location.href);

// URLSearchParams 객체 생성
const urlParams = new URLSearchParams(currentURL.search);

// channel_name 쿼리 매개변수 가져오기
// 아래 channelName과 다르게 하기 위함
const channel_Name = urlParams.get('channel_name');

// 비디오 리스트에서 비디오 id값을 받아오는 함수
function getVideoList() {
    const request = new XMLHttpRequest();
    const url = "https://oreumi.appspot.com/video/getVideoList";
    request.open("GET", url, true);

    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            // 파싱
            const response = JSON.parse(request.responseText);

            // videoid 들을 배열에 저장
            const videoIds = [];
            for (let i = 0; i < response.length; i++) {
                videoIds.push(response[i].video_id);
            }

            let viewscount = 0;
            let maxviewvideoID = 0;
            for (let i = 0; i < response.length; i++) {
                if (response[i].video_channel == channel_Name) {
                    if (response[i].views > viewscount) {
                        viewscount = response[i].views;
                        maxviewvideoID = response[i].video_id;
                    }
                }
            }
            channelimage(channel_Name);
            representivevideo(maxviewvideoID);
            
            // 비디오 정보를 받아와서 표시하는 함수 호출
            videoIds.forEach((videoId) => {
                
                getVideoInfo(videoId);
            });
            
        }
    };
    request.send();
}

/** POST방식으로 channel이름, 배너, 프로필, 구독자수의 데이터를 받아오는 함수 */
function channelimage(channelname) {
    const url = "https://oreumi.appspot.com/channel/getChannelInfo";
    const data = { video_channel: channelname };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        displaychannelimage(data);
    });
}

/** 대표영상을 정하기 위해 가장 높은 조회수를 가진 videoID를 사용해 video 정보 가져오기 */
function representivevideo(maxvideoID) {
    fetch(`https://oreumi.appspot.com/video/getVideoInfo?video_id=${maxvideoID}`)
        .then((response) => response.json())
        .then((data) => {
            // video 정보를 표시하는 함수 호출
            displayVideorepresentive(data);
        });
}

/** 비디오 id 값들을 사용해 video 정보 받아오는 함수 */
function getVideoInfo(video_id) {
    
    fetch(`https://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`)
        .then((response) => response.json())
        .then((data) => {
            // video 정보를 표시하는 함수 호출
            displayVideoInfo(data);
        });
        
}
/** 채널 커버이미지와 채널명, 구독자수, 채널주인 프로필 사진 보여주는 함수 */
function displaychannelimage(channelimageInfo) {
    const channelsection1 = document.getElementById("channel-section-1");

    const channelimagecontainerHTML = `
      <div id="channel-cover">
        <img src="${channelimageInfo.channel_banner}" alt="Channel Cover">
      </div>
      <div id="channel-title">
        <div id="channel-profile-container">
            <img id="channel-profile" src="${channelimageInfo.channel_profile}" alt="Channel Profile">
            <div class="channel-name-subscribers">
              <h4 id="channel-name">${channelimageInfo.channel_name}</h4>
              <p id="channel-subscribers">${formatsubscribers(channelimageInfo.subscribers)}</p>
            </div>
          </div>
          <div id="subscribe-btn-id">
            <button class="subscribe-btn">SUBSCRIBES</button>
          </div>
        </div>
      </div>
    `;

    
    channelsection1.innerHTML += channelimagecontainerHTML;

    const subscribeBtn = document.querySelector(".subscribe-btn");
    subscribeBtn.addEventListener("click", function () {

      if (subscribeBtn.textContent === "SUBSCRIBES") {
        subscribeBtn.textContent = "SUBSCRIBED";
        subscribeBtn.style.backgroundColor = "white";
        subscribeBtn.style.color = "black";
      }
      else {
        subscribeBtn.textContent = "SUBSCRIBES";
        isSubscribed = "SUBSCRIBES";
        subscribeBtn.style.backgroundColor = "#C00";
        subscribeBtn.style.color = "#FFF";
      }
      
  });
}

/** 아래쪽에 나오는 영상들 */
function displayVideoInfo(videoInfo) {
    let videoURL = `video.html?id=${videoInfo.video_id}`;
    if (videoInfo.video_channel === channel_Name) {
        const videoContainers = document.getElementById("video-containers");

        const videoContainerHTML = `
          <div class="video-container" onclick="navigateToVideo('${videoURL}')">
            <div class="video-thumbnail">
              <img src="${videoInfo.image_link}" alt="Video Thumbnail">
              <p class="video-time">0:10</p>
            </div>
            <div class="video-info-container">
              <h3 class="channel-video-title">${videoInfo.video_title}</h3>         
              <h4 class="channel-channel-name">${videoInfo.video_channel}</h4>
              <h5 class="channel-video-sub-info">${formatViews(videoInfo.views)} · ${formatDate(videoInfo.upload_date)}</h5>
            </div>
          </div>
        `;

        videoContainers.innerHTML += videoContainerHTML;
    }
}

/** 대표영상 나오는 함수 */
function displayVideorepresentive(representvideo) {
    const channelsection2 = document.getElementById("channel-section-2");
    const representvideocontainerHTML = `
      <div class="channel-main-video-container">
        <video src="${representvideo.video_link}" autoplay muted controls></video>
      </div>
      <div id="channel-video-desc">
        <h3 id="channel-video-title">${representvideo.video_title}</h3>
        <h5 id="channel-video-sub-info">${formatViews(representvideo.views)} · ${formatDate(representvideo.upload_date)}</h5>
        <h5 id="video-detail">${representvideo.video_detail}</h5>
      </div>
    `;
    channelsection2.innerHTML += representvideocontainerHTML;
}

function formatDate(dateStr) {
    // 입력된 날짜 문자열을 파싱하여 Date 객체를 생성
    function parseDate(dateStr) {
        const parts = dateStr.split("/");
        // parts[0]은 년도, parts[1]은 월, parts[2]는 일
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }

    // 두 날짜 간의 차이를 계산
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

function formatsubscribers(subscribersnum) {
  if (subscribersnum >= 10000) {
    return `구독자 ${Math.round(subscribersnum / 10000)}만명`
  }
  else{
    return `구독자 ${subscribersnum}명`
  }
}

/** video html로 바로가기 위한 함수 */
function navigateToVideo(videoURL) {
  window.location.href = videoURL;
}

// home으로 바로가기 위한 함수
function navigateToHome() {
    window.location.href = `index.html`;
}

// 화면 로딩이 완료된 후 비디오 목록 표시
window.onload = function () {
    getVideoList();
    
    // 유튜브 로고 클릭 시 홈 이동
    let youtube_logo = document.getElementById("youtube-logo");
    youtube_logo.addEventListener("click", function () {
        navigateToHome();
    });
};