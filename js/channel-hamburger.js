// 햄버거 버튼 누르면 리스트가 변경되는 기능 구현
// 리스트가 변경되는 기능을 쓰지 않을 것이라면 없애도 되는 파일

document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburger");

    hamburgerBtn.addEventListener("click", function () {
        const sideBar = document.getElementById("home-sidebar");
        const sections = document.getElementById("sections");

        // 사이드바 닫혀있으면 연다.
        if (sideBar.classList.contains("sidebar-closed")) {
            sideBar.classList.remove("sidebar-closed");
            sections.classList.remove("channel-section-expanded");
        }
        // 사이드바 닫혀있지 않으면 닫는다.
        else {
            sideBar.classList.add("sidebar-closed");
            sections.classList.add("channel-section-expanded");
        }
    });
});
