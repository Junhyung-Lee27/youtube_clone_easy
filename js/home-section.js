// 홈 화면의 썸네일과 제목, 채널, 조회수 등을 받아오는 js 파일입니다.
// 아직 변수명을 피그마에서 정한 것처럼 정하진 않았습니다.
// 이걸 사용해서 home 화면에 넣어도 되고 이 파일을 사용하지 않고 이미지와 텍스트를 각각 html에 적어서 사용해도 무방할 것 같습니다.
// 이 파일을 사용한다고 하면, 이미지에 영상 길이와 제목 옆 프로필 사진이 추가가 안되어 있기 때문에 추가해야합니다.
// 업로드 시간 형식 계산이 필요합니다 (수정 중)(ex:몇 개월 전)
// 제목이나 사진을 누르면 video페이지로, 채널을 누르면 channel 페이지로 이동하는 동작이 필요합니다.
// 필요없다 생각되면 정보 받아오는 기능만 일부 수정해서 새롭게 만들면 될 것 같습니다.

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

// 비디오 정보를 화면에 표시하는 함수
function displayVideoInfo(videoInfo) {
    // 비디오 컨테이너 정의
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-container");

    // 하위 컨테이너
    const videoThumbnail = document.createElement("div");
    videoThumbnail.classList.add("video-thumbnail");
    videoContainer.appendChild(videoThumbnail);

    const videoProfileContainer = document.createElement("div");
    videoContainer.appendChild(videoProfileContainer);

    const videoInfoContainer = document.createElement("div");
    videoContainer.appendChild(videoInfoContainer);

    //비디오 썸네일
    const videoThumbnailImage = document.createElement("img");
    videoThumbnailImage.src = videoInfo.image_link;
    videoThumbnail.appendChild(videoThumbnailImage);

    //비디오 타임 (시간 정보가 없음 -> 영상에서 시간 추출하는 방법 있을지?)
    const videoTime = document.createElement("p");
    videoTime.classList.add("video-time");
    videoTime.textContent = "23:45";
    videoThumbnail.appendChild(videoTime);

    //비디오 프로필 (이미지는 getChannleInfo에서 가져와서 교체해줘야함)
    const videoProfile = document.createElement("img");
    videoProfile.src = "../src/img_header/User-Avatar.png";
    videoProfile.classList.add("video-profile");
    videoProfileContainer.appendChild(videoProfile);

    //비디오 타이틀, 채널이름, 서브 정보 container
    const videoTitleContainer = document.createElement("div");
    videoInfoContainer.appendChild(videoTitleContainer);

    // 비디오 타이틀
    const videoTitle = document.createElement("h3");
    videoTitle.textContent = videoInfo.video_title;
    videoTitle.classList.add("video-title");
    videoTitleContainer.appendChild(videoTitle);

    //채널 이름, 서브 정보 container
    const videoNameSubinfoContainer = document.createElement("div");
    videoInfoContainer.appendChild(videoNameSubinfoContainer);

    // 채널 이름
    const channelName = document.createElement("h4");
    channelName.classList.add("channel-name");
    channelName.textContent = videoInfo.video_channel;
    videoNameSubinfoContainer.appendChild(channelName);

    // 서브 인포(조회수, 날짜)
    const videoSubInfo = document.createElement("h5");
    videoSubInfo.classList.add("video-sub-info");
    videoSubInfo.textContent = `${formatViews(videoInfo.views)} · ${formatDate(
        videoInfo.upload_date
    )}`;
    videoNameSubinfoContainer.appendChild(videoSubInfo);

    // videoContainers에 videoContainer 붙이기
    const videoContainers = document.getElementById("video-containers");
    videoContainers.appendChild(videoContainer);

    //클릭이벤트
    videoThumbnail.addEventListener("click", function () {
        window.location.href = `video.html?video_id=${videoInfo.video_id}`;
    });

    // 클릭 이벤트 추가 : 제목 클릭 시 video.html로 이동
    videoTitle.addEventListener("click", function () {
        window.location.href = `video.html?video_id=${videoInfo.video_id}`;
    });

    videoProfile.addEventListener("click", function () {
        window.location.href = channel.html;
    });
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
