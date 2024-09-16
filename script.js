let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rsetbtn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const xWinsElement = document.querySelector("#x-wins");
const oWinsElement = document.querySelector("#o-wins");

let turnO = true; 
let xWins = 0; // Variable to track X wins
let oWins = 0; // Variable to track O wins

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = ()=>{
    turnO = true;
    enlboxes();
    msgContainer.classList.add("hide");
    resetBtn.style.display = "block";
}

boxes.forEach((box)=>{
    box.addEventListener("click" , ()=>{
        if(turnO){
            box.innerText = "O";
            box.classList.add("o");
            box.classList.remove("x");
            turnO = false;
        } else{
            box.innerText = "X";
            box.classList.add("x");
            box.classList.remove("o"); 
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const enlboxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o");
    }
};
const disboxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    resetBtn.style.display = "none";
    disboxes();

    if (winner === "X") {
        xWins++;
        xWinsElement.innerText = xWins;
    } else if (winner === "O") {
        oWins++;
        oWinsElement.innerText = oWins;
    };

};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let posi1Val = boxes[pattern[0]].innerText;
        let posi2Val = boxes[pattern[1]].innerText;
        let posi3Val = boxes[pattern[2]].innerText;

        if(posi1Val != "" && posi2Val != "" && posi3Val != ""){
            if(posi1Val === posi2Val && posi2Val === posi3Val){
                console.log("Winner" , posi1Val);
                showWinner(posi1Val);
            }
        }
    }

    let isTie = Array.from(boxes).every((box) => box.innerText !== "");
    if (isTie) {
        msg.innerText = "It's a tie!";
        msgContainer.classList.remove("hide");
        resetBtn.style.display = "none";
    }



};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
