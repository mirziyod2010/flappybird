let cvs = document.querySelector('#flappybird');
let ctx = cvs.getContext('2d');

let bird = document.createElement('img');
let bg = document.createElement('img');
let pipeUp = document.createElement('img');
let pipeBottom = document.createElement('img');
let fg = document.createElement('img');

bird.src = 'images/bird.png';
bg.src = 'images/bg.png';
pipeUp.src = 'images/pipeUp.png';
pipeBottom.src = 'images/pipeBottom.png';
fg.src = 'images/fg.png';

let xPos = 10;
let yPos = 150;

let x = cvs.width;
let y = 0;
let sc = document.querySelector('.sc');

let gap = 110;

let score = 0;

let pipes_x = [cvs.width, cvs.width + 250];
let pipes_y = [0, -100];

let grav = 0.15;
let change = 5;

document.addEventListener('click', function () {
  change = 4;
});

document.addEventListener('keypress', function (e) {
  if (e.code == 'Space') {
    change = 4;
  }
});

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (i = 0; i < pipes_x.length; i++) {
    ctx.drawImage(pipeUp, pipes_x[i], pipes_y[i]);
    ctx.drawImage(pipeBottom, pipes_x[i], pipes_y[i] + pipeUp.height + gap);
    pipes_x[i] = pipes_x[i] - 2;

    if (pipes_x[i] === 50) {
      pipes_x.push(pipes_x[pipes_x.length - 1] + 250);
      pipes_y.push(Math.floor(Math.random() * pipeUp.height) - pipeUp.height);
      score++;
    }

    if (
      (xPos + bird.width >= pipes_x[i] &&
        xPos <= pipes_x[i] + pipeUp.width &&
        (yPos <= pipes_y[i] + pipeUp.height ||
          yPos + bird.height >= pipes_y[i] + pipeUp.height + gap)) ||
      yPos + bird.height >= cvs.height - fg.height
    ) {
      sc.innerHTML += `<p> ${score} </p>`;
      pipes_x = [cvs.width];
      pipes_y = [0];
      score = 0;
      xPos = 10;
      yPos = 150;
      change = 5;
    }
  }
  change = change - grav;
  yPos = yPos - change;
  ctx.drawImage(bird, xPos, yPos);
  ctx.drawImage(fg, 0, cvs.height - fg.height);

  if (change > 0) {
    bird.src = 'images/bird1_up.png';
  } else {
    bird.src = 'images/bird1_down.png';
  }

  ctx.fillStyle = '#000';
  ctx.font = '24px Verdana';
  ctx.fillText('Счет: ' + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

draw();