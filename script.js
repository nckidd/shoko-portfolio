import gsap from "gsap";
import {Flip} from "gsap/all";
gsap.registerPlugin(Flip);

/* BACKGROUND VIDEO TOGGLE */
document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("bg-video");

    if (!videoElement) return;

    //Exact breakpoint match criteria
    const desktopBreakpoint = window.matchMedia("(max-width:1000px)");

    function handleVideoLifecycle(mediaQuery) {
        if (mediaQuery.matches) {
            //Find dormant data source template
            const videoSource = videoElement.querySelector("source");
            const structuralSrc = videoSource.getAttribute("data-src");

            //If the video hasn't loaded its source yet, do so now
            if (!videoSource.src && structuralSrc) {
                videoSource.src = structuralSrc;
                videoElement.load(); //Forces the brownser to parse the file
            }
            //Initiate safe playback
            videoElement.play().catch(error => {
                console.warn("Playback prevented or paused by security settings:", error);
            });
        } else {
            //Safely freeze if screen goes above breakpoint
            videoElement.pause();
        }
    }

    //Run visibility assessment on initial page load
    handleVideoLifecycle(desktopBreakpoint);
    //Actively watch for orientation changes or desktop window adjustments
    desktopBreakpoint.addEventListener("change", handleVideoLifecycle);
})

/* NOTES APP OPEN/CLOSE */
document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-notes-btn");
    const closeBtn = document.getElementById("close-notes-btn");
    const modalOverlay = document.getElementById("notes-app-modal");

    //Open interface
    if (openBtn && modalOverlay) {
        openBtn.addEventListener("click", () => {
            modalOverlay.classList.add("is-visible");
            document.body.style.overflow = "hidden"; //Freezes back-page background scrolling
        });
    }

    //Close inteface
    if (closeBtn && modalOverlay) {
        closeBtn.addEventListener("click", () => {
            modalOverlay.classList.remove("is-visible");
            document.body.style.overflow = ""; 
        });
    
        //Close instantly if user clicks on external
        modalOverlay.addEventListener("click", (event) => {
            if (event.target === modalOverlay) {
                modalOverlay.classList.remove("is-visible");
                document.body.style.overflow = ""; 
            }
        });
    }
});

/* NOTES APP TOGGLE CANVAS */
const noteItems = document.querySelectorAll(".note-item");
const aboutNote = document.querySelector(".about-me-note");
const projectsNote = document.querySelector(".projects-note");
const resumeNote = document.querySelector(".resume-note");
const container = document.getElementById('notes-canvas');

const response = await fetch('projects.json');
const projects = await response.json();

/* by default note canvases #2 and #3 are hidden */
/* when you change the note */
    /* event listeners on click for each note in sidebar */
    /* change active state on note in sidebar */
    /* change active state on each associated canvas */
    noteItems.forEach((noteOption) => {
        noteOption.addEventListener("click", () => {
            console.log("Click fired!")
            console.log(noteOption.classList)
            if (noteOption.classList.contains("about-me-note")){
                projectsNote.classList.remove("active");
                resumeNote.classList.remove("active");
                aboutNote.classList.add("active");
                container.innerHTML = `
                    <div class="note-meta-header">November 10, 2026 at 7:27 PM</div>

                    <div class="note-text-editor" contenteditable="true">
                        <h2>About Me</h2>
                        <p>I'm a digital and social media marketer as well as a self-taught graphic designer, passionate about visual design. Fascinated with color theory, typography, and surrealism.</p>
                        <p></p>
                        <p></p>
                    </div>`;
                
            } else if (noteOption.classList.contains("projects-note")) {
                aboutNote.classList.remove("active");
                resumeNote.classList.remove("active");
                projectsNote.classList.add("active");

                container.innerHTML = projects.map(project =>  `
                    <div class="project">
                        <h1> ${project.title}</h1>
                        <img src="${project.image1}">
                        <img src="${project.image2}">
                        <img src="${project.image3}">
                        
                        <p> ${project.description}</p>
                    </div>
                    `).join('');
            } else {
                aboutNote.classList.remove("active");
                resumeNote.classList.add("active");
                projectsNote.classList.remove("active");

                container.innerHTML = `
                    <div class="project">
                        <img src="/example-resume.webp">
                    </div>
                `;

            }
        });
    });


/* ANIMATED ITEM SHUFFLE */

const desk = document.querySelector(".desk");
const header = document.querySelector(".header");
const items = gsap.utils.toArray(".item");
const flipTargets = [header, ...items];
const switches = document.querySelectorAll(".modes button");

