# Terrain generation

{{< hint info >}}
**Exercise**  
Develop a terrain visualization application. Check out the 3D terrain generation with Perlin noise coding train tutorial.
{{< /hint >}}

## Main objectives

The aim of this exercise is to develop an automatic terrain generator, that would be useable in games or for visual effects in general. In that sense, it is important to develop features that serve that aim, while controlling :
- the "relief" of the terrain, to be able to develop a large range of terrains
- the direction of the movement of the camera, in cases where we would want to generate a moving terrain (plane trips, panoramas, view of the landscape, ...)
- the camera speed, still in an aim to control the cinematics
- the visualisation or not of the latices, to eventually correct certain parts of the terrain
- the colors of the terrain, for the user to be able to control therender of the terrain.

## Previous work

As an introduction to that subject, it is important to watch the following video : 
https://www.youtube.com/watch?v=IKB1hWWedMk
It lays the basis of terrain generation, and gives the foundations to build an application based on that.

## Result

{{< p5-global-iframe id='terrain_generation' width="630" height="630" >}}

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
  btnPause = createImg("./../boton-de-pausa-de-video.png");
  btnPause.size(30, 30);
  btnPause.position(width - 50, 10);
  btnPause.mousePressed(popup);
  
  btnValidate = createImg("./../check_1.png");
  btnValidate.size(30, 30);
  btnValidate.position(80, 530);
  btnValidate.mousePressed(changeColor);
  
  btnUp = createImg("./../arrowUp.png");
  btnUp.size(25, 30);
  btnUp.position(width - 50, 70-20);
  btnUp.mousePressed(directionUp);
  
  btnDown = createImg("./../arrowDown.png");
  btnDown.size(25, 30);
  btnDown.position(width - 50, 70+15);
  btnDown.mousePressed(directionDown);
  
  btnLeft = createImg("./../arrowLeft.png");
  btnLeft.size(30, 25);
  btnLeft.position(width - 50 - 20, 70);
  btnLeft.mousePressed(directionLeft);
  
  btnRight = createImg("./../arrowRight.png");
  btnRight.size(30, 25);
  btnRight.position(width - 50 + 15, 70);
  btnRight.mousePressed(directionRight);
}

