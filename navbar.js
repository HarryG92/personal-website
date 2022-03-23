let navlinks = {
    "Home": "index.html",
    "Qualifications": "quals.html",
    "Work Experience": "work_experience.html",
    "Coding Skills": "coding.html",
    "Mathematics": "maths.html",
    "Fencing": "fencing.html"
}

let navbar = document.createElement("div");
navbar.id = "navbar";

for (const [key, value] of Object.entries(navlinks)) {
    let a = document.createElement("a");
    a.innerHTML = key;
    a.href = value;
    a.id = key;
    navbar.appendChild(a);
}

document.body.insertBefore(navbar, document.body.childNodes[0]);
