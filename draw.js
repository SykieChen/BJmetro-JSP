function clearcan(){
    var canvas=document.getElementById("can")
    var c=canvas.getContext("2d");
    c.clearRect(0,0,canvas.width,canvas.height);
}
function draw(){
    var canvas=document.getElementById("can")
    var c=canvas.getContext("2d");
    c.beginPath();
    c.moveTo(368,377);
    c.lineTo(624,377);
    return c;
    } 
function m_line(x1,y1,x2,y2) {
    var canvas = new draw();
    canvas.strokeStyle = "green";
    canvas.lineWidth = 5;
    canvas.beginPath();
    canvas.moveTo(x1,y1);
    canvas.lineTo(x2,y2);
    canvas.closePath();
    canvas.stroke();
}
function m_circle(x,y) {
    var canvas = draw();
    canvas.beginPath();
    canvas.arc(x, y, 10, 0, 2 * Math.PI, true);
    canvas.closePath();
    canvas.fillStyle="green";
    canvas.fill();
}