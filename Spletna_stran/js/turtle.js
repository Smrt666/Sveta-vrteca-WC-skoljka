function init(can, ctx) {
    trutle_x = 0;
    trutle_y = can.height; //move origin to bottom left
    trutle_heading = 180; //flip initial heading to look up
    turtle_pen = "up";
    turtle_canvas = can;
    turtle_ctx = ctx;
    turtle_saved = [];
}

function pendown() {
    turtle_pen = "down";
    draw();
}

function penup() {
    turtle_pen = "up";
    stroke();
}

function left(angle) {
    trutle_heading += angle;
}

function right(angle) {
    trutle_heading -= angle;
}

function move_to(x, y) {
    if (turtle_pen == "down") {
        turtle_ctx.lineTo(x, y);
    }
    trutle_x = x;
    trutle_y = y;
}

function clear() {
    turtle_ctx.clearRect(0, 0, turtle_canvas.width, turtle_canvas.height);
    turtle_ctx.beginPath();
    turtle_ctx.moveTo(trutle_x, trutle_y);
}

function forward(d) {
    move_to(trutle_x + d * Math.sin(trutle_heading * Math.PI/180), trutle_y + d * Math.cos(trutle_heading * Math.PI/180));
}

function stroke() { // izrišeš
    turtle_ctx.stroke();
}

function draw() { // začneš risanje
    turtle_ctx.beginPath();
    turtle_ctx.moveTo(trutle_x, trutle_y);
}

function pos(){
    return [trutle_x, trutle_y];
}

function reset(){ 
    trutle_x = 0;
    trutle_y = turtle_canvas.height;
    clear();
    trutle_heading = 180;
}

function save(){
    turtle_saved.push([trutle_x, trutle_y, trutle_heading]);
    // console.log(turtle_saved);
}

function restore(){
    let pos = turtle_saved.pop();
    trutle_x = pos[0];
    trutle_y = pos[1];
    trutle_heading = pos[2];
}