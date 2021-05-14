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
    //dimensions = 3;
  }
  let vertices = createTesseract(dimensions);
  let r = [];
  for (let a = 0; a < vertices.length; a++) {
    for (let b = 0; b < vertices.length; b++) {
      if (distance_around(vertices[a], vertices[b], 2) && (a != b)) {
        for (let c = 0; c < vertices.length; c++) {
          if (distance_around(vertices[b], vertices[c], 2) && (a != c) && (b != c)) {
            for (let d = 0; d < vertices.length; d++) {
              if (distance_around(vertices[c], vertices[d], 2) && distance_around(vertices[d], vertices[a], 2) && (a != d) && (b != d) && (c != d)) {
                let tmp0 = [vertices[a], vertices[b], vertices[c], vertices[d]];
                let tmp1 = [vertices[b], vertices[c], vertices[d], vertices[a]];
                let tmp2 = [vertices[c], vertices[d], vertices[a], vertices[b]];
                let tmp3 = [vertices[d], vertices[a], vertices[b], vertices[c]];

                let tmp4 = [vertices[d], vertices[c], vertices[b], vertices[a]];
                let tmp5 = [vertices[c], vertices[b], vertices[a], vertices[d]];
                let tmp6 = [vertices[b], vertices[a], vertices[d], vertices[c]];
                let tmp7 = [vertices[a], vertices[d], vertices[c], vertices[b]];
                if ((!is_in(r, tmp0)) && (!is_in(r, tmp1)) && (!is_in(r, tmp2)) && (!is_in(r, tmp3)) && (!is_in(r, tmp4)) && (!is_in(r, tmp5)) && (!is_in(r, tmp6)) && (!is_in(r, tmp7))) {
                  r.push(tmp0);
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