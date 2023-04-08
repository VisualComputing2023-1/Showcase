# Terrain generation

{{< hint info >}}
**Exercise**  
Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.
{{< /hint >}}

## Final result

{{< p5-global-iframe id='terrain_generation' width="750" height="476" >}}
let col, row; // attributes of cols and rows for the grid
let scl = 20 ; //to decide how much cols/rows there are

let w = 1400;
let h = 1000;


let heights = [];

// to change the model : assets
let sliderSpeed;
let sliderNoise;
let checkStroke;

let flying = 0 ; //variable that allows to fly over the terrain

let btnUp;
let btnDown;
let btnLeft;
let btnRight;

let btnPause;
let btnValidate;

//attributes varying with the asset values
let direction = "up";
let lines = true;
let popupon = false;
let maxheight = 300;
let topcol;
let midcol;
let botcol;
let array_cols = [];

function initButtons(){
  btnPause = createImg("assets/boton-de-pausa-de-video.png");
  btnPause.size(30, 30);
  btnPause.position(width - 50, 10);
  btnPause.mousePressed(popup);
  
  btnValidate = createImg("assets/check_1.png");
  btnValidate.size(30, 30);
  btnValidate.position(80, 530);
  btnValidate.mousePressed(changeColor);
  
  btnUp = createImg("assets/arrowUp.png");
  btnUp.size(25, 30);
  btnUp.position(width - 50, 70-20);
  btnUp.mousePressed(directionUp);
  
  btnDown = createImg("assets/arrowDown.png");
  btnDown.size(25, 30);
  btnDown.position(width - 50, 70+15);
  btnDown.mousePressed(directionDown);
  
  btnLeft = createImg("assets/arrowLeft.png");
  btnLeft.size(30, 25);
  btnLeft.position(width - 50 - 20, 70);
  btnLeft.mousePressed(directionLeft);
  
  btnRight = createImg("assets/arrowRight.png");
  btnRight.size(30, 25);
  btnRight.position(width - 50 + 15, 70);
  btnRight.mousePressed(directionRight);
}

function preload() {
  myFont = loadFont('assets/ArialTh.ttf');
}

function setup() {
  topcol = color("white");
  midcol = color("grey");
  botcol = color("black");
  createCanvas(600, 600, WEBGL);
  background(10);
  
  initButtons();
  textFont(myFont);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(15);
  
  color_picker_bot = createColorPicker("blue");
  color_picker_mid = createColorPicker("green");
  color_picker_top = createColorPicker("white");
  color_picker_top.position(10, 500);
  color_picker_mid.position(10, 530);
  color_picker_bot.position(10, 560);
  
  for (let i=0; i<int(maxheight/2); i++){
    array_cols.push(lerpColor(botcol, midcol, i/(int(maxheight/2))));
  }
  for (let j=int(maxheight/2); j<maxheight; j++){
    array_cols.push(lerpColor(midcol, topcol, j/(int(maxheight/2))));
  }
  
  sliderSpeed = createSlider(0, 1, 0.5, 0.01);
  sliderSpeed.position(10, 10);
  sliderSpeed.style('width', '80px');
  fill(150);
  text("Speed", -170, -275);
  sliderNoise = createSlider(0, maxheight, 200);
  sliderNoise.position(10, 40);
  sliderNoise.style('width', '80px');
  text("Noise", -170, -245);
  
  checkStroke = createCheckbox('Stroke', true);
  checkStroke.position(10, 80);
  checkStroke.changed(checkedStroke);
  text("Stroke", -240, -205);
  
  added = sliderSpeed.value();
  
  col = w/scl;
  row = h/scl;
  
  for (let x = 0; x < col; x++) {
    heights[x] = []; // create nested array
    for (let y = 0; y < row; y++) {
      heights[x][y] = 0;
    }
  }
}

