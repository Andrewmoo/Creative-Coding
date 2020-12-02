let color_picker;
let segmentsSlider;

function setup(){
  let text = createP("Change the start color of the Squares");
  text.position(520, 25);
  let text2 = createP("Change the end color of the Squares");
  text2.position(520, 325);
  let text3 = createP("Change the number of segments");
  text3.position(20, 540);
  let text5 = createP("Press the S key to save your design");
  text5.position(520, 540);
  text.style("font-family", "monospace");
  text.style("background-color", "#564d4d");
  text.style("color", "#FFFFFF");
  text.style("font-size", "12pt");
  text.style("padding", "10px");
  text2.style("font-family", "monospace");
  text2.style("background-color", "#564d4d");
  text2.style("color", "#FFFFFF");
  text2.style("font-size", "12pt");
  text2.style("padding", "10px");
  text3.style("font-family", "monospace");
  text3.style("background-color", "#564d4d");
  text3.style("color", "#FFFFFF");
  text3.style("font-size", "12pt");
  text3.style("padding", "10px");
  text5.style("font-family", "monospace");
  text5.style("background-color", " #99ffcc");
  text5.style("color", "#000000");
  text5.style("font-size", "12pt");
  text5.style("padding", "10px");
  createCanvas(500,500);
  background(255,255,255);
  colorMode(HSB,360,100,100);
  angleMode(RADIANS);
  startColorPicker = createColorPicker("green");
  startColorPicker.position(520,100);
  startColorPicker.style('width', '75px');
  startColorPicker.style('height', '50px');
  endColorPicker = createColorPicker("blue");
  endColorPicker.position(520,400);
  endColorPicker.style('width', '75px');
  endColorPicker.style('height', '50px');
  alphaSlider = createSlider(0, 100, 50);
  alphaSlider.position(20, 600);
  alphaSlider.style('width', '250px');
  noStroke();
}

function draw(){
  let numSegments = int(map(alphaSlider.value(),0,100,6,18));
  let text4 = createP(numSegments);
  text4.position(300, 540);
  text4.style("font-family", "monospace");
  text4.style("background-color", "#564d4d");
  text4.style("color", "#FFFFFF");
  text4.style("font-size", "12pt");
  text4.style("padding", "10px");
  let stepAngle = TWO_PI/numSegments;
  let R = 100;
  background(0);
  beginShape(TRIANGLE_FAN);
  vertex(250,250);
  for(let a=0; a <= TWO_PI+0.5; a += stepAngle){
      let vx = 250 + (R * cos(a));
      let vy =250 + (R * sin(a));

      fill(degrees(a),100,100);
      vertex(vy,vx);
  }
  endShape();

  let startColor = startColorPicker.color();
  let endColor = endColorPicker.color();
  // let  lerpedColor = lerpColor(startColor, endColor, alphaSlider.value() / i);

for (let i=0; i <= 10; i++){

  fill(lerpColor(startColor, endColor, i/10));
    rect(i*50,0,40,40);

  fill(lerpColor(endColor, startColor, i/10));
    rect(i*50,450,40,40);

  fill(lerpColor(startColor, endColor, i/10));
  rect(0,i*50,40,40);

  fill(lerpColor(endColor, startColor, i/10));
    rect(450,i*50,40,40);
}
}

function keyPressed(){
  if(key=='s' || key=='S'){
    saveCanvas(gd.timestamp(),'png');
  }
}
