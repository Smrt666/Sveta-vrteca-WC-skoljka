function init(d, obj, obj_type_names, obj_generator, d_range) {
  object_generator = obj_generator;
  type_names = obj_type_names;
  dimension_range = d_range;
  if (obj_type_names) {
    if (d < obj_type_names.length) {
      object_type = obj_type_names[d];
    } else {
      object_type = obj_type_names[obj_type_names.length - 1];
    }
  } else {
    object_type = undefined;
  }
  // console.log(object_type, obj_type_names);
  mode = 1;
  last_timestamp = 0;
  width = window.innerWidth;
  height = window.innerHeight;
  can = document.getElementById("canvas");
  if (Math.min(width, height) == height) {
    height *= 0.8;
  }
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
  edges = obj[0];

  isMouseDown = false;
  mouseX = 0;
  mouseY = 0;

  // console.log(vertices.length);
  if (vertices.length < 50) {
    draw_vertices = true;
  } else {
    draw_vertices = false;
  }

  fiel_of_view = 90.0; // stopinj
  aspect_ratio = height / width;

  Fov_scaling_factor = 1 / Math.tan(0.5 * fiel_of_view / 180 * Math.PI);
  if (dimensions == 2) {
    Fov_scaling_factor /= 2;
  }
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

  slider_mode = 0;
  if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
    slider_mode = 1;
  }

  if (slider_mode == 0) {
    slider_values = [];
    sliders = [];
    ctxs = [];
    for (let i = 0; i < rotations.length; i++) {
      slider_values.push(Math.PI / 6);
      sliders.push(insertSlider(i));
      ctxs.push(sliders[i].getContext("2d"));
      updateSlider(sliders[i], ctxs[i], i, true);
    }
  } else {
    slider_values = [];
    sliders = [];
    ctxs = [];
    for (let i = 0; i < rotations.length; i++) {
      slider_values.push(0);
      sliders.push(normal_slider(i));
      ctxs.push(undefined);
      updateSlider(sliders[i], ctxs[i], i, true);
    }
  }
  reset_angles();
  angles = [...slider_values];
  updateSliders();

  nastavitve = document.getElementById("nastavitve");
  newline_after_sliders = document.createElement("br");
  newline_after_sliders.setAttribute("id", "newline_after_sliders");
  nastavitve.appendChild(newline_after_sliders);

  let angles_reset_button = document.createElement("input");
  angles_reset_button.setAttribute("id", "angles_reset_button");
  angles_reset_button.setAttribute("type", "button");
  angles_reset_button.setAttribute("value", "Ponastavi kote");
  angles_reset_button.setAttribute("onclick", "reset_angles(); angles = [...slider_values]; updateSliders();");
  nastavitve.appendChild(angles_reset_button);

  let auto_rotate_button = document.createElement("input");
  auto_rotate_button.setAttribute("id", "auto_rotate_button");
  auto_rotate_button.setAttribute("type", "button");
  auto_rotate_button.setAttribute("value", "Samodejno vrtenje");
  auto_rotate_button.setAttribute("onclick", "mode_change()");
  nastavitve.appendChild(auto_rotate_button);

  if (dimension_range) {
    if (dimension_range[1] - dimension_range[0] > 1) {
      select_next_simulation_dimensions = document.createElement("input");
      select_next_simulation_dimensions.setAttribute("id", "dimensions");
      select_next_simulation_dimensions.setAttribute("type", "number");
      select_next_simulation_dimensions.setAttribute("min", "" + dimension_range[0]);
      select_next_simulation_dimensions.setAttribute("max", "" + dimension_range[1]);
      select_next_simulation_dimensions.setAttribute("value", "" + dimensions);
      nastavitve.appendChild(select_next_simulation_dimensions);

      new_dimension_button = document.createElement("input");
      new_dimension_button.setAttribute("id", "new_dimension_button");
      new_dimension_button.setAttribute("type", "button");
      new_dimension_button.setAttribute("value", "Vstopi v novo dimenzijo");
      new_dimension_button.setAttribute("onclick", "reset_all(select_next_simulation_dimensions.value)");
      nastavitve.appendChild(new_dimension_button);
    }
  }
}

