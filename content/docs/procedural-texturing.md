# **Procedural texturing**

Procedural texturing is a technique used in computer graphics to generate textures algorithmically, rather than relying on pre-made image textures. It involves using mathematical functions, noise algorithms, and procedural rules to create textures with intricate patterns, details, and variations. By defining rules and parameters, procedural texturing allows for the generation of endless variations of textures with high resolution and seamless tiling. This approach offers flexibility, scalability, and efficiency, as the textures can be generated in real-time and adapt to different resolutions and shapes. Procedural texturing is widely used in various applications, including video games, virtual reality, visual effects, and computer-generated imagery, to create realistic, immersive, and visually compelling virtual environments.

The complete exposition will begin by an in-depth explanation about the first procedural texturing exercise that was elaborated by the team. It will allow us understand better two more exercises which are more complicated which will be presented at the end of the present article. So, the first procedural texturing exercise looks like:


**First Exercise:**

<iframe height="470" width="100%" src="https://editor.p5js.org/bchaparro/full/fv64R1A6n"></iframe>

In order to develop this animation is needed three files:

## **File #1: .frag file**

A .frag file is a shader file used in computer graphics. It contains code for the fragment shader, which determines the color and other properties of pixels on the screen. It allows for precise control over pixel-level operations, enabling the creation of stunning visual effects and realistic rendering in graphics applications and games.

This code is a computer program that creates a visual pattern called a shader. A shader is like a special effect that is applied to a digital image or animation:

```cpp
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),_radius+(_radius*0.01),dot(l,l)*4.0);
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
```cpp
#ifdef GL_ES
precision mediump float;
#endif
```

The #ifdef and #endif lines are preprocessor directives that are typically used to conditionally include or exclude code depending on certain conditions. In this case, it's checking if GL_ES is defined and setting the precision for floating-point calculations.

```cpp
uniform vec2 resolution;
uniform float time;
```

These lines declare two variables, resolution and time, as uniform. In computer graphics, uniform variables are used to pass values from the application to the shader. resolution represents the resolution of the screen or output window, and time represents the current time in seconds.

```cpp
float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),_radius+(_radius*0.01),dot(l,l)*4.0);
}
```

This is a function definition called circle. It takes in two parameters: _st, which is a 2D vector representing a point, and _radius, which is a floating-point value representing the radius of a circle. The function calculates the distance between the point and the center of the circle and returns a value between 0 and 1, where 1 represents points inside the circle and 0 represents points outside the circle. It uses the smoothstep function to create a smooth transition between the inside and outside of the circle.

```cpp
void main() {
	vec2 st = gl_FragCoord.xy/resolution;
    vec3 color = vec3(0.0);

    st *= 3.0;
    st = fract(st); 

    color = vec3(st,0.0);

	gl_FragColor = vec4(color,1.0);
}
```

This is the main function of the shader. It's called for each pixel on the screen.

- First, it calculates the normalized coordinates of the current pixel by dividing gl_FragCoord.xy (the pixel's position) by resolution (the screen resolution).
- Then, it initializes a variable color as a 3D vector with all components set to 0.0.
- Next, it scales up the st coordinates by a factor of 3.0 and wraps them around the range 0-1 using the fract function. This creates a repeating pattern of 9 spaces within the 0-1 range.
- It assigns the st coordinates to the color variable, which gives each pixel a different color based on its position in the 0-1 space.
- Finally, it sets the output color of the pixel (gl_FragColor) to the color value, with an alpha value of 1.0 (fully opaque).

To sum up, this code defines a shader that creates a colorful pattern by dividing the screen into nine spaces and assigning different colors to each space based on its position. The pattern changes over time as the time variable is updated.

## **File#2: .vert file**

A .vert file is a shader file used in computer graphics. It contains code for the vertex shader, which transforms individual vertices of 3D objects. It customizes geometry, lighting, and appearance, shaping visually stunning graphics in applications and games.

This vertex shader takes the input vertex positions, transforms them by scaling and shifting to normalize the coordinates, and assigns the final position to gl_Position. This prepares the vertices for further processing in the subsequent stages of the graphics pipeline.

The complete code looks:

```cpp
attribute vec3 aPosition;

void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}
```

The detailed explanation begins with:

```cpp
attribute vec3 aPosition;
```

This line declares an attribute variable named aPosition, which represents the vertex positions of the object. It is of type vec3, indicating that it consists of three components (x, y, and z).

```cpp
void main() {
```

This is the entry point of the vertex shader, where the main function starts.

```cpp
vec4 positionVec4 = vec4(aPosition, 1.0);
```

This line creates a vec4 variable called positionVec4 and assigns the aPosition values to its x, y, and z components. The w component is set to 1.0, which is often used for position calculations in homogeneous coordinates.

```cpp
positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
```

Here, the x and y components of positionVec4 are transformed. They are multiplied by 2.0 to scale the values, and then 1.0 is subtracted to shift them to the range of -1.0 to 1.0. This is a common normalization step to map vertex positions to screen coordinates.


```cpp
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

First, we have some variable declarations. In this code, we have variables called theShader, shaderTexture, theta, x, y, outsideRadius, and insideRadius. These variables will be used to store different kinds of information that the code needs.

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

In the realm of WebGL shaders, there is exciting potential for future work and advancements. One area of focus could be on enhancing shader performance through optimization techniques, allowing for even more complex and realistic visual effects in real-time applications. Additionally, exploring new shader languages or extending existing ones could enable developers to express more advanced algorithms and techniques. Another avenue of exploration involves leveraging machine learning and artificial intelligence to generate and manipulate shaders automatically, opening up possibilities for procedural content generation and adaptive rendering. The future of WebGL shaders holds immense potential for pushing the boundaries of web-based visual experiences.
