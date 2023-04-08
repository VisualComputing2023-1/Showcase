# Color mapping applications

{{< hint info >}}
**Exercise**  
Implement a color mapping application that helps people who are color blind see the colors around them.
{{< /hint >}}

## Introduction

In this exercise we are going to show how a colorblind person can perceive the colors in the real world.

### Color Mapping

A color map is a set of values that are associated with colors. Generally is used to display a single brand raster consistenly with the same colors.

<img src="./../Color_Mapping.png"  width="60%" height="60%" style="display:block;float:none;align:center">

### Color Blindness

The Color Blindness or color vision deficiency (CVD) is the decreased ability to see color or differences in color. this happens because one of the three (or sometimes the three of them) cone cells in the retina have some type of issue or problem that makes impossible recognize certain color on the RGB color model. Males are more likely to be color blind than females, because the genes responsible for the most common forms of color blindness are on the X chromosome, also, Non-color-blind females can carry genes for color blindness and pass them on to their children.

There are three main types that subdivides in:

{{< tabs "Tab1" >}}
{{< tab "Red-Green color blindness" >}}
### Deuteranormaly
It is the most common type of red-green blindness. It makes green looks more red.

### Protanomaly
This type of color blindness makes red look more green and less bright.

### Protanopia - Deuteronopia
This both make you unable to see the difference between red and green. The Protanopia anomaly makes you unable to see the red, and the Deuteronopia anomaly makes you unable to see the green.
{{< /tab >}}

{{< tab "Blue-Yellow color blindness" >}}
### Tritanomaly
This type of vision anomaly makes really hard to tell de difference between blue and green, and between yellow and red.

### Tritanopia
This one makes you unable to tell the difference between blue and green, purple and red, and yellow and pink. It also makes colors look less bright.
{{< /tab >}}

{{< tab "Complete color blindness" >}}

### Monochromancy
When you are completely color blind, you cannot see color at all. It's pretty weird. This can make you have trouble seeing clearly and be more sensitive to light.

{{< /tab >}}
{{< /tabs >}}


## Background and previous work

There are a lot of previous work, but if we talk about color blindness we have to talk about the Ishihara color test too. 

The next video explain how to do the Ishihara color test:

<iframe width="560" height="315" src="https://www.youtube.com/embed/W_tXS1dG_9Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The Ishihara color test is a color vision test for detection of red-green color deficiencies. The test consist of a number of Ishihara plates. Each plate depicts a solid circle of colored dots appearing randomized in color and size. Within the pattern are dots which form a number clearly visible to those with normal color vision but difficult to see or invisible to those with a red-green color vision defect.

