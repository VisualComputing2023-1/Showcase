# Terrain generation

{{< hint info >}}
**Exercise**  
Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.
{{< /hint >}}

```p5
let col, row; // attributes of cols and rows for the grid
let scl = 20 ; //to decide how much cols/rows there are

let w = 1400;
let h = 1000;

let heights = []

// to change the model : assets
let sliderSpeed;
let sliderNoise;
let checkStroke;

let flying = 0 ; //variable that allows to fly over the terrain

let btnUp;
let btnDown;
let btnLeft;
let btnRight;

//attributes varying with the asset values
let direction = "up";
let lines = true;

function initButtons(){
  btnUp = createImg("assets/arrowUp.png");
  btnUp.size(25, 30);
  btnUp.position(width - 50, 30 - 20);
  btnUp.mousePressed(directionUp);
  
  btnDown = createImg("assets/arrowDown.png");
  btnDown.size(25, 30);
  btnDown.position(width - 50, 30 + 15);
  btnDown.mousePressed(directionDown);
  
  btnLeft = createImg("assets/arrowLeft.png");
  btnLeft.size(30, 25);
  btnLeft.position(width - 50 - 20, 30);
  btnLeft.mousePressed(directionLeft);
  
  btnRight = createImg("assets/arrowRight.png");
  btnRight.size(30, 25);
  btnRight.position(width - 50 + 15, 30);
  btnRight.mousePressed(directionRight);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  background(10);
  
  initButtons();
  
  sliderSpeed = createSlider(0, 1, 0.5, 0.01);
  sliderSpeed.position(10, 10);
  sliderSpeed.style('width', '80px');
  sliderNoise = createSlider(0, 300, 200);
  sliderNoise.position(10, 40);
  sliderNoise.style('width', '80px');
  
  checkStroke = createCheckbox('Stroke', true);
  checkStroke.position(10, 90);
  checkStroke.changed(checkedStroke);
  
  added = sliderSpeed.value();
  
  col = w/scl;
  row = h/scl;
  
  for (let x = 0; x < col; x++) {
    heights[x] = []; // create nested array
    for (let y = 0; y < row; y++) {
      heights[x][y] = 0
    }
  }
}

function draw() {
  if(direction == "up" || direction == "down"){  
    if (direction == "up") {
      flying -= sliderSpeed.value();
    }else{
      flying += sliderSpeed.value();
    }
    
    let yoff = flying;
    for (let y = 0; y < row; y++) {
      let xoff = 0;
      for (let x = 0; x < col; x++) {
        heights[x][y] = map(noise(xoff,yoff), 0, 1, 0,     sliderNoise.value());
        xoff += 0.2;
      }
      yoff += 0.2;
    }
  } else {
    if (direction == "right") {
      flying -= sliderSpeed.value();
    }else{
      flying += sliderSpeed.value();
    }
  
    let xoff = flying;
    for (let x = 0; x < col; x++) {
      let yoff = 0;
      for (let y = 0; y < row; y++) {
        heights[x][y] = map(noise(xoff,yoff), 0, 1, 0,     sliderNoise.value());
        yoff += 0.2;
      }
      xoff += 0.2;
    }
  }
  
  background(10); //to not keep the former strokes
  if(lines == true){
      stroke(255);  //white stroke
  }else{
    noStroke();    //no stroke
  }
  
  //center the generated grid
  translate(width/2, height/4);
  rotateX(PI/3);
  translate((-3*w)/4, -h/2);
  
  frameRate(10);
  
  //work on the 2D space : generation of a grid of vertices
  for (let y = 0; y < row; y++){
    
    beginShape(TRIANGLE_STRIP);
    
    for (let x = 0; x < col; x++){
      fill(heights[x][y]+30);
      vertex(x*scl, y*scl, heights[x][y]); //create horizontal line vertex
      fill(heights[x][y+1]+30)
      vertex(x*scl, (y+1)*scl, heights[x][y+1]);
    }
    endShape();
  }
}

function checkedStroke(){
  if (this.checked()) {
    lines = true;
    console.log(lines);
  } else {
    lines = false;
    console.log(lines);
  }
}

function directionUp(){
  direction = "up";
}

function directionDown(){
  direction = "down";
}

function directionLeft(){
  direction = "left";
}

function directionRight(){
  direction = "right";
}
```

# Resources