//this is where we are gonna start the unit testing for gogameclasses
describe("placeStone", function() {
   beforeEach(function() {
        go.blankBoard();
        logic.createTempBoardTest();
    }); 
   it("should place stone a white stone at 0,0", function() {
        logic.placeStoneTest(white,0,0);
        expect(logic.tempBoard).toBe(   [["W","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],
                                         ["0","0","0","0","0","0","0","0","0"],]);
       
   });
});