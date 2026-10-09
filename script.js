
const activities = [
    {
        subject: "Web Systems and Technologies 2",
        title: "Assessment on the JS pop up boxes",
        description:
            "This activity demonstrates a single web page that uses the three dialogue boxes of JavaScript namely; alert, confirm and prompt.",
        image: "jav.png",
        alt: "Screenshot of my Web Systems and Technologies 2 activity"
    },
    {
        subject: "Automata Theory and Formal Languages",
        title: "Finite Automata Activity DFA",
        description:
            "This activity involves constructing Deterministic Finite Automata (DFA), identifying the set of states, alphabet, initial and accepting states, creating transition tables and state diagrams, defining the language, and testing strings to determine whether they are accepted or rejected.",
        image: "MATH.jpg",
        alt: "Screenshot of my Automata Theory activity"
    },
    {
        subject: "Information Assurance and Security",
        title: "Improvement Challenge Completion",
        description:
            "This activity presents my Improvement Challenge Completion for Information Assurance and Security. It showcases my progress and completion of the assigned security challenge.",
        image: "CYLAB.png",
        alt: "Screenshot of my Information Assurance and Security activity"
    },
    {
        subject: "CS Elective 1",
        title: "Data Flow Diagram (DFD) Level 1",
        description:
            "This activity presents my Level 1 Data Flow Diagram (DFD), which illustrates the main processes, external entities, and data stores involved in the system, including how data flows between them.",
        image: "CS.png",
        alt: "Screenshot of my CS Elective 1 activity"
    },
    {
        subject: "Application Development and Emerging Technology",
        title: "System Architecture",
        description:
            "This activity presents my system architecture diagram, which illustrates the major components of the system, the technologies used, and how the components interact with one another.",
        image: "APP.png",
        alt: "Screenshot of my Application Development activity"
    }
];

/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

/* SECTION NAVIGATION */

const navigationLinks = document.querySelectorAll(
    '.nav-links a, .logo, .primary-button, .skip-link'
);

const sections = document.querySelectorAll(".nav-screen");

function showSection(sectionId, updateHistory = true) {
    const targetSection = document.getElementById(sectionId);

    if (!targetSection || !targetSection.classList.contains("nav-screen")) {
        return;
    }

    /* Hide other sections and show the selected section. */

    sections.forEach((section) => {
        const isActive = section.id === sectionId;

        section.classList.toggle("is-active", isActive);
        section.setAttribute("aria-hidden", String(!isActive));
    });

    /* Update the active navigation link. */

    document.querySelectorAll(".nav-links a").forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    /* Close the mobile menu after navigation. */

    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");

    /* Update the URL without reloading the page. */

    if (updateHistory && window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, "", `#${sectionId}`);
    }

    /* Start the selected section at the top of the viewport. */

    window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth"
    });
}

/* Enable section switching when navigation links are clicked. */

navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) {
            return;
        }

        const sectionId = href.slice(1);
        const targetSection = document.getElementById(sectionId);

        if (!targetSection || !targetSection.classList.contains("nav-screen")) {
            return;
        }

        event.preventDefault();
        showSection(sectionId);
    });
});

/* Support browser Back and Forward buttons. */

window.addEventListener("popstate", () => {
    const sectionId = window.location.hash.slice(1) || "home";
    showSection(sectionId, false);
});

/* MOBILE MENU BUTTON */

menuToggle.addEventListener("click", () => {
    const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("is-open", !isExpanded);
});

/* CURRENT YEAR */

document.getElementById("current-year").textContent =
    new Date().getFullYear();

/* INITIAL SECTION */

document.body.classList.add("navigation-mode");

const initialSection = window.location.hash.slice(1);
const validInitialSection = Array.from(sections).some(
    (section) => section.id === initialSection
);

showSection(validInitialSection ? initialSection : "home", false);

/* COURSE ACTIVITY MODAL */

const modal = document.getElementById("activity-modal");
const modalDialog = modal.querySelector(".modal-dialog");
const modalClose = document.getElementById("modal-close");
const modalTitle = document.getElementById("modal-title");
const modalSubject = document.getElementById("modal-subject");
const modalDescription = document.getElementById("modal-description");
const activityImage = document.getElementById("activity-image");

let previousFocus = null;

function openActivity(index) {
    const activity = activities[index];

    if (!activity) {
        return;
    }

    previousFocus = document.activeElement;

    modalTitle.textContent = activity.title;
    modalSubject.textContent = activity.subject;
    modalDescription.textContent = activity.description;
    activityImage.src = activity.image;
    activityImage.alt = activity.alt;

    modal.hidden = false;
    document.body.classList.add("modal-open");

    modalClose.focus();
}

function closeActivity() {
    if (modal.hidden) {
        return;
    }

    modal.hidden = true;
    document.body.classList.remove("modal-open");

    if (previousFocus) {
        previousFocus.focus();
    }
}

/* OPEN THE SELECTED ACTIVITY */

document.querySelectorAll("[data-activity]").forEach((button) => {
    button.addEventListener("click", () => {
        openActivity(Number(button.dataset.activity));
    });
});

/* CLOSE BUTTON AND BACKDROP */

modalClose.addEventListener("click", closeActivity);

modal.querySelector("[data-close-modal]").addEventListener(
    "click",
    closeActivity
);

/* KEYBOARD SUPPORT */

document.addEventListener("keydown", (event) => {
    if (modal.hidden) {
        return;
    }

    if (event.key === "Escape") {
        closeActivity();
        return;
    }

    /* Keep keyboard focus inside the modal. */

    if (event.key === "Tab") {
        const focusableElements = [modalClose];

        const firstElement = focusableElements[0];
        const lastElement =
            focusableElements[focusableElements.length - 1];

        if (
            event.shiftKey &&
            document.activeElement === firstElement
        ) {
            event.preventDefault();
            lastElement.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
        ) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});