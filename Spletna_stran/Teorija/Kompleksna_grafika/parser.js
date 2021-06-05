function border(text) {
  if (text.length == 0) {
    return text;
  } else {
    if (" ,;\n\t".includes(text[0])) {
      return border(text.slice(1));
    } else {
      return text;
    }
  }
}
function whitespace(text) {
  if (text.length == 0) {
    return text;
  } else {
    if (" \n\t".includes(text[0])) {
      return whitespace(text.slice(1));
    } else {
      return text;
    }
  }
}
function whitespace_semicolon(text) {
  if (text.length == 0) {
    return text;
  } else {
    if (" \n\t;,".includes(text[0])) {
      return whitespace(text.slice(1));
    } else {
      return text;
    }
  }
}
function oklepaj(text) {
  if (text.length == 0) {
    return text;
  } else {
    if ("([{\"'<|,".includes(text[0])) {
      return border(text.slice(1));
    } else {
      return text;
    }
  }
}
function do_zaklepaja(text) {
  if (text.length == 0) {
    return text;
  } else {
    let r = "";
    for (let i = 0; i < text.length; i++) {
      if (")]}\">|;\n,".includes(text[i])) {
        return [r, text.slice(i + 1)];
      } else {
        r += text[i];
      }
    }
    return [r, ""];
  }
}
function preberi_kompleksno_st(text) {
  // console.log(text);
  text = whitespace(text);
  let real;
  let imag;
  let first = 1;
  if (text[0] == "-") {
    text = text.slice(1);
    first = -1;
  }
  text = whitespace(text);
  first *= parseFloat(text);
  if (first == NaN) {
    first = 0;
  }
  while (text.length && "0123456789.".includes(text[0])) {
    text = text.slice(1);
  }
  text = whitespace(text);
  if (text.length && text[0] == "i") {
    imag = first;
    text = text.slice(1);
  } else {
    real = first;
  }
  text = whitespace(text);

  let second = 1;
  if (text.length && text[0] == "+") {
    text = text.slice(1);
  } else if (text.length && text[0] == "-") {
    text = text.slice(1);
    second *= -1;
  } else {
    //console.log("en člen");
    if (typeof imag == 'undefined') {
      imag = 0;
    } else {
      real = 0;
    }
    return [real, imag];
  }
  text = whitespace(text);
  if (text.length && text[0] == "-") {
    second *= -1;
    text = text.slice(1);
  }
  text = whitespace(text);
  second *= parseFloat(text);
  if (second == NaN) {
    second = 0;
  }
  if (typeof imag == 'undefined') {
    imag = second;
  } else {
    real = second;
  }

  return [real, imag];
}
function read_initial_complex_numbers() {
  let text = document.getElementById("zacetne_tocke").value;
  while (text.includes("- ")) {
    text = text.replace("- ", "-");
  }
  let r = [];
  while (text.length > 0) {
    text = border(text);
    text = oklepaj(text);
    if (text.length) {
      let rslt = do_zaklepaja(text);
      let stevilka = rslt[0];
      text = rslt[1];

      r.push(preberi_kompleksno_st(stevilka));
    }
  }

  return r;
}

function do_konca_ukaza(text) {
  let r = "";
  while (text.length && !";\n".includes(text[0])) {
    r += text[0];
    text = text.slice(1);
  }
  text = whitespace_semicolon(text);
  return [r, text];
}

function do_nothing(c) {
  return [c];
}

function dobi_ukaz(text) {
  text = whitespace(text);
  text = border(text);
  text = oklepaj(text);
  text = whitespace(text);
  text = do_zaklepaja(text)[0];
  if (!text.length) {
    return [do_nothing];
  }
  let ukazni_simbol = text[0];
  text = text.slice(1);
  text = whitespace(text);
  text = border(text);
  text = whitespace(text);
  text = oklepaj(text);
  text = whitespace(text);
  let st = [1, 0];
  if (text.length) {
    st = preberi_kompleksno_st(text);
  }
  if (ukazni_simbol == "+") {
    return [complex_sum, st];
  } else if (ukazni_simbol == "-") {
    return [complex_diff, st];
  } else if (ukazni_simbol == "*") {
    return [complex_mul, st];
  } else if (ukazni_simbol == "/") {
    return [complex_div, st];
  } else if (ukazni_simbol == "^") {
    // console.log(st);
    return [complex_exponentation, st];
  } else if (ukazni_simbol == "r") {
    return [complex_root, st];
  } else if(ukazni_simbol == "!") {
    return [complex_conj, st];
  } else {
    return [do_nothing, st];
  }
}

