let cWidth = 500;
let numSquares = 20;
let squareSize = cWidth/numSquares;

function setup(){
  createCanvas(500,500);
  colorMode(HSB,numSquares,numSquares,numSquares);
  rectMode(CENTER);
  noLoop();
  randomSeed(23);
}

function draw() {
  background(0);
  for (let j = 0; j <= numSquares; j++) {
    for (let i = 0; i <= numSquares; i++) {
      let transX = i * squareSize;
      let transY = j * squareSize;

      push();
        translate(transX, transY);
        noFill();
        stroke(i,0,numSquares-j);
        let randomNum = round(random(0,1))
        if(randomNum == 0){
          line(0, 0, squareSize, squareSize);
        }
        else{
          fill(random(20));
          triangle(0, 0, 0,squareSize, squareSize,0);
          triangle(squareSize*2, 0,squareSize*2,squareSize,squareSize,squareSize );

        }
      pop();
    }
  }

}

function keyPressed(){
  if(key == 's' || key == 'S'){
    saveCanvas(gd.timestamp(),'png')
  }
}
