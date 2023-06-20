# Photomosaic

{{< hint info >}}
**Exercise**  
Implement a mosaic visual application.
{{< /hint >}}

## Introduction

In this exercise we are going to show how a photomosaic works.

#### Photomosaic

The photomosaic is an image, portrait or photograph that is divided by geometric figures, usually squares or rectangles of the same size, this in order to replace them with other portraits, photographs or images that match the average colors that enclose the geometric figures of the original image, achieving that when viewing the image from a distant point is achieved as the original, but when viewing from a nearby point or zoom can be perceived that is composed of other images.

## Background and previous work

A picture is being generated using small, colourful stones or glass pieces. That is how famous artworks in palaces and villas were created. Today's view of mosaics is still very much effected by those ancient artworks.

Over the centuries this art technique was preserved and was responsible for the visual design of important architectural structures. In the time of the Renaissance and Classicism they became more important. In those times the mosaic technique and handwork were in trend. Because of that mosaics can still be seen in the remnants of those times, in ruins and buildings from those eras.

Mosaics are also related to the controversial painting style Pointillism. Pointillism reached its peak at the end of the 19th Century.

## Solution

In this case, we made an application that starts show an image which is made from differents images. The area of neighboring pixels can be enlarged or decreased, as well as switching between image, video or camera. You can also change from images to pixels.

{{< p5-iframe sketch="/Showcase/sketches/photomosaic.js" lib1="/Showcase/sketches/libraries/p5.shaderbox.js" lib2="/Showcase/sketches/libraries/p5.quadrille.js" width="675" height="675" >}}

## Code

#### photomosaic.frag

```javascript
precision mediump float;

const int num_images = 40;

uniform sampler2D source;
uniform sampler2D palette;
uniform float cols;
uniform float lumas[num_images];
uniform float red_palette[num_images];
uniform float green_palette[num_images];
uniform float blue_palette[num_images];
uniform bool debug;
uniform bool color_on;
uniform vec4 background;
uniform vec4 foreground;
uniform float resolution;

varying vec4 vVertexColor;
varying vec2 vTexCoord;

float luma(vec3 color) {
  return (0.299 * color.r + 0.587 * color.g + 0.114 * color.b);
}

void main() {
  vec2 fontCoord = vTexCoord * resolution;
  vec2 srcCoord = floor(fontCoord);
  fontCoord = fontCoord - srcCoord;
  srcCoord = srcCoord / vec2(resolution);
  float mid = 1.0/(2.0*resolution);
  srcCoord = srcCoord + vec2(mid);

  vec4 key = texture2D(source, srcCoord);
  if (debug) {
    gl_FragColor = key;
  } else {

    float lumakey = luma(key.rgb);
    float selected = 0.0;

    bool complete = false;
    for(float j = 0.02; j <= 0.5; j += 0.02){
      for(int i = 0 ; i < num_images; i ++)
      {
        if((red_palette[i]/255.0> (key.r - j) && red_palette[i]/255.0 < (key.r + j)) && (green_palette[i]/255.0> (key.g - j) && green_palette[i]/255.0 < (key.g + j)) && (blue_palette[i]/255.0> (key.b - j) && blue_palette[i]/255.0 < (key.b + j))){
          selected = float(i);
          complete = true;
          break;
        }
      }
      if(complete){
        break;
      }
    }
    
    vec2 tile = vec2((floor(selected) + fontCoord.x) / cols, fontCoord.y);

    vec4 paletteTexel = texture2D(palette, tile);
    gl_FragColor = paletteTexel;
  }
}
```

#### photomosaic.js

```javascript
let imageCells;
let pg;
let mosaic;
let image_src;
let video_src;
let debug;
let cols;
let resolution;
let sel;
let video_on;
let p;

let luma;
let rgb;

const SAMPLE_RES = 100;

function preload() {
  image_src = loadImage("/Showcase/imgs/Foto1.jpg");
  video_src = createVideo(["/Showcase/vid/birds.mp4"]);
  video_src.hide();
  mosaic = readShader("/Showcase/sketches/shaders/photomosaic.frag");
  p = [];
  for (let i = 1; i <= 36; i++) {
    if (i.toString().length == 1) {
      p.push(loadImage(`/Showcase/imgs/breads/00000${i}.jpg`));
    } else {
      p.push(loadImage(`/Showcase/imgs/breads/0000${i}.jpg`));
    }
  }
}

function setup() {
  createCanvas(650, 650, WEBGL);
  colorMode(RGB, 1);
  imageCells = createQuadrille(p);
  textureMode(NORMAL);
  noStroke();
  shader(mosaic);
  cam = createCapture(VIDEO);
  cam.size(500, 400);
  cam.hide();
  sel = createSelect();
  sel.position(10, 10);
  sel.option("Pixels");
  sel.option("Images");
  sel.selected("Images");
  sel.changed(() => {
    mosaic.setUniform("debug", sel.value() === "Pixels");
    mosaic.setUniform("color_on", false);
  });

  video_on = createSelect();
  video_on.position(10, 30);
  video_on.option("Image");
  video_on.option("Video");
  video_on.option("Camera");
  video_on.selected("Image");
  video_on.changed(() => {
    mosaic.setUniform(
      "source",
      video_on.value() === "Image"
        ? image_src
        : video_on.value() === "Video"
        ? video_src
        : cam
    );
    if (video_on.value() === "Video") {
      video_src.loop();
    } else {
      video_src.pause();
    }
  });

  video_on.position(10, 30);
  mosaic.setUniform("source", image_src);
  resolution = createSlider(10, 300, SAMPLE_RES, 5);
  resolution.position(10, 50);
  resolution.style("width", "80px");
  resolution.input(() => {
    mosaic.setUniform("resolution", resolution.value());
  });
  mosaic.setUniform("resolution", resolution.value());
  pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
  mosaic.setUniform("cols", imageCells.width);
  sample();
}

function sample() {
  if (pg.width !== SAMPLE_RES * imageCells.width) {
    pg = createGraphics(SAMPLE_RES * imageCells.width, SAMPLE_RES);
    mosaic.setUniform("cols", imageCells.width);
  }
  imageCells.sort({
    ascending: true,
    cellLength: SAMPLE_RES,
    mode: "LUMA",
  });

  luma = imageCells.saveLuma({
    cellLength: SAMPLE_RES,
  });
  rgb = imageCells.saveRGB({
    cellLength: SAMPLE_RES,
  });
  drawQuadrille(imageCells, {
    graphics: pg,
    cellLength: SAMPLE_RES,
    outlineWeight: 0,
  });
  mosaic.setUniform("palette", pg);
  mosaic.setUniform("lumas", luma);
  mosaic.setUniform("red_palette", rgb.r);
  mosaic.setUniform("green_palette", rgb.g);
  mosaic.setUniform("blue_palette", rgb.b);
}

function draw() {
  cover({
    texture: true,
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

## Conclusion

The photomosaic is an interesting exercise to learn how shaders work and, above all, how LUMA works. It can be a really good way for make another a little bit more difficult applications.

## Future Work

In the future this work can be a solid base to establish another application (maybe not using the photomosaic) because the way this application was made, can be extrapolated to another uses.

## Resource

1. https://www.photo-mosaic.co.uk/how-it-works/what-is-a-photo-mosaic/
2. https://github.com/mattdesl/lwjgl-basics/wiki/Shaders