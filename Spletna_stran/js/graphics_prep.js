function init(d, obj) { 
  mode = 1;
  last_timestamp = 0;
  width = window.innerWidth;
  height = window.innerHeight;
  can = document.getElementById("canvas");
  can.width = Math.min(width, height);
  can.height = Math.min(height, width);
  width = Math.min(width, height);
  height = Math.min(height, width);
  can.style.height = can.height;
  can.style.width = can.width;
  ctx = can.getContext("2d");
  r_near = 0.1;
  r_far = 1000.0;
  vertex_size = width * 0.04;

  dimensions = d;
  vertices = obj[1];
  sides = obj[0];

  // console.log(vertices.length);
  if (vertices.length < 50) {
    draw_vertices = true;
  } else {
    draw_vertices = false;
  }

  fiel_of_view = 90.0; // stopinj
  aspect_ratio = height / width;

  Fov_scaling_factor = 1 / Math.tan(0.5 * fiel_of_view / 180 * Math.PI);
  q = r_far / (r_far - r_near)
  
  // vector of translation
  move = [];
  for (let i = 0; i < dimensions; i++) {
    move.push(0);
  }
  move[2] = 3.5;

  // matrices of rotations
  rotations = [];
  angles = [];
  for (let i = 0; i < Math.floor(dimensions * (dimensions - 1) / 2); i++) {
    rotations.push(0);
    angles.push(Math.PI / 6);
  }
}
  

function update_matrices() {
  let index = 0;
  for (let i = 0; i < dimensions; i++) { // od vsake osi
    for (let j = i + 1; j < dimensions; j++) { // proti vsaki višje dimenzijski
      let matrix = [];
      for (let count = 0; count < dimensions; count++) { // vrstica
        let m = [];
        for (let count2 = 0; count2 < dimensions; count2++) { // nastavim stolpce na 0 ali 1
          if (count == count2) {
            m.push(1);
          } else {
            m.push(0);
          }
        }
        if (count == i) { // če vrtimo od tu
          m[i] = Math.cos(angles[index]);
          m[j] = -Math.sin(angles[index]);
        }
        if (count == j) { // če vrtimo sem
          m[i] = Math.sin(angles[index]);
          m[j] = Math.cos(angles[index]);
        }
        matrix.push(m);
      }
      rotations[index] = matrix;
      index++;
    }
  }
  rotate = rotations[rotations.length - 1];
  for (let i = rotations.length - 2; i >= 0; i--) {
    rotate = matrix_mul(rotate, rotations[i]);
  }
}

function update_angles() {
  for (let i = 0; i < angles.length; i++) {
    angles[i] = (angles[i] + (0.002 * (i + 1)) % 0.009845) % (2 * Math.PI);
  }
}

function mainloop(timestamp) {
  update_angles();
  update_matrices();

  draw(vertices, sides, ctx, move, rotate);

  last_timestamp = timestamp;
  requestAnimationFrame(mainloop);
}