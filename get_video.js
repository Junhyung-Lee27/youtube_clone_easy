// 아직 거의 손도 안댔습니다...


// 비디오 리스트에서 비디오 id값들 받아오는 함수
function getVideoList() {
    const request = new XMLHttpRequest();
    const url = 'http://oreumi.appspot.com/video/getVideoList';
    request.open('GET', url, true);
  
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        // 파싱
        var response = JSON.parse(request.responseText);
  
        // videoid 들을 배열에 저장
        var videoIds = [];
        for (let i = 0; i < response.length; i++) {
          videoIds.push(response[i].video_id);
        }
        console.log(videoIds); 
      }
    };
    request.send();
}

