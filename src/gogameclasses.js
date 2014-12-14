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
    this.white = "W";
    this.black = "B";
    this.tempBoard = game.blankBoard();
    
    this.attemptPlaceStoneFromUI = function(loc) {
        var x = loc.split(",")[0]*1;
        var y = parseInt(loc.split(",")[1]);
        if(game.isBlackTurn)
            this.attemptPlaceStone(this.black, x, y);
        else
            this.attemptPlaceStone(this.white, x, y);
    };
    
    this.createTempBoard = function(){
        for(var q = 0; q < game.size; q++)
        {
            for(var w = 0; w < game.size; w++)
            {
                this.tempBoard[q][w] = (game.board[q][w]);
            }
        }
    };
    
    this.attemptPlaceStone = function(user,x,y){
        if(game.board[y][x] != "0"){
            alert("Occupied");
            return "Occupied";
        }
        
        var opponent = "";
        if (user === this.white){
            opponent = this.black;
        } else {
            opponent = this.white;
        }
        
        this.createTempBoard();
        this.placeStone(user, x, y);
        
        var chainsKilled = 0;
        if(y+1 <= game.size -1 && this.tempBoard[y+1][x] === opponent && this.checkForBreath(opponent,x,y+1) === "invalid"){
            this.killChain(opponent,x,y+1);
            chainsKilled++;
        }
        if( y-1 >=0 && this.tempBoard[y-1][x] === opponent && this.checkForBreath(opponent,x,y-1) === "invalid"){
            this.killChain(opponent,x,y-1);
            chainsKilled++;
        }
        if(x+1 <= game.size-1 && this.tempBoard[y][x+1] === opponent && this.checkForBreath(opponent,x+1,y) === "invalid"){
            this.killChain(opponent,x+1,y);
            chainsKilled++;
        }
        if(x-1 >=0 && this.tempBoard[y][x-1] === opponent && this.checkForBreath(opponent,x-1,y) === "invalid"){
            this.killChain(opponent,x-1,y);
            chainsKilled++;
        }
        if(chainsKilled === 0 && this.checkForKo() === false && this.checkForBreath(user,x,y) === "invalid"){
            alert("suicide");
            return "suicide";
        }else {
            game.moveLog.push(user +"," + x + "," + y)
            this.updateGameBoard();
            // Update UI
            var loc = x + "," + y;
            if(game.isBlackTurn){
                document.getElementById(loc).style.backgroundColor = "black";
            }
            else{
                document.getElementById(loc).style.backgroundColor = "white";
            }
            this.changeTurn();
        }
        //make room for ko function
    };
    
    this.tempChain = [];
    this.checkForBreath = function(user,x,y){
        var moveLocation = x + "," + y;
        
        if (y+1 <= game.size-1 && this.tempBoard[y+1][x] === "0"){
            this.tempChain = [];
            return "valid";
        }
        if(y-1 >= 0 && this.tempBoard[y-1][x] === "0"){
            this.tempChain = [];
            return "valid";
        }
        if(x+1 <= game.size-1 && this.tempBoard[y][x+1] === "0"){
            this.tempChain = [];
            return "valid";
        }
        if(x-1 >=0 && this.tempBoard[y][x-1] === "0"){
            this.tempChain = [];
            return "valid";
        } else {
            //place current stone coordinates into tempChain
            this.tempChain.push(moveLocation);
            if(y+1 <= game.size -1 && this.tempBoard[y+1][x] === user && this.tempChain.indexOf(x + "," + (y+1)) === -1 ){
                return this.checkForBreath(user, x, y+1);
            }
            if(y-1 >=0 && this.tempBoard[y-1][x] === user && this.tempChain.indexOf(x + "," + (y-1)) === -1 ){
                return this.checkForBreath(user, x, y-1)
            }
            if(x+1 <= game.size-1 && this.tempBoard[y][x+1] === user && this.tempChain.indexOf((x+1) + "," + y) === -1){
                return this.checkForBreath(user, x+1, y);
            }
            if(x-1 >=0 && this.tempBoard[y][x-1] === user && this.tempChain.indexOf((x-1) + "," + y) === -1 ){
                return this.checkForBreath(user, x-1, y);
            }
            else {
                this.tempChain = [];
                return "invalid";
            }
        }
    };
     
    this.placeStone = function(user, x, y){
        this.tempBoard[y][x] = user;
    };
    this.removeStone = function(x,y){
        this.tempBoard[y][x] = "0";
        var loc = x + "," + y;
        this.grayOutUI(loc);
    };
    this.grayOutUI = function(place){
            document.getElementById(place).style.backgroundColor = "gray";
        };
    
    this.killChain = function(user,x,y){
        this.removeStone(x,y);
        
        if(user === this.black)
            document.getElementById("whiteHasCaptured").innerHTML = ++game.whiteHasCaptured;
        else
            document.getElementById("blackHasCaptured").innerHTML = ++game.blackHasCaptured;
        
        if(y+1 <= game.size -1 && this.tempBoard[y+1][x] === user){
            this.killChain(user,x,y+1);
        }
        if (y-1 >=0 && this.tempBoard[y-1][x] === user){
            this.killChain(user, x, y-1);
        }
        if(x+1 <= game.size-1 && this.tempBoard[y][x+1] === user){
            this.killChain(user,x+1,y);
        }
        if (x-1 >=0 && this.tempBoard[y][x-1] === user){
            this.killChain(user,x-1,y);
        }
    };
    //will work after finishing get board state
    this.checkForKo = function(){
        var matches = 0;
        //koBoard = getBoardState(moveLog.length - 2);
        for (var i = 0; i < this.tempBoard.length; i++)
        {
            for(var j = 0; j < this.tempBoard.length; j++)
            {
                if(this.tempBoard[i][j] === game.board[i][j]){
                    matches++;
                }
            }
        }
        return (matches === game.size * game.size);
    };
    
    this.updateGameBoard = function(){
        for (var i = 0; i < game.size; i++) 
        {
            for(var j = 0; j < game.size; j++)
            {
                game.board[i][j] = this.tempBoard[i][j];
            }
        }
    };
    
    this.changeTurn = function(){
        game.isBlackTurn = !game.isBlackTurn;
        
        if(game.isBlackTurn)
            document.getElementById("whoseTurn").innerHTML = "Black's turn";
        else
            document.getElementById("whoseTurn").innerHTML = "White's turn";
    };
    this.boardMatcher = function(board1,board2){
        for (var i = 0; i < game.size; i++) {
            for (var j = 0; j < game.size; j++){
                if(board1[i][j] != board2[i][j]){
                    return false;
                }
            }
        };
        return true;
    }
};

//for later game runs through moves and gets board state at given move position
//for "ko" current temp board will match boardstate at move index - 2

// var getMoveArray = function (moveLocation){
//  returns array with all the moves to be played to get boardState.
// }
// var getBoardState = function(moveArray){
//     var boardToReturn = game.blankBoard();
//     for(var i = 0 ; i <= moveIndex; i++){
//            this.attemptPlaceStone(moveIndex[i]);
//     }
//     return boardToReturn;
// }
var go = new Display();
var logic = new Internals(go);
// blank board for
//  var testBoard = [  ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                     ["0","0","0","0","0","0","0","0","0"],
//                 ];
//