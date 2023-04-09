# Depth Perception with Monocular Cues

## Introduction
Depth perception is a crucial aspect of human vision, allowing us to perceive the distance and spatial relationships between objects in our environment. While binocular vision, which relies on the slightly different perspectives provided by each eye, is an important factor in depth perception, monocular cues can also provide valuable depth information. In this report, we'll explore some of the different types of monocular cues, their applications, and how they contribute to our ability to perceive the 3D world around us.

<img src="./../depth.jpg "  width="100%" height="100%" style="display:block;float:none;align:center">

## Background
Depth perception is a crucial aspect of human vision, allowing us to navigate and interact with the 3D world around us. While the human visual system has evolved to be highly adept at extracting depth information from the environment, researchers have long been interested in understanding the underlying mechanisms behind this ability. One area of particular interest is the role of monocular cues in depth perception.

## Previous Work
Early research on monocular cues focused primarily on the ways in which artists and designers employed these cues to create the illusion of depth on a flat surface. However, as the field of computer graphics and virtual reality began to emerge, researchers became increasingly interested in the use of monocular cues in creating realistic and immersive 3D environments. Today, there is a growing body of research exploring the role of monocular cues in a variety of contexts, including visual perception, computer graphics, and human-computer interaction.

## Types of Monocular Cues
There are several types of monocular cues that contribute to depth perception:

{{< tabs "Tab1" >}}
{{< tab "Relative Size" >}}
### Relative Size
Relative size is a monocular cue that refers to the perception that objects of similar size are farther away when they appear smaller and closer when they appear larger. This cue can be especially helpful in determining the relative size and distance of objects when there are no other cues available.
{{< /tab >}}

{{< tab "Linear Perspective" >}}
### Linear Perspective
Linear perspective is a monocular cue that occurs when parallel lines appear to converge as they recede into the distance. This can create the illusion of depth and distance, allowing us to determine the relative positions of objects.
{{< /tab >}}

{{< tab "Monocular Movement Parallax" >}}
### Monocular Movement Parallax
Monocular movement parallax is a monocular cue that occurs when objects closer to us appear to move faster across our visual field than objects farther away. This cue can be helpful in determining the relative distances and positions of objects that are in motion.
{{< /tab >}}

{{< tab "Interposition" >}}
### Interposition
Interposition occurs when one object partially obscures another, indicating that the obscured object is farther away. This can be a useful cue for determining depth in complex scenes.
{{< /tab >}}

{{< tab "Shading and Lighting" >}}
### Shading and Lighting
Shading and lighting can create the perception of a light source and shadows, which can provide valuable depth information.
{{< /tab >}}

{{< tab "Aerial Perspective" >}}
### Aerial Perspective
Aerial perspective occurs when distant objects appear less distinct and hazier due to the scattering of light in the atmosphere. This can provide information about the relative distances of objects in a scene.
{{< /tab >}}
{{< /tabs >}}

## Solution

The goal of this report is _implement a 2D sketch to trick the human eye into perceiving a 3D scene_. So, we implemented a _spacial black/white and color journey sketch_ which shows Linear Perspective, Relative Size, Monocular Movement Parallax, and Interposition.

Linear Perspective Monocular Cue was implemented taking into account that if two lines that are parallel converge at infinity, it is because there is depth. In this case, the parallel lines are represented by the path taken by the stars and the convergence is implemented from the origin point where the stars arise.

Relative Size Monocular Cue was applied by showing distant stars with a small size and nearby stars with a larger size.

Monocular Movement Parallax was completed by assigning different travel speeds to the stars, in this way it can be illustrated that farther objects move more slowly than closer ones. It should be noted that this Monocular Cue is not necessarily related to size.

Finally, Interposition Monocular Cue is implemented in the spacial color journey sketch. This means that when one star overlaps another, it is because it is closer.

### Solution: Code

The creation of the stars is made through a JavaScript Class that defines their positions on the x-axis, position on the y-axis, and their velocity. Even the class stores the way each star changes their position on the Cartesian-Plane and how is showed. The class:

```javascript
class Star{
  constructor(){
    this.x = random(-width,width);
    this.y = random(-height, height);
    this.z = random(width);

  }
  
  update(speed_var){
    this.z = this.z -speed_var;
    if (this.z<1){
      this.x = random(-width,width);
      this.y = random(-height, height);
      this.z=random(width);  
    }
  }
  
  show(){
    fill(255);
    noStroke();
    let sx = map(this.x/this.z,0,1,0,width);
    let sy = map(this.y/this.z,0,1,0,height);
    let r = map(this.z,0,width,12,0);
    
    ellipse(sx,sy,r,r);
  }
}
```
The second part of the code deals with the allocation of each start on the Cartesian-Plane as a group:

