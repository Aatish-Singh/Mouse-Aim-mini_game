
const child = document.querySelector('.playground');
const circle = document.querySelector('.aim');
const countEl = document.querySelector('.counter');
const timerEl = document.querySelector('.timer');

const startMenu = document.querySelector('.startMenu');
const menuScore = document.querySelector('.menuScore');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');

let MaxX, MaxY;
let count=0;
let intervalId, countdown;
let timeLeft= 30

//Update available Area

function updateBounds() {
    const childrect = child.getBoundingClientRect();

    const circleSize = circle.offsetWidth;

    MaxX = childrect.width - circleSize;
    MaxY = childrect.height - circleSize;
}

//update bound on start or resize
updateBounds();
window.addEventListener('resize', updateBounds);

// randomly move circle
function teleportCircle() {
    const randomX = Math.random() * MaxX;
    const randomY = Math.random() * MaxY;

    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;
    }
// move circle every 900ms


// click event handler
let circleClickHandler = () => {
    clearInterval(intervalId)

    circle.style.display = "none"
    // counter logic
    count+=1;
    countEl.textContent=`Score: ${count}`;


    setTimeout(() => {

           teleportCircle();
           circle.style.display = "block";
        // start teleport again
        if (timeLeft > 0){
            intervalId = setInterval(teleportCircle, 900);
        }
        }, 500);
}

function startGame(){
    // ensure the circle is visible
    circle.style.display = "block";
    // Reset score
    count = 1; 
    countEl.textContent = `Score: ${count}`;
  
    // Reset timer
    timeLeft = 30;
    timerEl.textContent = `Time: ${timeLeft}`;

    // Clear existing intervals if any
  clearInterval(intervalId);
  clearInterval(countdown)

   // Remove previous listeners to avoid duplicates
  circle.removeEventListener("click", circleClickHandler);
  circle.addEventListener("click", circleClickHandler);

  //Hide menu
  startMenu.style.display ="none";

  // Start circle teleporting 
  intervalId = setInterval(teleportCircle, 900);

    // start countdown timer
  countdown = setInterval(() => {
  if(timeLeft > 0) {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}`;
  } 
  else {
    clearInterval(countdown);
    // Optionally stop the game
    clearInterval(intervalId);   // stop circle teleporting
    circle.removeEventListener("click", circleClickHandler)
    circle.style.display = "none";
   //show menu and score after game ends
  menuScore.textContent = `Score: ${count}`;
      startMenu.style.display = "flex";
      restartBtn.style.display = "inline-block";
      startBtn.style.display = "none";
  }
}, 1000);
}

// Event listeners
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  restartBtn.style.display = "none";
  startBtn.style.display = "inline-block";
  startGame();
});

const firse = document.querySelector('.restart');

firse.addEventListener("click", ()=>{
     clearInterval(countdown);
    // Optionally stop the game
    clearInterval(intervalId);   // stop circle teleporting
    circle.removeEventListener("click", circleClickHandler)
    circle.style.display = "none";
   //show menu and score after game ends
  menuScore.textContent = `Score: ${count}`;
      startMenu.style.display = "flex";
      restartBtn.style.display = "inline-block";
      startBtn.style.display = "none";})