function draw() {
  if (popupon == false){
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
          heights[x][y] = map(noise(xoff,yoff), 0, 1, 0, sliderNoise.value());
          yoff += 0.2;
        }
        xoff += 0.2;
      }
    }


    background(10); //to not keep the former strokes
    fill(150);
    text("Speed", -165, -275);
    text("Noise", -165, -245);
    text("Stroke", -240, -205);
    if(lines == true){
        stroke(255);  //white stroke
    }else{
      noStroke();    //no stroke
    }

    //center the generated grid
    translate(width/2, height/4);
    rotateX(PI/3);
    translate((-3*w)/4, -h/2);

    frameRate(5);

    //work on the 2D space : generation of a grid of vertices
    for (let y = 0; y < row; y++){

      beginShape(TRIANGLE_STRIP);

      for (let x = 0; x < col; x++){
        if (heights[x][y+1] != undefined){
          fill(array_cols[int(heights[x][y])]);
          vertex(x*scl, y*scl, heights[x][y]); //create horizontal line vertex
          fill(array_cols[int(heights[x][y+1])]);
          vertex(x*scl, (y+1)*scl, heights[x][y+1]);
        }
        
      }
      endShape();
    }
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
  console.log(direction);
}

function directionDown(){
  direction = "down";
  console.log(direction);
}

function directionLeft(){
  direction = "left";
  console.log(direction);
}

function directionRight(){
  direction = "right";
  console.log(direction);
}

function popup(){
  popupon = !popupon;
  console.log(popupon);
}

function interpolate(){
  for(let x=0; x<col; x++){
     for(let y=0; y<row; y++){
       if (heights[x][y]<150){
          array_cols[int(heights[x][y])] = lerpColor(botcol, midcol, heights[x][y]/150);
        } else {
          array_cols[int(heights[x][y])] = lerpColor(midcol, topcol, heights[x][y]/150 - 1);
        }
     } 
  }
}

function changeColor(){
  topcol = color_picker_top.color();
  midcol = color_picker_mid.color();
  botcol = color_picker_bot.color();
  interpolate();
  console.log(topcol, midcol, botcol);
  for (let i=0; i<array_cols.length; i++){
    console.log(array_cols[i]);
  }
}

{{< /p5-global-iframe >}}

The complete code is the following one :

