
// ==========================================
// 1. MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function() {

        navLinks.classList.toggle("open");

        if (navLinks.classList.contains("open")) {
            menuToggle.textContent = "✕";
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");
        } else {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

    });

}


// ==========================================
// 2. CLOSE MOBILE MENU
// ==========================================

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

    });

});


// ==========================================
// 3. ACTIVE NAVIGATION
// ==========================================

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition = window.scrollY + 150;

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = sectionId;

        }

    });

    navItems.forEach(function (item) {

        item.classList.remove("active");

        const href = item.getAttribute("href");

        if (href === "#" + currentSection) {
            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


// ==========================================
// 4. CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        if (formStatus) {
            formStatus.textContent = "Sending your message...";
        }

        try {
            const response = await fetch("https://formsubmit.co/ajax/artshiv90@gmail.com", {
                method: "POST",
                body: new URLSearchParams(new FormData(contactForm)),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            const result = await response.json();

            if (!response.ok || String(result.success).toLowerCase() !== "true") {
                throw new Error(result.message || "The email service rejected the message.");
            }

            contactForm.reset();
            if (formStatus) {
                formStatus.textContent = "Message sent successfully. Thank you!";
            }
        } catch (error) {
            if (formStatus) {
                formStatus.textContent =
                    "Message could not be sent: " + error.message;
            }
        } finally {
            submitButton.disabled = false;
        }

    });

}


// ==========================================
// 5. CURRENT YEAR
// ==========================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// ==========================================
// 6. DOWNLOAD CV
// ==========================================

const downloadCv = document.getElementById("downloadCv");

if (downloadCv) {

    downloadCv.addEventListener("click", function (event) {

        event.preventDefault();

        const cvFile = "Career status.pdf";

        const link = document.createElement("a");

        link.href = cvFile;

        link.download = cvFile;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    });

}


// ==========================================
// 7. SMOOTH SCROLL
// ==========================================

const smoothLinks =
    document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ==========================================
// 8. SIMPLE SCROLL ANIMATION
// ==========================================

const animatedElements =
    document.querySelectorAll(
        ".project-card, .skill-card, .timeline-item"
    );


function showElements() {

    animatedElements.forEach(function (element) {

        const elementPosition =
            element.getBoundingClientRect().top;

        const screenHeight =
            window.innerHeight;

        if (elementPosition < screenHeight - 80) {

            element.classList.add("show");

        }

    });

}


window.addEventListener("scroll", showElements);

showElements();


// ==========================================
// 9. PAGE LOADED
// ==========================================

console.log(
    "Shiv Karan Portfolio Loaded Successfully!"
);