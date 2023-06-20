# **Procedural texturing**

Procedural texturing is a technique used in computer graphics to generate textures algorithmically, rather than relying on pre-made image textures. It involves using mathematical functions, noise algorithms, and procedural rules to create textures with intricate patterns, details, and variations. By defining rules and parameters, procedural texturing allows for the generation of endless variations of textures with high resolution and seamless tiling. This approach offers flexibility, scalability, and efficiency, as the textures can be generated in real-time and adapt to different resolutions and shapes. Procedural texturing is widely used in various applications, including video games, virtual reality, visual effects, and computer-generated imagery, to create realistic, immersive, and visually compelling virtual environments.

The complete exposition will begin by an in-depth explanation about the first procedural texturing exercise that was elaborated by the team. It will allow us understand better two more exercises which are more complicated. So, the first procedural texturing exercise looks like:


**First Exercise:**

<iframe height="470" width="100%" src="https://editor.p5js.org/bchaparro/full/fv64R1A6n"></iframe>

In order to develop this animation it is needed three files:

## **File #1: .frag file**

A .frag file is a shader file used in computer graphics. It contains code for the fragment shader, which determines the color and other properties of pixels on the screen. It allows for precise control over pixel-level operations, enabling the creation of stunning visual effects and realistic rendering in graphics applications and games.

This code is a computer program that creates a visual pattern called a shader. A shader is like a special effect that is applied to a digital image or animation:

```javascript
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

void main() {
	vec2 st = gl_FragCoord.xy/resolution;
    vec3 color = vec3(0.0);

    st *= 3.0;
    st = fract(st); 

    color = vec3(st,0.0);

	gl_FragColor = vec4(color,1.0);
}
```

Let's break down the code step by step:
```javascript
#ifdef GL_ES
precision mediump float;
#endif
```

These lines are what we call preprocessor directives. They are used to configure the code for a specific environment. In this case, it checks if we are using OpenGL ES (a graphics library) and sets the precision of floating-point numbers to medium.

```javascript
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
```

These lines declare some variables that the shader can use to interact with the outside world. u_resolution represents the resolution of the output image, u_mouse represents the position of the mouse (if available), and u_time represents the current time.

```javascript
vec2 tile(vec2 st, float zoom){
    st *= zoom;
    return fract(st);
}
```

This function takes a position (st) and a zoom level and creates a tiled pattern by multiplying the position by the zoom level and then taking the fractional part of it.

```javascript
float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 0.75;
    return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*3.14);
}
```

This function creates a circle shape. It takes a position (st) and a radius and calculates the distance from that position to the center. It then uses a smoothstep function to determine the opacity of the circle based on the distance.

```javascript
float circlePattern(vec2 st, float radius) {
    return  circle(st+vec2(0.,-.5), radius)+
            circle(st+vec2(0.,.5), radius)+
            circle(st+vec2(-.5,0.), radius)+
            circle(st+vec2(.5,0.), radius);
}
```

This function creates a pattern made up of multiple circles. It calls the circle function four times, each time with a slightly different position offset by 0.5 units in different directions. It then adds up the opacity values of the circles to create the final pattern.

```javascript
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 grid1 = tile(st,7.);
    grid1 = tile(st + vec2(cos(u_time),sin(u_time))*0.01,7.);
    color += mix(vec3(0.075,0.114,0.329),vec3(0.973,0.843,0.675),circlePattern(grid1,0.23)-circlePattern(grid1,0.01));

    vec2 grid2 = tile(st,3.);
    grid2 = tile(st + vec2(cos(u_time),sin(u_time))*0.02 ,3.);
    color = mix(color, vec3(0.761,0.247,0.102), circlePattern(grid2,0.2)) - circlePattern(grid2,0.05),

    gl_FragColor = vec4(color,1.0);
}
```

This is the main part of the code, where the shader is constructed. The main function is the entry point of the shader.

- It starts by calculating the normalized screen coordinates (st) based on the current pixel's position (gl_FragCoord) and the resolution (u_resolution).
- It then adjusts the x-coordinate of st to account for the aspect ratio of the output image.
- A color variable is initialized to black (vec3(0.0)).
- The tile function is called twice to generate two different grid patterns (grid1 and grid2) using different zoom levels (7 and 3, respectively).
- The circlePattern function is used to create two different circle patterns using the generated grids and different radii.
- The resulting patterns are mixed with specific colors using the mix function and added to the color variable.
- Finally, the color value is assigned to gl_FragColor, which represents the color of the current pixel.

## **File#2: .vert file**

A .vert file is a shader file used in computer graphics. It contains code for the vertex shader, which transforms individual vertices of 3D objects. It customizes geometry, lighting, and appearance, shaping visually stunning graphics in applications and games.

This vertex shader takes the input vertex positions, transforms them by scaling and shifting to normalize the coordinates, and assigns the final position to gl_Position. This prepares the vertices for further processing in the subsequent stages of the graphics pipeline.

The complete code looks:

```javascript
attribute vec3 aPosition;

void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}
```

The detailed explanation begins with:

```javascript
attribute vec3 aPosition;
```

This line declares an attribute variable named aPosition, which represents the vertex positions of the object. It is of type vec3, indicating that it consists of three components (x, y, and z).

```javascript
void main() {
```

This is the entry point of the vertex shader, where the main function starts.