```p5
let col, row; // attributes of cols and rows for the grid
let scl = 20 ; //to decide how much cols/rows there are

let w = 1400;
let h = 1000;


let heights = [];

// to change the model : assets
let sliderSpeed;
let sliderNoise;
let checkStroke;

let flying = 0 ; //variable that allows to fly over the terrain

let btnUp;
let btnDown;
let btnLeft;
let btnRight;

let btnPause;
let btnValidate;

//attributes varying with the asset values
let direction = "up";
let lines = true;
let popupon = false;
let maxheight = 300;
let topcol;
let midcol;
let botcol;
let array_cols = [];

function initButtons(){
  btnPause = createImg("./../assets/boton-de-pausa-de-video.png");
  btnPause.size(30, 30);
  btnPause.position(width - 50, 10);
  btnPause.mousePressed(popup);
  
  btnValidate = createImg("./../assets/check_1.png");
  btnValidate.size(30, 30);
  btnValidate.position(80, 530);
  btnValidate.mousePressed(changeColor);
  
  btnUp = createImg("./../assets/arrowUp.png");
  btnUp.size(25, 30);
  btnUp.position(width - 50, 70-20);
  btnUp.mousePressed(directionUp);
  
  btnDown = createImg("./../assets/arrowDown.png");
  btnDown.size(25, 30);
  btnDown.position(width - 50, 70+15);
  btnDown.mousePressed(directionDown);
  
  btnLeft = createImg("./../assets/arrowLeft.png");
  btnLeft.size(30, 25);
  btnLeft.position(width - 50 - 20, 70);
  btnLeft.mousePressed(directionLeft);
  
  btnRight = createImg("./../assets/arrowRight.png");
  btnRight.size(30, 25);
  btnRight.position(width - 50 + 15, 70);
  btnRight.mousePressed(directionRight);
}

function preload() {
  myFont = loadFont('./../assets/ArialTh.ttf');
}

function setup() {
  topcol = color("white");
  midcol = color("grey");
  botcol = color("black");
  createCanvas(600, 600, WEBGL);
  background(10);
  
  initButtons();
  textFont(myFont);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(15);
  
  color_picker_bot = createColorPicker("blue");
  color_picker_mid = createColorPicker("green");
  color_picker_top = createColorPicker("white");
  color_picker_top.position(10, 500);
  color_picker_mid.position(10, 530);
  color_picker_bot.position(10, 560);
  
  for (let i=0; i<int(maxheight/2); i++){
    array_cols.push(lerpColor(botcol, midcol, i/(int(maxheight/2))));
  }
  for (let j=int(maxheight/2); j<maxheight; j++){
    array_cols.push(lerpColor(midcol, topcol, j/(int(maxheight/2))));
  }
  
  sliderSpeed = createSlider(0, 1, 0.5, 0.01);
  sliderSpeed.position(10, 10);
  sliderSpeed.style('width', '80px');
  fill(150);
  text("Speed", -170, -275);
  sliderNoise = createSlider(0, maxheight, 200);
  sliderNoise.position(10, 40);
  sliderNoise.style('width', '80px');
  text("Noise", -170, -245);
  
  checkStroke = createCheckbox('Stroke', true);
  checkStroke.position(10, 80);
  checkStroke.changed(checkedStroke);
  text("Stroke", -240, -205);
  
  added = sliderSpeed.value();
  
  col = w/scl;
  row = h/scl;
  
  for (let x = 0; x < col; x++) {
    heights[x] = []; // create nested array
    for (let y = 0; y < row; y++) {
      heights[x][y] = 0;
    }
  }
}

function draw() {
  if (popupon == false){
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
          heights[x][y] = map(noise(xoff,yoff), 0, 1, 0, sliderNoise.value());
          yoff += 0.2;
        }
        xoff += 0.2;
      }
    }


    background(10); //to not keep the former strokes
    fill(150);
    text("Speed", -165, -275);
    text("Noise", -165, -245);
    text("Stroke", -240, -205);
    if(lines == true){
        stroke(255);  //white stroke
    }else{
      noStroke();    //no stroke
    }

    //center the generated grid
    translate(width/2, height/4);
    rotateX(PI/3);
    translate((-3*w)/4, -h/2);

    frameRate(5);

    //work on the 2D space : generation of a grid of vertices
    for (let y = 0; y < row; y++){

      beginShape(TRIANGLE_STRIP);

      for (let x = 0; x < col; x++){
        if (heights[x][y+1] != undefined){
          fill(array_cols[int(heights[x][y])]);
          vertex(x*scl, y*scl, heights[x][y]); //create horizontal line vertex
          fill(array_cols[int(heights[x][y+1])]);
          vertex(x*scl, (y+1)*scl, heights[x][y+1]);
        }
        
      }
      endShape();
    }

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
  console.log(direction);
}

function directionDown(){
  direction = "down";
  console.log(direction);
}

function directionLeft(){
  direction = "left";
  console.log(direction);
}

function directionRight(){
  direction = "right";
  console.log(direction);
}

function popup(){
  popupon = !popupon;
  console.log(popupon);
}

function interpolate(){
  for(let x=0; x<col; x++){
     for(let y=0; y<row; y++){
       if (heights[x][y]<150){
          array_cols[int(heights[x][y])] = lerpColor(botcol, midcol, heights[x][y]/150);
        } else {
          array_cols[int(heights[x][y])] = lerpColor(midcol, topcol, heights[x][y]/150 - 1);
        }
     } 
  }
}

function changeColor(){
  topcol = color_picker_top.color();
  midcol = color_picker_mid.color();
  botcol = color_picker_bot.color();
  interpolate();
  console.log(topcol, midcol, botcol);
  for (let i=0; i<array_cols.length; i++){
    console.log(array_cols[i]);
  }
}
```

