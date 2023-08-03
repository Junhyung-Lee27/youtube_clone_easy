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
