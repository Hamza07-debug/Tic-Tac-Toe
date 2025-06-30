let boxes = document.querySelectorAll(".box");
let ResetBtn = document.querySelector("#ResetBtn");
let winnerMsg = document.querySelector("#winner");
let line = document.querySelector("#line");

let turnO = true; // O starts

const winPatterns = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6]  
];

const linePositions = [
  { top: "16.5%", left: "0%", rotate: "0deg" },     
  { top: "50%", left: "0%", rotate: "0deg" },       
  { top: "83.5%", left: "0%", rotate: "0deg" },     
  { top: "50%", left: "-33.3%", rotate: "90deg" },  
  { top: "50%", left: "0%", rotate: "90deg" },      
  { top: "50%", left: "33.3%", rotate: "90deg" },   
  { top: "50%", left: "0%", rotate: "45deg" },      
  { top: "50%", left: "0%", rotate: "-45deg" }      
];


boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;
    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

function checkWinner() {
  for (let i = 0; i < winPatterns.length; i++) {
    let [a, b, c] = winPatterns[i];
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, [a, b, c], i);
      return;
    }
  }

  // check draw
  let draw = true;
  boxes.forEach(box => {
    if (box.innerText === "") draw = false;
  });
  if (draw) winnerMsg.innerText = "It's a Draw!";
}

function showWinner(winner, indices, lineIndex) {
  winnerMsg.innerText = `Winner: ${winner}`;
  indices.forEach(i => {
    boxes[i].classList.add("win");
  });

  
  const pos = linePositions[lineIndex];
  line.style.top = pos.top;
  line.style.left = pos.left;
  line.style.transform = `rotate(${pos.rotate}) scaleX(1)`;
  line.classList.add("active");

  boxes.forEach(box => box.disabled = true);
}

ResetBtn.addEventListener("click", () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("win");
  });
  winnerMsg.innerText = "";
  line.classList.remove("active");
  line.style.transform = "scaleX(0)";
  turnO = true;
});
