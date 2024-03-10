document.addEventListener("DOMContentLoaded", function (event) {
    // Shows and hide sidebar
    const showNavbar = (toggleId, navId, bodyId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId);


        // Validate that all variables exist
        if (toggle && nav && bodypd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show-sidebar')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd');

    // Add css class to sidebar links which shows the current page
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Changes and saves the page theme selected by the user 
    const toggleDarkModebutton = document.querySelectorAll('.toggle-dark-mode'),
        toggleLightModebutton = document.querySelectorAll('.toggle-light-mode');

    const getStoredTheme = localStorage.getItem('theme') || 'light';
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
    const setTheme = theme => document.documentElement.setAttribute('data-bs-theme', theme);

    toggleDarkModebutton.forEach(button => {
        button.addEventListener('click', () => {
            const newTheme = 'dark';
            setStoredTheme(newTheme);
            setTheme(newTheme);
        });
    });
    

    toggleLightModebutton.forEach(button => {
        button.addEventListener('click', () => {
            const newTheme ='light';
            setStoredTheme(newTheme);
            setTheme(newTheme);
        });
    });

    setTheme(getStoredTheme);

});