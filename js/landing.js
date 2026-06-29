const menu=document.querySelector(".hamburger");
const menuItems=document.querySelector(".menu");

menu.addEventListener("click",()=>{
    menuItems.classList.toggle("show");
});
const container = document.querySelector(".carousel-container");

function updateCarousel() {
    const items = [...container.children];

    items.forEach(item => item.classList.remove("active"));

    items[2].classList.add("active");
}

function nextSlide() {
    container.appendChild(container.firstElementChild);
    updateCarousel();
}

function prevSlide() {
    container.insertBefore(
        container.lastElementChild,
        container.firstElementChild
    );
    updateCarousel();
}

document.querySelectorAll(".carousel-item").forEach(item => {
    item.addEventListener("click", (e) => {
        // if clicking the link/image directly, let it navigate
        if (e.target.closest('a')) return;
        // otherwise rotate carousel to center this item
        while (container.children[2] !== item) {
            nextSlide();
        }
    });
});

updateCarousel();

setInterval(nextSlide, 3000);