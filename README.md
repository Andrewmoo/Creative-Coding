# Creative Coding
<h2>Color Shape</h2>
<h3>Exercise 01</h3>
In this exercise we created specrum of color looped across the screen with the hue increasing across the X axis and the saturation increasing across the Y axis. 
    for(let gridY=0; gridY<height; gridY=gridY+stepY){

  for(let gridX=0; gridX<width; gridX=gridX+stepX){
    fill(gridX,height - gridY,100);
    rect(gridX,gridY,10,10);
  }
}