```javascript
vec4 positionVec4 = vec4(aPosition, 1.0);
```

This line creates a vec4 variable called positionVec4 and assigns the aPosition values to its x, y, and z components. The w component is set to 1.0, which is often used for position calculations in homogeneous coordinates.

```javascript
positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
```

Here, the x and y components of positionVec4 are transformed. They are multiplied by 2.0 to scale the values, and then 1.0 is subtracted to shift them to the range of -1.0 to 1.0. This is a common normalization step to map vertex positions to screen coordinates.


```javascript
gl_Position = positionVec4;
```

The final transformed position in positionVec4 is assigned to the built-in variable gl_Position. This variable represents the final position of the vertex on the screen.

## **File#3: .js file**

```javascript
let theShader;
let shaderTexture;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;


function preload(){
  theShader = loadShader('shader.vert','shader.frag');
}

function setup() {

  createCanvas(innerWidth, innerHeight, WEBGL);

  shaderTexture = createGraphics(710, 400, WEBGL);

  x = -50;
  y = 0;
}

function draw() {

  shaderTexture.shader(theShader);

  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("time", millis() / 1000.0);
  theShader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  shaderTexture.rect(0,0,width,height);

  background(255, 216, 233 );
  
  texture(shaderTexture);
  
  push();
  rotateZ(theta * mouseX * 0.0001);
  rotateX(theta * mouseX * 0.0001);
  rotateY(theta * mouseX * 0.0001);  
  theta += 0.05;
  ellipsoid(30*3, 40*3, 40*3);
  pop();
}
```

First, we have some variable declarations. Think of variables as containers that hold values. In this code, we have variables called theShader, shaderTexture, theta, x, y, outsideRadius, and insideRadius. These variables will be used to store different kinds of information that the code needs.

Next, we have a function called preload(). This function is used to load external resources before the program starts running. In this case, it's loading a shader file, which is a special type of program used for rendering graphics.

Moving on to the setup() function. This function is called once at the beginning of the program. It's used to initialize and set up things before the main part of the program starts running. Here, we're creating a canvas (a drawing area) that fills the entire browser window, using the createCanvas() function. We're also creating a graphics object called shaderTexture with a width of 710 pixels and a height of 400 pixels.

After that, we set the initial values of x and y variables to -50 and 0 respectively.

Now, let's look at the draw() function. This function is called repeatedly in a loop after the setup() function. It's where the main drawing and animation happens.

Inside the draw() function, we first tell the shaderTexture graphics object to use the theShader shader that we loaded earlier. This shader will be applied to the graphics object when we draw something on it.

Next, we set some uniform variables in the shader. Think of uniform variables as values that can be accessed by the shader program. Here, we're setting the resolution uniform to the width and height of the canvas, the time uniform to the current time in seconds, and the mouse uniform to the current mouse position.

Then, we draw a rectangle on the shaderTexture graphics object. This rectangle will be affected by the shader we set earlier.

After that, we set the background color of the canvas to a light pink color.

Next, we set the texture of the shapes we're going to draw to be the shaderTexture graphics object, so the shader effect will be applied to the shapes.

Now, we start a new drawing state using the push() function. This allows us to apply transformations (like rotation) to the shapes without affecting other shapes drawn after it.

We apply rotations to the shapes based on the theta variable and the position of the mouse. This creates an animated effect where the shapes rotate. The theta variable is incremented by 0.05 each time draw() is called, which makes the rotation change over time.

Finally, we draw an ellipsoid (a three-dimensional shape similar to a sphere, but stretched) with specific dimensions.

That's it! The code continuously repeats the draw() function, creating an animated and interactive visual effect.

## **More elaborated exercises about Procedural Texturing after previous detailed explanation:**

### **Second Exercise:**

<iframe height="490" width="100%" src="https://editor.p5js.org/bchaparro/full/sOBs9Z5aF"></iframe>

### **Third Exercise:**

<iframe height="470" width="100%" src="https://editor.p5js.org/bchaparro/full/a9utVqv-P"></iframe>

## **Conclusion:**

WebGL shaders are powerful tools for creating stunning visual effects and rendering realistic graphics in web applications. By leveraging the GPU's parallel processing capabilities, shaders allow developers to manipulate vertices and pixels at a granular level, resulting in impressive 3D graphics and visualizations. With vertex shaders, developers can transform and deform geometric shapes, while fragment shaders control the color and appearance of individual pixels. These shaders, combined with the WebGL rendering pipeline, enable real-time rendering and interactive experiences directly in the browser, opening up possibilities for immersive games, simulations, and data visualizations on the web. WebGL shaders empower developers to push the boundaries of web graphics and create visually captivating experiences for users.

## **Future work:**

In the realm of WebGL shaders, there is exciting potential for future work and advancements. One area of focus could be on enhancing shader performance through optimization techniques, allowing for even more complex and realistic visual effects in real-time applications. Additionally, exploring new shader languages or extending existing ones could enable developers to express more advanced algorithms and techniques. Another avenue of exploration involves leveraging machine learning and artificial intelligence to generate and manipulate shaders automatically, opening up possibilities for procedural content generation and adaptive rendering. Moreover, integrating ray tracing capabilities into WebGL shaders could bring more accurate lighting and reflections to web-based graphics. The future of WebGL shaders holds immense potential for pushing the boundaries of web-based visual experiences.
