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

function vr_change() {
  let r = [];
  let repeat_checker = new Set();

  let phi = (1 + Math.sqrt(5)) / 2;
  let chs = [[0, 0, 2, 2],
             [1, 1, 1, Math.sqrt(5)],
             [phi**-2, phi, phi, phi],
             [1/phi, 1/phi, 1/phi, phi**2]];
  let even_chs = [[0, phi**-2, 1, phi**2],
                  [0, phi**-1, phi, Math.sqrt(5)],
                  [1/phi, 1, phi, 2]];
  for (let i = 0; i < chs.length; i++) {
    let minus_tmp = minuses(chs[i]); // [chs[i]]; // 
    for (let j = 0; j < minus_tmp.length; j++) {
      let perms = permutations(minus_tmp[j]); // [minus_tmp[j]]; // permutations(minus_tmp[j]);
      for (let k = 0; k < perms.length; k++) {
        let tmp = perms[k];
        let stmp = tmp.toString();
        if (!repeat_checker.has(stmp)) {
          r.push(tmp);
          repeat_checker.add(stmp);
        }
      }
    }
  }
  for (let i = 0; i < even_chs.length; i++) {
    let minus_tmp = [even_chs[i]]; // minuses(chs[i]);
    for (let j = 0; j < minus_tmp.length; j++) {
      let perms = permutations(minus_tmp[j]); // [minus_tmp[j]]; // permutations(minus_tmp[j]);
      for (let k = 0; k < perms.length; k++) {
        let tmp = perms[k];
        if (differences(minus_tmp[j], tmp) % 2 === 1) {
          //console.log("non-even");
          //continue;
        }
        let stmp = tmp.toString();
        if (!repeat_checker.has(stmp)) {
          r.push(tmp);
          repeat_checker.add(stmp);
        }
      }
    }
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

function cell120_vertices() {
  let cell24_vertices = createOctahedron(4);
  let chs = vr_change();
  let r = [];
  let repeat_checker = new Set();
  for (let i = 0; i < chs.length; i++) {
    for (let j = 0; j < cell24_vertices.length; j++) {
      // console.log(cell24_vertices[j], chs[i]);
      let tmp = arr_sum(cell24_vertices[j], chs[i]);
      let stmp = tmp.toString();
      if (!repeat_checker.has(stmp)) {
        r.push(tmp);
        repeat_checker.add(stmp);
      }
    }
  }
  return chs;
  
}

function create120Cell() {
  let vertices = cell120_vertices();
  console.log(vertices);
  let edges = find_edges(vertices);
  return [edges, vertices];
}