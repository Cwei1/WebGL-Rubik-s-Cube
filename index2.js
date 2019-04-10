var canvas;
var gl;
var program;
var cBuffer;
var vColor;
var fileContent;
var fileLoaded = false;
var rotationAngle = 3;
var _projectionMatrix;
var _modelViewMatrix;
var PROJMATRIX = mat4();
var MVMATRIX = mat4();
var eye = vec3(0.0, 0.0, 4.0);
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);
var cameraRadius = 20.0;
var THETA = radians(20);
var PHI = radians(70);
var theta;
var phi;
var currentAngle = 0;
var interval;
var moving = false;
var movelist = [];

var vertices = [

  vec3(-0.95,-0.95,-0.95), 
  vec3( 0.95,-0.95,-0.95), 
  vec3( 0.95, 0.95,-0.95), 
  vec3(-0.95, 0.95,-0.95),
  vec3(-0.95,-0.95, 0.95), 
  vec3( 0.95,-0.95, 0.95), 
  vec3( 0.95, 0.95, 0.95), 
  vec3(-0.95, 0.95, 0.95),
  vec3(-0.95,-0.95,-0.95), 
  vec3(-0.95, 0.95,-0.95), 
  vec3(-0.95, 0.95, 0.95), 
  vec3(-0.95,-0.95, 0.95),
  vec3( 0.95,-0.95,-0.95), 
  vec3( 0.95, 0.95,-0.95), 
  vec3( 0.95, 0.95, 0.95), 
  vec3( 0.95,-0.95, 0.95),
  vec3(-0.95,-0.95,-0.95), 
  vec3(-0.95,-0.95, 0.95), 
  vec3( 0.95,-0.95, 0.95), 
  vec3( 0.95,-0.95,-0.95),
  vec3(-0.95, 0.95,-0.95), 
  vec3(-0.95, 0.95, 0.95), 
  vec3( 0.95, 0.95, 0.95), 
  vec3( 0.95, 0.95,-0.95)

];

var initColors = [

  vec4( 0.0, 1.0, 0.0, 1.0 ), 
  vec4( 0.0, 1.0, 0.0, 1.0 ),   
  vec4( 0.0, 1.0, 0.0, 1.0 ), 
  vec4( 0.0, 1.0, 0.0, 1.0 ),   
  vec4( 0.0, 0.0, 1.0, 1.0 ),   
  vec4( 0.0, 0.0, 1.0, 1.0 ),  
  vec4( 0.0, 0.0, 1.0, 1.0 ),   
  vec4( 0.0, 0.0, 1.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),   
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 1.0, 1.0, 1.0 ),  
  vec4( 1.0, 1.0, 1.0, 1.0 ),   
  vec4( 1.0, 1.0, 1.0, 1.0 ),   
  vec4( 1.0, 1.0, 1.0, 1.0 ),  
  vec4( 1.0, 1.0, 0.0, 1.0 ),   
  vec4( 1.0, 1.0, 0.0, 1.0 ),  
  vec4( 1.0, 1.0, 0.0, 1.0 ),  
  vec4( 1.0, 1.0, 0.0, 1.0 ),   
  vec4( 0.0, 0.0, 0.0, 1.0 )
];

var vertexColors = [
  vec4( 0.0, 1.0, 0.0, 1.0 ), 
  vec4( 0.0, 1.0, 0.0, 1.0 ),   
  vec4( 0.0, 1.0, 0.0, 1.0 ), 
  vec4( 0.0, 1.0, 0.0, 1.0 ),   
  vec4( 0.0, 0.0, 1.0, 1.0 ),   
  vec4( 0.0, 0.0, 1.0, 1.0 ),  
  vec4( 0.0, 0.0, 1.0, 1.0 ),   
  vec4( 0.0, 0.0, 1.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),  
  vec4( 1.0, 0.5, 0.0, 1.0 ),   
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 0.0, 0.0, 1.0 ),  
  vec4( 1.0, 1.0, 1.0, 1.0 ),  
  vec4( 1.0, 1.0, 1.0, 1.0 ),   
  vec4( 1.0, 1.0, 1.0, 1.0 ),   
  vec4( 1.0, 1.0, 1.0, 1.0 ),  
  vec4( 1.0, 1.0, 0.0, 1.0 ),   
  vec4( 1.0, 1.0, 0.0, 1.0 ),  
  vec4( 1.0, 1.0, 0.0, 1.0 ),  
  vec4( 1.0, 1.0, 0.0, 1.0 )   
];

