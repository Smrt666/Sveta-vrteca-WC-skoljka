function minuses(arr) {
  let r = [];
  let repeat_checker = new Set();
  for (let i = 0; i < (2 ** arr.length); i++) {
    let tmp = [];
    for (let j = 0; j < arr.length; j++) {
      if (((i >> j) & 1) == 1) {
        tmp.push(arr[j] * -1);
      } else {
        tmp.push(arr[j]);
      }
    }
    let stmp = tmp.toString();
    if (!repeat_checker.has(stmp)) {
      r.push(tmp);
      repeat_checker.add(stmp);
    }
  }

  return r;
}

function differences(arr, arr1) {
  let r = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != arr1[i]) {
      r++;
    }
  }
  return r;
}


function permutations(arr) {
  let r = [];
  if (arr.length === 1) {
    r.push(arr[0]);
    return r;
  }
  let repeat_checker = new Set();
  for (let i = 0; i < arr.length; i++) {
    let first = arr[i];
    let rest = arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
    let rest_perm = permutations(rest);
    for (let j = 0; j < rest_perm.length; j++) {
      let tmp = [first].concat(rest_perm[j]);
      let stmp = tmp.toString();
      if (!repeat_checker.has(stmp)) {
        r.push(tmp);
        repeat_checker.add(stmp);
      }
    }
  }

  return r;
}

function allConnections(vertices) {
  let r = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      r.push([i, j])
    }
  }
  return r;
}

function sign_and_permutations(arr) {
  let r = [];
  let repeat_checker = new Set();
  let tmp = permutations(arr);
  for (let i = 0; i < tmp.length; i++) {
    let tmp2 = minuses(tmp[i]);
    for (let j = 0; j < tmp2.length; j++) {
      let tmptmp = tmp2[j];
      let tmptmps = tmptmp.toString();
      if (!repeat_checker.has(tmptmps)) {
        r.push(tmptmp);
        repeat_checker.add(tmptmps);
      }
    }
  }
  return r;
}

function sign_and_even_permutations(arr) {
  let r = [];
  let repeat_checker = new Set();
  let tmp = even_permutations(arr);
  for (let i = 0; i < tmp.length; i++) {
    let tmp2 = minuses(tmp[i]);
    for (let j = 0; j < tmp2.length; j++) {
      let tmptmp = tmp2[j];
      let tmptmps = tmptmp.toString();
      if (!repeat_checker.has(tmptmps)) {
        r.push(tmptmp);
        repeat_checker.add(tmptmps);
      }
    }
  }
  return r;
}

function cell120_vertices() {
  let r = [];
  let repeat_checker = new Set();

  // izgradnja opisana na: https://talata.istvan.ymmf.hu/2018_tavasz/120_cell_wikipedia.pdf

  let phi = (1 + Math.sqrt(5)) / 2;

  let first = [0, 0, 2, 2];
  let second = [[1, 1, 1, Math.sqrt(5)],
                [phi**-2, phi, phi, phi],
                [1/phi, 1/phi, 1/phi, phi**2]];

  let third = [[0, phi**-2, 1, phi**2],
               [0, 1/phi, phi, Math.sqrt(5)],
               [1/phi, 1, phi, 2]];

  let r1 = sign_and_permutations(first);
  r = r.concat(r1);
  // console.log(r1);

  let r2s = [];
  for (let k = 0; k < second.length; k++) {
    let tmp = sign_and_permutations(second[k]);
    r = r.concat(tmp);
    // console.log(tmp);
  }

  let r3s = [];
  for (let k = 0; k < third.length; k++) {
    let tmp = sign_and_even_permutations(third[k]);
    r = r.concat(tmp);
    // console.log(tmp);
  }
  return r;
}

function arr_sum(arr1, arr2) {
  let r = [];
  for (let i = 0; i < arr1.length; i++) {
    r.push(arr1[i] + arr2[i]);
  }
  return r;
}


function create120Cell() {
  let vertices = cell120_vertices();
  // console.log(vertices);
  let edges = find_edges(vertices);
  return [edges, vertices];
}