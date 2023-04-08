let w = 1400;
let h = 1000;
let img;
let checkL;
let checkR;
let checkG;
let checkB;
let checkM;

function preload() {
  img = loadImage('https://i.insider.com/5da61ead045a311679316013?width=750&format=jpeg&auto=webp');
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  loadPixels();
  
  checkL = createCheckbox('Linterna', false);
  checkL.position(10, 10);
  checkL.changed(checkedR);
  
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
  
  var lintern = 0;
  
  if(checkedL){
    lintern = 255;  
  }
  
  
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calcular la posición 1D de una matriz 2D
      let loc = (x + y * img.width) * 4;
      // Obtener los valores R,G,B de una imagen
      let r, g, b;
      r = img.pixels[loc];
      g = img.pixels[loc + 1];
      b = img.pixels[loc + 2];
      // Calcular una cantidad a cambiar de brillo basado en la proximidad al ratón
      let maxdist = 50;
      let d = dist(x, y, mouseX, mouseY);
      let adjustbrightness = (lintern * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      g += adjustbrightness;
      b += adjustbrightness;
      // Limitar RGB para asegurarse de estar dentro del rango 0-255 de color
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);
      
      if(checkedR){
        r = 0;
      }
      
      if(checkedG){
        g = 0;
      }
      
      if(checkedB){
        b = 0;
        
      }
      
      if(checkedM){
        r = 0;
        g = 0;
        b = 0;
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
  if (this.checked()) {
    return true;
  } else {
    return false;
  }
}

function checkedR(){
  if (this.checked()) {
    return true;
  } else {
    return false;
  }
}

function checkedG(){
  if (this.checked()) {
    return true;
  } else {
    return false;
  }
}

function checkedB(){
  if (this.checked()) {
    return true;
  } else {
    return false;
  }
}

function checkedM(){
  if (this.checked()) {
    return true;
  } else {
    return false;
  }
}