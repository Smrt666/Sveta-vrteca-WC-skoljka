
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

function move_to_center(point) {
        let x = point[0];
        let y = point[1];
        let z = R2(point);
        let p = [aspect_ratio * Fov_scaling_factor * x / z, Fov_scaling_factor * y / z, q * (z - r_near)];
        scale = 1;
        return [(p[0] + 1) * width / 2 * scale, (p[1] + 1) * height / 2 * scale]
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

function draw_rectangle(surface, p) {
        ctx.beginPath();
        surface.moveTo(p[0], p[0]);
        for (let i = 0; i < p.length; i++) {
                surface.lineTo(p[i][0], p[i][1]);
        }
        surface.lineTo(p[0][0], p[0][1]);
        surface.stroke();
}

function draw(objects, ctx, move, rotate) {
        let td = project_objects(objects, move, rotate);
        ctx.clearRect(0, 0, can.width, can.height);
        td.forEach(element => {
                draw_rectangle(ctx, element);
        });
}