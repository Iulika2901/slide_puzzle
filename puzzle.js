var rows=3;
var columns = 3;

var currTile;   //switch
var otherTile;

var turns = 0;
//var imgOrder=["1", "2", "3", "4", "5", "6", "7", "8", "9"];


var imgOrder=["4", "2", "8","3", "5","1","9", "6", "7"]


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
 }

}