## Explications

The aim of this exercise is to develop an automatic terrain generator, that would be useable in games or for visual effects in general. In that sense, it is important to develop features that serve that aim, while controlling :
- the "relief" of the terrain, to be able to develop a large range of terrains
- the direction of the movement of the camera, in cases where we would want to generate a moving terrain (plane trips, panoramas, view of the landscape, ...)
- the camera speed, still in an aim to control the cinematics
- the visualisation or not of the latices, to eventually correct certain parts of the terrain
- the colors of the terrain, for the user to be able to control therender of the terrain.

### Principle of the terrain generation

We will modelize the terrain thanks to a two dimensional array (matrix n*m), forming a grid. TEvery cell of this matrix represents a point of the terrain. It has certain coordinates (abscissa, ordinate, height) and a certain color. Changing these parameters allow us to change the appearance of the terrain.

The surface of the terrain is then made visible thanks to the generation of triangles, whose sommets ? are the different cells of the matrix (respectively one point, and two of its closest points, not being on the same axis).

### General attributes



### Relief of the terrain

A nice terrain generation has to include a feature controlling the intensity of the mountains. To get an infinite variety of reliefs, we then want to generate it randomly.

A first idea would be to assign a random height to each of the points forming the terrain. The problem being that two consecutive points would be completely independant, and then we would obtain a terrain way too irregular and unrealistic. This idea is then to be ignored.

A second idea is to use Perlin noise. This is a type of gradient noise used to increase apparent realism in a generated image. It gives an aleatorious effect to the image, when in reality, the value assigned to each point (the value being a height here) depends on its neighbour's values.


### Control of the movement

To control the movement, we will act on two of its feature : its direction, and its speed.

The speed is controlled thanks to an attribute called **. When increasing it, we augment the displacement of the grid at each frame, then increasing the speed. A way to make this attribute changeable by the user is to creagte a slider that has an influence on its value. Since the value is used at each frame (every time the function draw is called), the change in the speed will be instantaneous every time the user will use the slider.

```javascript
let sliderSpeed;

function setup(){
  ...
  sliderSpeed = createSlider(0, 1, 0.5, 0.01);
  sliderSpeed.position(10, 10);
  sliderSpeed.style('width', '80px');
  fill(150);
  text("Speed", -170, -275);
  ...
}

function draw(){
  ...
  flying +-= sliderSpeed.value();
  ...
}
```


The direction of the movement is defined(...)



At last, another feature that can be useful is a pause button. It allows the person generating the terrain to, once he detects something that drags its attention, pause the movement without acting on the speed slider. That way, he can start again the movement just as it was before.

This part is pretty simple to program, because it only requires to act on the speed of movement. We also need to declare a button that, when clicked, launches a method doing the action previously defined.

```javascript
let btnPause;
let popupon = false;

function initButtons(){
  btnPause = createImg("./../assets/boton-de-pausa-de-video.png");
  btnPause.size(30, 30);
  btnPause.position(width - 50, 10);
  btnPause.mousePressed(popup);
  ...

  function popup(){
    popupon = !popupon;
  }
}
```


### Visualization of the lattices

In order to be able to see a concrete schematic of the terrain, facilitate the programmers' work by lowering the computer's calculation time, and perhaps change some of the points' heights in other use cases, an important feature is to control the vizualisation of the grid of points.

A simple way to do that is by using a checkbox, that calls a method (name) every time that it is clicked on. (name of the functon) changes the value of the attribute (name) to *true* or *false* every time we want to see the grid shown or not.

Then, in the function draw (called at each frame), when drawing the triangles forming the terrain, an if ("boucle") controls the presence or not of (les contours) in the drawing.


### Color control


# Resources

Video on terrain generation
Pages p5 of : color picker, button, slider
Perlin noise definition
