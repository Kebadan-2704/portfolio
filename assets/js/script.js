$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // ✅ EmailJS REMOVED — Web3Forms handles submit via HTML
});

document.addEventListener('visibilitychange', function () {
    document.title = "Portfolio | Keb's D Grason";
    $("#favicon").attr("href", "assets/images/favicon.png");
});

// typed js
var typed = new Typed(".typing-text", {
    strings: [
        "frontend development",
        "backend development",
        "web designing",
        "android development",
        "web development"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});

// ✅ FIXED fetchData (NO MORE UNCAUGHT ERROR)
async function fetchData(type = "skills") {
    try {
        const response = await fetch(
            type === "skills" ? "./skills.json" : "./projects.json"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch " + type);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";

    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });

    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";

    projects
        .slice(0, 10)
        .filter(project => project.category !== "android")
        .forEach(project => {
            projectHTML += `
            <div class="box tilt">
                <img draggable="true" src="./assets/images/projects/${project.image}" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${project.links.code}" class="btn" target="_blank">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
        });

    projectsContainer.innerHTML = projectHTML;

    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.work .box', { interval: 200 });
}

// load data
fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// tilt init
VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

// disable developer mode (unchanged)
document.onkeydown = function (e) {
    if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    ) {
        return false;
    }
};

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });

srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });

srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.work .box', { interval: 200 });

srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });
