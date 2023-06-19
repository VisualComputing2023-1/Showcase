precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;


void main() {
  gl_FragColor = uMaterial1 - (uMaterial2 * floor(uMaterial1/uMaterial2));
}