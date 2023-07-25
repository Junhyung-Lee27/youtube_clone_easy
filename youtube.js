// 버튼을 구현하려고 한거긴 한데 제가 js 수업 때 결석이 좀 많아서 인터넷 구글링 했어요 ㅠㅠ
// 근데 저희가 정한 class와 id로 바꾸려니 엄두가 안나네욤..

const moreBtn = document.querySelector('.videoInfo-title .moreBtn');
const title = document.querySelector('.videoInfo-title .video-title');

moreBtn.addEventListener("click", () => {
    moreBtn.classList.toggle("clicked");
    title.classList.toggle("clamp");
});

function switchTheme() {
    var checkbox = document.getElementById('checkbox');
    if (checkbox.checked == true) {
        document.querySelector('body').style.background = 'black';
        document.documentElement.style.setProperty('--white', '#000000');
        document.documentElement.style.setProperty('--black', '#ffffff');
        document.documentElement.style.setProperty('--grey', 'lightgray');
        document.documentElement.style.setProperty('--blue', 'powderblue');
    } else {
        document.querySelector('body').style.background = 'white';
        document.documentElement.style.removeProperty('--white', '#000000');
        document.documentElement.style.removeProperty('--black', '#ffffff');
        document.documentElement.style.removeProperty('--grey', 'lightgray');
        document.documentElement.style.removeProperty('--blue', 'powderblue');
    }
}