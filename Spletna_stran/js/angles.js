function reset_angles() {
  for (let i = 0; i < slider_values.length; i++) {
    slider_values[i] = Math.PI / 6;
  }
  if (dimensions == 3) {
    if (object_type == "cube") {
      slider_values[0] = -0.22104706267501872;
      slider_values[1] = 2.5771922138734609;
      slider_values[2] = 2.7062393784374907;
    } else if (object_type == "icosahedron") {
      slider_values[0] = 0;
      slider_values[1] = Math.random() * Math.PI;
      slider_values[2] = Math.random() * Math.PI;
    } else if (object_type == "octahedron") {
      slider_values[0] = 0;
      slider_values[1] = - Math.PI * 7.5 / 8;
      slider_values[2] = Math.PI * 4.3 / 8;
    } else {
      slider_values[0] = 0;
      slider_values[1] = 0;
      slider_values[2] = 0;
    }
  } else if (dimensions == 4) {
    if (object_type == "tesseract") {
      slider_values[5] = Math.PI * 7 / 24;
    } else if (object_type == "120-Cell") {
      for (let i = 0; i < slider_values.length; i++) {
        slider_values[i] = 0;
      }
      slider_values[4] = 1;
      slider_values[5] = 1.5;
    } else if (object_type == "600-cell") {
      for (let i = 0; i < slider_values.length; i++) {
        slider_values[i] = 0;
      }
      slider_values[4] = 0.548308; // Math.PI/6;
      slider_values[5] = 1.570796; // Math.PI/2;
    } else if (object_type == "simplex") {
      slider_values[0] = 0;
      slider_values[1] = 0.2;
      slider_values[2] = 0.2;
      slider_values[3] = - Math.PI / 2 + 0.2;
      slider_values[4] = - Math.PI / 2 - 0.2;
      slider_values[5] = Math.PI / 2;
    } else if (object_type == "120-cell") {
      for (let i = 0; i < angles.length; i++) {
        slider_values[i] = 0;
      }
    } else {
      for (let i = 0; i < slider_values.length; i++) {
        slider_values[i] = Math.random() * 2 * Math.PI;
      }
    }
  } else {
    if (object_type == "n-cube") {
      for (let i = 0; i < slider_values.length; i++) {
        slider_values[i] = Math.random() * 2 * Math.PI;
      }
      slider_values[slider_values.length - 1] = Math.PI * 7 / 24;
    } else {
      for (let i = 0; i < slider_values.length; i++) {
        slider_values[i] = Math.random() * 2 * Math.PI;
      }
    }
  }
  for (let i = 0; i < slider_values.length; i++) {
    angles[i] = slider_values[i];
    sliders[i].value = angles[i] * 180 / Math.PI;
  }
}

function angles_auto_rotate() {
  if (dimensions == 4) {
    if (object_type == "tesseract") {
      angles[5] = (angles[5] + 0.01) % (2 * Math.PI);
    } else {
      for (let i = 0; i < angles.length; i++) {
        angles[i] = (angles[i] + (0.002 * (i + 1)) % 0.00984575163) % (2 * Math.PI);
      }
    }
  } else {
    for (let i = 0; i < angles.length; i++) {
      angles[i] = (angles[i] + (0.002 * (i + 1)) % 0.00984575163) % (2 * Math.PI);
    }
  }
  for (let i = 0; i < angles.length; i++) {
    slider_values[i] = angles[i];
  }
}