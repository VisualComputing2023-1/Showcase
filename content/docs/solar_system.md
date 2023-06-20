# Solar system implementation

{{< hint info >}}
**Exercise**  
Implement a 3D modelisation of the Sun-Earth-Moon system.
{{< /hint >}}

## Introduction

The phenomenons occuring on our Earth (seasons, day/nights, tides, ...) are phenomenons caused by events occuring in the outer space, more specifically in the Sun-Earth-Moon system. In that sense, to understand them, we must study those external events. However, they can be pretty complex to accept, since they are occuring on a different scale. It is then interesting to build a 3D model of the Sun-Earth-Moon system, with teaching ends, to understand the events at a global scale.

In this exercise, we will then try to implement Earth's different movements around the Sun. 

{{< hint warning >}}
**Scaling changes**  
It is to note that the scales are not realistic. They have voluntarily been changed (size of the objects, distances, speeds), to be able to view better the model.
{{< /hint >}}

## Theoretical notions

As we want to build a model representing laws of physics, it is best to study the different theoretical notions before beginning to modelize the system.

### Earth's movements

The Earth, in the physical world, has four different movements : 
- rotation,
- translation, 
- precession, 
- nutation.

<img src="./../movements.jpg" width="60%" height="60%" style="display:block;float:none;align:center">

{{< tabs "movement" >}}
{{< tab "Rotation" >}}

It is a movement that the Earth does on itself. It rotates with respect to the Y axis, and that is the cause of the daily cycle. Indeed, when some place on the Earth's surface is facing the Sun, it is the day, and when it rotates until not facing the Sun, it comes at night. A full turn is made in 23 hours, 56 minutes and 4 seconds.

<img src="./../rotation.jpg" style="display:block;float:none;align:center">

{{< /tab >}}

{{< tab "Translation" >}}
The translating movement is done around the Sun, in an elliptic way. Combined with the inclination of the Earth, it is the cause of the seasons (the moment in which the Earth is closer to the Sun corresponds to the hotter seasons). A full revolution around the Sun is made in 365 days, 5 hours, 48 minutes and 45 seconds.

<img src="./../translation.jpg" style="display:block;float:none;align:center">
{{< /tab >}}

{{< tab "Precession" >}}
It corresponds to the gradual change our planet has in the orientation of its axis of rotation (that is here considered as the Y axis in the geocentric referential). This axis has currently an inclination of 23,43°. A complete turn turn in the precession axis takes about 25 700 years.

<img src="./../precession.jpg" style="display:block;float:none;align:center">
{{< /tab >}}

{{< tab "Nutation" >}}
This is a slight and irregular movement. It takes place on the axis of rotation of the Earth (Y axis). It is caused by the force exerted by Earth's gravity and the attraction between the planet, the Moon and the Sun.

<img src="./../nutation.jpg" style="display:block;float:none;align:center">
{{< /tab >}}
{{< /tabs >}}


In practical, Earth has an inclination of about 23.4°, which is the cause of the seasons. It is always inclined in the same way (in the heliocentric referential). However, in this model, we could not implement this constant inclination. It is because it would require us to apply a new movement to the Earth already inclined, that could compensate its precession.


### Moon's revolution around the Earth

The Moon effectuates a complete revolution around the Earth in 27.3 days. One particularity about it is that, from Earth, it seems like it doesn't rotate, because we always see the same side of the Moon. However, that is not true. It is only due to the fact that the Moon's rotation on itself (along its rotation axis) **compensates** its rotation around the Earth. The distance of the Moon to Earth varies with time : it goes from 356,500 km at the perigee to 406,700 km at apogee. 

## Implementation

### Application

<iframe height = "650" width = "610" src="https://editor.p5js.org/Fafnir/full/khR8vEz6g"></iframe>

### Code

```javascript
let textEarth;
let textMoon;
let textSun;
let textAxis;

let displayTraj;
let displayEarthAxis;

let displayEarthInfo;
let displayMoonInfo;
let displaySunInfo;

let earthRotationSpeed, moonRotationSpeed, sunRotationSpeed;
let earthRevolutionSpeed, moonRevolutionSpeed;

let sunRadius, earthRadius, moonRadius;

let easyCam;
let arialFont;

function preload(){
  textEarth = loadImage("assets/earth_text.jpg");
  textMoon = loadImage("assets/moon_text.jpg");
  textSun = loadImage("assets/sun_text.jpg");
  textAxis = loadImage("assets/red.png");
  
  arialFont = loadFont("assets/fonts/ArialTh.ttf");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textureMode(NORMAL);
  textFont(arialFont);
  
  displayTraj = createCheckbox("Show trajectories", true);
  displayTraj.position(10,10);
  displayTraj.changed(displayTrajEvent);
  displayTraj.style('color', 'grey');
  
  displayEarthAxis = createCheckbox("Show Earth axis", true);
  displayEarthAxis.position(10,30);
  displayEarthAxis.changed(displayEarthAxisEvent);
  displayEarthAxis.style('color', 'grey');
  
  displayEarthInfo = createCheckbox("Show Earth information", false);
  displayEarthInfo.position(10,60);
  displayEarthInfo.changed(displayEarthInfoEvent);
  displayEarthInfo.style('color', 'grey');
  
  displayMoonInfo = createCheckbox("Show Moon information", false);
  displayMoonInfo.position(10,80);
  displayMoonInfo.changed(displayMoonInfoEvent);
  displayMoonInfo.style('color', 'grey');
  
  displaySunInfo = createCheckbox("Show Sun information", false);
  displaySunInfo.position(10,100);
  displaySunInfo.changed(displaySunInfoEvent);
  displaySunInfo.style('color', 'grey');
  
  earthRotationSpeed = 0.03;
  moonRotationSpeed = 0.03;
  sunRotationSpeed = 0.04;
  
  earthRevolutionSpeed = 0.01;
  moonRevolutionSpeed = moonRotationSpeed;
  
  sunRadius = 100;
  earthRadius = 40;
  moonRadius = 10;
  
  easycam = createEasyCam();
}

function draw() {
  background(0,0,0,0);
  noStroke();
  
  displayInformation();
  
  drawSun();
  
  if (displayTraj.checked()){
    earthTrajectory();
  }
  
  push();
  rotateY(frameCount * earthRevolutionSpeed);
  translate(sunRadius+10,0,0);
  pointLight(255, 255, 255, 0, 30, 0);
  pointLight(255, 255, 255, 0, -30, 0);
  pointLight(255, 255, 255, 0, 0, -30);
  pointLight(255, 255, 255, 0, 0, 30);
  translate(200+earthRadius,0,0);
  
  push();
  rotateY(-frameCount * earthRevolutionSpeed);
  rotateX(0.4);
  push();
  
  drawEarth();
  
  if (displayEarthAxis.checked()){
    drawEarthAxis();
  }
  
  pop();
  pop();
  
  if (displayTraj.checked()){
    moonTrajectory();    
  }

  push();
  rotateY(frameCount * moonRevolutionSpeed);
  translate(moonRadius+30+earthRadius,0,0);
  push();
  rotateY(-frameCount * moonRevolutionSpeed);
  
  drawMoon();
  
  pop();
  pop();
  pop();
  
}

function drawSun(){
  push();
  rotateY(frameCount * sunRotationSpeed);
  texture(textSun);
  sphere(sunRadius);
  pop();
}


function drawEarth(){
  push();
  rotateY(frameCount * earthRotationSpeed);
  texture(textEarth);
  sphere(earthRadius);
  pop();
}


function drawEarthAxis(){
  push();
  texture(textAxis);
  cylinder(1, earthRadius*4);
  pop();
}

function drawMoon(){
  push();
  texture(textMoon);
  sphere(moonRadius);
  pop();
}

function earthTrajectory(){
  push();
  rotateX(PI/2);
  torus(sunRadius+earthRadius+210, 1, 50);
  pop();
}

function moonTrajectory(){
  push();
  emissiveMaterial(255,255,255);
  rotateX(PI/2);
  torus(moonRadius+30+earthRadius, 1, 50);
  pop();
}

function displayTrajEvent() {
  if (displayTraj.checked()) {
    console.log('Displaying trajectories');
  } else {
    console.log('Erasing trajectories');
  }
}

function displayEarthAxisEvent() {
  if (displayTraj.checked()) {
    console.log('Displaying Earth axis');
  } else {
    console.log('Erasing Earth axis');
  }
}

function displayEarthInfoEvent(){
  displaySunInfo.remove();
  displaySunInfo = createCheckbox("Show Sun information", false);
  displaySunInfo.position(10,100);
  displaySunInfo.changed(displaySunInfoEvent);
  displaySunInfo.style('color', 'grey');
  
  displayMoonInfo.remove();
  displayMoonInfo = createCheckbox("Show Moon information", false);
  displayMoonInfo.position(10,80);
  displayMoonInfo.changed(displayMoonInfoEvent);
  displayMoonInfo.style('color', 'grey');
  
}


function displaySunInfoEvent(){
  displayMoonInfo.remove();
  displayMoonInfo = createCheckbox("Show Moon information", false);
  displayMoonInfo.position(10,80);
  displayMoonInfo.changed(displayMoonInfoEvent);
  displayMoonInfo.style('color', 'grey');
  
  displayEarthInfo.remove();
  displayEarthInfo = createCheckbox("Show Earth information", false);
  displayEarthInfo.position(10,60);
  displayEarthInfo.changed(displayEarthInfoEvent);
  displayEarthInfo.style('color', 'grey');
  
}


function displayMoonInfoEvent(){
  displaySunInfo.remove();
  displaySunInfo = createCheckbox("Show Sun information", false);
  displaySunInfo.position(10,100);
  displaySunInfo.changed(displaySunInfoEvent);
  displaySunInfo.style('color', 'grey');
  
  displayEarthInfo.remove();
  displayEarthInfo = createCheckbox("Show Earth information", false);
  displayEarthInfo.position(10,60);
  displayEarthInfo.changed(displayEarthInfoEvent);
  displayEarthInfo.style('color', 'grey');
}

function displayInformation(){
  if(displayEarthInfo.checked()){
    earthInfo();
  }else if (displayMoonInfo.checked()){
    moonInfo();
  }else if (displaySunInfo.checked()){
    sunInfo();
  }
}

function moonInfo(){
  easycam.beginHUD();
  textSize(25);
  text('The Moon', 20, 450);
  textSize(14);
  text('Rotation speed : from 1,100 to 0,966 km/s', 20, 480);
  text('Radius : 1 737.4 km', 20, 500);
  text('Revolution period : 27.3217 days', 20, 520);
  text('Average distance to Earth : 150 million km', 20, 540);
  easycam.endHUD();
}

function earthInfo(){
  easycam.beginHUD();
  textSize(25);
  text('Earth', 20, 450);
  textSize(14);
  text('Rotation speed : 0,4 km/s', 20, 480);
  text('Radius : 6 371 km', 20, 500);
  text('Revolution speed : 30 km/s', 20, 520);
  text('Revolution period : 365 days, 5 h 48 min 45 s', 20, 540);
  easycam.endHUD();
}

function sunInfo(){
  easycam.beginHUD();
  textSize(25);
  text('The Sun', 20, 450);
  textSize(14);
  text('Rotation speed : 1,997 km/s', 20, 480);
  text('Radius : 696 340 km', 20, 500);
  text('Average distance to Earth : 150 million km', 20, 520);
  easycam.endHUD();
}
```

## Explication of the solution

### Declaration of attributes

For this exercise, we will need multiple attributes which will help us to define the physics model. In that sense, we define the radius and rotation speed of the different objects of our model. We also define a revolution speed for both the Earth object and the Moon one.

```javascript
let earthRotationSpeed, moonRotationSpeed, sunRotationSpeed;
let earthRevolutionSpeed, moonRevolutionSpeed;
let sunRadius, earthRadius, moonRadius;

function setup() {
  ...
  
  earthRotationSpeed = 0.02;
  moonRotationSpeed = 0.03;
  sunRotationSpeed = 0.004;
  
  earthRevolutionSpeed = 0.01;
  moonRevolutionSpeed = moonRotationSpeed;
  
  sunRadius = 100;
  earthRadius = 40;
  moonRadius = 10;
}
```

### Declaration of textures

For this model, we will use four different textures : for the Sun, Earth, the Moon, and the background.

The first three ones are defined in the javascript code, because they will be applied to unic objects.

```javascript
let textEarth;
let textMoon;
let textSun;

function preload(){
  textEarth = loadImage("assets/earth_text.jpg");
  textMoon = loadImage("assets/moon_text.jpg");
  textSun = loadImage("assets/sun_text.jpg");
}

function setup(){
    textureMode(NORMAL);
    ...
}
```

The last one, to not complicate the application, will be defined as a background of the canvas in the CSS file.

```css
canvas {
  display: block;
  background-image:url("assets/space.jpg");
  background-size: contain;
}
```

### Sun Object

In the real world, the Sun isn't static in the space. However, in this model, we chose to make it the center of the system. This is why it only has a rotating movement, whose speed is defined by the variable sunRotationSpeed.

Since it is the central object, it is the first object to be defined in the transformation tree. Having a rotation along the vertical axis, we first define a global rotation movement around the Y-axis. We then draw the Sun object, by defining a sphere with the radius previously defined, and having a sun texture.

```javascript
function draw() {
    ...
    drawSun();
    ...
}

...

function drawSun(){
  push();
  rotateY(frameCount * sunRotationSpeed);
  texture(textSun);
  sphere(sunRadius);
  pop();
}

```

### Earth object and trajectory

It is important to note that in the current model, the trajectory of the Earth object isn't realistic. In the real world, it would be an ellipse around the Sun.

In that model, we defined that trajectory as a circle, having as a center the Sun object. Its displaying is optional, thanks to a checkbox, and occurs just after the Sun was added in the transformation tree. When displayed, it creates a white torus.

```javascript
let displayTraj;

function setup() {
  ...  
  displayTraj = createCheckbox("Show trajectories", true);
  displayTraj.position(10,10);
  displayTraj.changed(displayTrajEvent);
  displayTraj.style('color', 'grey');
  ...
}

function draw() {
  ...
  if (displayTraj.checked()){
    earthTrajectory();
  }
  ...
}

...

function earthTrajectory(){
  push();
  rotateX(PI/2);
  torus(sunRadius+earthRadius+210, 1, 50);
  pop();
}
```

Then, comes the drawing of Earth, and the modelisation of its movement. The first step is to create the translation movement, by adding in the transformation tree a rotating movement along the Y axis, that will use the earthRevolutionSpeed variable defined earlier. Then, we place the center of the referential at a certain distance of the initial one, by using a translation equal to earthRadius+sunRadius+largeDistance.

Let's not that, as said in the theoretical notions, Earth's rotation axis has an inclination of about 23° when comparing it to the Sun's one. It is really important to show that in the model if we want to be able to show the seasons. In that sense, the solution is to create a new node in the transformation tree. We then cancel the Earth's rotation, by applying to it a rotation along the Y axis being the exact opposite to the first one. It allows us to have a referential that will not be turning constantly. Then, we apply a constant rotation along the X-axis. It is of 0.4 radians, an approximation of the 23.4° corresponding to the normal inclination. The new Earth object, that we will draw afterwards, is then inclined.

Afterwards, we can finally display the Earth object thanks to the drawEarth() method. In that function, we define the second most important movement of the Earth, its rotation.

Finally, an option is to display Earth's axis in order to visualize better that inclination. That option can be activated of not thanks to a checkbox.

```javascript
let displayEarthAxis;

function setup() {
  ...
  displayEarthAxis = createCheckbox("Show Earth axis", true);
  displayEarthAxis.position(10,30);
  displayEarthAxis.changed(displayEarthAxisEvent);
  displayEarthAxis.style('color', 'grey');
  ...
}

function draw() {
  ...
  
  push();
  rotateY(frameCount * earthRevolutionSpeed);
  translate(sunRadius+10,0,0);
  ...
  translate(200+earthRadius,0,0);
  
  push();
  rotateY(-frameCount * earthRevolutionSpeed);
  rotateX(0.4);
  push();
  
  drawEarth();
  
  if (displayEarthAxis.checked()){
    drawEarthAxis();
  }
  
  pop();
  pop();
  ...
  pop();
}

function drawEarth(){
  push();
  rotateY(frameCount * earthRotationSpeed);
  texture(textEarth);
  sphere(earthRadius);
  pop();
}

function drawEarthAxis(){
  push();
  texture(textAxis);
  cylinder(1, earthRadius*4);
  pop();
}

```

In that model, we did not modelize the precession and nutation of the Earth. The first one has a revolution period too large. The second one is so little that it was complex to modelize it in a realistic way.

### Moon object and trajectory

It is important to note that in the current model, the trajectory of the Moon object isn't realistic. In the real world, it would be an ellipse around Earth, with a varying altitude.

In that model, we defined that trajectory as a circle, having as a center the Earth object. Its displaying is optional, thanks to a checkbox, and occurs after Earth's addition in the transformation tree. When displayed, it creates a white torus.

```javascript
let displayTraj;

function setup() {
  ...
  displayTraj = createCheckbox("Show trajectories", true);
  displayTraj.position(10,10);
  displayTraj.changed(displayTrajEvent);
  displayTraj.style('color', 'grey');
  ...
}

function draw() {
  ...
  if (displayTraj.checked()){
    moonTrajectory();    
  }
  ...
}

function moonTrajectory(){
  push();
  emissiveMaterial(255,255,255);
  rotateX(PI/2);
  torus(moonRadius+30+earthRadius, 1, 50);
  pop();
}
```

A particularity of the Moon is that the same side of it is constantly visible from the Earth's surface. We then have to "cancel" its rotation visible from Earth, by applying to its rotation speed the exact opposite of its revolution speed. We then first define a certain rotation along the Y axis, before appkying a translation so that the Moon object doesn't have the same center as the Earth one. We create a new node in the transformation tree, and then reverse the previous rotation movement.

Afterwards, we can draw the Moon object, a sphere, and apply it a Moon texture.

```javascript
function draw() {
  ...
  push();
  rotateY(frameCount * moonRevolutionSpeed);
  translate(moonRadius+30+earthRadius,0,0);
  push();
  rotateY(-frameCount * moonRevolutionSpeed);
  
  drawMoon();
  
  pop();
  pop();
  ...
}

function drawMoon(){
  push();
  texture(textMoon);
  sphere(moonRadius);
  pop();
}

```

### Light gestion
Since it is not possible to define a textured object as a source of light, the choice was mad to implement the light in the transformation tree. It is defined after adding the Sun : we do a simple translation equal to the Sun radius+10, so that the new referential origin is out of the Sun object. It will rotate along with the Earth object. Then, we define a light having as a direction the X-axis.

The original idea was to define a directional light, because, as the Sun is way bigger than Earth, it acts like a directional light on the planet. However, in the p5 model, it was not possible to define the source like that. 

A single point light couldn't work either, because the Earth's surface lightened by it would be too small.

The solution encountered was then to define two point lights, at four different points of the Sun's surface, so that the light would be more diffuse.

```javascript
push();
rotateY(frameCount * earthRotationSpeed);
translate(sunRadius+10,0,0);
pointLight(255, 255, 255, 0, 30, 0);
pointLight(255, 255, 255, 0, -30, 0);
pointLight(255, 255, 255, 0, 0, -30);
pointLight(255, 255, 255, 0, 0, 30);
```

However, this model comes along with a certain problem : since there are multiple light sources, it creates a problem with shadows. It is one of the causes of the impossibility to see Moon eclipses when it is between the sun and the Earth.


### Information displaying

In order to make the model a learning one for people, we thought of a feature that would be to display information about the different objects wehn asking for it.

To do that, we implement three checkboxes that will allow us to respectively display information about Earth, the Sun and the Moon. One particularity of those checkboxes is that only one can be checked at a time. So, when checking a checkbox, we destroy the other two and initialize them again.

To display information on a 2D canvas, we will use the beginHUD() and endHUD() methods of the easyCam library, which we import in the index.html file as following.

```html
<script type="module" src="https://freshfork.github.io/p5.EasyCam/p5.easycam.js"></script>
```

Then, in the javascript file, we define an easyCam object. As a matter of fact, this object will also allow us to get a navigable 3D model. The methods beginHUD() and endHUD() will be applied on that same object. Within them, the developper can define multiple text objects, in order to write information on the screen.

The code parts for information displaying are the following ones :

```javascript
let displayEarthInfo;
let displayMoonInfo;
let displaySunInfo;

let easyCam;
let arialFont;

function preload(){
  ...
  arialFont = loadFont("assets/fonts/ArialTh.ttf");
}

function setup() {
  ...
  textFont(arialFont);
  ...  
  displayEarthInfo = createCheckbox("Show Earth information", false);
  displayEarthInfo.position(10,60);
  displayEarthInfo.changed(displayEarthInfoEvent);
  displayEarthInfo.style('color', 'grey');
  
  displayMoonInfo = createCheckbox("Show Moon information", false);
  displayMoonInfo.position(10,80);
  displayMoonInfo.changed(displayMoonInfoEvent);
  displayMoonInfo.style('color', 'grey');
  
  displaySunInfo = createCheckbox("Show Sun information", false);
  displaySunInfo.position(10,100);
  displaySunInfo.changed(displaySunInfoEvent);
  displaySunInfo.style('color', 'grey');
  ...
  easycam = createEasyCam();
}

function draw() {
  ...
  displayInformation();
  ...
}

...

function displayEarthInfoEvent(){
  displaySunInfo.remove();
  displaySunInfo = createCheckbox("Show Sun information", false);
  displaySunInfo.position(10,100);
  displaySunInfo.changed(displaySunInfoEvent);
  displaySunInfo.style('color', 'grey');
  
  displayMoonInfo.remove();
  displayMoonInfo = createCheckbox("Show Moon information", false);
  displayMoonInfo.position(10,80);
  displayMoonInfo.changed(displayMoonInfoEvent);
  displayMoonInfo.style('color', 'grey');
}


function displaySunInfoEvent(){
  displayMoonInfo.remove();
  displayMoonInfo = createCheckbox("Show Moon information", false);
  displayMoonInfo.position(10,80);
  displayMoonInfo.changed(displayMoonInfoEvent);
  displayMoonInfo.style('color', 'grey');
  
  displayEarthInfo.remove();
  displayEarthInfo = createCheckbox("Show Earth information", false);
  displayEarthInfo.position(10,60);
  displayEarthInfo.changed(displayEarthInfoEvent);
  displayEarthInfo.style('color', 'grey');
  
}


function displayMoonInfoEvent(){
  displaySunInfo.remove();
  displaySunInfo = createCheckbox("Show Sun information", false);
  displaySunInfo.position(10,100);
  displaySunInfo.changed(displaySunInfoEvent);
  displaySunInfo.style('color', 'grey');
  
  displayEarthInfo.remove();
  displayEarthInfo = createCheckbox("Show Earth information", false);
  displayEarthInfo.position(10,60);
  displayEarthInfo.changed(displayEarthInfoEvent);
  displayEarthInfo.style('color', 'grey');
}

function displayInformation(){
  if(displayEarthInfo.checked()){
    earthInfo();
  }else if (displayMoonInfo.checked()){
    moonInfo();
  }else if (displaySunInfo.checked()){
    sunInfo();
  }
}

function moonInfo(){
  easycam.beginHUD();
  textSize(25);
  text('The Moon', 20, 450);
  textSize(14);
  text('Rotation speed : from 1,100 to 0,966 km/s', 20, 480);
  text('Radius : 1 737.4 km', 20, 500);
  text('Revolution period : 27.3217 days', 20, 520);
  text('Average distance to Earth : 150 million km', 20, 540);
  easycam.endHUD();
}

function earthInfo(){
  easycam.beginHUD();
  textSize(25);
  text('Earth', 20, 450);
  textSize(14);
  text('Rotation speed : 0,4 km/s', 20, 480);
  text('Radius : 6 371 km', 20, 500);
  text('Revolution speed : 30 km/s', 20, 520);
  text('Revolution period : 365 days, 5 h 48 min 45 s', 20, 540);
  easycam.endHUD();
}

function sunInfo(){
  easycam.beginHUD();
  textSize(25);
  text('The Sun', 20, 450);
  textSize(14);
  text('Rotation speed : 1,997 km/s', 20, 480);
  text('Radius : 696 340 km', 20, 500);
  text('Average distance to Earth : 150 million km', 20, 520);
  easycam.endHUD();
}


```



