# Color mapping applications

{{< hint info >}}
**Exercise**  
Implement blending modes in p5. Take this reference as starting point.
{{< /hint >}}

## Introduction

A way to define objects in a visual computing language is using shaders. Those are programs that run on the computer GPU, and generate the screen visual output. They can be used to transform the appearance of a texture, color, ... applied to an object. In that sense, when wanting to color an object, we should be able to do "operations" on it.

For example, it could be interesting for various applications, as imagining the painting color on a wall, to be able to mix various colors and obtain the resulting one.

## Theory of the shaders

The shaders are external programs. In order to implement a proper shadering process, we need two types of shaders : vertex shaders and fragment shaders.

The following sequence diagram, extracted from the course's site, shows how data flows among the main shader programming stages.

<img src="./../shaderFlow.PNG" style="display:block;float:none;align:center">

### Vertex shader

The vertex shader is the stage in the rendering pipeline that handles the processing of individual vertices. It manipulate the coordinates in a 3D space, and is called every time there is a vertex.

Its objective is to set up the gl_Position variable (a built-in GLSL variable, that is used to store the current vertex position).

### Fragment shader 

The fragment shader is the stage in the rendering pipeline that processes a Fragment generated by the Rasterization, into a set of colors and a single depth value. It defines the RGBA value for each pixel being processed, and is called once per pixel.

Its objective is to set up the gl_FragColor variable (a built-in variable, that contains the RGBA color).


## Implementation of the solution

### Application

<iframe height="470" width="420" src="https://editor.p5js.org/Fafnir/full/NFPfe-T-k"></iframe>


### Code

```javascript
let shaderBrightness;
let sliderBrightness;

let shaderLightest;
let sliderLightest;

let shaderDarkest;
let sliderDarkest;

let shaderNoProperty;
let shaderAdd;
let shaderSubtract;

let buttonNoFeature;
let buttonBrightness;
let buttonDarkest;
let buttonLightest;
let buttonAdd;
let buttonSubtract;


let blendModel = "Noproperty";


function preload(){
  shaderBrightness = loadShader('shaders/vertex_shader.vert','shaders/brightness.frag');
  shaderLightest = loadShader('shaders/vertex_shader.vert','shaders/lightest.frag');
  shaderNoProperty = loadShader('shaders/vertex_shader.vert','shaders/noproperty.frag');
  shaderDarkest = loadShader('shaders/vertex_shader.vert','shaders/darkest.frag');
  shaderAdd = loadShader('shaders/vertex_shader.vert','shaders/add.frag');
  shaderSubtract = loadShader('shaders/vertex_shader.vert','shaders/subtract.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  color_picker_left = createColorPicker("orange");
  color_picker_right = createColorPicker("pink");
  color_picker_left.position(10, 10);
  color_picker_right.position(width-180, 10);
  
  buttonNoFeature = createButton('No property');
  buttonNoFeature.mousePressed(setNoProperty);
  buttonBrightness = createButton('Brightness');
  buttonBrightness.mousePressed(setBrightness);
  buttonDarkest = createButton('Darkest');
  buttonDarkest.mousePressed(setDarkest);
  buttonLightest = createButton('Lightest');
  buttonLightest.mousePressed(setLightest);
  buttonAdd = createButton('Add');
  buttonAdd.mousePressed(setAdd);
  buttonSubtract = createButton('Subtract');
  buttonSubtract.mousePressed(setSubtract);

}


function draw() {
  rectMode(CENTER);
  background(220);
  resetShader();
  fill(color_picker_left.color());
  square(-(width/4), -(height/4), 150);
  fill(color_picker_right.color());
  square((width/4), -(height/4), 150);
  square(0, (height/4), 150);  //shader applies on the "positive" part of the canvas : think it's because square isn't a webgl form

  defineShader(); 
  
  push();
  quad(-150/width,-350/height,150/width,-350/height,150/width,((height/4)-150)/height,-150/width,((height/4)-150)/height);
  pop();
}

//USEFUL METHODS

function defineShader(){
  if(blendModel == 'Noproperty'){
    shaderNoProperty.setUniform('uMaterial1',     color_picker_left.color()._array);
    shaderNoProperty.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderNoProperty);
    
  }else if(blendModel == 'Brightness'){
    shaderBrightness.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderBrightness.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderBrightness.setUniform('brightness', sliderBrightness.value());
    shader(shaderBrightness);
    
  }else if(blendModel == 'Lightest'){
    shaderLightest.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderLightest.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderLightest.setUniform('lightness', sliderLightest.value());
    shader(shaderLightest);
    
  }else if(blendModel == 'Darkest'){
    shaderDarkest.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderDarkest.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderDarkest.setUniform('darkness', sliderDarkest.value());
    shader(shaderDarkest);
    
  }else if(blendModel == 'Add'){
    shaderAdd.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderAdd.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderAdd);
    
  }else if(blendModel == 'Subtract'){
    shaderSubtract.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderSubtract.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderSubtract);
  }
}

function clearSlider(){
  if(blendModel == "Brightness"){
    sliderBrightness.remove();
  }else if (blendModel == "Lightest"){
    sliderLightest.remove();
  }else if (blendModel == 'Darkest'){
    sliderDarkest.remove();
  }
}

//REACTING ON BUTTON CLICKS

function setNoProperty(){
  clearSlider();
  text('Blend Mode : Default', 10, 200);
  blendModel = "Noproperty";
}

function setBrightness(){
  clearSlider();
  text('Blend Mode : Brightness', 10, 30);
  blendModel = "Brightness";
  sliderBrightness = createSlider(0, 1, 0.5, 0.01);
  sliderBrightness.position(150, 200-sliderBrightness.height/2);
  sliderBrightness.style('width', '100px');
}

function setLightest(){
  clearSlider();
  text('Blend Mode : Lightest', 10, 30);
  blendModel = "Lightest";
  sliderLightest = createSlider(0, 1, 0.5, 0.01);
  sliderLightest.position(150, 200-sliderLightest.height/2);
  sliderLightest.style('width', '100px');
}

function setDarkest(){
  clearSlider();
  text('Blend Mode : Darkest', 10, 30);
  blendModel = "Darkest";
  sliderDarkest = createSlider(0, 1, 0.5, 0.01);
  sliderDarkest.position(150, 200-sliderDarkest.height/2);
  sliderDarkest.style('width', '100px');
}

function setAdd(){
  clearSlider();
  text('Blend Mode : Add', 10, 30);
  blendModel = "Add";
}

function setSubtract(){
  clearSlider();
  text('Blend Mode : Subtract', 10, 30);
  blendModel = "Subtract";
}
```