function read_operations(id) {
  let text = document.getElementById(id).value;
  text = whitespace(text);
  text = border(text);
  text = oklepaj(text);
  let ukazi = [];
  while (text.length) {
    let tmp = do_konca_ukaza(text);
    let ukaz = tmp[0];
    ukazi.push(dobi_ukaz(ukaz));
    text = tmp[1];
  }

  return ukazi;
}

function to_csystem(c) {
  return [(c[0] / 20 + 1) * width / 2, (c[1] / 20 + 1) * width / 2];
}
running = false;

function run() {
  let fps_set = document.getElementById("fps");
  if (running == true) {
    running = false;
    document.getElementById("pogon").value = "Poženi";
    return;
  }
  document.getElementById("pogon").value = "Ustavi";
  running = true;
  let starting_numbers = read_initial_complex_numbers();
  let initial_operations = read_operations("zacetne_operacije");
  let looping_operations = read_operations("ponavljajoce_operacije");
  let all_numbers = [...starting_numbers];
  try { 
    // console.log(all_numbers);
    for (let i = 0; i < initial_operations.length; i++) {
      let new_numbers = [];
      for (let j = 0; j < all_numbers.length; j++) {
        // console.log(initial_operations[i]);
        new_numbers = new_numbers.concat(initial_operations[i][0](all_numbers[j], initial_operations[i][1]));
      }
      all_numbers = new_numbers.slice(0, 10000);
    }
  } catch {}
  
  ctx.beginPath();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "green";
  for (let i = 0; i < all_numbers.length; i++) {
    let xy = to_csystem(all_numbers[i]);
    ctx.fillRect(xy[0] - 2, xy[1] - 3, 4, 6);
    ctx.fillRect(xy[0] - 3, xy[1] - 2, 6, 4);
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "blue";
  for (let i = 0; i < starting_numbers.length; i++) {
    let xy = to_csystem(starting_numbers[i]);
    ctx.fillRect(xy[0] - 2, xy[1] - 3, 4, 6);
    ctx.fillRect(xy[0] - 3, xy[1] - 2, 6, 4);
  }
  ctx.stroke();

  function mainloop() {
    for (let i = 0; i < looping_operations.length; i++) {
      let new_numbers = [];
      for (let j = 0; j < all_numbers.length; j++) {
        new_numbers = new_numbers.concat(looping_operations[i][0](all_numbers[j], looping_operations[i][1]));
        if (new_numbers.length >= 10000) {
          running = false;
          document.getElementById("pogon").value = "Poženi";
          alert("Pri računanju je nastalo preveč točk.");
          return;
        }
      }
      all_numbers = new_numbers.slice(0, 10000);
    }

    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "green";
    for (let i = 0; i < all_numbers.length; i++) {
      let xy = to_csystem(all_numbers[i]);
      ctx.fillRect(xy[0] - 2, xy[1] - 3, 4, 6);
      ctx.fillRect(xy[0] - 3, xy[1] - 2, 6, 4);
    }
    ctx.fillStyle = "blue";
    for (let i = 0; i < starting_numbers.length; i++) {
      let xy = to_csystem(starting_numbers[i]);
      ctx.fillRect(xy[0] - 2, xy[1] - 3, 4, 6);
      ctx.fillRect(xy[0] - 3, xy[1] - 2, 6, 4);
    }
    ctx.stroke();
    if (running && looping_operations.length) {
      let fps = parseFloat(fps_set.value);
      if ((fps > 60) || (fps < 0.2)) {
        fps = 10;
      }
      setTimeout(() => {
        requestAnimationFrame(mainloop);
      }, 1000 / fps);
    } else {
      document.getElementById("pogon").value = "Poženi";
      running = false;
    }
  }

  requestAnimationFrame(mainloop);
}