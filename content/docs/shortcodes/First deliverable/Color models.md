# Color models

{{< hint info >}}
**Exercise**  
Research other color models such as HSL, HSB, XYZ.
{{< /hint >}}

# Introduction

The visualisation of colors is a pretty simple theme when done automatically by the human eye. However, when thinking more about its mechanism, it gets more complicated. To simplify its understanding for humans, many color models have been defined through the years. Two main categories of color models exist : additive color models and substractive color models.

An **additive color model** describes how light produces color : it starts from the black one, and by adding colors to it, eventually reaches white.

A **substractive color model** describes how pigments of color can be used to produce color using reflected light. It starts from black, and substracts colors to it (cyan, magenta, yellow and black) to eventually reach white.

## Previous work

To bring a solution to that exercise, we searched for many definitions, of the different color models and of the concepts.

## Additive color models

An additive color model is a model formed by the combination of coincident component lights, starting with blackness. In this model, the three primary colors are red, green and blue.

It corresponds to color produced by a combination of different lights.

{{< tabs "id1" >}}
{{< tab "RGB" >}}
### RGB
RGB content
The RGB color model (CIE 1931 RGB color space) allows to define colors thanks to three values defining respectively the quantity of red, green and blue for the defined colour.

This is a device-dependent color model, that was created in order to display coloured image on screens of electronic systems.

When looking at the spectrum of visible light, one can deduce that the three colors used in this model respectively correspond to a long wavelength (red), a medium wavelength (green) and a small wavelength (blue). This is then the most accurate way to describe a light emitted thanks to the combination of differents coloured lights, because it allows to go through the entire spectrum.

<img src="./../deliverable1_colormodels_RGB_spectrumofvisible.jpg"  width="60%" height="60%" style="display:block;float:none;align:center">

{{< /tab >}}

{{< tab "XYZ model" >}} 
### XYZ model
The XYZ color space (CIE 1931 XYZ color space), an universal color space, is almost the same as the RGB color model, in the sense that the model is based on three primaries, respectively XYZ. All colors visible by a human eye can be then represented using only positive values of X, Y and Z. Its difference resides mainly on the fact that it is a device independant color model. It compensates the color sensations that are visible to a person with average eyesight.
- X is a mix of the three CIE RGB curves
- Y is the luminance (intensity of light emitted per unit area of light travelling in a given direction)
- Z is almost equal to the RGB blue.
{{< /tab >}}
{{< /tabs >}}

## Subtractive color models

A substractive color model is a model formed by the combination of lights after passing through succesive layers of absorbing components. It is called like that because a certain material substracts that colors RGB from a white/clear background (= it removes portions of the visible spectrum). In this colour model, the primary colors are cyan, magenta and yellow.

It generally corresponds to color produced when printing, photographying, drawing, ...

{{< tabs "id2" >}}
{{< tab "CMYK" >}}
### CMYK
The CMYK (Cyan, Magenta, Yellow, Black) color model is used to describe the printing process. It works by masking colors on a lighter background (as printing on a white paper, for example).
{{< /tab >}}
{{< /tabs >}}

## Combination of subtractive and additive color models

The two following models, HSL and HSB, are combinations of an additive and a substractive color model. They are subsets of the RGB color model. They were created in order to easy the generation of colors by humans, adjusting the RGB model to the way humans perceive the colors. 

{{< tabs "id3" >}}
{{< tab "HSL model" >}}
### HSL model
HSL stands for Hue, Saturation and Lightness.
- The hue corresponds to the color. Its value goes from 0 to 360, where 0 is red, and 360 is magenta. 
- The saturation represents how non "greyish" the color is. When its value is set to 0, the image is black and white, and when it is at its maximum the color is more intense.
- The lightness of a color stands for the degree of black and white present in the color. When you add white, the color lightens up, and when adding black, it darkens.
{{< /tab >}}

{{< tab "HSB model" >}}
### HSB model
HSB stands for Hue, Saturation and Brightness. It is the equivalent to HSV, which stands for Hue, Saturation and Value.
- The hue corresponds to the color. Its value goes from 0 to 360, where 0 is red, and 360 is magenta. 
- The saturation represents how non "greyish" the color is. When its value is set to 0, the image is black and white, and when it is at its maximum the color is more intense.
- The brightness/value represents the brightness/darkness of a color. The lower it is, the darker the color, and the higher it is, the lighter the color.
{{< /tab >}}
{{< /tabs >}}

## Modelisation of the color models

The different modelisations of the color models are shown in the following application :

{{< p5-global-iframe id='terrain_generation' width="430" height="430" >}}
let imgRGB;
let imgXYZ;
let imgCMYK; 
let imgHSL;
let imgHSB;

let bckgd = 255;
let sel1;

