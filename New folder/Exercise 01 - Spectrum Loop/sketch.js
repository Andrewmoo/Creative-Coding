//Variable that will change throughout the code
let numberOfTicks = 100;
//Variable that will never change throughout the code
const screenWidth = 1000;


function setup(){
  createCanvas(500,500);
  background(255,255,255);
  colorMode(HSB,width,height,100);
  noStroke();
}

function draw(){
  // fill(255,0,
  // noStroke();
  // rect(20,20,200,200);
  //
  // fill(0,255,0);
  // noStroke();
  // ellipse(250,250, 100, 150);
  //
  // fill(255,255,0);
  // strokeWeight(5);
  // stroke(0,255,0);
  // rect(400,200,100,100)
let stepX=10;
let stepY=10;

for(let gridY=0; gridY<height; gridY=gridY+stepY){

  for(let gridX=0; gridX<width; gridX=gridX+stepX){
    fill(gridX,height - gridY,100);
    rect(gridX,gridY,10,10);
  }
}
}