var cubeIndex = [
				
	[

	[[],[],[]],
	[[],[],[]],
	[[],[],[]]

	],

	[

	[[],[],[]],
	[[],[],[]],
	[[],[],[]]

	],

	[

	[[],[],[]],
	[[],[],[]],
	[[],[],[]]

	]
				   
];

var indices = [
	
	0,1,2,
	0,2,3,
	4,5,6,
	4,6,7,
	8,9,10,
	8,10,11,
	12,13,14,
	12,14,15,
	16,17,18,
	16,18,19,
	20,21,22,
	20,22,23

];

var moves = [
	
	"L", "l",
	"R", "r",
	"U", "u",
	"D", "d",
	"F", "f",
	"B", "b",
	"L", "l",
	"R", "r",
	"U", "u"

];

var textFile = null,
	makeTextFile = function(text){
		var data = new Blob([text], {type: 'text/plain'});
		if(textFile != null){
			window.URL.revokeObjectURL(textFile);
		}
		textFile = window.URL.createObjectURL(data);
		return textFile;
};

function initCube() {
  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      for (k = -1; k < 2; k++) {
        cubeIndex[i+1][j+1][k+1][0] = i;
        cubeIndex[i+1][j+1][k+1][1] = j;
        cubeIndex[i+1][j+1][k+1][2] = k;
        cubeIndex[i+1][j+1][k+1][3] = [vec3(-1,0,0),vec3(0,-1,0),vec3(0,0,-1)];
        cubeIndex[i+1][j+1][k+1][4] = mat4();
      }
    }
  }
}

function negate(vec) {
  var temp = [];
  for (i=0; i < vec.length; i++) {temp[i] = -vec[i];}
  return temp;
}

function getRotationAxes(x,y,z){
	return cubeIndex[x+1][y+1][z+1][3];
}

function getRotationMatrix(x,y,z){
	return cubeIndex[x+1][y+1][z+1][4];
}

function setRotationMatrix(x,y,z,m){
	cubeIndex[x+1][y+1][z+1][4] = m;
}

function animate(action) {
  interval = setInterval(function() {callRotation(action)}, 1);
}

function callRotation(face) {
  turnFace(face);
  currentAngle += rotationAngle;
  if (currentAngle == 90) {
    clearInterval(interval);
    moving = false;
    currentAngle = 0;
    turned(face);
    if (Solved()) {
      document.getElementById("FinishedField").innerHTML = "Cube Solved";
    } else {
      document.getElementById("FinishedField").innerHTML = "";
    }
  }
}

function pickanim(a, b, c, d, e, f, g, h){
	if(movelist.length < 9999){
		theta = degrees(THETA) % 360;
		phi = degrees(PHI) % 360;
		if((phi >= -180 && phi > 0) || (phi >= 180 ** phi < 360)){
			if(theta < -315 || (theta >= -45 && theta < 45) || theta >= 315){
				movelist.push(a);
			}
			else if((theta >= -315 && theta < -225) || (theta >= 45 && theta < 135)){
				movelist.push(b);
			}
			else if ((theta >= -225 && theta < -135) || (theta >=135 && theta < 225)) {
		        movelist.push(c);
		    }
		    else if ((theta >= -135 && theta < -45) || (theta >= 215 && theta < 315)) {
		        movelist.push(d);
		    }
		}
		else {
	        if (theta < -315 || (theta >= -45 && theta < 45) || theta >= 315) {
	        	movelist.push(e);
	        } 
	        else if ((theta >= -315 && theta < -225) || (theta >= 45 && theta < 135)) {
	        	movelist.push(f);
	      	} 
	      	else if ((theta >= -225 && theta < -135) || (theta >=135 && theta < 225)) {
	        	movelist.push(g);
	      	} 
	      	else if ((theta >= -135 && theta < -45) || (theta >= 215 && theta < 315)) {
	        	movelist.push(h);
	      	}
	    }
	}
	else{
		console.log("Error: Please wait for previous processes to completed before adding moves");
	}
}

