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

function minimal_arr(arr2d) {
  let r = arr2d[0];
  for (let i = 1; i < arr2d.length; i++) {
    if (arr2d[i] < r) {
      r = arr2d[i];
    }
  }
  return r;
}


function tesseractSides(dimensions) {
  if (dimensions > 8) {
    //dimensions = 3;
  }
  let vertices = createTesseract(dimensions);
  let r = [];
  let repeat_checker = new Set();
  for (let a = 0; a < vertices.length; a++) {
    for (let b = 0; b < vertices.length; b++) {
      if (distance_around(vertices[a], vertices[b], 2) && (a != b)) {
        for (let c = 0; c < vertices.length; c++) {
          if (distance_around(vertices[b], vertices[c], 2) && (a != c) && (b != c)) {
            for (let d = 0; d < vertices.length; d++) {
              if (distance_around(vertices[c], vertices[d], 2) && distance_around(vertices[d], vertices[a], 2) && (a != d) && (b != d) && (c != d)) {
                let tmp0 = [a, b, c, d];
                let tmp1 = [b, c, d, a];
                let tmp2 = [c, d, a, b];
                let tmp3 = [d, a, b, c];

                let tmp4 = [d, c, b, a];
                let tmp5 = [c, b, a, d];
                let tmp6 = [b, a, d, c];
                let tmp7 = [a, d, c, b];
                let tmp = minimal_arr([tmp0, tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7]);
                let tmps = tmp.toString();
                if (!repeat_checker.has(tmps)) {
                  r.push(tmp);
                  repeat_checker.add(tmps);
                }
              }              
            }
          }
        }
      }
    }
  }
  return [r, vertices];
}

function tesseractEdges(dimensions) {
  let vertices = createTesseract(dimensions);
  let r = find_edges(vertices);
  return [r, vertices];
}