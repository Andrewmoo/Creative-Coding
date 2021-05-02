//Output must be 3508 x 4960

let delaunayTriangulation;
let hue;
let colors;
let colorSchemeIndex;

function setup() {
  createCanvas(828, 1762);
  colorMode(HSB, 360, 100, 100);
  hue = random(360);
  delaunayTriangulation = new DelaunayTriangulation();
  delaunayTriangulation.add(new Vertex(createVector(0 - 200, 0 - 200)));
  delaunayTriangulation.add(new Vertex(createVector(width + 200, 0 - 200)));
  delaunayTriangulation.add(new Vertex(createVector(width + 200, height + 200)));
  delaunayTriangulation.add(new Vertex(createVector(0 - 200, height + 200)));
  for (let i = 0; i < 50; i++) {
    delaunayTriangulation.add(new Vertex(createVector(random(-200, width + 200), random(-200, height + 200))));
  }
  drawTriangles();
}


function drawTriangles() {
  background(0, 0, 100);
  let triangles = delaunayTriangulation.getTriangles();
  let nrOfColorSchemes = 1;
  colorSchemeIndex = Math.floor(Math.random() * nrOfColorSchemes);
  for (let ti = 0; ti < triangles.length; ti++) {
    let t = triangles[ti];
    let sat = 0;
    let bri = 0;
    for(let vi = 0; vi < 3; vi++) {
      let v = t.vertices[vi];
      sat += v.sat;
      bri += v.bri;
    }
    sat /= 3;
    bri /= 3;
    hue = random(360);
    //Returns object Arguments is not a valid color representation.
    // for(i =0; i <=4; i++){
    //   fill(colors[1][i]);
    //   console.log(colors[1][i])
    // }
    fill(getRandomColor());
    stroke("#aaaaaa");
    strokeWeight(1);
    t.render();
  }
}


function draw() {

}

function getRandomColor() {
  colors = [
    // [
    //   "#03045e",
    //   "#0077b6",
    //   "#00b4d8",
    //   "#90e0ef",
    //   "#caf0f8",
    // ]
    [
      "#f5cdee",
      "#e7cff5",
      "#ffffff",
      "#8893c4",
      "#3a3b4c"
    ],
    // [
    //   "#ff7400",
    //   "#ff9a00",
    //   "#ffb400",
    //   "#4094b4",
    //   "#0083c3"
    // ],
    // [
    //   "#deeaee",
    //   "#b1cbbb",
    //   "#eea29a",
    //   "#c94c4c",
    //   "#8d1414"
    // ],
    // [
    //   "#999999",
    //   "#777777",
    //   "#555555",
    //   "#333333",
    //   "#111111"
    // ]
  ]

  let len = colors[colorSchemeIndex].length;
  let randomIndex = Math.floor(Math.random() * len);
  return colors[colorSchemeIndex][randomIndex];
}

