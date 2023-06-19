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
  
  // brightness affects only rgb but no the alpha channel
  gl_FragColor = vec4(lightness * material.rgb, material.a);
}