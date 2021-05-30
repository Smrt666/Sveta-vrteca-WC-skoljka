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
  let tsds = tesseractSides(dimensions);
  let ncube_sides = tsds[0];
  let ncube_vertices = tsds[1];
  let vertices = [];
  ncube_sides.forEach(element => {
    let tmp = [];
    for (let i = 0; i < element.length; i++) {
      tmp.push(ncube_vertices[element[i]]);
    }
    vertices.push(average(tmp));
  });
  return vertices;
}

function octahedronSides(dimensions) {
  let vertices = createOctahedron(dimensions);
  let r = triangular_sides(vertices);
  return [r, vertices];
}

function octahedronEdges(dimensions) {
  let vertices = createOctahedron(dimensions);
  let r = find_edges(vertices);
  return [r, vertices];
}