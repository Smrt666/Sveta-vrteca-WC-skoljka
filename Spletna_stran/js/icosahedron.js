function icosahedron_vertices() {
  scale = 4;
  let vertices = [[-0.262865, 0, 0.425325], [0.262865, 0, 0.425325], [-0.262865, 0, -0.425325], [0.262865, 0, -0.425325], [0, 0.425325, 0.262865], [0, 0.425325, -0.262865], [0, -0.425325, 0.262865], [0, -0.425325, -0.262865], [0.425325, 0.262865, 0], [-0.425325, 0.262865, 0], [0.425325, -0.262865, 0], [-0.425325, -0.262865, 0]];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices[i].length; j++) {
      vertices[i][j] *= scale;
    }
  }
  let sides = triangular_sides(vertices);
  return [sides, vertices];
}

function icosahedron_edges() {
  scale = 4;
  let vertices = [[-0.262865, 0, 0.425325], [0.262865, 0, 0.425325], [-0.262865, 0, -0.425325], [0.262865, 0, -0.425325], [0, 0.425325, 0.262865], [0, 0.425325, -0.262865], [0, -0.425325, 0.262865], [0, -0.425325, -0.262865], [0.425325, 0.262865, 0], [-0.425325, 0.262865, 0], [0.425325, -0.262865, 0], [-0.425325, -0.262865, 0]];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices[i].length; j++) {
      vertices[i][j] *= scale;
    }
  }
  let sides = find_edges(vertices);
  return [sides, vertices];
}