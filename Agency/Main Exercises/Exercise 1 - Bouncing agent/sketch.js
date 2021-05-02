let cSize = 1000
let xPos = 500
let yPos = 500
let stepSize = 1
let angle = 70;
width = window.innerWidth;
height = window.innerHeight;

function setup(){
  createCanvas(cSize,cSize);
  background(0)
}



function draw(){
    
  let speed = map(mouseX, 0, width, 2, 10)

  for (let x = 0; x < speed; x++) {

   stroke(255);
   strokeWeight(10);
   point(xPos, yPos);

   xPos += cos(radians(angle)) * stepSize;
   yPos += sin(radians(angle)) * stepSize;

   if (xPos < 0 || xPos > width || yPos < 0 || yPos > height){
      angle = getRandomAngle(xPos,yPos);
   }
  }


}

function getRandomAngle(_x,_y){
  let randomAngle = floor(random(0,180));

    if (_y < 0) {
      return randomAngle;
    }
    if (_y > height) {
      return randomAngle + 180;
    }
    if (_x > width) {
      return randomAngle + 90;
    }
    if (_x < 0) {
      return randomAngle + 270;
    }
}
