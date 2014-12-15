function Internals(game){
    this.white = "W";
    this.black = "B";
    this.tempBoard = game.blankBoard();
    
    this.lookDir = function(x, y, stoneType, dir){
        if (dir === "N"){
            return y+1 <= game.size -1 && this.tempBoard[y+1][x] === stoneType;
        };
        if (dir === "S"){
            return y-1 >= 0 && this.tempBoard[y-1][x] === stoneType;
        };
        if (dir === "E"){
            return x+1 <= game.size -1 && this.tempBoard[y][x+1] === stoneType;
        };
        if (dir === "W"){
            return x-1 >= 0 && this.tempBoard[y][x-1] === stoneType;
        };
    };
    
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
    
    this.chainNorth = [];
    this.chainSouth = [];
    this.chainEast = [];
    this.chainWest = [];
    this.chainsToRemove = [0,0,0,0];
    this.initChains = function(){
        this.chainNorth = [];
        this.chainSouth = [];
        this.chainEast = [];
        this.chainWest = [];
        this.chainsToRemove = [0,0,0,0];
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
        this.initChains();
        this.createTempBoard();
        this.placeStone(user, x, y);
        
        var chainUser = this.makeChain(user, x, y);
        var chainsKilled = 0;
        if(this.lookDir(x, y, opponent, "N")){
            this.chainNorth = this.makeChain(opponent, x, y+1);
            if(!this.checkForBreath(this.chainNorth)){
                this.chainsToRemove[0] = 1;
                chainsKilled++;
            }
        };
        if(this.lookDir(x, y, opponent, "S")){
            this.chainSouth = this.makeChain(opponent, x, y-1);
            if(!this.checkForBreath(this.chainSouth)){
                this.chainsToRemove[1] = 1;
                chainsKilled++;
            }
        };
        if(this.lookDir(x, y, opponent, "E")){
            this.chainEast = this.makeChain(opponent, x+1, y);
            if(!this.checkForBreath(this.chainEast)){
                this.chainsToRemove[2] = 1;
                chainsKilled++;
            }
        };
        if(this.lookDir(x, y, opponent, "W")){
            this.chainWest = this.makeChain(opponent, x-1, y);
            if(!this.checkForBreath(this.chainWest)){
                this.chainsToRemove[3] = 1;
                chainsKilled++;
            }
        };
        if(chainsKilled === 0 && this.checkForKo() === false && this.checkForBreath(chainUser) === false){
            alert("suicide");
            return "suicide";
        }else {
            this.chainCompare();
            this.KillChain(user, this.chainsToRemove);
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
    
    this.checkForBreath = function(chainArray){
        var breaths = 0;
        if(chainArray.length > 0){
            for(var i = 0; i < chainArray.length; i++){
                var x = chainArray[i].split(",")[0]*1;
                var y = chainArray[i].split(",")[1]*1;
                if(this.lookDir(x, y, "0", "N")){
                    breaths++;
                }
                if(this.lookDir(x, y, "0", "S")){
                    breaths++;
                }
                if(this.lookDir(x, y, "0", "E")){
                    breaths++;
                }
                if(this.lookDir(x, y, "0", "W")){
                    breaths++;
                }
            }
        }
        if(breaths === 0){
            return false;
        }
        else{
            return true;
        };
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
    //0north,1south,2east,3west chains;
    
        this.chainCompare = function(){
        for(var i = 0; i < this.chainNorth.length; i++){
            if(this.chainSouth.indexOf(this.chainNorth[i]) != -1){
                this.chainsToRemove[1] = 0;
            }
            if(this.chainEast.indexOf(this.chainNorth[i]) != -1){
                this.chainsToRemove[2] = 0;
            }
            if(this.chainWest.indexOf(this.chainNorth[i]) != -1){
                this.chainsToRemove[3] = 0;
            }
        };
        for(var i = 0; i < this.chainSouth.length; i++){
            if(this.chainEast.indexOf(this.chainSouth[i]) != -1){
                this.chainsToRemove[2] = 0;
            }
            if(this.chainWest.indexOf(this.chainSouth[i]) != -1){
                this.chainsToRemove[3] = 0;
            }
        }
        for(var i = 0; i < this.chainEast.length; i++){
            if(this.chainWest.indexOf(this.chainEast[i]) != -1){
                this.chainsToRemove[3] = 0;
            }
        }
        
    };
    this.makeChain = function(user, x, y){
        var chainArray = [];
        this.makeChainHelper(user, x, y, chainArray);
        return chainArray;
        
    };
    this.makeChainHelper = function(user, x, y, chainArray){
        stoneLoc = x + "," + y;
        chainArray.push(stoneLoc);
        if(this.lookDir(x, y, user, "N") && chainArray.indexOf(x + "," + (y+1)) === -1){
            this.makeChainHelper(user, x, y+1, chainArray);
        };
        if(this.lookDir(x, y, user, "S") && chainArray.indexOf(x + "," + (y-1)) === -1){
            this.makeChainHelper(user, x, y-1, chainArray);
        };
        if(this.lookDir(x, y, user, "E") && chainArray.indexOf((x+1) + "," + y) === -1){
            this.makeChainHelper(user, x+1, y, chainArray);
        };
        if(this.lookDir(x, y, user, "W") && chainArray.indexOf((x-1) + "," + y) === -1){
            this.makeChainHelper(user, x-1, y, chainArray);
        };
    };
    this.KillChain =function(user, chainsToKill){
        if(chainsToKill[0] === 1){
            this.killChainHelper(user, this.chainNorth);
        }
        if(chainsToKill[1] === 1){
            this.killChainHelper(user, this.chainSouth);
        }
        if(chainsToKill[2] === 1){
            this.killChainHelper(user, this.chainEast);
        }
        if(chainsToKill[3] === 1){
            this.killChainHelper(user, this.chainWest);
        }
    };
    this.killChainHelper = function(user, chainArray){
        for(var i = 0; i < chainArray.length; i++){
            var x = chainArray[i].split(",")[0]*1;
            var y = chainArray[i].split(",")[1]*1;
            this.removeStone(x,y);
            if(user === this.white){
               document.getElementById("whiteHasCaptured").innerHTML = ++game.whiteHasCaptured;
            }
            else{
                document.getElementById("blackHasCaptured").innerHTML = ++game.blackHasCaptured;
            }
        };
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