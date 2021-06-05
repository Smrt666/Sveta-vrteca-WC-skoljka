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
  let con = complex_conj(c1)[0];
  let tmp = complex_mul(c1, con)[0][0];
  // console.log(tmp);
  return [[con[0] / tmp, con[1] / tmp]];
}

function complex_div(c1, c2) {
  return complex_mul(c1, division(c2)[0]);
}

function complex_abs(c) {
  return [Math.sqrt(c[0] ** 2 + c[1] ** 2)];
}

function pcround(x) {
  return Math.round((x % (2 * Math.PI)) * 1000);
}

function na4_mesta(x) {
  return Math.round(x * 10000) / 10000;
}
// complex_pow, complex_root
function complex_to_real_power(c, p) {
  let r = complex_abs(c)[0];
  let arg = Math.atan2(c[1], c[0]);

  r = r ** p;
  let repeat_checker = new Set();
  let starting_arg = arg * p;

  repeat_checker.add(pcround(starting_arg));
  let solution_args = [starting_arg];
  let next_arg = starting_arg + 2 * Math.PI * p;
  while (!repeat_checker.has(pcround(next_arg)) && solution_args.length < 10000) {
    solution_args.push(next_arg);
    next_arg += 2 * Math.PI * p;
  }

  let results = [];
  for (let i = 0; i < solution_args.length; i++) {
    results.push([na4_mesta(r * Math.cos(solution_args[i])), na4_mesta(r * Math.sin(solution_args[i]))]);
  }

  return results;
}

function complex_exponentation(c1, c2) {
  // console.log(c1, c2);
  let a = c1[0];
  let b = c1[1];
  let c = c2[0];
  let d = c2[1];
  if (a == 0 && b == 0 && c == 0 && d == 0) {
    return [1, 0];
  }
  let repeat_checker = new Set();
  let repeat_checker2 = new Set();
  let solutions = [];
  for (let arg = Math.atan2(b, a); !repeat_checker.has(pcround(arg)) && solutions.length < 10000; arg += 2 * Math.PI) {
    let r = (a**2 + b**2) ** (c / 2) * Math.E ** (- d * arg);
    let resarg = c * arg + 1 / 2 * d * Math.log(a ** 2 + b ** 2);
    let realunit = Math.cos(resarg);
    let imagunit = Math.sin(resarg);
    // console.log(r*realunit, r*imagunit);
    let sol = [na4_mesta(r * realunit), na4_mesta(r * imagunit)];
    let sols = sol.toString();
    if (repeat_checker2.has(sols)) {
      break;
    }
    repeat_checker2.add(sols);
    solutions.push(sol);
  }

  return solutions;
}

function complex_root(c1, c2) {
  return complex_exponentation(c1, division(c2)[0]);
}