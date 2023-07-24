// api document : http://oreumi.appspot.com/api-docs

// HTTP 통신을 위한 라이브러리(axios) 사용 (npm install axios 필요)
const axios = require("axios");

// 영상 리스트를 불러오는 함수
function getVideoList() {
    axios
        .get("http://oreumi.appspot.com/video/getVideoList")
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// video_id로 영상 상세 정보를 불러오는 함수
function getVideoInfo(video_id) {
    axios
        .get("http://oreumi.appspot.com/video/getVideoInfo?video_id=" + video_id)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

getVideoInfo(0);