```javascript
let stars=[];
let star_length=1300;
let speed_var = 10;

function setup() {
  createCanvas(400,400);
  for (let i = 0; i < star_length; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  speed_var = map(mouseY,0,height, 0,30);
  translate(width/2,height/2);
  for (let i = 0; i < star_length; i++) {
    stars[i].update(speed_var);
    stars[i].show();
  }
}
```

## Solution: Results

### Spacial black/white journey sketch

Move the cursor vertically to change the velocity that you are using "to travel in the space"

{{< p5-global-iframe id="breath" width="625" height="625" >}}
  // Coded as `global mode` of [this](https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/rotateSquare.js)
class Star{
  constructor(){
    this.x = random(-width,width);
    this.y = random(-height, height);
    this.z = random(width);
    this.a = random(255);
    this.b = random(255);
    this.c = random(255);
    this.d = random(255);
  }
  
  update(speed_var){
    this.z = this.z -speed_var;
    if (this.z<1){
      this.x = random(-width,width);
      this.y = random(-height, height);
      this.z=random(width);  
    }
  }
  
  show(){
    fill(255);
    noStroke();
    let sx = map(this.x/this.z,0,1,0,width);
    let sy = map(this.y/this.z,0,1,0,height);
    //print("x: ",sx,"y: ",  sy);
    let r = map(this.z,0,width,12,0);
    
    ellipse(sx,sy,r,r);
  }
}

let stars=[];
let star_length=1300;
let speed_var = 10;

function setup() {
  createCanvas(600,600);
  for (let i = 0; i < star_length; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  speed_var = map(mouseY,0,height, 0,30);
  translate(width/2,height/2);
  for (let i = 0; i < star_length; i++) {
    stars[i].update(speed_var);
    stars[i].show();
  }
}
{{< /p5-global-iframe >}}

### Spacial color journey sketch

Allocating colors to the stairs permits we can see the _Object Interposition_, if a star's color overlaps other one represents that the overlapped star is farther and no matter if is bigger:  

{{< p5-global-iframe id="breath" width="625" height="625" >}}
  // Coded as `global mode` of [this](https://github.com/VisualComputing/Cognitive/blob/gh-pages/sketches/rotateSquare.js)
class Star{
  constructor(){
    this.x = random(-width,width);
    this.y = random(-height, height);
    this.z = random(width);
    this.a = random(255);
    this.b = random(255);
    this.c = random(255);
  }
  
  update(speed_var){
    this.z = this.z -speed_var;
    if (this.z<1){
      this.x = random(-width,width);
      this.y = random(-height, height);
      this.z=random(width);  
    }
  }
  
  show(){
    fill(this.a,this.b,this.c);
    stroke(255);
    let sx = map(this.x/this.z,0,1,0,width);
    let sy = map(this.y/this.z,0,1,0,height);
    //print("x: ",sx,"y: ",  sy);
    let r = map(this.z,0,width,18,0);
    
    ellipse(sx,sy,r,r);
  }
}

let stars=[];
let star_length=1300;
let speed_var = 10;

function setup() {
  createCanvas(600,600);
  for (let i = 0; i < star_length; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  speed_var = map(mouseY,0,height, 0,30);
  translate(width/2,height/2);
  for (let i = 0; i < star_length; i++) {
    stars[i].update(speed_var);
    stars[i].show();
  }
}
{{< /p5-global-iframe >}}

## Applications of Monocular Cues
Monocular cues are important in a variety of contexts, including art and design, computer graphics, and virtual reality. In art and design, monocular cues are often used to create the illusion of depth and space on a flat surface. In computer graphics and virtual reality, monocular cues are used to create more realistic and accurate representations of 3D scenes.

## Conclusion
In conclusion, while binocular vision is an important factor in depth perception, monocular cues can also provide valuable information about the spatial relationships between objects in a scene. Relative size, linear perspective, monocular movement parallax, interposition, shading and lighting, and aerial perspective are all important types of monocular cues that contribute to our ability to perceive the 3D world around us. By understanding how these cues work, we can better appreciate the complexity of our visual perception and the mechanisms that allow us to interact with the world in three dimensions.

## Future Work
By implementating this monocular cue sketch, we now have the opportunity to spin binocular cues up. In this way, we will be able to experience a real 3D vision without tricking the human eye with monocular cues. Additionally, the report and the implemented code work as study material to the National University of Colombia Comunnity or any person who finds interesting to dive in depth perception understanding.

## Resources:

1. Purves, D., Augustine, G. J., Fitzpatrick, D., Hall, W. C., LaMantia, A. S., McNamara, J. O., & Williams, S. M. (2001). Neuroscience (2nd ed.). Sunderland, MA: Sinauer Associates.
2. Processing Foundation. (n.d.). p5.js reference. Retrieved April 7, 2023, from https://p5js.org/reference/