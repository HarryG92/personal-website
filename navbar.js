let navlinks = {
    "Home": "index.html",
    "Qualifications": "quals.html",
    "Work Experience": "work_experience.html",
    "Technical Skills": "technical.html",
    "Mathematics": "maths.html",
    // "Fencing": "fencing.html"
}

let path = window.location.pathname;
let page = path.split("/").pop();

let navbar = document.createElement("div");
navbar.id = "navbar";

for (const [key, value] of Object.entries(navlinks)) {
    let b = document.createElement("button");
    b.innerText = key;
    // b.href = value;
    b.id = key;
    if (value === page) {
        b.classList.add("current-page");
    }
    navbar.appendChild(b);
    b.onclick = redirectFactory(value);
}

document.body.insertBefore(navbar, document.body.childNodes[0]);

function redirectFactory(value) {
    const redirect = function() {
        window.location.href = value;
    }
    return redirect;
}
