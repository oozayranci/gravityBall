var p = document.querySelector('p');
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var colors = [
    "#13531b",
    "#000000",
    "#265328",
    "#44744b"
];

var gravity = 0.2;
var friction = 0.98;

p.addEventListener("click", function(){
    init();
})

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

function randomInt(max, min){
    return Math.floor(Math.random() * (max - min +1) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    
    this.update = function(){
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.radius;
            this.dy = this.dy * friction;
            this.dx = this.dx * friction;
        } else {
            this.dy += gravity;
        }
        if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
            this.dx = -this.dx * friction;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}


var arrayBall;
function init(){
    arrayBall = [];
    
    for(var i = 0; i < 600; i++){
        var radius = randomInt(8, 20);
        var x = randomInt(radius, canvas.width - radius);
        var y = randomInt(0, canvas.height - radius);
        var dx = randomInt(-3, 3);
        var dy = randomInt(-2, 2);
        
        arrayBall.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
    }
}

function animate(){
    requestAnimationFrame(animate);
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var i = 0; i < arrayBall.length; i++){
        arrayBall[i].update();
    }
}

init();
animate();
