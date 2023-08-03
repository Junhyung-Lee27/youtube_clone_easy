const currentURL = new URL(window.location.href);
const urlParams = new URLSearchParams(currentURL.search);
const video_Name = urlParams.get('video_name');

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

          let viewsCount = 0;
          let maxViewVideoID = 0;
          for (let i = 0; i < response.length; i++) {
              if (response[i].video_video == video_Name) {
                  if (response[i].views > viewsCount) {
                      viewsCount = response[i].views;
                      maxViewVideoID = response[i].video_id;
                  }
              }
          }

          videoImage(video_Name);
          representiveVideo(maxViewVideoID);
          
          // 비디오 정보를 받아와서 표시하는 함수 호출
          videoIds.forEach((videoId) => {
              
              getVideoInfo(videoId);
              console.log(videoId);
          });
      }
  };
  request.send();
}


function videoImage(videoName) {
  const url = "http://oreumi.appspot.com/channel/getChannelInfo";
    const data = { video_video: videoName };
    
    fetch(url, {
      method : 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      displayVideoImage(data);
    })
}

function representiveVideo(maxVideoID) {
  fetch(`http://oreumi.appspot.com/video/getVideoInfo?video_id=${maxVideoID}`)
    .then((response) => response.json())
    .then((data) => {
    
    //video 정보를 표시하는 함수 호출
    displayVideoRepresentive(data);
  });
}

// 비디오id 값을 이용해 video 정보 받아오는 함수
function getVideoInfo(video_id) {
    
  fetch(`http://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`)
      .then((response) => response.json())
      .then((data) => {
          // video 정보를 표시하는 함수 호출
          displayVideoInfo(data);
      });
}


function displayVideoList() {
  const videoAsideSection = document.getElementById('video-aside-section');

}