function Solved() {
  var orientation;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      orientation = cubeIndex[0][0][0][3];
      for (x = -1; x < 2; x++) {
        for (y = -1; y < 2; y++) {
          for (z = -1; z < 2; z++) {
            if (cubeIndex[x+1][y+1][z+1][3][i][j] != orientation[i][j]) {
              if (x == 0 && z == 0) {
                if (cubeIndex[x+1][y+1][z+1][3][1][j] != orientation[1][j]) {
                  return false;
                }
              } else if (x == 0 && y == 0) {
                if (cubeIndex[x+1][y+1][z+1][3][2][j] != orientation[2][j]) {
                  return false;
                }
              } else if (y == 0 && z == 0) {
                if (cubeIndex[x+1][y+1][z+1][3][0][j] != orientation[0][j]) {
                  return false;
                }
              } else {
                return false;
              }
            }
          }
        }
      }
    }
  }
  return true;
}

function turned(face) {
  var x, y, z, first, second, third, temp;
  for (x = -1; x < 2; x++) {
    for (y = -1; y < 2; y++) {
      for (z = -1; z < 2; z++) {
        switch (face) {
         case "L":
          if (cubeIndex[x+1][y+1][z+1][0] == -1) {
            temp = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][1];
            cubeIndex[x+1][y+1][z+1][3][1] = negate(cubeIndex[x+1][y+1][z+1][3][2]);
            cubeIndex[x+1][y+1][z+1][3][2] = temp;
          }
          break;
         case "l":
          if (cubeIndex[x+1][y+1][z+1][0] == -1) {
            temp = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][2];
            cubeIndex[x+1][y+1][z+1][3][2] = negate(cubeIndex[x+1][y+1][z+1][3][1]);
            cubeIndex[x+1][y+1][z+1][3][1] = temp;
          }
          break;
         case "R":
          if (cubeIndex[x+1][y+1][z+1][0] == 1) {
            temp = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][2];
            cubeIndex[x+1][y+1][z+1][3][2] = negate(cubeIndex[x+1][y+1][z+1][3][1]);
            cubeIndex[x+1][y+1][z+1][3][1] = temp;
          }
          break;
         case "r":
          if (cubeIndex[x+1][y+1][z+1][0] == 1) {
            temp = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = -temp;
            
            
            temp = cubeIndex[x+1][y+1][z+1][3][1];
            cubeIndex[x+1][y+1][z+1][3][1] = negate(cubeIndex[x+1][y+1][z+1][3][2]);
            cubeIndex[x+1][y+1][z+1][3][2] = temp;
          }
          break;
         case "U":
          if (cubeIndex[x+1][y+1][z+1][1] == 1) {
            temp = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][0];
            cubeIndex[x+1][y+1][z+1][3][0] = negate(cubeIndex[x+1][y+1][z+1][3][2]);
            cubeIndex[x+1][y+1][z+1][3][2] = temp;
          }
          break;
         case "u":
          if (cubeIndex[x+1][y+1][z+1][1] == 1) {
            temp = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][2];
            cubeIndex[x+1][y+1][z+1][3][2] = negate(cubeIndex[x+1][y+1][z+1][3][0]);
            cubeIndex[x+1][y+1][z+1][3][0] = temp;
          }
          break;
         case "D":
          if (cubeIndex[x+1][y+1][z+1][1] == -1) {
            temp = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][2];
            cubeIndex[x+1][y+1][z+1][3][2] = negate(cubeIndex[x+1][y+1][z+1][3][0]);
            cubeIndex[x+1][y+1][z+1][3][0] = temp;
          }
          break;
         case "d":
          if (cubeIndex[x+1][y+1][z+1][1] == -1) {
            temp = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][0];
            cubeIndex[x+1][y+1][z+1][3][0] = negate(cubeIndex[x+1][y+1][z+1][3][2]);
            cubeIndex[x+1][y+1][z+1][3][2] = temp;
          }
          break;
         case "E":
          if (cubeIndex[x+1][y+1][z+1][1] == 0) {
            temp = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][2];
            cubeIndex[x+1][y+1][z+1][3][2] = negate(cubeIndex[x+1][y+1][z+1][3][0]);
            cubeIndex[x+1][y+1][z+1][3][0] = temp;
          }
          break;
         case "e":
          if (cubeIndex[x+1][y+1][z+1][1] == 0) {
            temp = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][0];
            cubeIndex[x+1][y+1][z+1][3][0] = negate(cubeIndex[x+1][y+1][z+1][3][2]);
            cubeIndex[x+1][y+1][z+1][3][2] = temp;
          }
          break;
         case "F":
          if (cubeIndex[x+1][y+1][z+1][2] == 1) {
            temp = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][1];
            cubeIndex[x+1][y+1][z+1][3][1] = negate(cubeIndex[x+1][y+1][z+1][3][0]);
            cubeIndex[x+1][y+1][z+1][3][0] = temp;
          }
          break;
         case "f":
          if (cubeIndex[x+1][y+1][z+1][2] == 1) {
            temp = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][0];
            cubeIndex[x+1][y+1][z+1][3][0] = negate(cubeIndex[x+1][y+1][z+1][3][1]);
            cubeIndex[x+1][y+1][z+1][3][1] = temp;
          }
          break;
         case "S":
          if (cubeIndex[x+1][y+1][z+1][2] == 0) {
            temp = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][1];
            cubeIndex[x+1][y+1][z+1][3][1] = negate(cubeIndex[x+1][y+1][z+1][3][0]);
            cubeIndex[x+1][y+1][z+1][3][0] = temp;
          }
          break;
         case "s":
          if (cubeIndex[x+1][y+1][z+1][2] == 0) {
            temp = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][0];
            cubeIndex[x+1][y+1][z+1][3][0] = negate(cubeIndex[x+1][y+1][z+1][3][1]);
            cubeIndex[x+1][y+1][z+1][3][1] = temp;
          }
          break;
         case "B":
          if (cubeIndex[x+1][y+1][z+1][2] == -1) {
            temp = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][0];
            cubeIndex[x+1][y+1][z+1][3][0] = negate(cubeIndex[x+1][y+1][z+1][3][1]);
            cubeIndex[x+1][y+1][z+1][3][1] = temp;
          }
          break;
         case "b":
          if (cubeIndex[x+1][y+1][z+1][2] == -1) {
            temp = cubeIndex[x+1][y+1][z+1][0];
            cubeIndex[x+1][y+1][z+1][0] = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][1];
            cubeIndex[x+1][y+1][z+1][3][1] = negate(cubeIndex[x+1][y+1][z+1][3][0]);
            cubeIndex[x+1][y+1][z+1][3][0] = temp;
          }
          break;
         case "M":
          if (cubeIndex[x+1][y+1][z+1][0] == 0) {
            temp = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][1];
            cubeIndex[x+1][y+1][z+1][3][1] = negate(cubeIndex[x+1][y+1][z+1][3][2]);
            cubeIndex[x+1][y+1][z+1][3][2] = temp;
          }
          break;
         case "m":
          if (cubeIndex[x+1][y+1][z+1][0] == 0) {
            temp = cubeIndex[x+1][y+1][z+1][1];
            cubeIndex[x+1][y+1][z+1][1] = cubeIndex[x+1][y+1][z+1][2];
            cubeIndex[x+1][y+1][z+1][2] = -temp;
            
            temp = cubeIndex[x+1][y+1][z+1][3][2];
            cubeIndex[x+1][y+1][z+1][3][2] = negate(cubeIndex[x+1][y+1][z+1][3][1]);
            cubeIndex[x+1][y+1][z+1][3][1] = temp;
          }
        }
      }
    }
  }
}

