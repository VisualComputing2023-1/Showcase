# Color models

{{< hint info >}}
**Exercise**  
Research other color models such as HSL, HSB, XYZ.
{{< /hint >}}

Definition of subtractive/additive color models

## Additive color models

An additive color model is a model formed by the combination of coincident component lights, starting with blackness. In this model, the three primary colors are red, green and blue.

It corresponds to color produced by a combination of different lights.

{{< tabs "id1" >}}
{{< tab "RGB" >}}
### RGB
RGB content
The RGB color model allows to define colors thanks to three values defining respectively the quantity of red, green and blue for the defined colour.

This is a device-dependent color model, that was created in order to display coloured image on screens of electronic systems.

When looking at the spectrum of visible light, one can deduce that the three colors used in this model respectively correspond to a long wavelength (red), a medium wavelength (green) and a small wavelength (blue). This is then the most accurate way to describe a light emitted thanks to the combination of differents coloured lights, because it allows to go through the entire spectrum.

<img src="./../deliverable1_colormodels_RGB_spectrumofvisible.jpg"  width="60%" height="60%" style="display:block;float:none;align:center">

{{< /tab >}}

{{< tab "XYZ model" >}} 
### XYZ model
XYZ content
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

# Resources