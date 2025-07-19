const boxes = document.querySelectorAll(".box");
const text = document.querySelector("h1");
const restart = document.querySelector("button");
let audio = document.querySelectorAll("audio")
let current = "X";
let gameBoard = generate()
let counter = 0;

boxes.forEach((box, i) => {
  box.addEventListener("click", () => {
    
    box.style.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)} )`
    let row = Math.floor(i / 3);
    let col = (i % 3)
    if(won() || counter >= 9 || gameBoard[row][col]) return
    counter++     
    gameBoard[row][col] = current;  
    if(won()) {
      audio[1].play()
      text.textContent = `${current} won!!`
      box.textContent = current;
      restart.style.display = "block"
      return
    }if(counter >= 9) {
      audio[2].play()
      text.textContent = `it is a draw`;
      box.textContent = current;
      restart.style.display = "block"
      return
    } else {
      audio[0].play()
      box.textContent = current;
      current = current == "X" ? "O" : "X"    
      text.textContent = `It is ${current} turn`
    }   
  })
})

restart.addEventListener("click", () => {
  audio[1].currentTime = 0;
  audio[1].pause()
  audio[2].currentTime = 0;
  audio[2].pause()
  boxes.forEach(box => {
    box.textContent = "";    
  })
  text.textContent = `Tic Tac Toe`
  counter = 0;
  current = "X"
  gameBoard = generate()
  restart.style.display = "none"
})

function won() {
  for(let i = 0; i < 3; i++) {
    if(gameBoard[i][0] == current && 
       gameBoard[i][1] == current && 
       gameBoard[i][2] == current) {
      return true
    } else if(gameBoard[0][i] == current && 
       gameBoard[1][i] == current && 
       gameBoard[2][i] == current) {
      return true
    }
  }
  let topRightToBottomLeft = 
      gameBoard[0][2] === current &&
      gameBoard[1][1] === current &&
      gameBoard[2][0] === current
  
  let topLeftToBottomRight =
       gameBoard[0][0] === current &&
       gameBoard[1][1] === current &&
       gameBoard[2][2] === current
  
  return [topRightToBottomLeft, topLeftToBottomRight].includes(true)
}


function generate() {
  return [null, null, null].map(item => {
    return [null, null, null]
  })
}