function turnFace(face) {
  var x,y,z;
  var direction,value;
  var mainAxis,secondAxis,thirdAxis;
  var oldMatrix, newMatrix
  switch (face) {
   case "L":
    mainAxis = 0; value = -1; direction = "L";
    break;
   case "l":
    mainAxis = 0; value = -1; direction = 0;
    break;
   case "R":
    mainAxis = 0; value = 1; direction = 0;
    break;
   case "r":
    mainAxis = 0; value = 1; direction = "r";
    break;
   case "M":
    mainAxis = 0;value = 0;direction = "M";
    break;
   case "m":
    mainAxis = 0;value = 0;direction = 0;
    break;
   case "U":
    mainAxis = 1;value = 1;direction = 0;
    break;
   case "u":
    mainAxis = 1;value = 1;direction = "u";
    break;
   case "D":
    mainAxis = 1;value = -1;direction = "D";
    break;
   case "d":
    mainAxis = 1;value = -1;direction = 0;
    break;
   case "E":
    mainAxis = 1;value = 0;direction = "E";
    break;
   case "e":
    mainAxis = 1;value = 0;direction = 0;
    break;
   case "F":
    mainAxis = 2;value = 1;direction = 0;
    break;
   case "f":
    mainAxis = 2;value = 1;direction = "f";
    break;
   case "B":
    mainAxis = 2;value = -1;direction = "B";
    break;
   case "b":
    mainAxis = 2;value = -1;direction = 0;
    break;
   case "S":
    mainAxis = 2;value = 0;direction = 0;
    break;
   case "s":
    mainAxis = 2;value = 0;direction = "s";
    break;
  }
  for (x = -1; x < 2; x++) {
    for (y = -1; y < 2; y++) {
      for (z = -1; z < 2; z++) {
        // check if cubie is in the plane of the face being turned
        if (cubeIndex[x+1][y+1][z+1][mainAxis] == value) {
          oldMatrix = getRotationMatrix(x,y,z);
          if (!direction) {
            oldMatrix = mult(oldMatrix,rotate(rotationAngle,getRotationAxes(x,y,z)[mainAxis]));
          } else {
            oldMatrix = mult(oldMatrix,rotate(rotationAngle,negate(getRotationAxes(x,y,z)[mainAxis])));
          }
          setRotationMatrix(x,y,z,oldMatrix);
        }
      }
    }
  }
}

