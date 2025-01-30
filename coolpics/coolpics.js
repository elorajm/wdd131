document.querySelector("#menu-button").addEventListener("click", show_hide)
window.addEventListener("resize", handleResize);
const gallery = document.querySelectorAll("img");
for (const image of gallery) {
    image.addEventListener("click", viewHandler)
}

function show_hide() {
    const navigation = document.querySelector(".navigation");
    navigation.classList.toggle("hide");
}

function handleResize() {
    const width = window.innerWidth;
    const navigation = document.querySelector(".navigation");
    if (width > 1000) {
        navigation.classList.remove("hide");
    } else {
        navigation.classList.add("hide")
    }
}

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${pic}" alt="${alt}">
        </div>`;
}

function viewHandler(event) {
	// create a variable to hold the element that was clicked on from event.target
    const element = event.target;
	// get the src attribute from that element and 'split' it on the "-"
    const srcValue = element.getAttribute("src");
    const words = srcValue.split("-");
	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    const imageFileName = words[0] + "-full.jpeg";
    console.log(imageFileName);
	// insert the viewerTemplate into the top of the body element
	// (element.insertAdjacentHTML("afterbegin", htmltoinsert))
    document.querySelector("body").insertAdjacentHTML("afterbegin", viewerTemplate(imageFileName, "image"));
	// add a listener to the close button (X) that calls a function called closeViewer when clicked
    document.querySelector(".close-viewer").addEventListener("click", closeViewer);
}

function closeViewer() {
    document.querySelector("body").removeChild(document.querySelector("div"));
}