precision mediump float;

uniform float darkness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

vec4 material;

void main() {
  if(uMaterial1.rgb[0]*darkness+uMaterial1.rgb[1]*darkness+uMaterial1.rgb[2]*darkness > uMaterial2.rgb[0]*darkness+uMaterial2.rgb[1]*darkness+uMaterial2.rgb[2]*darkness){
    material = uMaterial2;
  }else{
    material = uMaterial1;
  }
  
  // brightness affects only rgb but no the alpha channel
  gl_FragColor = vec4(darkness * material.rgb, material.a);
}