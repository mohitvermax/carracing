let car, lanes, obstacles, score;

let obstacleSpeed = 1;
var result = document.getElementById("result")
var game =  document.getElementById("game-container");
var scorediv = document.getElementById("score")
let pause = document.getElementById("pause");
var jumpsound = document.getElementById("jumpsound");
const obstacleInterval = 2300;
const carWidth = 50;
const laneWidth = 150;
const laneCount = 3;
let isPaused = false;
let pauseButton = document.getElementById('pause');

const bgm = new Audio('bgm.mp3');



bgm.loop = true; 
bgm.play();

function init() {
  car = document.getElementById('car');
  lanes = document.querySelectorAll('.lane');
  obstacles = [];
  score = 0;

  pauseButton.addEventListener('click', togglePause);
  document.addEventListener('keydown', moveCar);

 
  setInterval(update, 10);
  setInterval(addObstacle, obstacleInterval);
}
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    pauseButton.textContent = 'Resume';
    bgm.pause();
  } else {
    pauseButton.textContent = 'Pause';
    bgm.play()
  }
}

 
function update() {
  if (!isPaused) {
  
  obstacles.forEach(obstacle => {
    obstacle.style.top = `${parseInt(obstacle.style.top) + obstacleSpeed}px`;
    if (parseInt(obstacle.style.top) > window.innerHeight) {
        score++;
      obstacle.remove();
      obstacles.splice(obstacles.indexOf(obstacle), 1);
      
      document.getElementById('score-value').textContent = score;
    }
  });

  
  obstacleSpeed += 0.002;

  
  obstacles.forEach(obstacle => {
    if (isColliding(car, obstacle)) {
      gameOver();
    }
  });
}
}


function moveCar(e) {
  if (!isPaused ){
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    moveLeft();
    jumpsound.play()
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    moveRight();
    jumpsound.play()
  }
}
}


function moveLeft() {
  if (car.offsetLeft >= laneWidth) { 
    car.style.left = `${car.offsetLeft - laneWidth}px`;
  }
}



function moveRight() {
  if (car.offsetLeft < (laneCount - 1) * laneWidth) {
    car.style.left = `${car.offsetLeft + laneWidth}px`;
  }
}


function addObstacle() {
  if (!isPaused){
    const laneIndex = Math.floor(Math.random() * laneCount);
    const lane = lanes[laneIndex];
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.top = '-80px'; 
    obstacle.style.left = `${lane.offsetLeft}px`; 
    obstacle.style.width = '100px'; 
    obstacle.style.height = '100px'; 
    obstacle.style.backgroundImage = 'url(images/car2.png)'; 
    obstacle.style.backgroundSize = 'cover'; 
    obstacle.style.position = 'absolute'; 
    game.appendChild(obstacle);
    obstacles.push(obstacle);

    
  }
}
  


function isColliding(elem1, elem2) {
  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();
  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  );
}


function gameOver() {

  
  const pastPoints = JSON.parse(localStorage.getItem('points'));
  pastPoints.push(score);
  localStorage.setItem('points', JSON.stringify(pastPoints));
  document.getElementById('scorefinal').textContent = score;
  bgm.pause();
  pauseButton.style.display = 'none';
  result.style.display = "flex";
    game.style.display = "none";

  obstacles = []
}


window.onload = init;

