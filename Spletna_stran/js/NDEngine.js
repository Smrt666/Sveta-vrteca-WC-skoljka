
// [x, y, z] -> [aspect_ratio * Fov_scaling_factor * x / z, Fov_scaling_factor * y / z, q * (z - r_near)]
// To je slika točke med -1 in 1


function R2(point) {
        let s = 0;
        for (let i = 2; i < point.length; i++) {
                s += point[i] * point[i];
        }
        if (s == 0) {
                return 1;
        }
        return Math.sqrt(s);
}

function distance(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
                sum += (a[i] - b[i]) ** 2;
        }
        return Math.sqrt(sum);
}

function distance2(a, b) {
        let sum = 0;
        for (let i = 2; i < a.length; i++) {
                sum += (a[i] - b[i]) ** 2;
        }
        return Math.sqrt(sum);
}

function distance_around(a, b, d) {
        let ab = distance(a, b);
        if (Math.abs(ab - d) < 0.001) {
                return true;
        } else {
                return false;
        }
}

function eq(arr1, arr2) {
        if (arr1.length != arr2.length) {
                return false;
        }
        for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] != arr2[i]) {
                        return false;
                }
        }
        return true;
}

function is_in(arr, v) {
        for (let i = 0; i < arr.length; i++) {
                if (eq(arr[i], v)) {
                        return true;
                }
        }
        return false;
}

function move_to_center(point) {
        let x = point[0];
        let y = point[1];
        let z = R2(point);
        let p = [aspect_ratio * Fov_scaling_factor * x / z, Fov_scaling_factor * y / z, q * (z - r_near)];
        scale = 1;
        let r = [(p[0] + 1) * width / 2 * scale, (p[1] + 1) * height / 2 * scale];
        for (let i = 2; i < point.length; i++) {
                r.push(point[i]);
        }
        return r;
}

function visible(point) {
        let s = true;
        for (let i = 2; i < point.length; i++) {
                s = s && (point[i] >= 0);
        }

        return s;
}


function project_objects(objects, move, rotate) {
        proj_objects = [];
        for (let i=0; i < objects.length; i++) {
                const object = objects[i];
                let projected_points = [];
                let to_draw = true;
                for (let j=0; j < object.length; j++) {
                        let tmp = matrix_sub(matrix_mul([object[j]], rotate), [move])[0];
                        // najprej zavrtmo okrog 0, potem pa premaknemo glede na kamero
                        if (r_near < R2(tmp) < r_far) { // && visible(tmp)
                                let projected = move_to_center(tmp);
                                projected_points.push(projected);
                        } else{
                                to_draw = false;
                        }
                }
                if (to_draw) {
                        proj_objects.push(projected_points);
                }
        }
        return proj_objects;
}

function draw_rectangle(surface, p, move) {
        surface.beginPath();
        surface.moveTo(p[0], p[0]);
        for (let i = 0; i < p.length; i++) {
                surface.lineTo(p[i][0], p[i][1]);
        }
        if (draw_vertices) {
                let scf = 50;
                for (let i = 0; i < p.length; i++) {
                        let d = scf / distance2(p[i], move);
                        surface.fillRect(p[i][0] - d, p[i][1] - d * 2 / 3, 2 * d, d * 4 / 3);
                        surface.fillRect(p[i][0] - d * 2 / 3, p[i][1] - d, d * 4 / 3, 2 * d);
                }
        }
        surface.lineTo(p[0][0], p[0][1]);
        surface.stroke();
}

function draw(objects, ctx, move, rotate) {
        let td = project_objects(objects, move, rotate);
        ctx.clearRect(0, 0, can.width, can.height);
        td.forEach(element => {
                draw_rectangle(ctx, element, move);
        });
}