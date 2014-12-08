describe("placeStone", function() {
   beforeEach(function() {
    logic.tempBoard = [ ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],
                        ["0","0","0","0","0","0","0","0","0"],];
});
    it("should place a black stone at 0,6", function() {
       logic.placeStone(logic.black,0,6);
       expect(logic.tempBoard[6][0]).toEqual("B");
   });
    it("should place a black stone at 2,6", function() {
       logic.placeStone(logic.black,2,6);
       expect(logic.tempBoard[6][2]).toEqual("B");
   });
    it("should place a white stone at 0,0", function() {
       logic.placeStone(logic.white,0,0);
       expect(logic.tempBoard[0][0]).toEqual("W");
   });
    it("should place a white stone at 8,8", function() {
       logic.placeStone(logic.white,8,8);
       expect(logic.tempBoard[8][8]).toEqual("W");
   });
});