function mode_change() {
  let btn = document.getElementById("auto_rotate_button");
  if (mode == 1) {
    mode = 0;
    btn.setAttribute("value", "Določi usmerjenost");
  } else {
    mode = 1;
    btn.setAttribute("value", "Samodejno vrtenje");
  }
}

function reset_all(d, nujno) {
  if (dimension_range || nujno) {
    if ((d >= dimension_range[0] && d <= dimension_range[1] && (d % 1 == 0)) || nujno) {
      clear_settings();
      init(d, object_generator(d), type_names, object_generator, dimension_range);
    } else {
      alert("Ni nujno najboljša ideja. Če pa si res želiš, poženi iz konzole: reset_all(" + d + ", true)");
    }
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
  if (mode == 0) { 
    angles_auto_rotate();
  } else {
    angles = slider_values;
  }
}

function mainloop(timestamp) {
  updateSliders();
  update_angles();
  update_matrices();

  //console.log(move);
  draw(vertices, edges, ctx, move, rotate);

  last_timestamp = timestamp;
  requestAnimationFrame(mainloop);
}

function insertSlider(i) {
  nastavitve = document.getElementById("nastavitve");
  let circ_slider = document.createElement("canvas");
  circ_slider.setAttribute("id", "CSlider" + i);
  nastavitve.appendChild(circ_slider);
  circ_slider.setAttribute("width", 100);
  circ_slider.setAttribute("height", 100);
  circ_slider.style = "border: none; margin: 10px";
  return circ_slider;
}

function normal_slider(i) {
  nastavitve = document.getElementById("nastavitve");
  let circ_slider = document.createElement("input");
  circ_slider.setAttribute("id", "CSlider" + i);
  circ_slider.setAttribute("type", "range");
  circ_slider.setAttribute("min", "-360");
  circ_slider.setAttribute("max", "360");
  circ_slider.setAttribute("value", "45");
  nastavitve.appendChild(circ_slider);
  return circ_slider;
}

onmousemove = function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}


onmousedown = function (e) {
  isMouseDown = true;
}
onmouseup = function (e) {
  isMouseDown = false;
}

function updateSliders() {
  for (let i = 0; i < sliders.length; i++) {
    updateSlider(sliders[i], ctxs[i], i);
  }
}

function updateSlider(slider, ctx, i, b) {
  if (mode == 1) {
    if (slider_mode == 0) {
      let ltx = slider.getBoundingClientRect().left;
      let lty = slider.getBoundingClientRect().top;
      //console.log(ltx, lty);
      ctx.beginPath();
      ctx.clearRect(0, 0, 100, 100);
      ctx.arc(50, 50, 49, 0, 2 * Math.PI);
      ctx.moveTo(50, 50);
      ctx.lineTo(49 * Math.cos(slider_values[i]) + 50, 49 * Math.sin(slider_values[i]) + 50);
      ctx.stroke();
      if (((ltx < mouseX && mouseX < ltx + 100) && (lty < mouseY && mouseY < lty + 100) && isMouseDown) || b) {
        slider_values[i] = Math.atan2(mouseY-lty-50, mouseX-ltx-50);
      }
    } else if (slider_mode == 1) {
      slider_values[i] = slider.value * Math.PI / 180;
    }
  } else {
    ctx.beginPath();
    ctx.clearRect(0, 0, 100, 100);
    ctx.arc(50, 50, 49, 0, 2 * Math.PI);
    ctx.moveTo(50, 50);
    ctx.lineTo(49 * Math.cos(slider_values[i]) + 50, 49 * Math.sin(slider_values[i]) + 50);
    ctx.stroke();
  }
}

function clear_settings() {
  slider_values = [];
  ctxs = [];
  for (let i = sliders.length - 1; i >= 0; i--) {
    sliders[i].remove();
  }
  sliders = [];
  select_next_simulation_dimensions.remove();
  new_dimension_button.remove();
  angles_reset_button.remove();
  auto_rotate_button.remove();
  newline_after_sliders.remove();
}