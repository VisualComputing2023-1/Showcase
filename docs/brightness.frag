precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  vec4 material = uMaterial1 * uMaterial2;
  // brightness affects only rgb but no the alpha channel
  gl_FragColor = vec4(brightness * material.rgb, material.a);
}