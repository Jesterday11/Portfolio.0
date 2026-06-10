window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

fetch("nav.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("nav-placeholder").innerHTML = data;

        initialiseNavigation();

    });


function initialiseNavigation() {

    const navButtons = document.querySelectorAll(".nav-btn");
    const currentPage = window.location.pathname;

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            document.body.classList.remove("loaded");

            setTimeout(() => {
                window.location.href = button.dataset.page;
            }, 400);

        });

        if (button.dataset.page === currentPage) {
            button.classList.add("active");
        }

    });

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

    }

}

const cards = document.querySelectorAll(".featured-card, .project-card");

cards.forEach(card => {
    card.addEventListener("click", () => {

        card.querySelector(".card-sides").classList.toggle("is-flipped");

    });

});


// Dark Mode Easter Egg

const themeSwitch = document.querySelector(".light-dark-theme");

const enableDarkmode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "active");
};

const disableDarkmode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "inactive");
};


let darkmode = localStorage.getItem("dark-mode");

if (darkmode === "active") {
    enableDarkmode();
} else {
    disableDarkmode();
}

if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
        darkmode = localStorage.getItem("dark-mode");

        if (darkmode !== "active") {
            enableDarkmode();
        } else {
            disableDarkmode();
        }
    });
}


// LightBox
const lightbox = document.querySelector(".lightbox");

if (lightbox) {

    const lightboxImg =
        lightbox.querySelector(".lightbox-content img");

    const caption =
        lightbox.querySelector(".lightbox-caption");

    const closeBtn =
        lightbox.querySelector(".close");

    const nextBtn =
        lightbox.querySelector(".next");

    const prevBtn =
        lightbox.querySelector(".prev");

    let currentGallery = [];
    let currentIndex = 0;

    function showImage(index) {
        lightboxImg.src = currentGallery[index].src;

        if (caption) {
            caption.textContent =
                currentGallery[index].dataset.caption || "";
        }

        currentIndex = index;
    }

    nextBtn.addEventListener("click", () => {
        showImage((currentIndex + 1) % currentGallery.length);
    });

    prevBtn.addEventListener("click", () => {
        showImage(
            (currentIndex - 1 + currentGallery.length) %
            currentGallery.length
        );
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    document.querySelectorAll(".game-images, .concept-images")
    .forEach(gallery => {

        const images = [...gallery.querySelectorAll("img")];

        images.forEach((img, index) => {

            img.addEventListener("click", () => {

                currentGallery = images;
                currentIndex = index;

                showImage(currentIndex);
                lightbox.style.display = "flex";

            });

        });

    });

}


// Video LightBpx
const animationCards = document.querySelectorAll(".animation-card");
const videoLightbox = document.querySelector(".video-lightbox");

if (videoLightbox) {

    const video = videoLightbox.querySelector("video");
    const videoSource = video.querySelector("source");

    const closeVideoBtn = videoLightbox.querySelector(".close-video");
    const videoNextBtn = videoLightbox.querySelector(".next");
    const videoPrevBtn = videoLightbox.querySelector(".prev");

    const videos = [...animationCards];

    let currentVideoIndex = 0;

    function showVideo(index) {

        currentVideoIndex = index;

        videoSource.src = videos[index].dataset.video;

        video.load();
        video.play();
    }

    animationCards.forEach((card, index) => {

        card.addEventListener("click", () => {

            showVideo(index);

            videoLightbox.classList.add("active");

        });

    });

    videoNextBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        showVideo(
            (currentVideoIndex + 1) % videos.length
        );

    });

    videoPrevBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        showVideo(
            (currentVideoIndex - 1 + videos.length) % videos.length
        );

    });

    closeVideoBtn.addEventListener("click", closeVideo);

    videoLightbox.addEventListener("click", (e) => {

        if (e.target === videoLightbox) {
            closeVideo();
        }

    });

    video.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    function closeVideo() {

        video.pause();
        video.currentTime = 0;

        videoLightbox.classList.remove("active");
    }

}