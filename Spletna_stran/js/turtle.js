function init(can) {
    trutle_x = 0;
    trutle_y = 0;
    trutle_heading = 0; // y osi = dol
    turtle_pen = "down";
    turtle_canvas = can;
    turtle_ctx = can.getContext("2d");
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
    turtle_ctx.clearRect(0, 0, turtle_can.width, turtle_can.height);
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
    trutle_y = 0;
    trutle_heading = 0;
}