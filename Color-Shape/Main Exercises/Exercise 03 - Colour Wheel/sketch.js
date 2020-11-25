let numSegments = 360;
let stepAngle = 360/numSegments;
let R = 100;

function setup(){
  createCanvas(500,500);
  background(255,255,255);
  colorMode(HSB,360,100,100);
  angleMode(DEGREES);
  noStroke();
}

function draw(){
  push();//Push pop creates an instance where the coordinate system can be manipulated
  translate(250,250);//Pushes the origin down to 250,250
  fill(200,0,0);
  beginShape(TRIANGLE_FAN);
  vertex(250,250);
  for(let a=0; a <= 360; a += stepAngle){
      let vx =R * cos(a);
      let vy =R * sin(a);

      fill(a,100,100);
      vertex(vy,vx);
  }
  endShape();
  pop();//Ends the instance
}
