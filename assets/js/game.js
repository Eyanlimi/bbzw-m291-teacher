const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const goodie = document.getElementById("goodie")

const goodiesCollected = document.getElementById("goodies-value")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore-value")
const gameContainer = document.getElementById("game")
const background = document.getElementById("background")
const gameOver = document.getElementById("gameOver")
const startScreen = document.getElementById("startScreen")


//Die Soundeffect 

var die = new Audio(); 
die.src = "assets/Soundeffects/die.wav";

function playDieSound (){
  die.play();
}

//Hintergrundmusik 

var backgroundMusik = new Audio(); 
backgroundMusik.src = "assets/Soundeffects/background.wav";

function playBackgroundMusik (){
  backgroundMusik.play();
}

//Jump Soundeffect

var jumpSound = new Audio();
jumpSound.src = "assets/Soundeffects/jump.wav";

function playJumpSound (){
  jumpSound.play();
}

//Goodie Soundeffect

var coinSound = new Audio();
coinSound.src = "assets/Soundeffects/coin.wav";

function playCoinSound (){
  coinSound.play();
}


let gameLoopInterval = 0

const startGame = () => {
  gameOver.style.display = "none";

  //Backgroundmusik wird beim Start gestartet
  playBackgroundMusik();
  background.classList.add("bg-animation")
  rock.classList.add("rock-animation")
  goodie.classList.add("goodie-animation")

  startScreen.style.display = "none"
  resetScore()
  startGameLoop()
}




const resetScore = () => {
  score.innerText = 0
  goodiesCollected.innerText = 0
}

const jump = () => {
  dino.classList.add("jump-animation")
  //Jump Sound wird bei Jump Animation abgespielt
  playJumpSound();
  setTimeout(() => {
    
    dino.classList.remove("jump-animation")
  }, 500)
}

const dieAnimation = () => {
  dino.classList.add("dino-dies")
  playDieSound();
  
  return new Promise(resolve => setTimeout(() => {
    dino.classList.remove("dino-dies")
    resolve()
  }, 500));

}



document.addEventListener('click', (event) => {
  if (!gameLoopInterval) {
    startGame()
  }
  else {
    if (!dino.classList.contains('jump-animation')) {
      jump()
    }
  }

})

const stopGame = async () => {
  await dieAnimation()
  const scoreNumber = Number(score.innerText)
  const highscoreNumber = Number(highscore.innerText)
  if (scoreNumber > highscoreNumber) {
    highscore.innerText = scoreNumber;
  }

  // Discountcode wird erst ab dem Score von 100 angezeigt

  if(scoreNumber > "100") {
    gameOver.style.display = "block";
  }
  background.classList.remove("bg-animation")
  rock.classList.remove("rock-animation")
  goodie.classList.remove("goodie-animation")


  startScreen.style.display = "block"
  gameLoopInterval = clearInterval(gameLoopInterval)
}

const randomizeGoodieAnimation = (goodieLeft) => {
  const max = 2;
  const min = 1;
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  if (goodieLeft === 550) {
    goodie.style.animationName = "goodie" + random;
  }
};




const setObstacleSpeed = (score, rockLeft) => {
  let rockSpeed = 1330 // Milliseconds
  rockSpeed = rockSpeed - (score * 1.000000000001)
  if (rockLeft === 550) {
    rock.style["-webkit-animation-duration"] = rockSpeed + "ms";
  }

}


const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino)
      .getPropertyValue('top'))
    const rockLeft = parseInt(window.getComputedStyle(rock)
      .getPropertyValue('left'))
    const goodieLeft = parseInt(window.getComputedStyle(goodie)
      .getPropertyValue('left'))
    const goodieTop = parseInt(window.getComputedStyle(goodie)
      .getPropertyValue('top'))

    score.innerText = Number(score.innerText) + 1

    randomizeGoodieAnimation(goodieLeft)
    setObstacleSpeed(Number(score.innerText), rockLeft)

    if (rockLeft < 0) {
      rock.style.display = 'none'
    } else {
      rock.style.display = ''
    }

    if (goodieLeft < 0) {
      goodie.style.display = 'none'
    } else {
      goodie.style.display = ''
    }

    if (goodieLeft < 50 && dinoTop < (goodieTop + 50)) {
      goodie.style.display = 'none'
      goodiesCollected.innerText = Number(goodiesCollected.innerText) + 1
      playCoinSound();
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      stopGame()
    }
  }, 50)

}