function discolor(x,y,z) {
  for (i = 0; i < vertexColors.length; i++) {
    vertexColors[i] = initColors[i];
  }
  var index, first;
  if (x != -1) {darken(8);}
  if (x != 1) {darken(12);}
  if (y != -1) {darken(16);}
  if (y != 1) {darken(20);}
  if (z != -1) {darken(0);}
  if (z != 1) {darken(4);}
  function darken(index) {
    for (i = index; i < index + 4; i++) {
      vertexColors[i] = vec4(0.0, 0.0, 0.0, 0.85);
    }  
  }
}

function render() {
  if (movelist.length != 0 && !moving) {
    animate(movelist.shift());
    moving = true;
  }
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  eye = vec3(cameraRadius*Math.sin(PHI)*Math.sin(THETA),
    cameraRadius*Math.cos(PHI),
    cameraRadius*Math.sin(PHI)*Math.cos(THETA));
  PROJMATRIX = perspective(45.0, 1.0, 0.3, 1000);
  MVMATRIX = lookAt(eye, at, up);
  var x, y, z;
  for (x = -1; x <= 1; x++) {
    for (y = -1; y <= 1; y++) {
      for (z = -1; z <= 1; z++) {
        if (x !=0 || y !=0 || z!=0) { 
          var tempMVMATRIX = MVMATRIX;
          MVMATRIX = mult(MVMATRIX,getRotationMatrix(x,y,z));
          MVMATRIX = mult(MVMATRIX,translate(vec3(x*2.05,y*2.05,z*2.05)));
          discolor(x,y,z);
          cBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
          vColor = gl.getAttribLocation( program, "vColor" );
          gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0 , 0);
          gl.enableVertexAttribArray(vColor);
          gl.uniformMatrix4fv(_projectionMatrix, false, flatten(PROJMATRIX));
          gl.uniformMatrix4fv(_modelViewMatrix, false, flatten(MVMATRIX));
          gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
          MVMATRIX = tempMVMATRIX;
        }  
      }
    }
  }
  requestAnimFrame(render);
}

