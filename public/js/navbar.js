fetch('./../assets/navlinks.json')
    .then(
        (response) => {
            return response.json();
        }
    )
    .then(
        (navlinks) => {
            main(navlinks);
        }
    )

function main(navlinks) {
    let path = window.location.pathname;
    let currentPage = path.split("/").pop();

    fitNavbar();
    window.addEventListener('resize', fitNavbar);

    function removeOldNavbar() {
        let oldNavbar = document.getElementById("navbar");
        if (oldNavbar != null) {
            oldNavbar.remove();
        }
    }

    function fitNavbar(event) {
        removeOldNavbar();

        let width = window.innerWidth;
        fullNavbar();

        let actualWidth = 0;
        let buttons = document.querySelectorAll("#navbar button");
        for (let button of buttons) {
            actualWidth += button.offsetWidth;
        }

        if (width < actualWidth) {
            condensedNavbar();
        }
    }

    function fullNavbar() {
        removeOldNavbar();

        let navbar = document.createElement("div");
        navbar.id = "navbar";

        for (let navlink of navlinks) {
            let button = createButton(navlink.name, navlink.request);
            navbar.appendChild(button);
        }

        document.body.insertBefore(navbar, document.body.childNodes[0]);
    }

    function condensedNavbar() {
        removeOldNavbar();
        
        let navbar = document.createElement("div");
        navbar.id = "navbar";

        let menuIcon = createMenuIcon();
        menuIcon.addEventListener('mouseover', revealMenu);
        navbar.appendChild(menuIcon);

        let dropdown = document.createElement("div");
        dropdown.id = "dropdown";

        for (let navlink of navlinks) {
            let button = createButton(navlink.name, navlink.request);
            if (navlink.name === "Home" || navlink.path === currentPage) {
                navbar.appendChild(button);
            } else {
                dropdown.appendChild(button);
            }
        }

        navbar.addEventListener('mouseleave', hideMenu);
        navbar.appendChild(dropdown);

        document.body.insertBefore(navbar, document.body.childNodes[0]);
    }

    function redirectFactory(path) {
        const redirect = function() {
            window.location.href = path;
        }
        return redirect;
    }

    function createButton(text, page) {
        let b = document.createElement("button");
        b.innerText = text;
        b.id = text;
        if (page === currentPage) {
            b.classList.add("current-page");
        }
        b.addEventListener('click', redirectFactory(page));
        return b;
    }

    function createMenuIcon() {
        let menuIcon = document.createElement("div");
        menuIcon.id = "menu-icon";

        for (var i = 0; i < 3; i++) {
            let bar = document.createElement("div");
            bar.classList.add("menu-bar");
            menuIcon.appendChild(bar);
        }

        return menuIcon;
    }

    function revealMenu() {
        let dropdown = document.getElementById("dropdown");
        dropdown.classList.add("dropdown-reveal");
    }

    function hideMenu() {
        let dropdown = document.getElementById("dropdown");
        dropdown.classList.remove("dropdown-reveal");
    }

}
