function middle(v1, v2) {
  let s = [];
  for (let i = 0; i < v1.length; i++) {
    s.push((v1[i] + v2[i]) / 2);
  }
  return s;
}

function find_edges2(vertices) {
  let r = [];
  let edge_len = Infinity;
  let count = {};
  for (let i = 0; i < vertices.length; i++) {
    count[i] = 6;
  }
  for (let a = 1; a < vertices.length; a++) {
    let d = distance(vertices[a], vertices[0]);
    if (d < edge_len) {
      edge_len = d;
    }
  }
  for (let a = 0; a < vertices.length; a++) {
    for (let b = a + 1; b < vertices.length; b++) {
      let ab = distance(vertices[a], vertices[b]) - edge_len;
      if (Math.abs(ab) < 0.001) {
        count[a]--;
        count[b]--;
        let tmp = [a, b];
        r.push(tmp);
      }
      if (count[a] <= 0) {
        break;
      }
    }
  }
  return r;
}

function iteration(p, n) {
  let t = [0, 0, 0, 0, 0, 0];
  t[0] = middle(p[0], p[1]);
  t[1] = middle(p[0], p[2]);
  t[2] = middle(p[0], p[3]);
  t[3] = middle(p[1], p[2]);
  t[4] = middle(p[1], p[3]);
  t[5] = middle(p[2], p[3]);

  if (n == 0) {
    return t;
  }

  let tets = [0, 0, 0, 0];
  tets[0] = iteration([p[0], t[0], t[1], t[2]], n-1);
  tets[1] = iteration([p[1], t[0], t[3], t[4]], n-1);
  tets[2] = iteration([p[2], t[1], t[3], t[5]], n-1);
  tets[3] = iteration([p[3], t[2], t[4], t[5]], n-1);

  let r = t;
  for (let i = 0; i < tets.length; i++) {
    for (let j = 0; j < tets[i].length; j++) {
      r.push(tets[i][j]);
    }
  }

  return r;
}

function fractal(n) {
  let p = [0, 0, 0, 0];
  p[0] = [0, 0, 1];
  p[1] = [0.8164965809277259, -0.4714045207910317, -0.3333333333333333];
  p[2] = [-0.8164965809277259, -0.4714045207910317, -0.3333333333333333];
  p[3] = [0, 0.9428090415820634, -0.3333333333333333];

  let points = iteration(p, n).concat(p);
  let edges = find_edges2(points);

  return [edges, points];
}