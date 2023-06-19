precision mediump float;

uniform vec4 uMaterial1;
uniform vec4 uMaterial2;
vec4 finalCol;

void main() {
  gl_FragColor = uMaterial1 * uMaterial2;
  finalCol = gl_FragColor;
}