## Conclusion

That work was really interesting to make, because it allowed us to understand the complexity of physics representation in 3D. That model is far from perfect, but permitted us to get familiar with the basis of transformation trees in WEBGL.


## Future Work

### Correction of physics incoherences

For the future of this exercise, it will be important to deal with the physics problems of the model : 
- periods of time : it wille be necessary to have time scales a bit more realistic,
- light source : it is important to have a directional light source, so that the model gets enlightened in the proper way,
- revolution of objects : the revolution of the Earth around the Sun, and of the Moon around the Earth are not realistic. Indeed, in the real world, their trajectories are elliptical, and the object's "altitude" (although it can't really be defined as that in space) vary.

### Addition of functionalities

Some functionalities could not be added to the model, due to time and lots of problems encountered along the way. But, an interesting functionality to add would be to display the informations we already have when clicking on an object.

Finally, the most interesting functionality would be to make it a physics model. A true representation of physics (using Earth's gravity, the Sun's one, ...) would be a challenge to implement, but also a great improvement of the application.


## References

### Earth's movement

**Earth movements: rotation, translation, precession and nutation**, German Portillo, https://www.meteorologiaenred.com/en/earth-movements.html

**Earth Rotation: The Day-Night Boundary**, EarthHow, https://earthhow.com/earth-rotation-day-night-boundary/

**Precession**, space.fm, https://www.space.fm/astronomy/planetarysystems/precession.html

**Earth's nutations**, Mathieu Dumberry, https://sites.ualberta.ca/~dumberry/nutation.html

### Moon's movement

**Moon in motion**, NASA, https://moon.nasa.gov/moon-in-motion/phases-eclipses-supermoons/overview/

**Lunar distance**, Wikipedia, https://en.wikipedia.org/wiki/Lunar_distance_(astronomy)


### p5 Documentation

**Directional Light**, p5 documentation, https://p5js.org/reference/#/p5/directionalLight

**Point Light**, p5 documentation, https://p5js.org/reference/#/p5/pointLight

**Styling and Appearance**, p5 documentation, https://p5js.org/es/learn/getting-started-in-webgl-appearance.html

**Coordinates and Transformation**, p5 documentation, https://p5js.org/es/learn/getting-started-in-webgl-coords-and-transform.html


### Class

**Heads-up display**, github course, https://visualcomputing.github.io/docs/space_transformations/heads_up_display/

