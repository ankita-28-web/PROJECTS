/* --------
  Pinpoint Puzzle: Sandy Desert, Salt Lake, Rift Valley, Barrier Reef
    Geographic place names when preceded by "Great".
    Sandy Desert → Great Sandy Desert,  Salt Lake → Great Salt Lake,  
    Rift Valley → Great Rift Valley,  Barrier Reef → Great Barrier Reef
    Britain: England + Scotland + Whales → Great Britain: England + Scotland + Whales
----------- */ 

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentImages = [];
let currentIndex = 0;                   

// Open Lightbox
galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        currentImages = Array.from(
            document.querySelectorAll(
                '.gallery-item:not([style*="display: none"]) img'
            )
        );

        currentIndex = currentImages.indexOf(
            item.querySelector("img")
        );

        showImage();
        lightbox.style.display = "flex";
    });
});


// Show Image
function showImage() {
    if (currentImages.length === 0) return;

    lightboxImg.src = currentImages[currentIndex].src;
    lightboxImg.alt = currentImages[currentIndex].alt;
}

// Next Image
nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    showImage();
});


// Previous Image
prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }
    showImage();
});


// Close Lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});


// Close when clicking outside image
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
});


// Filter Images
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        // Remove active class
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        galleryItems.forEach((item) => {
            if (
                category === "all" ||
                item.dataset.category === category
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";
            }
        });
    });
});


// Keyboard Navigation
document.addEventListener("keydown", (event) => {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (event.key === "Escape") {
            closeBtn.click();
        }
    }
});