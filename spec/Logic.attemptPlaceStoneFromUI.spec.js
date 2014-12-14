describe("attemptPlaceStoneFromUI should pass correct location to JS function", function() {
    it("should call attemptPlaceStone with black,0,0", function() {
        spyOn(logic, 'attemptPlaceStone');
        go.isBlackTurn = true;
        logic.attemptPlaceStoneFromUI("0,0");
        expect(logic.attemptPlaceStone).toHaveBeenCalledWith(logic.black,0,0);
    });
    it("should call attemptPlaceStone with white,4,3", function() {
        spyOn(logic, 'attemptPlaceStone');
        go.isBlackTurn = false;
        logic.attemptPlaceStoneFromUI("4,3");
        expect(logic.attemptPlaceStone).toHaveBeenCalledWith(logic.white,4,3);
    });
    it("should call attemptPlaceStone with black,8,8", function() {
        spyOn(logic, 'attemptPlaceStone');
        go.isBlackTurn = true;
        logic.attemptPlaceStoneFromUI("8,8");
        expect(logic.attemptPlaceStone).toHaveBeenCalledWith(logic.black,8,8);
    });
    it("should call attemptPlaceStone with white,5,5", function() {
        spyOn(logic, 'attemptPlaceStone');
        go.isBlackTurn = false;
        logic.attemptPlaceStoneFromUI("5,5");
        expect(logic.attemptPlaceStone).toHaveBeenCalledWith(logic.white,5,5);
    });
    
});