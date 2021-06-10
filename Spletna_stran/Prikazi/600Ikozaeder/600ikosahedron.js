function ikosahedron_600cell(d) {
  if (d == 4) {
    return create600Cell();
  } else {
    return icosahedron_edges();
  }
}