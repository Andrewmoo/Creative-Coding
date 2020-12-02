let numSegments = 12;

function setup(){
  createCanvas(500,500);
  background(255,255,255);
  colorMode(HSB,360,100,100);
  angleMode(RADIANS);
  noStroke();
}

function draw(){
  let stepAngle = TWO_PI/numSegments;
  let R = 100;
  background(255);
  beginShape(TRIANGLE_FAN);
  vertex(250,250);
  for(let a=0; a <= TWO_PI+0.5; a += stepAngle){
      let vx = 250 + (R * cos(a));
      let vy =250 + (R * sin(a));

      fill(degrees(a),100,100);
      vertex(vy,vx);
  }
  endShape();
}