function preload() {
  myFont = loadFont('./../ArialTh.ttf');
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
        flying += sliderSpeed.value();
      }else{
        flying -= sliderSpeed.value();
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
    text("Speed", -170, -280);
    text("Noise", -170, -250);
    text("Stroke", -240, -210);
    if(lines == true){
        stroke(255);  //white stroke
    }else{
      noStroke();    //no stroke
    }

    //center the generated grid
    translate(width/2, height/4);
    rotateX(PI/3);
    translate((-3*w)/4, -h/2);

    frameRate(15);

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

The complete code of this application is the following one :

```javascript
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
  btnPause = createImg("./../boton-de-pausa-de-video.png");
  btnPause.size(30, 30);
  btnPause.position(width - 50, 10);
  btnPause.mousePressed(popup);
  
  btnValidate = createImg("./../check_1.png");
  btnValidate.size(30, 30);
  btnValidate.position(80, 530);
  btnValidate.mousePressed(changeColor);
  
  btnUp = createImg("./../arrowUp.png");
  btnUp.size(25, 30);
  btnUp.position(width - 50, 70-20);
  btnUp.mousePressed(directionUp);
  
  btnDown = createImg("./../arrowDown.png");
  btnDown.size(25, 30);
  btnDown.position(width - 50, 70+15);
  btnDown.mousePressed(directionDown);
  
  btnLeft = createImg("./../arrowLeft.png");
  btnLeft.size(30, 25);
  btnLeft.position(width - 50 - 20, 70);
  btnLeft.mousePressed(directionLeft);
  
  btnRight = createImg("./../arrowRight.png");
  btnRight.size(30, 25);
  btnRight.position(width - 50 + 15, 70);
  btnRight.mousePressed(directionRight);
}

function preload() {
  myFont = loadFont('./../ArialTh.ttf');
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
        flying += sliderSpeed.value();
      }else{
        flying -= sliderSpeed.value();
      }

      let yoff = flying;
      for (let y = 0; y < row; y++) {
        let xoff = 0;
        for (let x = 0; x < col; x++) {
          heights[x][y] = map(noise(xoff,yoff), 0, 1, 0, sliderNoise.value());
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
    text("Speed", -170, -280);
    text("Noise", -170, -250);
    text("Stroke", -240, -210);
    if(lines == true){
        stroke(255);  //white stroke
    }else{
      noStroke();    //no stroke
    }

    //center the generated grid
    translate(width/2, height/4);
    rotateX(PI/3);
    translate((-3*w)/4, -h/2);

    frameRate(15);

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
  } else {
    lines = false;
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

function popup(){
  popupon = !popupon;
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
}
```

## Explication of the solution

### Principle of the terrain generation

We will modelize the terrain thanks to a two dimensional array (matrix n*m), forming a grid. Every cell of this matrix represents a point of the terrain. It has certain coordinates (abscissa, ordinate, height) and a certain color. Changing these parameters allow us to change the appearance of the terrain.

The surface of the terrain is then made visible thanks to the generation of triangles, whose sommets ? are the different cells of the matrix (respectively one point, and two of its closest points, not being on the same axis).

### Terrain relief

A nice terrain generation has to include a feature controlling the intensity of the mountains. To get an infinite variety of reliefs, we then want to generate it randomly.

A first idea would be to assign a random height to each of the points forming the terrain. The problem being that two consecutive points would be completely independant, and then we would obtain a terrain way too irregular and unrealistic. This idea is then to be ignored.

A second idea is to use Perlin noise. This is a type of gradient noise used to increase apparent realism in a generated image. It gives an aleatorious effect to the image, when in reality, the value assigned to each point (the value being a height here) depends on its neighbour's values.

To define the relief of the terrain, we store into a two-dimensional array called *heights* the altitudes of each and every point of the lattice. The attribute is initialized as following :

```javascript
let heights = [];

function setup(){
  ...
  for (let x = 0; x < col; x++) {
    heights[x] = []; // create nested array
    for (let y = 0; y < row; y++) {
      heights[x][y] = 0;
    }
  }
  ...
}
```

To facilitate the user-generator interactions, we also define a slider that will allow to change the value of the noise produced.

```javascript
let sliderNoise;

function setup(){
  ...
  sliderNoise = createSlider(0, maxheight, 200);
  sliderNoise.position(10, 40);
  sliderNoise.style('width', '80px');
  text("Noise", -170, -245);
  ...
}
```

Now the way of calculating random heights at every point, but dependant of its neighbours' heights, is to use a prebuilt function, *noise(x, y)*, that returns the value of the Perlin noise at the coordinates (x,y). We then use *map(value, 0, 1, 0, noise(x,y))*, to convert the value *value* from the range \[0,1] to the range \[0, noise(x,y)].

```javascript
function draw(){
  ...
  heights[x][y] = map(noise(xoff,yoff), 0, 1, 0, sliderNoise.value());
  ...
}
```

The terrain is then drawn thanks to the heights defined in the *heights* array. 

```javascript
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
```

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


The direction of the movement is defined by the use of the flying attribute, and the order of calculation of the heights by rows or columns. When doing it by rows, we get a frontwards or backwards movement, and when doing it by columns, we get a right or left movement.

The controlling of the direction is made possible thanks to the use of four buttons (in arrow shapes). When clicked on, they act on a general attribute named direction,which defines the sense of movement thanks to a simple string taking four different values : *up, down, left, right*.

```javascript
let btnUp;
let btnDown;
let btnLeft;
let btnRight;

function initButtons(){
  ...  
  btnUp = createImg("./../arrowUp.png");
  btnUp.size(25, 30);
  btnUp.position(width - 50, 70-20);
  btnUp.mousePressed(directionUp);
  
  btnDown = createImg("./../arrowDown.png");
  btnDown.size(25, 30);
  btnDown.position(width - 50, 70+15);
  btnDown.mousePressed(directionDown);
  
  btnLeft = createImg("./../arrowLeft.png");
  btnLeft.size(30, 25);
  btnLeft.position(width - 50 - 20, 70);
  btnLeft.mousePressed(directionLeft);
  
  btnRight = createImg("./../arrowRight.png");
  btnRight.size(30, 25);
  btnRight.position(width - 50 + 15, 70);
  btnRight.mousePressed(directionRight);
}

function setup(){
  ...
  initButtons();
  ...
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

When calculating the movement, the code checks the value of the attribute *direction*. If it is equal to "up" or "down", then the movement is calculated as following : 

```javascript
if(direction == "up" || direction == "down"){  
  if (direction == "up") {
    flying += sliderSpeed.value();
  }else{
    flying -= sliderSpeed.value();
  }

  let yoff = flying;
  for (let y = 0; y < row; y++) {   // calculate the heights by rows
    let xoff = 0;
    for (let x = 0; x < col; x++) {
      heights[x][y] = map(noise(xoff,yoff), 0, 1, 0, sliderNoise.value());
      xoff += 0.2;
    }
    yoff += 0.2;
  }
}
```

Whereas if the attribute *direction* is equal to "left" or "right", the heights are calculated as following :
```javascript
else {
  if (direction == "right") {
    flying -= sliderSpeed.value();
  }else{
    flying += sliderSpeed.value();
  }

  let xoff = flying;
  for (let x = 0; x < col; x++) {   // calculate the heights by columns
    let yoff = 0;   
    for (let y = 0; y < row; y++) {
      heights[x][y] = map(noise(xoff,yoff), 0, 1, 0, sliderNoise.value());
      yoff += 0.2;
    }
    xoff += 0.2;
  }
}
```

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

### Visualization of the lattice

In order to be able to see a concrete schematic of the terrain, facilitate the programmers' work by lowering the computer's calculation time, and perhaps change some of the points' heights in other use cases, an important feature is to control the vizualisation of the grid of points.

A simple way to do that is by using a checkbox, that calls a method *checkedStroke()* every time that it is clicked on. *checkedStroke* changes the value of the general attribute *lines* to *true* or *false* every time we want to see the grid shown or not.

```javascript
function checkedStroke(){
  if (this.checked()) {
    lines = true;
  } else {
    lines = false;
  }
}
```

Then, in the function draw (called at each frame), when drawing the triangles forming the terrain, an if loop controls the presence or not of contours in the drawing, by checking the value of the general attribute *lines*.
```javascript
if(lines == true){
  stroke(255);  //white stroke
}else{
  noStroke();    //no stroke
}
```

### Color control

To adapt the terrain to the generators' wishes, an interesting feature is the control of the terrains' color. To do so, the choice was made to be able to control three colours : the high altitude one, the medium altitude one and the low altitude one.
These colors are defined thanks to the following general attributes :

```javascript
let topcol;
let midcol;
let botcol;
```

They are changed by the user thanks to color pickers. When he clicks on a validating button, the changes are made effective. The color pickers and the button are initialized as following :

```javascript
let btnValidate;

function initButtons(){
  ...
  btnValidate = createImg("./../check_1.png");
  btnValidate.size(30, 30);
  btnValidate.position(80, 530);
  btnValidate.mousePressed(changeColor);
  ...
}

function setup(){
  ...
  initButtons();
  color_picker_bot = createColorPicker("blue");
  color_picker_mid = createColorPicker("green");
  color_picker_top = createColorPicker("white");
  color_picker_top.position(10, 500);
  color_picker_mid.position(10, 530);
  color_picker_bot.position(10, 560);
  ...
}
```

With those colors defined, the aim is to generate a range of colors as wide as the height of the mountains. That way, when generating the surface of the terrain, we can assign a color corresponding to the height of the generated point.

This range of color is saved in an array called *array_cols*. It has a length equal to the maximum height of the mountains, so that every of its index correspond to an altitude between 0 and maxheight. A cell of the array contains a color object. 

To make the model more realistic, we want to have a fade between the defined colors. It can be done easily with the p5 mathod *lerpColor(firstColor, secondColor, fraction)* in which the fraction corresponds to the closeness to the second color (0 being the first color, 1 being the second color). The choice was made to start the model with a scale of black and white to easy the reading of the canvas.

It is then initalized as following :

```javascript
function setup(){
  ...
  for (let i=0; i<int(maxheight/2); i++){
    array_cols.push(lerpColor(botcol, midcol, i/(int(maxheight/2))));
  }
  for (let j=int(maxheight/2); j<maxheight; j++){
    array_cols.push(lerpColor(midcol, topcol, j/(int(maxheight/2))));
  }
  ...
} 
```

When the user clicks on the validate button, he launches the function *changeColor()*, that retrieves the colors defined in the color pickers, assign them to the general color attributes, and then calculates the interpolation between those colors thanks to the *interpolate()* function.

```javascript
function changeColor(){
  topcol = color_picker_top.color();
  midcol = color_picker_mid.color();
  botcol = color_picker_bot.color();
  interpolate();
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
```

Finally, the colors are attributed to the model in the draw function, when drawing the triangle shapes. By recovering the height of a point, casting it to an int and searching for the color corresponding to that height in *array_cols*, a fade of colors is progressively drawn.

```javascript
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
```

## Conclusion

This work lays the foundations of an application that could be used in the realization of a video game, an anime, or visual effects of a movie. However, it still contains some problems, and could be improved. For example, it sometimes lags, due to the large quantity of calculations done. It also has a problem regarding the constance of the top color, which is not perfect.

## Future work

A necessary work is to correct the little bugs present in the code : moving colors depending on the speed and lagging issues.
Another interesting feature would be to control the number of altitude ranges corresponding to colors, and their expanse. By doing that, the user would have a much wider range of possibilites to generate different terrains.
The last important thing to work on is the optimization of the code. Right now, many calculations could be optimized so that the terrain generation wouldn't use too many resources.

# Resources

**Coding Challenge 11: 3D Terrain Generation with Perlin Noise in Processing**, The Coding Train, https://www.youtube.com/watch?v=IKB1hWWedMk

**createColorPicker()**, p5 Documentation, https://p5js.org/es/reference/#/p5/createColorPicker 

**createButton()**, p5 Documentation, https://p5js.org/es/reference/#/p5/createButton

**createSlider()**, p5 Documentation, https://p5js.org/es/reference/#/p5/createSlider

**Perlin noise**, Wikipedia, https://en.wikipedia.org/wiki/Perlin_noise 

**Perlin noise**, Khan Academy, https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-noise/a/perlin-noise

