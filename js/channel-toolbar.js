// 현재 작동이 잘 안되는데 작동이 왜 안되는지는 html이나 css 문제인지 잘 모르겠습니다.

const navItems = document.querySelectorAll('.nav-item');

function selectNavItem(event) {
    event.preventDefault();

    navItems.forEach(navItem => {
        navItem.classList.remove('selected');
    });


    const target = event.target;
    target.classList.add('selected');
}


navItems.forEach(navItem => {
    navItem.addEventListener('click', selectNavItem);
});
