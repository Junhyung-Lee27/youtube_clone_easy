// 햄버거 버튼 누르면 리스트가 변경되는 기능 구현
// 리스트가 변경되는 기능을 쓰지 않을 것이라면 없애도 되는 파일

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("hamburger");

    // nav1 리스트 리스트 A
    // nav1의 경우 기본적으로 선택되는 리스트로써, 피그마에서 보이는 기본적인 nav리스트
    const listA = document.querySelector("nav1");
    // nav2는 단순하게 줄어드는 리스트
    const listB = document.querySelector("nav2");
  
    // 기본적으로 nav1 리스트가 보이도록 설정
    listA.style.display = "block";
    listB.style.display = "none";
  
    // 버튼 클릭 시 nav1과 nav2 토글
    toggleButton.addEventListener("click", function() {
      if (listA.style.display === "block") {
        // nav1이 보이는 경우
        listA.style.display = "none";
        listB.style.display = "block";
      } else {
        // nav2가 보이는 경우
        listA.style.display = "block";
        listB.style.display = "none";
      }
    });
  });
  