The next link will send you to a page where are a lot of different tests for the detection of color blindness. Just click [here](https://www.es.colorlitelens.com/test-de-daltonismo.html#TEST).

## Solution

We made an application that show how a color-blind-person see the world. The checkbox "Flashlight" make your mouse a flashlight, if you check any other checkbox, the color of the flashlight change to see the new filter applied to the image. If you don't check the "Flashlight" checkbox you can see the filters all over the image.

{{< p5-global-iframe id='color_mapping' width="750" height="476" >}}

let r, g, b;
let cr, cg, cb, cm = false;
let lintern = 0;
let img;
let checkL;
let checkR;
let checkG;
let checkB;
let checkM;

function preload() {
  img = loadImage('./../arcoiris.png');
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  loadPixels();
  
  checkL = createCheckbox('Flashlight', false);
  checkL.position(10, 10);
  checkL.changed(checkedL);
  
  checkR = createCheckbox('Protanopia', false);
  checkR.position(10, 30);
  checkR.changed(checkedR);
  
  checkG = createCheckbox('Deuteronopia', false);
  checkG.position(10, 50);
  checkG.changed(checkedG);
  
  checkB = createCheckbox('Tritanopia', false);
  checkB.position(10, 70);
  checkB.changed(checkedB);
  
  checkM = createCheckbox('Monochromancy', false);
  checkM.position(10, 90);
  checkM.changed(checkedM);
}

function draw() {
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calcular la posición 1D de una matriz 2D
      let loc = (x + y * img.width) * 4;
      // Obtener los valores R,G,B de una imagen
      r = img.pixels[loc];
      g = img.pixels[loc + 1];
      b = img.pixels[loc + 2];
      // Calcular una cantidad a cambiar de brillo basado en la proximidad al ratón
      let maxdist = 70;
      let d = dist(x, y, mouseX, mouseY);
      let adjustbrightness = (lintern * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      g += adjustbrightness;
      b += adjustbrightness;
      // Limitar RGB para asegurarse de estar dentro del rango 0-255 de color
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      
      if(cr == true){
        r = 0;
      }
      
      if(cg == true){
        g = 0;
      }
      
      
      if(cb == true){
        b = 0;
      }
      
      
      if(cm == true){
        g = r;
        b = r;
      }
      // Hacer un nuevo color y definir el pixel en la ventana
      //color c = color(r, g, b);
      let pixloc = (y * width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = g;
      pixels[pixloc + 2] = b;
      pixels[pixloc + 3] = 255;
    }
  }
  updatePixels();
}

function checkedL(){
  if (checkL.checked()) {
    lintern = 255;
    console.log("checked")
  } else {
    lintern = 0;
  }
}

function checkedR(){
  if (checkR.checked()) {
    cr = true;
    } else {
    cr = false;
  }
}

function checkedG(){
  if (checkG.checked()) {
    cg = true;
    } else {
    cg = false;
  }
}

function checkedB(){
  if (checkB.checked()) {
    cb = true;
    } else {
    cb = false;
  }
}

function checkedM(){
  if (checkM.checked()) {
    cm = true;
    } else {
    cm = false;
  }
}

{{< /p5-global-iframe >}}

## Code

```javascript
let r, g, b;
let cr, cg, cb, cm = false;
let lintern = 0;
let img;
let checkL;
let checkR;
let checkG;
let checkB;
let checkM;

function preload() {
  img = loadImage('./../arcoiris.png');
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  loadPixels();
  
  checkL = createCheckbox('Flashlight', false);
  checkL.position(10, 10);
  checkL.changed(checkedL);
  
  checkR = createCheckbox('Protanopia', false);
  checkR.position(10, 30);
  checkR.changed(checkedR);
  
  checkG = createCheckbox('Deuteronopia', false);
  checkG.position(10, 50);
  checkG.changed(checkedG);
  
  checkB = createCheckbox('Tritanopia', false);
  checkB.position(10, 70);
  checkB.changed(checkedB);
  
  checkM = createCheckbox('Monochromancy', false);
  checkM.position(10, 90);
  checkM.changed(checkedM);
}

function draw() {
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calcular la posición 1D de una matriz 2D
      let loc = (x + y * img.width) * 4;
      // Obtener los valores R,G,B de una imagen
      r = img.pixels[loc];
      g = img.pixels[loc + 1];
      b = img.pixels[loc + 2];
      // Calcular una cantidad a cambiar de brillo basado en la proximidad al ratón
      let maxdist = 70;
      let d = dist(x, y, mouseX, mouseY);
      let adjustbrightness = (lintern * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      g += adjustbrightness;
      b += adjustbrightness;
      // Limitar RGB para asegurarse de estar dentro del rango 0-255 de color
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      
      if(cr == true){
        r = 0;
      }
      
      if(cg == true){
        g = 0;
      }
      
      
      if(cb == true){
        b = 0;
      }
      
      
      if(cm == true){
        g = r;
        b = r;
      }
      // Hacer un nuevo color y definir el pixel en la ventana
      //color c = color(r, g, b);
      let pixloc = (y * width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = g;
      pixels[pixloc + 2] = b;
      pixels[pixloc + 3] = 255;
    }
  }
  updatePixels();
}

function checkedL(){
  if (checkL.checked()) {
    lintern = 255;
    console.log("checked")
  } else {
    lintern = 0;
  }
}

function checkedR(){
  if (checkR.checked()) {
    cr = true;
    } else {
    cr = false;
  }
}

function checkedG(){
  if (checkG.checked()) {
    cg = true;
    } else {
    cg = false;
  }
}

function checkedB(){
  if (checkB.checked()) {
    cb = true;
    } else {
    cb = false;
  }
}

function checkedM(){
  if (checkM.checked()) {
    cm = true;
    } else {
    cm = false;
  }
}
```


## Conclusion

The way we see the color blindness have to changed because is a very common illness, and we must be more careful with the applications we make, overall the colors we used in that apps.

## Future Work

In the future this work can be sa solid base to make an application that can fix the image showed in the screen for the people who have a color blindness type, using the same mecanism implemented today in the color blind glasses.

## Resource

1. https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/color-map-concepts.htm#:~:text=A%20color%20map%20is%20a,and%20blue%20(RGB)%20values.

2. https://en.wikipedia.org/wiki/Color_blindness

3. https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness/types-color-blindness

4. https://en.wikipedia.org/wiki/Ishihara_test

5. https://www.es.colorlitelens.com/test-de-daltonismo.html#TEST
