function Angrybirds() {
    var xPos, yPos;
    var canvas = document.createElement('CANVAS');
    var a, b, distance, time = 0, angle, vx, vy, velocity = 60, totalTime, drag;

    // Reiniciar contadores a 0 cuando la página se recarga
    localStorage.clear();

    // Inicializar los contadores
    var wins = 0;
    var losses = 0;

    canvas.style.position = 'absolute';
    canvas.setAttribute("width", 900);
    canvas.setAttribute("height", 500);
    var xWidth = canvas.width;
    var yHeight = canvas.height;

    canvas.style.border = "2px solid black";
    canvas.setAttribute("id", "canv");

    document.body.appendChild(canvas);

    var c = document.getElementById("canv");
    var ctx = c.getContext("2d");

    var background = new Image();
    background.src = "background.png"; // Asegúrate de tener esta imagen en tu proyecto o usa una URL válida

    // Coordenadas iniciales del círculo
    var initialX = canvas.width / 2 - 280;  // Coordenada X inicial
    var initialY = canvas.height / 2 + 120;  // Coordenada Y inicial

    var circle = {
        x: initialX,
        y: initialY,
        newX: 0,
        newY: 0,
        radius: 15,
        color: "red",
        img: new Image()  // Usar imagen para el círculo
    };
    circle.img.src = "rojo.png";  // Ruta de la imagen del círculo

    // Mostrar el contador de victorias y derrotas
    function drawScore() {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Ganadas: " + wins, 20, 30);
        ctx.fillText("Perdidas: " + losses, 20, 60);
    }

    // Dibujar círculo, fondo y obstáculos
    function drawCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

        // Dibujar la imagen de fondo
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Dibujar el círculo (pájaro) como imagen
        ctx.drawImage(circle.img, circle.x - circle.radius, circle.y - circle.radius, circle.radius * 2, circle.radius * 2);

        // Dibujar el obstáculo
        ctx.beginPath();
        ctx.moveTo(800, 200);
        ctx.lineTo(800, 300);
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();

        // Mostrar el puntaje
        drawScore();
    }

    // Dibujar el estado inicial
    background.onload = function () {
        drawCircle();
    };

    function mouseDown(e) {
        if (
            circle.x - 20 <= e.clientX && circle.x + 20 >= e.clientX &&
            circle.y - 20 <= e.clientY && circle.y + 20 >= e.clientY
        ) {
            circle.x = e.clientX - canvas.offsetLeft;
            circle.y = e.clientY - canvas.offsetTop;
            drag = true;
            canvas.onmousemove = mouseMove;
        }
    }

    function mouseMove(e) {
        if (drag) {
            circle.x = e.clientX - 7;
            circle.y = e.clientY - 7;

            a = -(initialX - circle.x);
            b = initialY - circle.y;
            distance = Math.sqrt(a * a + b * b);
            angle = Math.atan(b / a);
            drawCircle();
        }
    }

    function moveBall() {
        time += 0.17;
        vx = distance * Math.cos(angle);
        vy = distance * Math.sin(angle);

        circle.x = initialX + vx * time;
        circle.y = initialY - (vy * time - (9.81 / 2) * time * time);

        drawCircle();

        if (circle.x <= canvas.width && circle.y <= canvas.height - 50) {
            if (circle.x >= 800 && circle.y >= 200 && circle.y <= 300) {
                ctx.font = "30px Arial";
                ctx.fillStyle = "green";
                ctx.fillText(" Ganaste ;)", 450, 250);
                wins++;  // Incrementar contador de victorias
                setTimeout(resetGame, 500); // Reinicia el juego después de medio segundo
            } else {
                requestAnimationFrame(moveBall);
            }
        } else {
            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.fillText("Perdiste ;(", 450, 250);
            losses++;  // Incrementar contador de derrotas
            setTimeout(resetGame, 500); // Reinicia el juego después de medio segundo
        }
    }

    function resetGame() {
        // Reinicia las coordenadas y el tiempo
        circle.x = initialX;
        circle.y = initialY;
        time = 0;  // Restablecer el tiempo
        drawCircle();  // Redibujar el círculo y el puntaje
    }

    function mouseUP() {
        if (drag) {
            moveBall();
            drag = false;
        } else {
            canvas.onmousemove = null;
        }
    }

    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUP;
}

window.onload = function () {
    Angrybirds();
};
