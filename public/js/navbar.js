// let navlinks = {
//     "Home": "/",
//     "Qualifications": "quals",
//     "Work Experience": "work_experience",
//     "Technical Skills": "technical",
//     "Mathematics": "maths",
//     // "Fencing": "fencing"
// }

// const navlinks = require('./../assets/navlinks.json');
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

    function fitNavbar(event) {
        let oldNavbar = document.getElementById("navbar");
        if (oldNavbar != null) {
            oldNavbar.remove();
        }
        let width = window.innerWidth;
        if (width < 850) {
            condensedNavbar();
        } else {
            fullNavbar();
        }
    }

    function fullNavbar() {
        let navbar = document.createElement("div");
        navbar.id = "navbar";

        for (let [key, value] of Object.entries(navlinks)) {
            let button = createButton(key, value);
            navbar.appendChild(button);
        }

        document.body.insertBefore(navbar, document.body.childNodes[0]);
    }

    function condensedNavbar() {
        let navbar = document.createElement("div");
        navbar.id = "navbar";

        let menuIcon = createMenuIcon();
        menuIcon.addEventListener('mouseover', revealMenu);
        navbar.appendChild(menuIcon);

        let dropdown = document.createElement("div");
        dropdown.id = "dropdown";

        for (const [key, value] of Object.entries(navlinks)) {
            let button = createButton(key, value);
            if (key === "Home" || value === currentPage) {
                navbar.appendChild(button);
            } else {
                dropdown.appendChild(button);
            }
        }

        navbar.addEventListener('mouseleave', hideMenu);
        navbar.appendChild(dropdown);

        document.body.insertBefore(navbar, document.body.childNodes[0]);
    }

    function redirectFactory(value) {
        const redirect = function() {
            window.location.href = value;
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
