function setup(){
  createCanvas(1000,1000);
  colorMode(HSB,360,100,100);
  rectMode(CENTER);
}

function draw() {
  background(0);

  let startColor = color(243,78,84);
  let endColor = color(157,78,84);

  let transValueX = width/2;
  let transValueY = height/2;

  let size = width * 0.05;

  for (let x = size; x <= width - size; x += size) {
    for (let y = size; y <= height - size; y += size) {
      push();
      translate(x, y);
      let rotateValue = atan2(mouseY- y, mouseX-x);
      rotate(rotateValue);
      strokeWeight(4);
      stroke(lerpColor(startColor, endColor, x/width))
      fill(255);
      rect(0, 0, size, size);
      pop();
    }
  }

}

function keyPressed(){
  if(key == 's' || key == 'S'){
    saveCanvas(gd.timestamp(),'png')
  }
}
