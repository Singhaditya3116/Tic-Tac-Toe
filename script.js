
const playerSpan = document.getElementById("player");
const gameTable = document.getElementById("game");

const game = {
    turn:'X',
    move:0
}

function restartGame()
{
    game.move=0;
    if(Math.random()>0.5)
    {
        game.turn="X";
    }
    else
    {
        game.turn="O";
    }
    let arrayOfCell = Array.from(document.getElementsByTagName("td")).forEach(function(item){
        item=item.innerText="";
    })

}

function nextTurn() //changing the  turn of the player
{
    game.move++;
    if(game.turn == "X")
        game.turn="O";
    else
        game.turn="X";
    
    playerSpan.innerText=game.turn;
    if(game.move == 9)
    {
        alert("Game over | Draw");
        restartGame();
    }
}

function isSequenceSame(arrayofThreeCells)
{
    let outcome =arrayofThreeCells.join("");
    let winningCombo = game.turn+game.turn+game.turn;
    if(outcome == winningCombo)
    {
        alert("Game Over | Winner is "+game.turn);
        restartGame();
    }
}

function checkRow(row)  //checking row.
{
    let tableRow = Array.from(gameTable.children[0].children[row-1].children);
    let arrayElement = tableRow.map(function(item){
        return item.innerText;
    })
    isSequenceSame(arrayElement);
}
function checkColumn(col) //checking column
{
    let arrayElement=[
        gameTable.children[0].children[0].children[col-1].innerText,
        gameTable.children[0].children[1].children[col-1].innerText,
        gameTable.children[0].children[2].children[col-1].innerText
    ]
    isSequenceSame(arrayElement);
}

function checkDiagonal(row,col) //checking diagonal
{
    if(row!=col && row+col!=4) //The cell does not fall in diagonal part.
    {
        return;
    }

    let diag1=[
        gameTable.children[0].children[0].children[0].innerText,
        gameTable.children[0].children[1].children[1].innerText,
        gameTable.children[0].children[2].children[2].innerText
    ]

    let diag2=[
        gameTable.children[0].children[0].children[2].innerText,
        gameTable.children[0].children[1].children[1].innerText,
        gameTable.children[0].children[2].children[0].innerText
    ]
    isSequenceSame(diag1);
    isSequenceSame(diag2);
}

function boxclicked(row,col)
{
    let clickBox =gameTable.children[0].children[row-1].children[col-1]; //It get which cell is clicked
    if(clickBox.innerText != "")
    {
        return;
    }
    clickBox.innerText=game.turn; //changing the text of that cell

    checkRow(row); //checking if by playing this move, he can win or not.
    checkColumn(col); //checking if by playing this move, he can win or not.
    checkDiagonal(row,col);
    nextTurn();
}