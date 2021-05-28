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
    for (let b = 0; b < vertices.length; b++) {
      if (a != b) {
        let ab = distance(vertices[a], vertices[b]) - edge_len;
        if (Math.abs(ab) < 0.001) {
          for (let c = 0; c < vertices.length; c++) {
            if (a != c && b != c) {
              let ab = distance(vertices[a], vertices[b]);
              let ac = distance(vertices[a], vertices[c]);
              let bc = distance(vertices[b], vertices[c]);
              let d1 = Math.abs(ab - ac);
              let d2 = Math.abs(ac - bc);
              if (d1 + d2 < 0.001) {
                let tmp = [vertices[a], vertices[b], vertices[c]];
                if (!is_in(r, tmp)) {
                  r.push(tmp);
                }
              }
            }
          }
        }
      }
    }
  }
  return r;
}

function icosahedron_vertices() {
  scale = 4;
  let vertices = [[-0.262865, 0, 0.425325], [0.262865, 0, 0.425325], [-0.262865, 0, -0.425325], [0.262865, 0, -0.425325], [0, 0.425325, 0.262865], [0, 0.425325, -0.262865], [0, -0.425325, 0.262865], [0, -0.425325, -0.262865], [0.425325, 0.262865, 0], [-0.425325, 0.262865, 0], [0.425325, -0.262865, 0], [-0.425325, -0.262865, 0]];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices[i].length; j++) {
      vertices[i][j] *= scale;
    }
  }
  let sides = triangular_sides(vertices);
  return sides;
}