## Explications

### General functionning

In the main javascript file, the functionning of the application is pretty simple.

We will have an application with various windows, each one corresponding to one blending mode, and being accessible thanks to a button designing that mode.

```javascript
let buttonNoFeature;
let buttonBrightness;
let buttonDarkest;
let buttonLightest;
let buttonAdd;
let buttonSubtract;
```

We also define a global attribute named, blendModel, and initialized to a no property mode. This attribute will allow us to manage the selection of the used shader.

```javascript
let blendModel = "Noproperty";  
```

To select the two colors used, we define two color pickers. The user can interact with those objects, in order to choose colors thanks to the mouse or an hexadecimal code.

```javascript
function setup() {
  createCanvas(400, 400, WEBGL);
  color_picker_left = createColorPicker("orange");
  color_picker_right = createColorPicker("pink");
  color_picker_left.position(10, 10);
  color_picker_right.position(width-180, 10);
  
  ...
}
```

In the draw method, we draw the interface of the application. This will be defining two squares to be able to better see the selected colors, and a third one filled with the color resulting of the blending done to those two colors. That third square color is defined thanks to the function defineShader(), which we will study later on.

```javascript
function draw() {
  rectMode(CENTER);
  background(220);
  resetShader();    // reset the shading mode to the default WEBGL one, to be able to draw correctly the squares
  
  // first square, first color
  fill(color_picker_left.color());
  square(-(width/4), -(height/4), 150);

  // second square, second color
  fill(color_picker_right.color());
  square((width/4), -(height/4), 150);

  // third square outline
  square(0, (height/4), 150);  

  // define the shader used in the last square
  defineShader(); 
  
  // create the geometric shape
  push();
  quad(-150/width,-350/height,150/width,-350/height,150/width,((height/4)-150)/height,-150/width,((height/4)-150)/height);
  pop();
}
```

The defineShader function is the most important. It checks the value of the blendModel attribute listed above, and depending on its value, applies a certain shader, by setting its uniforms to the corresponding values.

