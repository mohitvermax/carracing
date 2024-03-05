let car, lanes, obstacles, score;
let speed = 1;
let obstacleSpeed = 1;
var result = document.getElementById("result")
var game =  document.getElementById("game-container");
var scorediv = document.getElementById("score")
const obstacleInterval = 2000;
const carWidth = 50;
const laneWidth = 150;
const laneCount = 3;


function init() {
  car = document.getElementById('car');
  lanes = document.querySelectorAll('.lane');
  obstacles = [];
  score = 0;

 
  document.addEventListener('keydown', moveCar);

 
  setInterval(update, 10);
  setInterval(addObstacle, obstacleInterval);
}

 
function update() {
  
  obstacles.forEach(obstacle => {
    obstacle.style.top = `${parseInt(obstacle.style.top) + speed}px`;
    if (parseInt(obstacle.style.top) > window.innerHeight) {
        score++;
      obstacle.remove();
      obstacles.splice(obstacles.indexOf(obstacle), 1);
      
      document.getElementById('score-value').textContent = score;
    }
  });

  
  obstacleSpeed += 0.01;

  
  obstacles.forEach(obstacle => {
    if (isColliding(car, obstacle)) {
      gameOver();
    }
  });
}


function moveCar(e) {
  if (e.key === 'ArrowLeft') {
    moveLeft();
  } else if (e.key === 'ArrowRight') {
    moveRight();
  }
}


function moveLeft() {
  if (car.offsetLeft > 0) {
    car.style.left = `${car.offsetLeft - laneWidth}px`;
  }
}


function moveRight() {
  if (car.offsetLeft < (laneCount - 1) * laneWidth) {
    car.style.left = `${car.offsetLeft + laneWidth}px`;
  }
}


function addObstacle() {
    const laneIndex = Math.floor(Math.random() * laneCount);
    const lane = lanes[laneIndex];
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.top = '-80px'; 
    obstacle.style.left = `${lane.offsetLeft}px`; 
    obstacle.style.width = '100px'; 
    obstacle.style.height = '80px'; 
    obstacle.style.backgroundImage = 'url(images/car.png)'; 
    obstacle.style.backgroundSize = 'cover'; 
    obstacle.style.position = 'absolute'; 
    game.appendChild(obstacle);
    obstacles.push(obstacle);
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

  
  const pastPoints = JSON.parse(localStorage.getItem('points')) || [];
  pastPoints.push(score);
  localStorage.setItem('points', JSON.stringify(pastPoints));
  document.getElementById('scorefinal').textContent = score;

  result.style.display = "flex";
    game.style.display = "none";

  obstacles = []
}


window.onload = init;


