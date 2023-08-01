// channel_toolbar 밑에 밑줄이 생기게끔 하는 js

const navItems = document.querySelectorAll('.nav-item');

        function selectNavItem(event) {
            event.preventDefault();

            // Remove underline from all nav items
            navItems.forEach(navItem => {
                navItem.classList.remove('selected');
            });

            // Add underline to the clicked nav item
            const target = event.target;
            target.classList.add('selected');
        }

        // Add event listeners to each nav item
        navItems.forEach(navItem => {
            navItem.addEventListener('click', selectNavItem);
        });