let activeMode = "chaos";

const itemSizes = {
    cd: 350,
    error: 275,
    flower: 225,
    ipad: 370,
    lipstick: 225,
    martini: 375,
    notes: 170,
    pawn: 225,
    record: 375,
    volume: 185,
    folder: 205,
};

const arrangements = {
    chaos: {
        header: { x: 50, y:47.5, center: true },
        items: [
            { id: "cd", x: -2.5, y: -2.5, rotation: -15},
            { id: "error", x: 20, y: 15, rotation: 5},
            { id: "flower", x: 72.5, y: 5, rotation: 0},
            { id: "ipad", x: 72.5, y: 35, rotation: 15},
            { id: "lipstick", x: 80, y: 60, rotation: 15},
            { id: "martini", x: 80, y: 30, rotation: 5},
            { id: "notes", x: 2.5, y: 45, rotation: -10},
            { id: "pawn", x: 9.5, y: 55, rotation: 15},
            { id: "record", x: 5, y: 15, rotation: 10},
            { id: "volume", x: -2.5, y: 65, rotation: -35},
            { id: "folder", x: 65, y: 20, rotation: -5},
        ],
    },

    cleanup: {
        header: {x: 70, y: 37.5, center: false},
        items: [
            { id: "cd", x: 36.5, y: -5, rotation: 0},
            { id: "error", x: 83, y: 60.5, rotation: 0},
            { id: "flower", x: 70, y: 0, rotation: 0},
            { id: "ipad", x: 38, y: 38, rotation: 90},
            { id: "lipstick", x: 82.5, y: 0, rotation: 0},
            { id: "martini", x: -5, y: 0, rotation: 0},
            { id: "notes", x: 20, y: 0.5, rotation: 0},
            { id: "pawn", x: 68.5, y: 60.5, rotation: 0},
            { id: "record", x: 0, y: 50, rotation: 0},
            { id: "volume", x: 20, y: 25, rotation: 0},
            { id: "folder", x: 83, y: 60.5, rotation: 0},
        ],
    },
    notebook: {
        header: { x: 50, y:47.5, center: true},
        items: [
            { id: "cd", x: 45, y: 0.5, rotation: 20},
            { id: "error", x: 60, y: 50, rotation: 5},
            { id: "flower", x: 30.5, y: 10, rotation: 10},
            { id: "ipad", x: 65, y: 35, rotation: 15},
            { id: "lipstick", x: 30, y: 57.5, rotation: -30},
            { id: "martini", x: 25, y: 40, rotation: 10},
            { id: "notes", x: 42, y: 62, rotation: 0},
            { id: "pawn", x: 50, y: 50, rotation: -5},
            { id: "record", x: 10, y: 10, rotation: -30},
            { id: "volume", x: 16.5, y: 50, rotation: -20},
            { id: "folder", x: 63.5, y: 15, rotation: 10},
        ],
    },
};

function setLayout(mode) {
    const deskWidth = desk.offsetWidth;
    const deskHeight = desk.offsetHeight;
    const layout = arrangements[mode];

    const isMobile = deskWidth < 1000;
    const offsetX = isMobile
    ? header.offsetWidth / 2
    : layout.header.center 
    ? header.offsetWidth / 2
    : 0;

    const offsetY = isMobile 
    ? header.offsetHeight / 2
    : layout.header.center
    ? header.offsetHeight /2
    : 0;

    const headerX = isMobile ? 50 : layout.header.x;
    const headerY = isMobile ? 47.5 : layout.header.y;

    gsap.set(header, {
        x: (headerX /100) * deskWidth - offsetX,
        y: (headerY /100) * deskHeight - offsetY,
        rotation: 0,
    });

    console.log("Setting sizes and position");
    layout.items.forEach(({id, x, y, rotation }) => {
        gsap.set(`#${id}`, {
            x: (x / 100) * deskWidth,
            y: (y / 100) * deskHeight,
            width: itemSizes[id],
            height: itemSizes[id],
            rotation,
        });
    });
}

function switchMode(mode) {
    if (mode === activeMode) return;

    const state = Flip.getState(flipTargets);
    setLayout(mode);

    Flip.from(state, {
        duration: 1.25,
        ease: "power3.inOut",
        stagger: { amount: 0.1, from: "center"},
        absolute: true,
    });

    activeMode = mode;
}

setLayout("chaos");

switches.forEach((btn) => {
    btn.addEventListener("click", () => {
        switches.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        switchMode(btn.dataset.mode);
    });
});
    
window.addEventListener("resize", () => setLayout(activeMode));
