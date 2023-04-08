# Depth Perception with Monocular Cues: Understanding the Mechanisms Behind 3D Vision

## Introduction
Depth perception is a crucial aspect of human vision, allowing us to perceive the distance and spatial relationships between objects in our environment. While binocular vision, which relies on the slightly different perspectives provided by each eye, is an important factor in depth perception, monocular cues can also provide valuable depth information. In this article, we'll explore some of the different types of monocular cues, their applications, and how they contribute to our ability to perceive the 3D world around us.

## Background
Depth perception is a crucial aspect of human vision, allowing us to navigate and interact with the 3D world around us. While the human visual system has evolved to be highly adept at extracting depth information from the environment, researchers have long been interested in understanding the underlying mechanisms behind this ability. One area of particular interest is the role of monocular cues in depth perception.

## Previous Work
Early research on monocular cues focused primarily on the ways in which artists and designers employed these cues to create the illusion of depth on a flat surface. However, as the field of computer graphics and virtual reality began to emerge, researchers became increasingly interested in the use of monocular cues in creating realistic and immersive 3D environments. Today, there is a growing body of research exploring the role of monocular cues in a variety of contexts, including visual perception, computer graphics, and human-computer interaction.

## Types of Monocular Cues
There are several types of monocular cues that contribute to depth perception:

### Relative Size
Relative size is a monocular cue that refers to the perception that objects of similar size are farther away when they appear smaller and closer when they appear larger. This cue can be especially helpful in determining the relative size and distance of objects when there are no other cues available.

### Linear Perspective
Linear perspective is a monocular cue that occurs when parallel lines appear to converge as they recede into the distance. This can create the illusion of depth and distance, allowing us to determine the relative positions of objects.

### Monocular Movement Parallax
Monocular movement parallax is a monocular cue that occurs when objects closer to us appear to move faster across our visual field than objects farther away. This cue can be helpful in determining the relative distances and positions of objects that are in motion.

### Interposition
Interposition occurs when one object partially obscures another, indicating that the obscured object is farther away. This can be a useful cue for determining depth in complex scenes.

### Shading and Lighting
Shading and lighting can create the perception of a light source and shadows, which can provide valuable depth information.

### Aerial Perspective
Aerial perspective occurs when distant objects appear less distinct and hazier due to the scattering of light in the atmosphere. This can provide information about the relative distances of objects in a scene.

## Code: Solution

### First Part

```javascript
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
```
### Second Part

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

## Code: Results


## Applications of Monocular Cues
Monocular cues are important in a variety of contexts, including art and design, computer graphics, and virtual reality. In art and design, monocular cues are often used to create the illusion of depth and space on a flat surface. In computer graphics and virtual reality, monocular cues are used to create more realistic and accurate representations of 3D scenes.

## Conclusion
In conclusion, while binocular vision is an important factor in depth perception, monocular cues can also provide valuable information about the spatial relationships between objects in a scene. Relative size, linear perspective, monocular movement parallax, interposition, shading and lighting, and aerial perspective are all important types of monocular cues that contribute to our ability to perceive the 3D world around us. By understanding how these cues work, we can better appreciate the complexity of our visual perception and the mechanisms that allow us to interact with the world in three dimensions.