function setup() {
  textAlign(CENTER);
  createCanvas(400, 400);
  background(bckgd);
  preload();
  sel1 = createSelect();
  sel1.position(300, 50);
  sel1.option('__');
  sel1.option('RGB');
  sel1.option('XYZ');
  sel1.option('CMYK');
  sel1.option('HSB');
  sel1.option('HSL');  
  sel1.changed(onChange);
}

function preload(){
  imgRGB = loadImage('./../rgb_color.png');
  imgXYZ = loadImage('./../xyz_color.png');
  imgCMYK = loadImage('./../cmyk_color.png');
  imgHSL = loadImage('./../hsl_color.png');
  imgHSB = loadImage('./../hsb_color.png');
}

function onChange(){
   if (sel1.value() == '__'){
    background(bckgd);
  } else if (sel1.value() == 'RGB'){
    background(bckgd);
    image(imgRGB, 0, 0, width, height);
  } else if (sel1.value() == 'XYZ'){
    background(bckgd);
    image(imgXYZ, 0, 0, width, height);
  } else if (sel1.value() == 'HSB'){
    background(bckgd);
    image(imgHSB, 0, height/10, width, 4*height/5);
  } else if (sel1.value() == 'HSL'){
    background(bckgd);
    image(imgHSL, 0, 0, width, height);
  } else { //if (sel1.value() == 'CMYK')
    background(0);
    image(imgCMYK, 0, 0, width, height);
  }
}

function draw() {
  sel1.changed(onChange);
}
{{< /p5-global-iframe >}}


# Conclusion
This exercise allowed us to discover more about the different color models and their uses, and understand how they were developped through the centuries.

# Future work
As a future work, an idea would be to discover more about the conversions between the different color models, and eventually develop an application allowing us to retrieve the values of a given color in different color models.

# Resources
### RGB color model
**RGB color model**, Wikipedia, https://en.wikipedia.org/wiki/RGB_color_model#:~:text=The%20main%20purpose%20of%20the,been%20used%20in%20conventional%20photography

**RGB colour model**, Britannica, https://www.britannica.com/science/RGB-colour-model

### XYZ color model
**CIE XYZ color model**, Universitat Politecnica de Catalunya, https://ww2.lacan.upc.edu/doc/intel/ipp/ipp_manual/IPPI/ippi_ch6/
ch6_color_modelshtm#:~:text=The%20XYZ%20color%20space%20is,X%2C%20Y%2C%20and%20Z

**CIE XYZ color model**, Wikipedia, https://en.wikipedia.org/wiki/CIE_1931_color_space#:~:text=The%20CIE%20XYZ%20color%20space%20encompasses%20all%20color%20sensations%20that,other%20color%20spaces%20are%20defined

### CMYK color model
**CMYK color model**, Wikipedia, https://en.wikipedia.org/wiki/CMYK_color_model

### HSL and HSB color models
**HSL : a color format for humans**, cloudfour, https://cloudfour.com/thinks/hsl-a-color-format-for-humans/

**Mastering HSL in Lightroom : Part 1 of 3**, X-Equals, https://x-equals.com/mastering-hsl-in-lightroom-part-1-of-3/#:~:text=The%20HSL%20allows%20alteration%20of,Cyan)%2C%20Magenta%20and%20Yellow.

**HSL and HSV**, Wikipedia, https://en.wikipedia.org/wiki/HSL_and_HSV

**The fundamentals of color : Hue, Saturation and Lightness**, Vansea Design, https://vanseodesign.com/web-design/hue-saturation-and-lightness/


### Other resources
**List of color spaces and their uses**, Wikiwand, https://www.wikiwand.com/en/List_of_color_spaces_and_their_uses

**The 4 important color models for presentation designs (Part III)**, Presentitude, https://presentitude.com/color-theory-part-iii/

**Color**, LibreTexts GeoScience, https://geo.libretexts.org/Bookshelves/Geography_(Physical)/Essentials_of_Geographic_Information_Systems_(Campbell_and_Shin)/09%3A_Cartographic_Principles/9.01%3A_Color

**Understanding color theory**, PracticalECommerce, https://www.practicalecommerce.com/Understanding-Color-Theory

**What are additive and substractive colors?**, Quora, https://www.quora.com/What-are-additive-and-subtractive-colors

**Lights and color : an introduction**, Norman Koren, http://www.normankoren.com/light_color.html

**Color model**, Wikipedia, https://en.wikipedia.org/wiki/Color_model

**Additive color**, Wikipedia, https://en.wikipedia.org/wiki/Additive_color

**Substractive color**, Wikipedia, https://en.wikipedia.org/wiki/Subtractive_color

**Sintesis aditiva y sustractiva**, La Prestammpa, https://laprestampa.com/el-proceso-grafico/diseno/sintesis-aditiva-y-sustractiva/

**International Commission on Illumination**, Wikipedia, https://en.wikipedia.org/wiki/International_Commission_on_Illumination

**Additive & substractive color models**, Pavilion, https://pavilion.dinfos.edu/Article/Article/2355687/additive-subtractive-color-models/


