// 코드만 home-section에 있는 부분 복붙, 커버 이미지 받아오는거 진행하려고 함
// 다 지우고 다시 작성해도 상관없는 수준의 코드이기 때문에 수정하실 분은 하셔도 됩니다.



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
    videoSubInfo.textContent = `${videoInfo.views} Views | ${formatDate(videoInfo.upload_date)}`;
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
        window.location.href = `channel.html?channel_name=${videoInfo.video_channel}`;
    });
}

const urlParams = new URLSearchParams(window.location.search);
const channelName = urlParams.get('channel_name');

// 채널 정보를 받아와서 화면에 표시하는 함수
function getChannelInfo(channelName) {
    fetch(`http://oreumi.appspot.com/channel/getChannelInfo?video_channel=${channelName}`)
        .then((response) => response.json())
        .then((data) => {
            // 채널 정보를 표시하는 함수 호출
            displayChannelInfo(data);
        });
}

// 채널 정보를 화면에 표시하는 함수
function displayChannelInfo(channelInfo) {
    const channelsection1 = document.getElementById("channel-section-1");
    channelsection1.appendChild(channelsection);

    // 채널 커버 이미지
    const channelCoverImage = document.createElement("img");
    channelCoverImage.src = channelInfo.channel_banner;
    channelCover.appendChild(channelCoverImage);

    // 채널 프로필 이미지
    const channelProfile = document.getElementById("channel-profile");
    channelProfile.src = channelInfo.channel_profile;

    // 채널명
    const channelName = document.getElementById("channel-name");
    channelName.textContent = channelInfo.channel_name;

    // 구독자 수
    const channelSubscribers = document.getElementById("channel-subscribers");
    channelSubscribers.textContent = `${channelInfo.subscribers} subscribers`;
}

// 화면 로딩이 완료된 후 채널 정보 표시
window.onload = function () {
    getChannelInfo(channelName);

};