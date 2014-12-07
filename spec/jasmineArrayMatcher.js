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
});