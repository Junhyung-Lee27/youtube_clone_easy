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
    const url = 'http://oreumi.appspot.com/video/getVideoList';
    request.open('GET', url, true);
  
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
    const videoContainer = document.getElementById("videoContainer");
  
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");
  
    const thumbnail = document.createElement("img");
    thumbnail.src = videoInfo.image_link;
    thumbnail.classList.add("thumbnail");
    videoItem.appendChild(thumbnail);
  
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = videoInfo.video_title;
    videoItem.appendChild(title);
  
  
    const channelName = document.createElement("div");
    channelName.classList.add("channel-Name")
    channelName.textContent = videoInfo.video_channel;
    videoItem.appendChild(channelName)
  
    const viewsDate = document.createElement("div");
    viewsDate.classList.add("views-date");
    viewsDate.textContent = `${videoInfo.views} Views | ${formatDate(videoInfo.upload_date)}`;
    videoItem.appendChild(viewsDate);
  
    videoContainer.appendChild(videoItem);
  }
  
  // 업로드 날짜 포맷 함수
  function formatDate(uploadedTime) {
    const uploaded = new Date(uploadedTime);
    const now = new Date()

    // 분으로 바꿈
    const changeMinute = {
        year: 518400,
        month: 43200,
        week: 10080,
        day: 1440,
        hour: 60,
    }
    const options = { year: "numeric", month: "long", day: "numeric" };
    return uploaded.toLocaleDateString("en-US", options);
  }
  
  // 화면 로딩이 완료된 후 비디오 목록 표시
  window.onload = function () {
    getVideoList();
  };