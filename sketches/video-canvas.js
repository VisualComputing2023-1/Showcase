let fingers;

function setup() {
  createCanvas(710, 400);
  // specify multiple formats for different browsers
  fingers = createVideo(['/showcase/sketches/fingers.mov', '/showcase/sketches/fingers.webm']);
  fingers.hide(); // by default video shows up in separate dom
  // element. hide it and draw it to the canvas
  // instead
}

function draw() {
  background(150);
  image(fingers, 10, 10); // draw the video frame to canvas
  filter(GRAY);
  image(fingers, 150, 150); // draw a second copy to canvas
}

function mousePressed() {
  fingers.loop(); // set the video to loop and start playing
}