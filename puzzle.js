var rows = 3;
var columns = 3;

var rows2 = 4;
var columns2 = 4;

var currTile;   // switch
var otherTile;

var turns = 0;
var correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = [ "6", "7", "1", "2", "3", "4", "5","9", "8"];

var correctOrder2 = [ "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25","9"];
var imgOrder2 =[  "16", "17", "12", "13", "14",  "18", "19","11","15", "20", "21", "22", "23", "24","9", "25"];

var correctOrder3 = [ "31", "32", "33", "34", "35", "36", "37","39", "40", "41", "42", "43", "44", "9","46","46","9"];
var imgOrder3 =[  "31", "32", "33", "34", "35", "36", "37","39", "40", "41", "42", "43", "44", "9","31","44","46"];


window.onload = function() {
    initializeBoard(rows, columns, imgOrder);
}

function initializeBoard(rows, columns, imgOrder) {
    document.getElementById("board").innerHTML = ""; // Șterge tabla anterioară
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            var tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            // drag functions
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}


function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile.src.includes("9.png") && !otherTile.src.includes("16.png")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveDown || moveUp;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerHTML = turns;

        checkOrder();
    }
}
function checkOrder() {
    let tiles = document.querySelectorAll("#board img");
    let currentOrder = Array.from(tiles).map(tile => tile.src.split("/").pop().replace(".png", ""));

    let isCorrect = correctOrder.every((val, index) => val === currentOrder[index]);

    if (isCorrect) {
       

        if (rows === 3 && columns === 3 && turns > 0) {
            // Trecere la nivelul 2 (4x4)
            rows = 4;
            columns = 4;
            turns = 0;
            imgOrder = imgOrder2.slice();
            correctOrder = correctOrder2;

            document.getElementById("board").classList.add("level-2");
            initializeBoard(rows, columns, imgOrder);
         
            alert("Congratulations, you solved the puzzle! You earned 5 points and saved these polar bears! Polar bears are one of the species most affected by global warming. They depend on sea ice to hunt seals, their primary food source. As the ice melts due to rising temperatures, polar bears are forced to travel greater distances to find food, leading to malnutrition and declining populations. Without urgent action to reduce greenhouse gas emissions and protect their habitat, polar bears may face a severe risk of extinction.");
            
        }

        if (rows === 4 && columns === 4 && turns >0) {
            // Trecere la nivelul 2 (4x4)
            rows = 4;
            columns = 4;
            turns = 0;
            imgOrder = imgOrder3.slice();
            correctOrder = correctOrder3;

            document.getElementById("board").classList.add("level-3");
            initializeBoard(rows, columns, imgOrder);
            alert("Congratulations, you solved the puzzle! You earned 5 points and save again our planet! Airborne pollutants, especially those emitted from vehicles and industrial processes, significantly harm the environment. These emissions contribute to the accumulation of greenhouse gases like carbon dioxide and methane in the atmosphere, leading to global warming. As the Earth's temperature rises, we experience more extreme weather events, such as intense heatwaves, storms, and floods. This climate change disrupts ecosystems, endangers wildlife, and poses serious threats to human health and livelihoods. Reducing emissions is crucial to mitigating these harmful effects and protecting our planet's future.");
           
        }

    }

    if (rows === 5 && columns === 5 && turns >0) {
    alert("Congratulations, you solved the puzzle! You earned 5 points and save again our planet!  Phytoplankton are tiny, plant-like organisms that live in the ocean. They are so small that you can't see them without a microscope, but they are incredibly important! Phytoplankton float near the surface of the water and use sunlight to make their own food, just like plants on land. This process is called photosynthesis.They are a vital part of the ocean food chain because many sea creatures, like small fish and whales, eat them. Phytoplankton also produce a lot of the oxygen we breathe. So even though they are tiny, they play a big role in keeping our planet healthy!");
    }
}
