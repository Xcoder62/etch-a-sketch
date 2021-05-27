let slider = document.querySelector(".barslider");
let grid_value = document.querySelector(".grid-size-value")

// debugging
console.log(slider)
console.log(slider.getAttribute("value"));

grid_value.textContent = slider.getAttribute("value"); // Display default slider value

// swapping input vs change
// input will change the textcontent as you slide
// change will change the textcontent after you let go of the slider.
slider.addEventListener('input', function () {
    grid_value.textContent = slider.value;
}, false);