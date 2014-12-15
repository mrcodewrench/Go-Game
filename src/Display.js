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