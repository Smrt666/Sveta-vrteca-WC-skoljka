function average(v) {
  let s = v[0].slice();
  for (let i = 1; i < v.length; i++) {
    for (let j = 0; j < s.length; j++) {
      s[j] += v[i][j];
    }
  }
  for (let i = 0; i < s.length; i++) {
    s[i] = s[i] / v.length;
  }
  return s;
}

function createOctahedron(dimensions) {
  let ncube_sides = tesseractSides(dimensions);
  let vertices = [];
  ncube_sides.forEach(element => {
    vertices.push(average(element));
  });
  return vertices;
}

function octahedronSides(dimensions) {
  let vertices = createOctahedron(dimensions);
  let r = [];
  for (let a = 0; a < vertices.length; a++) {
    for (let b = 0; b < vertices.length; b++) {
      if (a != b) { 
        for (let c = 0; c < vertices.length; c++) {
          if (a != c && b != c) {
            let ab = distance(vertices[a], vertices[b]);
            let ac = distance(vertices[a], vertices[c]);
            let bc = distance(vertices[b], vertices[c]);
            let d1 = Math.abs(ab - ac);
            let d2 = Math.abs(ac - bc);
            if (d1 + d2 < 0.000001) {
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
  return r;
}