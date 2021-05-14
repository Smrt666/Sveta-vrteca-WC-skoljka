function createSimplex(dimensions) {
  if (dimensions == 1) {
    return [[1], [-1]];
  } else {
    let minor_siplex = createSimplex(dimensions - 1);
    k = 1 / minor_siplex.length * Math.sqrt(minor_siplex.length ** 2 - 1);
    for (let i = 0; i < minor_siplex.length; i++) {
      for (let j = 0; j < minor_siplex[i].length; j++) {
        minor_siplex[i][j] = minor_siplex[i][j] * k;
      }
      minor_siplex[i].push(-1/minor_siplex.length);
    }
    let new_vertex = [];
    for (let i = 0; i < dimensions; i++) {
      new_vertex.push(0);
    }
    new_vertex[new_vertex.length-1] = 1;
    minor_siplex.push(new_vertex);
    return minor_siplex;
  }
}


function simplexSides(dimensions) {
  let vertices = createSimplex(dimensions);
  let r = [];
  for (let a = 0; a < vertices.length; a++) {
    for (let b = a+1; b < vertices.length; b++) {
      for (let c = b+1; c < vertices.length; c++) {
        let ab = distance(vertices[a], vertices[b]);
        let ac = distance(vertices[a], vertices[c]);
        let bc = distance(vertices[b], vertices[c]);
        let d1 = ab - ac;
        let d2 = ac - bc;
        if (d1 + d2 < 0.000001) {
          let tmp = [vertices[a], vertices[b], vertices[c]];
          tmp.sort();
          r.push(tmp);
        }
      }
    }
  }
  let tmps = new Set(r);
  return Array.from(tmps);
}