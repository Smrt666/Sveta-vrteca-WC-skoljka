function generate_120_or_dodecahedron(d) {
  if (d == 4) {
    return create120Cell();
  } else {
    return dodecahedronEdges();
  }
}