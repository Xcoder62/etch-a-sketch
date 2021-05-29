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

// Create grid container
function initGrid(containerSize, gridSize) {
    // get the already created grid-container
    // default is 4x4
    let gridContainer = document.querySelector('.grid-container')
    //console.log(gridContainer)
    

    let TotalAmountOfBoxes = getTotalAmountOfBoxes(gridSize);
    for (let i = 0; i < TotalAmountOfBoxes; i++){
        // create a box, for each box set it's width and height
        // depending on the selected grid size
        let gridBox = document.createElement('div');
        gridBox.classList.add('grid-box');
        gridBox.style.width = String(getBoxWidthHeight(containerSize,gridSize)) + "px";
        //console.log(`width: ${getBoxWidthHeight(containerSize,gridSize)}, height: ${getBoxWidthHeight(containerSize,gridSize)}`)
        gridBox.style.height = String(getBoxWidthHeight(containerSize,gridSize)) + "px";
        // add each box to the gridcontainer, flex-wrap will wrap
        // the boxes around the container
        gridContainer.appendChild(gridBox);
    }
    console.log(`An ${gridSize} x ${gridSize} Grid has been created!`)
    console.log(`The height and width of each grid box is ${getBoxWidthHeight(containerSize,gridSize)}px`)
}


//// Main() Etch A Sketch Code

// TODO: Init grid 4x4
let gridContainerSize = 500;
let selectedColor = "black";
let selectedGridSize = 4;


initGrid(gridContainerSize, selectedGridSize);
initSlider();

// BUTTON EVENT LISTENERS
setButton = document.querySelector('.set');
setButton.addEventListener("click", setGridSize);

// setGridSize();


//console.log(getBoxWidthHeight(gridContainerSize, selectedGridSize))

// TODO: Function that finds the size of each box depending on the user's selected-grid-size, selected-grid-color

// TODO: Variable for which color to change to on hover (default black)
// TOOD: Event listener on each box to listen when the box is hovered over
// TODO: When a button is clicked, border white, blur it and deselect the other button by giving it's class back
// TODO: change selected color based on which button is selected (the button selected should change the selected color variable
    // which in turn should change what color the block changes to when it's hovered over.)
// TODO: reset and trainstion all blocks to white when reset is clicked.
// TODO: when rainbow selected, change selected color to a random rainbow one, the random color changes randomly on each hover.
// TODO: when pick selected, change the selected color to the choosen one.
// TODO: when set is pressed, change it to a grey button that's unclickable until the slider is changed from the selected-grid-size