let font;
let fontPath;
let path;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    opentype.load('data/Stick-Regular.ttf', function(err, f){
      if(err){
        console.log(err);
      }
      else{
        font = f;
        loop();
      }
    });
}

function draw() {
  if(!font) return
  background(255);
  translate(20,220);
  fontPath = font.getPath('T',100,300,400);
  path = new g.Path(fontPath.commands);
  path = g.resampleByAmount(path, 50);

  beginShape();
  for(let i = 0; i<fontPath.commands.length; i++){
    fill(255,0,0);
    noStroke();
    //ellipse(fontPath.commands[i].x,fontPath.commands[i].y, 5,5);
    //vertex(fontPath.commands[i].x,fontPath.commands[i].y)
  }
  endShape();

  beginShape();
  for(let i = 0; i<path.commands.length; i++){
    fill(255,0,0);
    noStroke();
    ellipse(path.commands[i].x,path.commands[i].y, 5,5);
    //vertex(path.commands[i].x,path.commands[i].y)
  }
  endShape();
}
