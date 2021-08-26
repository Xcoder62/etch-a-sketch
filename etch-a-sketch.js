// Support functions

function getBoxWidthHeight(gridContainerSize, gridSize) {
    return  gridContainerSize / gridSize;
}


function getTotalAmountOfBoxes(gridSize) {
    return gridSize * gridSize
}

// add an eventlistener to keep track of the slider's value
function initSlider() {
    let slider = document.querySelector(".barslider");
    let gridValue = document.querySelector(".grid-size-value")
    
    /* debugging sldier and slider value
    console.log(slider)
    console.log(slider.getAttribute("value"));
    */
    gridValue.textContent = slider.getAttribute("value"); // Display default slider value
    
    // swapping input vs change
    // input will change the textcontent as you slide
    // change will change the textcontent after you let go of the slider.
    slider.addEventListener('input', function () {
        gridValue.textContent = slider.value;
    }, false);
    
}

// Function that finds the size of each box depending on the user's selected-grid-size
function setGridSize() {
    // Get the value the slider is set too
    let gridValue = document.querySelector(".grid-size-value")

    console.log(`Grid Size from slider: ${gridValue.textContent}`)
    selectedGridSize = Number(gridValue.textContent);

    // remove all of the grid-box divs inside of the grid container
    let gridContainer = document.querySelector('.grid-container')
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    }

    initGrid(gridContainerSize, selectedGridSize);
}

// Event listener on each box to listen when the box is hovered over and change color depending on the mode
function setBoxColor(e){
    // change selected color based on which button is selected (the button selected should change the selected color variable
    // which in turn should change what color the block changes to when it's hovered over.)
    switch(colorMode) {
        case "black":
            e.srcElement.style.backgroundColor = "black";
            /*e.srcElement.style.border = "1px solid white";*/
            break;
        case "rainbow":
            // red, orange, yellow, green, blue, indigo, violet
            let rainbowColors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];
            // random int between 0 and 6 (7 colors of the rainbow)
            let randomSelection = Math.floor(Math.random() * 7);
            e.srcElement.style.backgroundColor = rainbowColors[randomSelection];
            break;
        case "pick":
            // when pick selected, change the selected color to the choosen one.
            let colorPickerValue = document.querySelector('#selected-color').value;
            e.srcElement.style.backgroundColor = colorPickerValue;
            break;
        

    }
}

function changeColorMode(selectedColorMode) {
    // grab all the button and remove active class
    let btns = Array.from(document.querySelectorAll('.btn'));
    btns.forEach(btn => btn.classList.remove("active"));
    
    // When a button is clicked, border white, blur it and deselect the other button by giving it's class back

    console.log(btns)
    switch (selectedColorMode) {
        // when rainbow selected, change selected color to a random rainbow one, the random color changes randomly on each hover.
        case "rainbow":
            colorMode = "rainbow"
            btns[1].classList.add('active');
            console.log("active color: rainbow");
            break;
        case "black":
            colorMode = "black";
            btns[0].classList.add('active');
            console.log("active color: black");
            break;
        case "pick":
            colorMode = "pick";
            btns[2].classList.add("active");
            console.log("active color: pick")
            break;
    }
}
// reset and trainstion all blocks to white when reset is clicked.
function resetGrid() {
    let gridContainer = document.querySelector('.grid-container');
    let allBoxes = Array.from(gridContainer.children);
    console.log(allBoxes);
    allBoxes.forEach(box => box.style.backgroundColor = "white");

    //.forEach(box => box.style.backgroundColor = "white")
}

// Create grid container
function initGrid(containerSize, gridSize) {
    // get the already created grid-container
    // default is 4x4
    let gridContainer = document.querySelector('.grid-container')
    //console.log(gridContainer)

    //reset the grid container, useful if switching from desktop to mobile
    
    if (gridContainer.firstChild) {
        while(gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
    }

    

    let TotalAmountOfBoxes = getTotalAmountOfBoxes(gridSize);
    for (let i = 0; i < TotalAmountOfBoxes; i++){
        // create a box, for each box set it's width and height
        // depending on the selected grid size
        let gridBox = document.createElement('div');
        gridBox.classList.add('grid-box');
        gridBox.style.width = String(getBoxWidthHeight(containerSize,gridSize)) + "px";
        //console.log(`width: ${getBoxWidthHeight(containerSize,gridSize)}, height: ${getBoxWidthHeight(containerSize,gridSize)}`)
        gridBox.style.height = String(getBoxWidthHeight(containerSize,gridSize)) + "px";
        gridBox.addEventListener('mouseenter', setBoxColor);
        // add each box to the gridcontainer, flex-wrap will wrap
        // the boxes around the container
        gridContainer.appendChild(gridBox);
    }
    console.log(`An ${gridSize} x ${gridSize} Grid has been created!`)
    console.log(`The height and width of each grid box is ${getBoxWidthHeight(containerSize,gridSize)}px`)
}


//// Main() Etch A Sketch Code

// Init grid 4x4
let gridContainerSize = 500;
// Variable for which color to change to on hover (default black) selectedBoxColor
let selectedBoxColor = "black";
let selectedGridSize = 4;
let colorMode = "black";
let deviceMode = "";

// reinitialize grid if going mobile
if (window.innerWidth < 960) {
    console.log("mobile mode.")
    deviceMode = "mobile"
    gridContainerSize = 300;
    initGrid(gridContainerSize, selectedGridSize);
} else {
    deviceMode = "desktop"
    initGrid(gridContainerSize, selectedGridSize);
}
//

// Mobile vs Desktop event listeners

window.addEventListener("resize", function () {
    // if this is a desktop...
    if (window.matchMedia("(min-width: 961px)").matches && deviceMode == "mobile") {
        console.log("desktop mode.")
        deviceMode = "desktop"
        gridContainerSize = 500;
        initGrid(gridContainerSize, selectedGridSize);
    } else if (window.matchMedia("(max-width: 960px)").matches && deviceMode == "desktop") {
        // we are on mobile, reset the grid
        console.log("mobile mode.")
        deviceMode = "mobile"
        gridContainerSize = 300;
        initGrid(gridContainerSize, selectedGridSize);
    }
})


initSlider();

// BUTTON EVENT LISTENERS
let btns = Array.from(document.querySelectorAll('.btn'));


// variable for which mode (black, rainbow, pick, or reset the app is in.
// set button
btns[4].addEventListener("click", function () {
    setGridSize();
} );
// setButton = document.querySelector('.set');
// console.log(setButton);
// setButton

// black button
btns[0].addEventListener('click', function (){
    changeColorMode('black');   
});

// blackButton = document.querySelector('.black');
// console.log(blackButton);
// blackButton.

// rainbow button
btns[1].addEventListener('click', function() {
    changeColorMode('rainbow');
} );

// rainbowButton = document.querySelector('.rainbow');
// console.log(rainbowButton);
// rainbowButton.

// pick button
btns[2].addEventListener('click', function() {
    changeColorMode('pick');
});
// reset button
btns[3].addEventListener('click', function() {
    resetGrid();
})

