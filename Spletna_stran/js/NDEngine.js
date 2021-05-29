
// [x, y, z] -> [aspect_ratio * Fov_scaling_factor * x / z, Fov_scaling_factor * y / z, q * (z - r_near)]
// To je slika točke med -1 in 1
function triangular_sides(vertices) {
  let r = [];
  let edge_len = Infinity;
  for (let a = 0; a < vertices.length; a++) {
    for (let b = a + 1; b < vertices.length; b++) {
      let d = distance(vertices[a], vertices[b]);
      if (d < edge_len) {
        edge_len = d;
      }
    }
  }
  for (let a = 0; a < vertices.length; a++) {
    for (let b = a + 1; b < vertices.length; b++) {
      let ab = distance(vertices[a], vertices[b]) - edge_len;
      if (Math.abs(ab) < 0.001) {
        for (let c = b + 1; c < vertices.length; c++) {
          if (a != c && b != c) {
            let ab = distance(vertices[a], vertices[b]);
            let ac = distance(vertices[a], vertices[c]);
            let bc = distance(vertices[b], vertices[c]);
            let d1 = Math.abs(ab - ac);
            let d2 = Math.abs(ac - bc);
            if (d1 + d2 < 0.001) {
              let tmp = [a, b, c];
              r.push(tmp);
            }
          }
        }
      }
    }
  }
  return r;
}


function R2(point) {
  let s = 0;
  for (let i = 2; i < point.length; i++) {
    s += point[i] * point[i];
  }
  if (s == 0) {
    return 1;
  }
  return Math.sqrt(s);
}

function distance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

function distance2(a, b) {
  let sum = 0;
  for (let i = 2; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

function distance_around(a, b, d) {
  let ab = distance(a, b);
  if (Math.abs(ab - d) < 0.001) {
    return true;
  } else {
    return false;
  }
}

function eq(arr1, arr2) {
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
}

function is_in(arr, v) {
  for (let i = 0; i < arr.length; i++) {
    if (eq(arr[i], v)) {
      return true;
    }
  }
  return false;
}

function move_to_center(point) {
  let x = point[0];
  let y = point[1];
  let z = R2(point);
  let p = [aspect_ratio * Fov_scaling_factor * x / z, Fov_scaling_factor * y / z, q * (z - r_near)];
  scale = 1;
  let r = [(p[0] + 1) * width / 2 * scale, (p[1] + 1) * height / 2 * scale];
  for (let i = 2; i < point.length; i++) {
    r.push(point[i]);
  }
  return r;
}

function visible(point) {
  let s = true;
  for (let i = 2; i < point.length; i++) {
    s = s && (point[i] >= 0);
  }

  return s;
}


function project_vertices(vertices, move, rotate) {
  projected_vertices = [];
  for (let j = 0; j < vertices.length; j++) {
    let tmp = matrix_sub(matrix_mul([vertices[j]], rotate), [move])[0];
    // najprej zavrtmo okrog 0, potem pa premaknemo glede na kamero
    let projected = move_to_center(tmp);
    projected_vertices.push(projected);
  }
  return projected_vertices;
}

function draw_rectangles(sides, points, surface) {
  surface.beginPath();
  for (let s = 0; s < sides.length; s++) {
    surface.moveTo(points[sides[s][0]][0], points[sides[s][0]][1]);
    for (let i = 0; i < sides[s].length; i++) {
      surface.lineTo(points[sides[s][i]][0], points[sides[s][i]][1]);
    }
    surface.lineTo(points[sides[s][0]][0], points[sides[s][0]][1]);
  }
  if (draw_vertices) {
    let scf = 30;
    for (let i = 0; i < points.length; i++) {
      let d = scf / R2(points[i]);
      surface.fillRect(points[i][0] - d, points[i][1] - d * 2 / 3, 2 * d, d * 4 / 3);
      surface.fillRect(points[i][0] - d * 2 / 3, points[i][1] - d, d * 4 / 3, 2 * d);
    }
  }
  surface.stroke();
}

function draw(vertices, sides, ctx, move, rotate) {
  let td = project_vertices(vertices, move, rotate);
  ctx.clearRect(0, 0, can.width, can.height);
  draw_rectangles(sides, td, ctx)

}