```javascript
function defineShader(){
  if(blendModel == 'Noproperty'){
    shaderNoProperty.setUniform('uMaterial1',     color_picker_left.color()._array);
    shaderNoProperty.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderNoProperty);
    
  }else if(blendModel == 'Brightness'){
    shaderBrightness.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderBrightness.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderBrightness.setUniform('brightness', sliderBrightness.value());
    shader(shaderBrightness);
    
  }else if(blendModel == 'Lightest'){
    shaderLightest.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderLightest.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderLightest.setUniform('lightness', sliderLightest.value());
    shader(shaderLightest);
    
  }else if(blendModel == 'Darkest'){
    shaderDarkest.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderDarkest.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderDarkest.setUniform('darkness', sliderDarkest.value());
    shader(shaderDarkest);
    
  }else if(blendModel == 'Add'){
    shaderAdd.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderAdd.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderAdd);
    
  }else if(blendModel == 'Subtract'){
    shaderSubtract.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderSubtract.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderSubtract);
  }
}
```

For the cases in which the shaders use a slider to define a value (or brightness, darkness, lightness...), we also define a clearSlider function, that allows us to remove the former sliders of the application.

```javascript
function clearSlider(){
  if(blendModel == "Brightness"){
    sliderBrightness.remove();
  }else if (blendModel == "Lightest"){
    sliderLightest.remove();
  }else if (blendModel == 'Darkest'){
    sliderDarkest.remove();
  }
}
```


### Vertex shader used

For this application, we will use the same vertex shader for every mode of coloring. It is the following one : 

```javascript
precision mediump float;
attribute vec3 aPosition;
void main() {
  gl_Position = vec4(aPosition, 1.0);
}
```

It will send the position information to the different fragment shaders that will be used.

### Blending models implementation 

{{< tabs "blendingmodels" >}}

{{< tab "No proprety" >}}
### No property mode

In the case where we are applying the no property mode, we want to apply a simple blending of the colors. The fragment shader that we use is then the following one :

```javascript
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
vec4 finalCol;

void main() {
  gl_FragColor = uMaterial1 * uMaterial2;
  finalCol = gl_FragColor;
}
```

We load it in the main program :

```javascript
let shaderNoProperty;

function preload(){
    shaderNoProperty = loadShader('shaders/vertex_shader.vert','shaders/noproperty.frag');
}
```

The button that allows the user to define this blending mode is defined as following. It is to note that on the execution of the onClick method for this button, we erase every existing slider.

```javascript
let buttonNoFeature;

function setup(){
    ...
    buttonNoFeature = createButton('No property');
    buttonNoFeature.mousePressed(setNoProperty);
    ...
}

...

function setNoProperty(){
  clearSlider();
  text('Blend Mode : Default', 10, 200);
  blendModel = "Noproperty";
}
```

Then, in the function defineShader(), called at every frame, since the current blending mode is defined as "Noproperty", we define the uniforms of the no properties shader, and define it as the current shader mode.

```javascript
function defineShader(){
  if(blendModel == 'Noproperty'){
    shaderNoProperty.setUniform('uMaterial1',     color_picker_left.color()._array);
    shaderNoProperty.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderNoProperty);
  }
  ...
}
```

{{< /tab >}}

{{< tab "Brightness" >}}
### Brightness mode

The principle of the brightness mode is to mmix the two materials together by multiplying them, and then to apply to the resultant a brightness value. It allows us to change the appearance of the resultant material.

The fragment shader is the following one :

```javascript
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  vec4 material = uMaterial1 * uMaterial2;
  // brightness affects only rgb but no the alpha channel
  gl_FragColor = vec4(brightness * material.rgb, material.a);
}
```

In the main program, we load the shader :
```javascript
let shaderBrightness;
...
function preload(){
  shaderBrightness = loadShader('shaders/vertex_shader.vert','shaders/brightness.frag');
  ...
}
```

A choice was made for the user to be able to define the brightness value. We do that thanks to a slider. That slider will only be visible when activating the brightness mode, so we only initialize it in the "onClick" function of the button corresponding to this mode. At the beginning of that same function, we also erase every other slider existing.

