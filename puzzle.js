var rows=3;
var columns = 3;

var currTile;   //switch
var otherTile;

var turns = 0;
var correctOrder=["1", "2", "3", "4", "5", "6", "7", "8", "9"];


var imgOrder=["1", "2", "3", "4", "5", "6", "7", "9", "8"];


window.onload= function(){  //image like 0-2 line-col
    for (let r=0; r< rows; r++)
    {
        for (let c=0; c<columns; c++)
        {
            var tile = document.createElement("img");
            tile.id=r.toString() + "-" + c.toString();
            tile.src=imgOrder.shift() +".png";

            //drag function 
            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);  //dragging over another image
            tile.addEventListener("dragleave",dragOver);  //leave image
            tile.addEventListener("drop",dragDrop);   
            tile.addEventListener("dragend",dragEnd);  //swap
             

            
            document.getElementById("board").append(tile);

        }
   }
}  


function dragStart()
{
    currTile=this;
    
}

function dragOver(e)
{
   e.preventDefault();
    
}

function dragEnter(e)
{
   e.preventDefault();
    
}

function dragLeave()
{
    
}

function dragDrop()
{
  otherTile=this;
    
}

function dragEnd()
{
    if(!otherTile.src.includes("9.png")){
        return ;
    }


  let currCoords = currTile.id.split("-"); //0-0 => 0,0
  let r= parseInt(currCoords[0]);
  let c= parseInt(currCoords[1]);


  let otherCoords = otherTile.id.split("-");
  let r2= parseInt(otherCoords[0]);
  let c2= parseInt(otherCoords[1]);
     
 let moveLeft = r ==r2 && c2==c-1;
 let moveRight = r == r2 && c2 == c+1;
 let moveUp = c == c2 && r2 == r-1;
 let moveDown = c == c2 && r2 == r+1;

  let isAdjacet = moveLeft || moveRight || moveDown || moveUp;


 if(isAdjacet){
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src=otherImg;
    otherTile.src=currImg;


    turns +=1;
    document.getElementById("turns").innerHTML =+ turns;
    checkOrder(); // verifică ordinea după mutare
}
}

function checkOrder() {
let tiles = document.querySelectorAll("#board img");
let currentOrder = Array.from(tiles).map(tile => tile.src.split("/").pop().replace(".png", ""));

let isCorrect = correctOrder.every((val, index) => val === currentOrder[index]);

if (isCorrect) {
    alert("Congratulations, you solved the puzzle! You earned 5 points and saved these polar bears! Polar bears are one of the species most affected by global warming. They depend on sea ice to hunt seals, their primary food source. As the ice melts due to rising temperatures, polar bears are forced to travel greater distances to find food, leading to malnutrition and declining populations. Without urgent action to reduce greenhouse gas emissions and protect their habitat, polar bears may face a severe risk of extinction.");
}
}
