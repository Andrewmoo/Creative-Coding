function setup(){
  createCanvas(1000,1000);
  colorMode(HSB,360,100,100);
  angleMode(RADIANS);
}

function draw(){
  let numSegments = 12;
  let stepAngle = TWO_PI/numSegments;
  let R = 100;

  for(let a=0; a <= TWO_PI+0.5; a += stepAngle){
      let vx = 250 + (R * cos(a));
      let vy =250 + (R * sin(a));

      stroke(0);
      line(250,250,vx,vy);
  }
  endShape();

}

function keyPressed(){
  if(key=='s' || key=='S'){
    saveCanvas(gd.timestamp(),'png');
  }
}
