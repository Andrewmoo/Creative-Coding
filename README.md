# Creative Coding
## Color Shape
### Exercise 01-Spectrum Loop
In this exercise we created specrum of color looped across the screen with the hue increasing across the X axis and the saturation increasing across the Y axis. this was achieved by creating a simple loop that created a grid of squares that were then filled using a gridX variable

### Exercise 02-Interactivity and Vertex introduction
This exercise involved us adding interactivity to the previous Spectrum Loop exercise, the interaction is simply mouse movement. towards the end of class we began looking at using vertices to build shapes.

### Exercise 03-Color Wheel
This exercise had us create a color wheel using the triangle fan shape to create a set of verticies that create a series of conecting triangles, in this exercise we also learned about translations, push and pop.

### Exercise 04-Personal Design
The final exercise in the Color Shape section had us pick a reference image and create our own design using what we had learned so far, personally I wasn't happy with my eventual outcome as it was more programmatic than design oriented and I did not follow the intended process. 


## Shape Pattern
### Exercise 01 
In this exercise we created a series of lines that all met at a center point and had some slight interactivity with the mouse, the line thickness would increase along the Y axis and the number of lines would increase along the X axis to limit the number of lines we used the map function in p5.

### Exercise 02
In this exercise we created a grid of squares that followed the mouse using the arc tangent or atan function to produce the rotation angle.

### Exercise 03
In this exercise we used the random fucntion between 0 and 1 to create a random pattern made up of lines and triangles with a simple if statement that said if the result is 0 draw a line and if the result is 1 draw a triangle

### Exercise 04
The final exercise of the semester had us use everything we had learned so far and anytthing we had researched on our own to create a pattern intended to be printed as christmas wrapping paper using the process for exercise 04 of Color Shape, that being finding a reference image and developing a design based on that. For my design I wanted a mesh of triangles that would create a pattern where no triangles overlap To achieve this I found a mathematical function called Delaunay Triangulation which invloves ensuring no triangle lays inside the circumcircle of any other triangle to achive this computationally I employed the Bowyer Watson algorithm. Overall I was happy with the outcome however I believe I could have had better color theory applied.
