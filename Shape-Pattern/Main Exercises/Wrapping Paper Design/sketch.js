//Output must be 3508 x 4960

var delaunayTriangulation;
var hue;
let colors;
let colorSchemeIndex;

function setup() {
  createCanvas(1754, 2481);
  colorMode(HSB, 360, 100, 100);
  hue = random(360);
  delaunayTriangulation = new DelaunayTriangulation();
  delaunayTriangulation.add(new Vertex(createVector(0 - 200, 0 - 200)));
  delaunayTriangulation.add(new Vertex(createVector(width + 200, 0 - 200)));
  delaunayTriangulation.add(new Vertex(createVector(width + 200, height + 200)));
  delaunayTriangulation.add(new Vertex(createVector(0 - 200, height + 200)));
  for (var i = 0; i < 500; i++) {
    delaunayTriangulation.add(new Vertex(createVector(random(-200, width + 200), random(-200, height + 200))));
  }
  drawTriangles();
}


function drawTriangles() {
  background(0, 0, 100);
  var triangles = delaunayTriangulation.getTriangles();
  let nrOfColorSchemes = 5;
  colorSchemeIndex = Math.floor(Math.random() * nrOfColorSchemes);
  for (var ti = 0; ti < triangles.length; ti++) {
    var t = triangles[ti];
    var sat = 0;
    var bri = 0;
    for(var vi = 0; vi < 3; vi++) {
      var v = t.vertices[vi];
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
    [
      "#D4F1F4",
      "#75E6DA",
      "#189AB4",
      "#05445E",
    ]
    [
      "#f5cdee",
      "#e7cff5",
      "#ffffff",
      "#8893c4",
      "#3a3b4c"
    ],
    [
      "#ff7400",
      "#ff9a00",
      "#ffb400",
      "#4094b4",
      "#0083c3"
    ],
    [
      "#deeaee",
      "#b1cbbb",
      "#eea29a",
      "#c94c4c",
      "#8d1414"
    ],
    [
      "#999999",
      "#777777",
      "#555555",
      "#333333",
      "#111111"
    ]
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
  var center = createVector(width / 2, height / 2);
  var radius = sqrt(sq(width) + sq(height)) / 2;
  var v1 = new Vertex(createVector(center.x - sqrt(3) * radius, center.y - radius));
  var v2 = new Vertex(createVector(center.x + sqrt(3) * radius, center.y - radius));
  var v3 = new Vertex(createVector(center.x, center.y +  2 * radius));
  var t = new Triangle([v1, v2, v3]); //Creates super Triangle
  this.superVertices.push(v1);
  this.superVertices.push(v2);
  this.superVertices.push(v3);
  this.vertices.push(v1);
  this.vertices.push(v2);
  this.vertices.push(v3);
  this.triangles.push(t);

  //Adds the points to the calculation and updates the Triangulation
  this.add = function(v) {
    for (var i = 0; i < this.vertices.length; i++) {
      if(v.loc.x == this.vertices[i].loc.x && v.loc.y == this.vertices[i].loc.y) {
        return;
      }
    }


    //Adds vertices if they don't exist
    this.vertices.push(v);
    var nextTriangles = []; //Array to store new Delaunay Triangles
    var newTriangles = []; //Array to insert newly divided Triangles
    for (var ti = 0; ti < this.triangles.length; ti++) {
        //Incrementally extract triangles from the Delaunay Triangles Array
        var tri = this.triangles[ti];

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
    for (var ti = 0; ti < newTriangles.length; ti++) {
      var tri = newTriangles[ti];
      var isIllegal = false;
      //Checks if a triangle lies inside the circumcircle of any other one
      for (var vi = 0; vi < this.vertices.length; vi++) {
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
    var ts = [];
    for (var ti = 0; ti < this.triangles.length; ti++) {
      var t = this.triangles[ti];
      var hasSuperVertex = false;
      for (var vi = 0; vi < 3; vi++) {
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

  var v1 = this.vertices[0].loc;
  var v2 = this.vertices[1].loc;
  var v3 = this.vertices[2].loc;
  var c = 2 * ((v2.x - v1.x) * (v3.y - v1.y) - (v2.y - v1.y) * (v3.x - v1.x));
  var x = ((v3.y - v1.y) * (sq(v2.x) - sq(v1.x) + sq(v2.y) - sq(v1.y)) + (v1.y - v2.y) * (sq(v3.x) - sq(v1.x) + sq(v3.y) - sq(v1.y))) / c;
  var y = ((v1.x - v3.x) * (sq(v2.x) - sq(v1.x) + sq(v2.y) - sq(v1.y)) + (v2.x - v1.x) * (sq(v3.x) - sq(v1.x) + sq(v3.y) - sq(v1.y))) / c;
  var center = createVector(x, y);//Center of the circumscribed circle
  var radius = v1.dist(center);//Radius of the circumscribed circle
  this.circumCircle = new Circle(center, radius);//Create new circle

  this.render = function() {
    beginShape();
    for (var i = 0; i < 3; i++) {
      var v = this.vertices[i].loc;
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }

  this.divide = function(v) {
    var tris = [];
    for (var i = 0; i < 3; i++) {
      var j = i == 2? 0: i + 1;
      tris.push(new Triangle([this.vertices[i], this.vertices[j], v]));
    }
    return tris;
  }

  this.isContain = function(v) {
    for (var i = 0; i < 3; i++) {
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