window.onload = function init() {
  canvas = document.getElementById("gl-canvas");
  document.onkeydown = function(event) {
	if(event.keyCode == 67) {
      pickanim("r","b","l","f","r","b","l","f");
    } 
    else if(event.keyCode == 88) {
	  pickanim("R","B","L","F","R","B","L","F");
    }
    else if(event.keyCode == 83) {
      pickanim("m","s","M","S","m","s","M","S");
    } 
    else if(event.keyCode == 68) {
	  pickanim("M","S","m","s","M","S","m","s");
    } 
    else if(event.keyCode == 78) {
      pickanim("B","L","F","R","F","R","B","L");
    } 
    else if(event.keyCode == 77) {
      pickanim("b","l","f","r","f","r","b","l");
    } 
    else if(event.keyCode == 66) {
      pickanim("D","D","D","D","U","U","U","U");
    } 
    else if(event.keyCode == 86) {
      pickanim("d","d","d","d","u","u","u","u");
    }
    else if(event.keyCode == 70) {
      pickanim("e","e","e","e","E","E","E","E");;
    } 
    else if(event.keyCode == 71) {
      pickanim("E","E","E","E","e","e","e","e");;
    }  
    else if(event.keyCode == 69) {
      pickanim("L","F","R","B","L","F","R","B");
    } 
    else if(event.keyCode == 87) {
      pickanim("l","f","r","b","l","f","r","b");
    } 
    else if(event.keyCode == 82) {
      pickanim("U","U","U","U","D","D","D","D");
    } 
    else if(event.keyCode == 84) {
      pickanim("u","u","u","u","d","d","d","d");
    } 
    else if(event.keyCode == 72) {
      pickanim("s","M","S","m","S","m","s","M");
    } 
    else if(event.keyCode == 74) {
      pickanim("S","m","s","M","s","M","S","m");
    } 
    else if(event.keyCode == 85) {
      pickanim("F","R","B","L","B","L","F","R");
    } 
    else if(event.keyCode == 89) {
      pickanim("f","r","b","l","b","l","f","r");
    } 
    else if(event.keyCode == 37) {
      THETA += 0.2;
    } 
    else if(event.keyCode == 38) {
      PHI += 0.1;
    } 
    else if(event.keyCode == 39) {
      THETA -= 0.2;
    } 
    else if(event.keyCode == 40) {
      PHI -= 0.1;
    } 
    else if(event.keyCode == 27) {
      movelist = [];
    }
  }

  var drag = false;
  var old_mouse_x, old_mouse_y;
  var isHeld = false;
  var mouseDown = function(e) {
    drag = true;
    old_mouse_x = e.pageX;
    old_mouse_y = e.pageY;
    e.preventDefault();
    return false;
  }
  var mouseUp = function(e) {drag = false;}
  
  var mouseMove = function(e) {
    if (!drag) {return false;}
    var dX = e.pageX - old_mouse_x;
    var dY = e.pageY - old_mouse_y;
    var absPhi = Math.abs(degrees(PHI)%360);
    if (absPhi > 180.0 && absPhi < 270.0 || PHI < 0.0) {
      if (degrees(PHI)%360 < -180.0) {
        up = vec3(0.0, 1.0, 0.0);
        THETA += -dX*2*Math.PI/canvas.width;
      } else {
        up = vec3(0.0, -1.0, 0.0);
        THETA += dX*2*Math.PI/canvas.width;
      }
    } else {
      if (absPhi > 270.0) {
        up = vec3(0.0, -1.0, 0.0);
        THETA += dX*2*Math.PI/canvas.width;
      } else {
        up = vec3(0.0, 1.0, 0.0);
        THETA += -dX*2*Math.PI/canvas.width;
      }
    }
    PHI += -dY*2*Math.PI/canvas.height;
    old_mouse_x = e.pageX;
    old_mouse_y = e.pageY;
    e.preventDefault();
  }
  
  var mouseWheel = function(e) {
    if (cameraRadius - e.wheelDelta/75 < 12.5) {
      cameraRadius = 12.5;
    } else if (cameraRadius - e.wheelDelta/75 > 50.0) {
      cameraRadius = 50.0;
    } else {
      cameraRadius -= e.wheelDelta/75;
    }
  }
  
  canvas.addEventListener("mousewheel", mouseWheel, false);
  canvas.addEventListener("mousedown", mouseDown, false);
  canvas.addEventListener("mouseup", mouseUp, false);
  canvas.addEventListener("mouseout", mouseUp, false);
  canvas.addEventListener("mousemove", mouseMove, false);

  document.getElementById( "LButton" ).onclick = function () {
    pickanim("L","F","R","B","L","F","R","B");};
  document.getElementById( "RButton" ).onclick = function () {
    pickanim("R","B","L","F","R","B","L","F");};
  document.getElementById( "UButton" ).onclick = function () {
    pickanim("D","D","D","D","U","U","U","U");};
  document.getElementById( "DButton" ).onclick = function () {
    pickanim("U","U","U","U","D","D","D","D");};
  document.getElementById( "FButton" ).onclick = function () {
    pickanim("B","L","F","R","F","R","B","L");};
  document.getElementById( "BButton" ).onclick = function () {
    pickanim("F","R","B","L","B","L","F","R");};
  document.getElementById( "MButton" ).onclick = function () {
    pickanim("M","S","m","s","M","S","m","s");};
  document.getElementById( "EButton" ).onclick = function () {
    pickanim("e","e","e","e","E","E","E","E");};
  document.getElementById( "SButton" ).onclick = function () {
    pickanim("s","M","S","m","S","m","s","M");};
  document.getElementById( "LiButton" ).onclick = function () {
    pickanim("l","f","r","b","l","f","r","b");};
  document.getElementById( "RiButton" ).onclick = function () {
    pickanim("r","b","l","f","r","b","l","f");};
  document.getElementById( "UiButton" ).onclick = function () {
    pickanim("d","d","d","d","u","u","u","u");};
  document.getElementById( "DiButton" ).onclick = function () {
    pickanim("u","u","u","u","d","d","d","d");};
  document.getElementById( "FiButton" ).onclick = function () {
    pickanim("b","l","f","r","f","r","b","l");};
  document.getElementById( "BiButton" ).onclick = function () {
    pickanim("f","r","b","l","b","l","f","r");};
  document.getElementById( "MiButton" ).onclick = function () {
    pickanim("m","s","M","S","m","s","M","S");};
  document.getElementById( "EiButton" ).onclick = function () {
    pickanim("E","E","E","E","e","e","e","e");};
  document.getElementById( "SiButton" ).onclick = function () {
    pickanim("S","m","s","M","s","M","S","m");};
  document.getElementById( "randomTurnCount").onkeypress = function(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == 13) {
      makeRandomTurns();
      return false;
    }
  }
  document.getElementById( "RandomButton" ).onclick = makeRandomTurns;

  function makeRandomTurns() {
    var input = document.getElementById("randomTurnCount").value;
    if(isNaN(input) || !input) {
      alert("Error: Invalid Entry");
    } else if (input > 9999 || input < 0) {
      alert("Error: Please enter a value between 0 and 9999");
    } else if (movelist.length != 0) {
      alert("Please wait for the current process to complete before adding any more moves");
    } else {
      var rng, previousTurn;
      for (i = 0; i < input; i++) {
        rng = Math.round(Math.random()*1000)%12;
        if ((rng%2 == 0 && previousTurn == moves[rng+1])||(rng%2 == 1 && previousTurn == moves[rng-1])){
            movelist.push(moves[rng+6]);
            previousTurn = moves[rng+6];
        } else {
          movelist.push(moves[rng]);
          previousTurn = moves[rng];
        }
      }
    }
  }

  document.getElementById( "LoadButton" ).onclick = function () {
    if (!fileLoaded) {
      alert("No valid file to be loaded");
    } else {
      cubeIndex = fileContent.slice();
    }
  };

  document.getElementById( "SaveButton" ).onclick = function () {
    var link = document.getElementById("downloadlink");
    link.href = makeTextFile(JSON.stringify(cubeIndex));
    link.innerHTML = "Download saved cube state";
  };
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL is not available");
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 0.5);
  gl.enable(gl.DEPTH_TEST);
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);
  var iBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
  cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
  vColor = gl.getAttribLocation( program, "vColor" );
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0 , 0);
  gl.enableVertexAttribArray(vColor);
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
  var _vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(_vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_vPosition);
  _projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");
  _modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
  
  initCube();
  render();
}