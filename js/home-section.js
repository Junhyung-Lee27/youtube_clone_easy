// 홈 화면의 썸네일과 제목, 채널, 조회수 등을 받아오는 js 파일입니다.
// 8.1 일자 수정
// 검색 기능 추가 필요


// 비디오 리스트에서 비디오 id값을 받아오는 함수
function getVideoList() {
    const request = new XMLHttpRequest();
    const url = "http://oreumi.appspot.com/video/getVideoList";
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

            // 비디오 정보를 받아와서 표시하는 함수 호출
            videoIds.forEach((videoId) => {
                getVideoInfo(videoId);
            });
        }
    };
    request.send();
}

// 비디오 id 값들을 사용해 video 정보 받아오는 함수
function getVideoInfo(video_id) {
    fetch(`http://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`)
        .then((response) => response.json())
        .then((data) => {
            // video 정보를 표시하는 함수 호출
            displayVideoInfo(data);
        });
}

function channelimage(channelname) {
    const url = "http://oreumi.appspot.com/channel/getChannelInfo";
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

/** home화면 비디오 나오게 하는 함수 */
function displayVideoInfo(videoInfo) {
    if (videoInfo.video_channel == "oreumi" || videoInfo.video_channel == "개조") {
        image = `https://storage.googleapis.com/oreumi.appspot.com/${videoInfo.video_channel}_profile.jpg`;
    }
    else {
        image = `https://storage.googleapis.com/oreumi.appspot.com/나와_토끼들_profile.jpg`;
    }
    
    const videoContainers = document.getElementById("video-containers");
    let videoURL = `./video.html?id=${videoInfo.video_id}`
    let channelURL = `channel.html?channel_name=${videoInfo.video_channel}`;
    // 비디오 컨테이너 HTML 구성
    const videoContainerHTML = `
      <div class="video-container">
        <div class="video-thumbnail" onclick="navigateToVideo('${videoURL}')">
          <img src=${videoInfo.image_link} alt="Video Thumbnail">
          <p class="video-time">0:10</p>
        </div>
        <div class="video-profile-container" onclick="navigateToChannel('${channelURL}')">
          <img src='${image}' alt="Video Profile" class="video-profile"onclick="navigateToChannel('${channelURL}')">
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
  
    // 비디오 컨테이너에 비디오 정보 추가
    videoContainers.innerHTML += videoContainerHTML;
  }

function navigateToVideo(videoURL) {
    window.location.href = videoURL;
}

function navigateToChannel(channelURL) {
    window.location.href = channelURL;
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
        return `조회수 ${Math.round(views / 1000)}만회`;
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

// 화면 로딩이 완료된 후 비디오 목록 표시
window.onload = function () {
    getVideoList();
};