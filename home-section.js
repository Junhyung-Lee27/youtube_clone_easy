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
          for (let i = 0; i < response.length - 1; i++) {
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
  const videoContainers = document.getElementById("video-containers");
  
  
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");

  //비디오 썸네일
  const videoThumbnail = document.createElement("img");
  videoThumbnail.classList.add("video-thumbnail");
  videoThumbnail.src = videoInfo.image_link;
  const videoTime = document.createElement("p")
  videoTime.classList.add("video-time")
  videoContainer.appendChild(videoThumbnail);

  //비디오 프로필
  const videoProfile = document.createElement("img");
  videoProfile.src = "./img_header/User-Avatar.png"
  videoProfile.classList.add("video-profile");
  videoContainer.appendChild(videoProfile);

  //비디오 타이틀
  const videoTitle = document.createElement("div");
  videoTitle.classList.add("video-title");
  videoTitle.textContent = videoInfo.video_title;
  videoContainer.appendChild(videoTitle);

  //채널 이름
  const channelName = document.createElement("div");
  channelName.classList.add("channel-name")
  channelName.textContent = videoInfo.video_channel;
  videoContainer.appendChild(channelName)

  //비디오 서브 인포(조회수, 날짜)
  const videoSubInfo = document.createElement("div");
  videoSubInfo.classList.add("video-sub-info");
  videoSubInfo.textContent = `${videoInfo.views} Views | ${formatDate(videoInfo.upload_date)}`;
  videoContainer.appendChild(videoSubInfo);

  const homeSection = document.getElementById("home-section");
  homeSection.appendChild(videoContainer);

  
  
  //클릭이벤트 만드는중...
  //HTML에 작성되지 않는 구조라 displayVideoInfo함수에서
  //HTML의 구조가 생성되고 난 후 사용되야 되기 때문에 함수
  //안에 이벤트를 넣었습니다.
  // 영상 클릭시 video로 넘어가는 이벤트
  const imgBtn = document.querySelector(".video-container");
  imgBtn.addEventListener('click', function(event) {
    
    //문제점1: 한번 누르면 20번씩 작동되고...
    //문제점2: 첫번쨰 영상에만 이벤트가 들어감...
    console.log("확인");
  });
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