function DelaunayTriangulation() {
  this.triangles = []; //Array of divided triangles
  this.vertices = []; // Array of all vertex points
  this.superVertices = [];

  //Super Triangle
  let center = createVector(width / 2, height / 2);
  let radius = sqrt(sq(width) + sq(height)) / 2;
  let v1 = new Vertex(createVector(center.x - sqrt(3) * radius, center.y - radius));
  let v2 = new Vertex(createVector(center.x + sqrt(3) * radius, center.y - radius));
  let v3 = new Vertex(createVector(center.x, center.y +  2 * radius));
  let t = new Triangle([v1, v2, v3]); //Creates super Triangle
  this.superVertices.push(v1);
  this.superVertices.push(v2);
  this.superVertices.push(v3);
  this.vertices.push(v1);
  this.vertices.push(v2);
  this.vertices.push(v3);
  this.triangles.push(t);

  //Adds the points to the calculation and updates the Triangulation
  this.add = function(v) {
    for (let i = 0; i < this.vertices.length; i++) {
      if(v.loc.x == this.vertices[i].loc.x && v.loc.y == this.vertices[i].loc.y) {
        return;
      }
    }


    //Adds vertices if they don't exist
    this.vertices.push(v);
    let nextTriangles = []; //Array to store new Delaunay Triangles
    let newTriangles = []; //Array to insert newly divided Triangles
    for (let ti = 0; ti < this.triangles.length; ti++) {
        //Incrementally extract triangles from the Delaunay Triangles Array
        let tri = this.triangles[ti];

      //If the circumscribed circle of the trianle that you just extracted contains any
      //vertices from any other Triangle then....
      if(tri.circumCircle.isInCircle(v.loc)) {
        //.....Subdivide and add to array
        newTriangles = newTriangles.concat(tri.divide(v));
      }
        //If not theres no need to do anything
        else {
        nextTriangles.push(tri);
      }
    }

    //newTriangles[] now contains a number of newly divided triangles as well as
    //illegal ones
    for (let ti = 0; ti < newTriangles.length; ti++) {
      let tri = newTriangles[ti];
      let isIllegal = false;
      //Checks if a triangle lies inside the circumcircle of any other one
      for (let vi = 0; vi < this.vertices.length; vi++) {
        if (this.isIllegalTriangle(tri, this.vertices[vi])) {
          isIllegal = true;
          break;
        }
      }
      //Added as a properly split triangle
      if (!isIllegal) {
        nextTriangles.push(tri);
      }
    }
    //Update the new Delaunay list
    this.triangles = nextTriangles;
  }

  //From the divided triangles delete the ones that aren't legal
  this.getTriangles = function() {
    let ts = [];
    for (let ti = 0; ti < this.triangles.length; ti++) {
      let t = this.triangles[ti];
      let hasSuperVertex = false;
      for (let vi = 0; vi < 3; vi++) {
        if (t.isContain(this.superVertices[vi])) {
          hasSuperVertex = true;
        }
      }
      if (!hasSuperVertex) {
        ts.push(t);
      }
    }

    return ts;
  }

  this.getTrianglesWithSuperTriangle = function() {
    return this.triangles;
  }

  //Returns true if vertex v is inside circumscribed circle of triangle t
  this.isIllegalTriangle = function(t, v) {
    if(t.isContain(v)) {
      return false;
    }
    return t.circumCircle.isInCircle(v.loc);
  }


}

function Triangle(vertices) {
  this.vertices = vertices;

  let v1 = this.vertices[0].loc;
  let v2 = this.vertices[1].loc;
  let v3 = this.vertices[2].loc;
  let c = 2 * ((v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x));
  let x = ((v3.y - v1.y) * (sq(v2.x) - sq(v1.x) + sq(v2.y) - sq(v1.y)) + (v1.y - v2.y) * (sq(v3.x) - sq(v1.x) + sq(v3.y) - sq(v1.y))) / c;
  let y = ((v1.x - v3.x) * (sq(v2.x) - sq(v1.x) + sq(v2.y) - sq(v1.y)) + (v2.x - v1.x) * (sq(v3.x) - sq(v1.x) + sq(v3.y) - sq(v1.y))) / c;
  let center = createVector(x, y);//Center of the circumscribed circle
  let radius = v1.dist(center);//Radius of the circumscribed circle
  this.circumCircle = new Circle(center, radius);//Create new circle

  this.render = function() {
    beginShape();
    for (let i = 0; i < 3; i++) {
      let v = this.vertices[i].loc;
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }

  this.divide = function(v) {
    let tris = [];
    for (let i = 0; i < 3; i++) {
      let j = i == 2? 0: i + 1;
      tris.push(new Triangle([this.vertices[i], this.vertices[j], v]));
    }
    return tris;
  }

  this.isContain = function(v) {
    for (let i = 0; i < 3; i++) {
      if (this.vertices[i] === v) {
        return true;
      }
    }
    return false;
  }

}


function Circle(center, radius) {
  this.center = center;
  this.radius = radius;

  this.isInCircle = function(v) {
    return this.center.dist(v) < this.radius;
  }
}

function Vertex(loc) {
  this.loc = loc;
  this.sat = random(50, 100);
  this.bri = random(30, 100);
}
