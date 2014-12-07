//this is where we are gonna start the unit testing for gogameclasses
//check for how to make it look for equal array values...
describe("placeStone", function() {
   beforeEach(function() {
  'use strict';
  this.addMatchers({
    toBeArray: function(array) {
      this.message = function() {
        return "Expected " + angular.mock.dump(this.actual) + " to be array " + angular.mock.dump(array) + ".";
      };
      var arraysAreSame = function(array1, array2) {
         var arraysAreSame = true;
         for(var i = 0; i < array1.length; i++){
            for(var j = 0; j < array1[i].length; j++){
              if(array1[i][j] !== array2[i][j]){
                arraysAreSame = false;
              }
            }
         }
         return arraysAreSame;
      };
      return arraysAreSame(this.actual, array);
    }
  });
   it("should place stone a white stone at 0,0", function() {
        logic.placeStone(white,0,0);
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