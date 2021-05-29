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
  let scale = Math.floor(Math.log(dimensions)) + 1;
  let vertices = createSimplex(dimensions);
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices[i].length; j++) {
      vertices[i][j] *= scale;
    }
  }
  let r = triangular_sides(vertices);
  return [r, vertices];
}