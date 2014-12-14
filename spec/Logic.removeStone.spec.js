// need to comment out lines in removes stone to update UI before running the test

describe("should remove a single stone... ", function() {
    it("should remove a single white stone from the middle", function() {
        logic.tempBoard = [ ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","W","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];
                            
        var testBoard =   [ ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];
        spyOn(logic, 'grayOutUI');
        logic.removeStone(4,3);
        expect(logic.grayOutUI).toHaveBeenCalled();
        expect(logic.boardMatcher(logic.tempBoard,testBoard)).toBe(true);
        
    });
    it("should remove a single black stone from the corner", function() {
        logic.tempBoard = [ ["B","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];
                            
        var testBoard =   [ ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];

        spyOn(logic, 'grayOutUI');
        logic.removeStone(0,0);
        expect(logic.grayOutUI).toHaveBeenCalled();
        expect(logic.boardMatcher(logic.tempBoard,testBoard)).toBe(true);
        
    });
    it("when called twice should remove both stones from corners", function() {
        logic.tempBoard = [ ["B","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","W"],];
                            
        var testBoard =   [ ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];
        
        spyOn(logic, 'grayOutUI');
        logic.removeStone(0,0);
        expect(logic.grayOutUI).toHaveBeenCalled();
        logic.removeStone(8,8);
        expect(logic.grayOutUI).toHaveBeenCalled();
        expect(logic.boardMatcher(logic.tempBoard,testBoard)).toBe(true);
        
    });
    it("should remove one stone and leave the other", function() {
        logic.tempBoard = [ ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","W","B","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];
                            
        var testBoard =   [ ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","B","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];

        spyOn(logic, 'grayOutUI');
        logic.removeStone(2,2);
        expect(logic.grayOutUI).toHaveBeenCalled();
        expect(logic.boardMatcher(logic.tempBoard,testBoard)).toBe(true);
        
    });
});