```javascript
let sliderBrightness;
...
function setup(){
    buttonBrightness = createButton('Brightness');
    buttonBrightness.mousePressed(setBrightness);
    ...
}

...

function setBrightness(){
  clearSlider();
  text('Blend Mode : Brightness', 10, 30);
  blendModel = "Brightness";
  sliderBrightness = createSlider(0, 1, 0.5, 0.01);
  sliderBrightness.position(150, 200-sliderBrightness.height/2);
  sliderBrightness.style('width', '100px');
}

```

Then, in the function defineShader(), called at every frame, since the current blending mode is defined as "Brightness", the following code runs :

```javascript
function defineShader(){
    ...
    else if(blendModel == 'Brightness'){
    shaderBrightness.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderBrightness.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderBrightness.setUniform('brightness', sliderBrightness.value());
    shader(shaderBrightness);
    }
    ... 
}
```

It allows us to define the current shader to the brightness one, and initializes its uniforms.

{{< /tab >}}

{{< tab "Darkest" >}}
### Darkest mode
In that mode, we select the darkest color of both. Indeed, the resulting pixels C are obtained thanks to the operation C = min(A*factor, B), with A being the source pixels and B the pixels already present.

The fragment shader is the following one : 

```javascript
precision mediump float;

uniform float darkness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

vec4 material;

void main() {
  if(uMaterial1.rgb[0]*darkness+uMaterial1.rgb[1]*darkness+uMaterial1.rgb[2]*darkness > uMaterial2.rgb[0]*darkness+uMaterial2.rgb[1]*darkness+uMaterial2.rgb[2]*darkness){
    material = uMaterial2;
  }else{
    material = uMaterial1;
  }
  
  // brightness affects only rgb but no the alpha channel
  gl_FragColor = vec4(darkness * material.rgb, material.a);
}
```

Since this blending mode also uses a slider to define the dark degree of the color, its functioning is the same as for the brightness mode. We then have this code in the main program :

```javascript
let shaderDarkest;
let sliderDarkest;

let buttonDarkest;

let blendModel = "Noproperty";

function preload(){
  ...
  shaderDarkest = loadShader('shaders/vertex_shader.vert','shaders/darkest.frag');
  ...
}

function setup() {
  ...
  buttonDarkest = createButton('Darkest');
  buttonDarkest.mousePressed(setDarkest);
  ...
}

function defineShader(){
  ...
  else if(blendModel == 'Darkest'){
    shaderDarkest.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderDarkest.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderDarkest.setUniform('darkness', sliderDarkest.value());
    shader(shaderDarkest);
  }...
}

function setDarkest(){
  clearSlider();
  text('Blend Mode : Darkest', 10, 30);
  blendModel = "Darkest";
  sliderDarkest = createSlider(0, 1, 0.5, 0.01);
  sliderDarkest.position(150, 200-sliderDarkest.height/2);
  sliderDarkest.style('width', '100px');
}
```


{{< /tab >}}

{{< tab "Lightest" >}}
### Lightest mode
The lightest mode allows us to get the lightest color of both. It does the operation C = max(A*factor, B), with A being the source pixels and B the pixels already present, to obtain C, the resulting pixels. In this mode, we are able to select the percentage of lightness in the resulting color, thanks to a slider.

The fragment shader is the following one :

```javascript
precision mediump float;

uniform float lightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

vec4 material;

void main() {
  if(uMaterial1.rgb[0]*lightness+uMaterial1.rgb[1]*lightness+uMaterial1.rgb[2]*lightness > uMaterial2.rgb[0]*lightness+uMaterial2.rgb[1]*lightness+uMaterial2.rgb[2]*lightness){
    material = uMaterial1;
  }else{
    material = uMaterial2;
  }
  
  gl_FragColor = vec4(lightness * material.rgb, material.a);
}
```

Having a functioning being exactly the same as the darkest mode one, we will not explain it, but here is the code to make it work.

```javascript
let shaderLightest;
let sliderLightest;

let buttonLightest;

let blendModel = "Noproperty";


function preload(){
  shaderLightest = loadShader('shaders/vertex_shader.vert','shaders/lightest.frag');
  ...
}

function setup() {
  ...
  buttonLightest = createButton('Lightest');
  buttonLightest.mousePressed(setLightest);
  ...
}

...

function defineShader(){
  ...
  else if(blendModel == 'Lightest'){
    shaderLightest.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderLightest.setUniform('uMaterial2', color_picker_right.color()._array);
    shaderLightest.setUniform('lightness', sliderLightest.value());
    shader(shaderLightest); 
  }...
}

...

function setLightest(){
  clearSlider();
  text('Blend Mode : Lightest', 10, 30);
  blendModel = "Lightest";
  sliderLightest = createSlider(0, 1, 0.5, 0.01);
  sliderLightest.position(150, 200-sliderLightest.height/2);
  sliderLightest.style('width', '100px');
}
```

