
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

function even_permutations(arr) {
  let r = [[...arr]];
  let repeat_checker = new Set([arr.toString()]);
  let added = true;
  while (added) {
    let tmpr = [];
    let tmpr_repeat_checker = new Set();
    for (let k = 0; k < r.length; k++) {
      for (let i = 0; i < r[k].length; i++) {
        for (let j = i + 1; j < r[k].length; j++) {
          let tmp = [...r[k]];
          let tmptmp = tmp[j];
          tmp[j] = tmp[i];
          tmp[i] = tmptmp;
          let tmps = tmp.toString();
          if (!tmpr_repeat_checker.has(tmps)) {
            tmpr.push(tmp);
            tmpr_repeat_checker.add(tmps);
          }
        }
      }
    }
    added = false;
    for (let k = 0; k < tmpr.length; k++) {
      for (let i = 0; i < tmpr[k].length; i++) {
        for (let j = i + 1; j < tmpr[k].length; j++) {
          let tmp = [...tmpr[k]];
          let tmptmp = tmp[i];
          tmp[i] = tmp[j];
          tmp[j] = tmptmp;
          let tmps = tmp.toString();
          if (!repeat_checker.has(tmps)) {
            r.push(tmp);
            repeat_checker.add(tmps);
            added = true;
          }
        }
      }
    }
  }  
  return r;
}
