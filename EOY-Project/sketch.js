// 1.Render a text on the canvas.
// 2.Store the pixels in an array.
// 3.Clear canvas.
// 4.Add Brownian Motion particles.
// 5.Draw a line between the current and the previous position for each particle.
// 6.When a particle is on the text, set the step size small - otherwise big.

var particles;
var iterations;
var px;
var w;
var h;
var message = 'Creative Coding';
var Color = '#a510ed';
let colorPicker;

//gui
var visible = true;
var gui


function Particle() {
  this.x = random([0, w]);
  this.y = random([0, h]);
  this.oldX = this.x;
  this.oldY = this.y;
}



// function Particle() {
//   this.x = random([0, w]);
//   this.y = random([0, h]);
//   this.oldX = this.x;
//   this.oldY = this.y;
// }

Particle.prototype.move = function(stepSize) {
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += random(-stepSize, stepSize);
  this.y += random(-stepSize, stepSize);
  if(this.x < 0) this.x = 0;
  if(this.x > w) this.x = w;
  if(this.y < 0) this.y = 0;
  if(this.y > h) this.y = h;
}



function setup() {
  frameRate(30);
  iterations = 5;
  w = windowWidth;
  h = windowHeight;
  gui = createGui('Style (Press the DEL key to reset)').setPosition(windowWidth - 220, 20);
  gui.addGlobals('message', 'Color')
  createCanvas(w, h);
  reset();
  stroke(0, 10);
  Particle.prototype.draw = function() {
    stroke(Color+'1A');
    line(this.oldX, this.oldY, this.x, this.y);
  }
  // noLoop();
}




function draw() {
  for(var i = 0; i < iterations; i++) {
    particles.forEach(p => {
      var x = floor(p.x);
      var y = floor(p.y);
      var off = (y * w + x) * 4; 
      var stepSize = 30;
      if(px[off+3] > 100) {
        stepSize = 2;
      }
      p.move(stepSize);
      p.draw();
    });
  
  }
}

function drawParticles() {
  particles = [];
  for(var i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
}

function myText() {
  // var message = "Creative Coding";
  var tSize = 150;
  textSize(tSize);
  var tWidth = textWidth(message);
  text(message, w / 2 - tWidth / 2, h / 2 + tSize / 2);
  var image = get(0, 0, w, h);
  image.loadPixels();
  px = image.pixels;
  background(255);
}

function reset() {
  drawParticles();
  clear();
  myText();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  reset();
}

// function mouseClicked() {
//   reset();
// }

function keyPressed() {
  if(keyCode == DELETE) {
      reset();
  }
}