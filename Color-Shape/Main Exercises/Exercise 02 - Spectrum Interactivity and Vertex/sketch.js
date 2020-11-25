function setup(){
  createCanvas(500,500);
  background(255,255,255);
  noStroke();
  noLoop();
}

function draw(){

  // |++++++++++++++++++++++++++++++++++++++++++++|
  //  Draws a random shape using vertices
  // |++++++++++++++++++++++++++++++++++++++++++++|
  fill(random(0,255),random(0,255),random(0,255));
  noStroke();
  beginShape();
    for(let i=0; i<5; i++){
      let vx = i*20;
      let vy = random(10,100);

      vertex(vy,vx);
    }
    endShape(CLOSE);


// |++++++++++++++++++++++++++++++++++++++++++++|
//  Spectrum Interactivity (Crashes the browser)
// |++++++++++++++++++++++++++++++++++++++++++++|
//   let stepX= mouseX + 1;
//   let stepY= mouseY + 1;
//
// for(let gridY=0; gridY<height; gridY=gridY+stepY){
//
//   for(let gridX=0; gridX<width; gridX=gridX+stepX){
//     fill(gridX,height - gridY,100);
//     rect(gridX,gridY,10,10);
//   }
// }
}

// |++++++++++++++++++++++++++++++++++++++++++++|
//  Function for saving the canvas as a png
// |++++++++++++++++++++++++++++++++++++++++++++|
function keyPressed(){
  if(key=='s' || key=='S'){
    saveCanvas(gd.timestamp(),'png');
  }
}