{{< /tab >}}

{{< tab "Add" >}}
### Add mode

The add mode allows us to obtain the color resulting of the addition of both colors (C = A + B).

The shader used is the following one : 

```javascript
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = uMaterial1 + uMaterial2;
}
```

It is defined as following in the main javascript file :

```javascript
let shaderAdd;
let shaderSubtract;

function preload(){
  ...
  shaderAdd = loadShader('shaders/vertex_shader.vert','shaders/add.frag');
  ...
}
```

The user can select this mode thanks to a click on a button.

```javascript
let buttonAdd;
let blendModel = "Noproperty";

...

function setup() {
  ...
  buttonAdd = createButton('Add');
  buttonAdd.mousePressed(setAdd);
  ...
}

...

function setAdd(){
  clearSlider();
  text('Blend Mode : Add', 10, 30);
  blendModel = "Add";
}
```

Then, in the function defineShader(), called at every frame, since the current blending mode is defined as "Add", the following code runs :

```javascript
function defineShader(){
    ...
    else if(blendModel == 'Add'){
        shaderAdd.setUniform('uMaterial1', color_picker_left.color()._array);
        shaderAdd.setUniform('uMaterial2', color_picker_right.color()._array);
        shader(shaderAdd);
    }
    ... 
}
```

It allows us to define the current shader to the add one, and initializes its uniforms.

{{< /tab >}}

{{< tab "Subtract" >}}
### Subtract mode
The add mode allows us to obtain the color resulting of the remainder of colors A and B.

The shader used is the following one : 
```javascript
precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;


void main() {
  gl_FragColor = uMaterial1 - (uMaterial2 * floor(uMaterial1/uMaterial2));
}
```

It's functioning is exactly the same as for the add mode described before.

```javascript
let shaderSubtract;
let buttonSubtract;

let blendModel = "Noproperty";


function preload(){
  ...
  shaderSubtract = loadShader('shaders/vertex_shader.vert','shaders/subtract.frag');
}

function setup() {
  ...
  buttonSubtract = createButton('Subtract');
  buttonSubtract.mousePressed(setSubtract);
}

...

function defineShader(){
  ...
  else if(blendModel == 'Subtract'){
    shaderSubtract.setUniform('uMaterial1', color_picker_left.color()._array);
    shaderSubtract.setUniform('uMaterial2', color_picker_right.color()._array);
    shader(shaderSubtract);
  }
}

...

function setSubtract(){
  clearSlider();
  text('Blend Mode : Subtract', 10, 30);
  blendModel = "Subtract";
}
```

{{< /tab >}}
{{< /tabs >}}

## Conclusion

This exercise was interesting to implement, because it allowed us to understand in a better way the functioning of GLSL shaders. The "basic" knowledge learned thanks to this exercise allowed us to face the more challenging ones with solid bases.

## Future Work

For this work, we were able to imagine various improvements.

A first improvement would be to obtain the hexadecimal code of the resulting color. However, this is currently not possible, because of the impossibility to pass a textual information from a shader file to the javascript file (it is only possible the other way around, using uniforms).

A second improvement would be the possibility to do operations of blending on more colors. It could bring more possibilities of combinations to the users of the application. Another way of increasing the number of possibilities for users would be to let them choose the quantity of each colour used in the mix (only in some cases, such as the brightness operation for example). That way, they could plan the quantities needed for eventual real life applications.

A last improvement would be to make the application more user-friendly, by showing it more entertaining. For example, it could be possible to place the tool in a house that we would want to paint.

## References

**blendMode documentation**, p5 Documentation, https://p5js.org/reference/#/p5/blendMode

**Class support on shaders**, github, https://visualcomputing.github.io/docs/shaders/

**GLSL shaders**, Mozilla documentation, https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders

**Fragment shader**, Khronos group on OpenGL, https://www.khronos.org/opengl/wiki/Fragment_Shader

**Vertex shader**, Khronos group on OpenGL, https://www.khronos.org/opengl/wiki/Vertex_Shader

