function Display() {
    this.size = 9; //prompt("what size board would you like to play");
    this.moveLog = [];
    //var handicap = prompt("what will be white's handicap?")
    this.isBlackTurn = true;
    this.blackHasCaptured = 0;
    this.whiteHasCaptured = 0;
    this.blankBoard = function(){
        blankBoard = [];
        for (var i = 0; i  < this.size; i++)
        {
            blankBoard.push([]);
        }
        for (var j = 0; j  < this.size; j++)
        {
            for(var g = 0; g < this.size; g++)
            {
                blankBoard[j].push("0");
            }
        }
        return blankBoard;
    };
    this.displayBoard = function(){
        for (var h = this.board.length - 1; h >= 0; h--)
        {
            console.log(this.board[h]);
        }
    };
    this.board = this.blankBoard();
};


function Internals(game){
    var white = "W";
    var black = "B";
    var tempBoard = [];
    
    this.attemptPlaceStoneFromUI = function(loc) {
        var x = loc.split(",")[0]*1;
        var y = parseInt(loc.split(",")[1]);
        if(Game.isBlackTurn)
            attemptPlaceStone(black, x, y);
        else
            attemptPlaceStone(white, x, y);
    };
    
    var createTempBoard = function(){
        tempBoard = [];
        for(var q = 0; q < Game.size; q++)
        {
            tempBoard.push([]);
            for(var w = 0; w < Game.size; w++)
            {
                tempBoard[q].push(Game.board[q][w]);
            }
        }
    };
    
    var attemptPlaceStone = function(user,x,y){
        if(Game.board[y][x] != "0"){
            alert("Occupied");
            return "Occupied";
        }
        
        var opponent = "";
        if (user === white){
            opponent = black;
        } else {
            opponent = white;
        }
        
        createTempBoard();
        placeStone(user, x, y);
        
        var chainsKilled = 0;
        if(y+1 <= Game.size -1 && tempBoard[y+1][x] === opponent && checkForBreath(opponent,x,y+1) === "invalid"){
            killChain(opponent,x,y+1);
            chainsKilled++;
        }
        if( y-1 >=0 && tempBoard[y-1][x] === opponent && checkForBreath(opponent,x,y-1) === "invalid"){
            killChain(opponent,x,y-1);
            chainsKilled++;
        }
        if(x+1 <= Game.size-1 && tempBoard[y][x+1] === opponent && checkForBreath(opponent,x+1,y) === "invalid"){
            killChain(opponent,x+1,y);
            chainsKilled++;
        }
        if(x-1 >=0 && tempBoard[y][x-1] === opponent && checkForBreath(opponent,x-1,y) === "invalid"){
            killChain(opponent,x-1,y);
            chainsKilled++;
        }
        if(chainsKilled === 0 && checkForKo() === false && checkForBreath(user,x,y) === "invalid"){
            alert("suicide");
            return "suicide";
        }else {
            Game.moveLog.push(user +"," + x + "," + y)
            updateGameBoard();
            // Update UI
            var loc = x + "," + y;
            if(Game.isBlackTurn){
                document.getElementById(loc).style.backgroundColor = "black";
            }
            else{
                document.getElementById(loc).style.backgroundColor = "white";
            }
            changeTurn();
        }
        //make room for ko function
    };
    
    var tempChain = [];
    var checkForBreath = function(user,x,y){
        var moveLocation = x + "," + y;
        
        if (y+1 <= Game.size-1 && tempBoard[y+1][x] === "0"){
            tempChain = [];
            return "valid";
        }
        if(y-1 >= 0 && tempBoard[y-1][x] === "0"){
            tempChain = [];
            return "valid";
        }
        if(x+1 <= Game.size-1 && tempBoard[y][x+1] === "0"){
            tempChain = [];
            return "valid";
        }
        if(x-1 >=0 && tempBoard[y][x-1] === "0"){
            tempChain = [];
            return "valid";
        } else {
            //place current stone coordinates into tempChain
            tempChain.push(moveLocation);
            if(y+1 <= Game.size -1 && tempBoard[y+1][x] === user && tempChain.indexOf(x + "," + (y+1)) === -1 ){
                return checkForBreath(user, x, y+1);
            }
            if(y-1 >=0 && tempBoard[y-1][x] === user && tempChain.indexOf(x + "," + (y-1)) === -1 ){
                return checkForBreath(user, x, y-1)
            }
            if(x+1 <= Game.size-1 && tempBoard[y][x+1] === user && tempChain.indexOf((x+1) + "," + y) === -1){
                return checkForBreath(user, x+1, y);
            }
            if(x-1 >=0 && tempBoard[y][x-1] === user && tempChain.indexOf((x-1) + "," + y) === -1 ){
                return checkForBreath(user, x-1, y);
            }
            else {
                tempChain = [];
                return "invalid";
            }
        }
    };
     
    var placeStone = function(user, x, y){
        tempBoard[y][x] = user;
    };

    var removeStone = function(x,y){
        tempBoard[y][x] = "0";
        var loc = x + "," + y;
        document.getElementById(loc).style.backgroundColor = "gray";
    };
    
    var killChain = function(user,x,y){
        removeStone(x,y);
        
        if(user === black)
            document.getElementById("whiteHasCaptured").innerHTML = ++Game.whiteHasCaptured;
        else
            document.getElementById("blackHasCaptured").innerHTML = ++Game.blackHasCaptured;
        
        if(y+1 <= Game.size -1 && tempBoard[y+1][x] === user){
            killChain(user,x,y+1);
        }
        if (y-1 >=0 && tempBoard[y-1][x] === user){
            killChain(user, x, y-1);
        }
        if(x+1 <= Game.size-1 && tempBoard[y][x+1] === user){
            killChain(user,x+1,y);
        }
        if (x-1 >=0 && tempBoard[y][x-1] === user){
            killChain(user,x-1,y);
        }
    };
    //will work after finishing get board state
    var checkForKo = function(){
        var matches = 0;
        //koBoard = getBoardState(moveLog.length - 2);
        for (var i = 0; i < tempBoard.length; i++)
        {
            for(var j = 0; j < tempBoard.length; j++)
            {
                if(tempBoard[i][j] === Game.board[i][j]){
                    matches++;
                }
            }
        }
        return (matches === Game.size * Game.size);
    };
    
    var updateGameBoard = function(){
    for (var i = 0; i < Game.size; i++) 
        {
            for(var j = 0; j < Game.size; j++)
            {
                Game.board[i][j] = tempBoard[i][j];
            }
        }
    };
    
    var changeTurn = function(){
        Game.isBlackTurn = !Game.isBlackTurn;
        
        if(Game.isBlackTurn)
            document.getElementById("whoseTurn").innerHTML = "Black's turn";
        else
            document.getElementById("whoseTurn").innerHTML = "White's turn";
    };
};

//for later game runs through moves and gets board state at given move position
//for "ko" current temp board will match boardstate at move index - 2

// var getBoardState = function(moveIndex){
//     boardAtMove = blankBoard();
//     for(var i = 0 ; i <= moveIndex; i++){
        
//     }
// }

var game = new Display();
var logic = new Internals(game);

// var game = new Game(new Logic());
// game.Initialize();