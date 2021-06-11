function ikosahedron_600cell(d) {
  if (d == 4) {
    return create600Cell();
  } else {
    return icosahedron_edges();
  }
}

function cell24(d) {
  let first4 = permutations([2, 0, 0, 0]);
  let second4 = permutations([-2, 0, 0, 0]);
  let ostalo = minuses([1, 1, 1, 1]);

  let vertices = first4.concat(second4).concat(ostalo);

  return [find_edges(vertices), vertices];
}


function clear_settings() {
  slider_values = [];
  ctxs = [];
  for (let i = sliders.length - 1; i >= 0; i--) {
    sliders[i].remove();
  }
  sliders = [];
  select_next_simulation_dimensions.remove();
  new_dimension_button.remove();
  angles_reset_button.remove();
  auto_rotate_button.remove();
  newline_after_sliders.remove();
  label_for_dimensions.remove();
  try {
    obj_change_button.remove();
  } catch (error) {
  }
}

obj = "600-celica"
function spec() {
  if (dimensions == 4) {
    obj_change_button = document.createElement("input");
    obj_change_button.setAttribute("id", "obj_change_button");
    obj_change_button.setAttribute("type", "button");
    obj_change_button.setAttribute("value", obj);
    obj_change_button.setAttribute("onclick", "ch_obj()");
    nastavitve.appendChild(obj_change_button);
    ch_obj();
    ch_obj();
  }
}

function ch_obj() {
  if (dimensions == 4) {
    let tmp;
    if (obj == "600-celica") {
      tmp = cell24(4);
      obj = "24-celica";
      document.getElementById("24-celica").hidden = false;
      document.getElementById("600-celica").hidden = true;
    } else {
      tmp = ikosahedron_600cell(4);
      obj = "600-celica";
      document.getElementById("24-celica").hidden = true;
      document.getElementById("600-celica").hidden = false;
    }
    obj_change_button.setAttribute("value", obj);
    edges = tmp[0];
    vertices = tmp[1];
  } else {
    document.getElementById("24-celica").hidden = true;
    document.getElementById("600-celica").hidden = true;
  }
}

function reset_all(d, nujno) {
  if (dimension_range || nujno) {
    if ((d >= dimension_range[0] && d <= dimension_range[1] && (d % 1 == 0)) || nujno) {
      clear_settings();
      init(d, object_generator(d), type_names, object_generator, dimension_range, spec);
    } else {
      alert("Ni nujno najboljša ideja. Če pa si res želiš, poženi iz konzole: reset_all(" + d + ", true)");
    }
  }
}