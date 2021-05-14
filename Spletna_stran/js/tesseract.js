function createTesseract(dimensions) {
  if (dimensions == 1) {
    return [[-1], [1]];
  } else {
    let minor_ract = createTesseract(dimensions-1);
    let m = [];
    for (let i = 0; i < minor_ract.length; i++) {
      let tmp = minor_ract[i].slice();
      tmp.push(-1);
      m.push(tmp);
      tmp = minor_ract[i].slice();
      tmp.push(1);
      m.push(tmp);
    }
    return m;
  }
}



function tesseractSides(dimensions) {
  if (dimensions > 8) {
    dimensions = 3;
  }
  let vertices = createTesseract(dimensions);
  let r = [];
  for (let a = 0; a < vertices.length; a++) {
    for (let b = 0; b < vertices.length; b++) {
      if (distance_around(vertices[a], vertices[b], 2)) {
        for (let c = 0; c < vertices.length; c++) {
          if (distance_around(vertices[b], vertices[c], 2)) {
            for (let d = 0; d < vertices.length; d++) {
              if (distance_around(vertices[c], vertices[d], 2) && distance_around(vertices[d], vertices[a], 2)) {
                r.push([vertices[a], vertices[b], vertices[c], vertices[d]]);
              }              
            }
          }
        }
      }
    }
  }
  return r;
}