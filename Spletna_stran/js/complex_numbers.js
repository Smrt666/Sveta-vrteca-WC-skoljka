function complex_sum(c1, c2) {
  return [[c1[0] + c2[0], c1[1] + c2[1]]];
}

function complex_diff(c1, c2) {
  return [[c1[0] + c2[0], c1[1] + c2[1]]];
}

function complex_mul(c1, c2) {
  return [[c1[0] * c2[0] - c1[1] * c2[1], c1[1] * c2[0] + c1[0] * c2[1]]];
}

function complex_conj(c) {
  return [[c[0], -c[1]]];
}

function division(c1) {
  let con = complex_conj(c1);
  let tmp = complex_mul(c1, con)[0];
  return [[con[0] / tmp, con[1] / tmp]];
}

// complex_pow, complex_root