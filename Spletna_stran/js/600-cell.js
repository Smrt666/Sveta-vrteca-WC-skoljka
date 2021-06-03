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

function allConnections(vertices) {
  let r = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      r.push([i, j])
    }
  }
  return r;
}

function cell600_vertices() {
  let r = [];
  let phi = (1 + Math.sqrt(5)) / 2;

  // zgradba opisana na: https://www.mobilewiki.org/en/600-cell-6648488280

  let first16 = [];
  let tmp = minuses([1/2, 1/2, 1/2, 1/2]);
  for (let i = 0; i < tmp.length; i++) {
    first16.push(tmp[i]);
  }
  
  let second8 = [];
  tmp = permutations([0, 0, 0, 1]);
  for (let i = 0; i < tmp.length; i++) {
    let tmp2 = minuses(tmp[i]);
    for (let j = 0; j < tmp2.length; j++) {
      second8.push(tmp2[j]);
    }
  }
  
  let last96 = [];
  let repeat_checker = new Set();
  tmp = even_permutations([phi/2, 1/2, 1/phi/2, 0]);
  for (let i = 0; i < tmp.length; i++) {
    let tmp2 = minuses(tmp[i]);
    for (let j = 0; j < tmp2.length; j++) {
      if (!repeat_checker.has(tmp2[j].toString())) {
        last96.push(tmp2[j]);
        repeat_checker.add(tmp2[j].toString());
      }  

    }
  }

  return first16.concat(second8).concat(last96);
}

function arr_sum(arr1, arr2) {
  let r = [];
  for (let i = 0; i < arr1.length; i++) {
    r.push(arr1[i] + arr2[i]);
  }
  return r;
}



function create600Cell() {
  /*
  Predstavljam vam 600-cell - zadeva omejena s 600 tetraedri
  */
  let vertices = cell600_vertices();
  let edges = find_edges(vertices);
  return [edges, vertices];
}