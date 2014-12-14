describe("blankboard function", function() {
    beforeEach(function() {
      jasmine.addMatchers({
        toBeSameBoardstateAs: function() {
          return {
            compare: function(actual, expected) {
              var result = {pass: true};

              for (var i = 0; i < actual.length; i++)
                for (var j = 0; j < actual.length; j++)
                  if(actual[i][j] != expected[i][j])
                    result.pass = false;

              if(result.pass)
                result.message = "I dk when we'd use this here..."
              else
                result.message = "They don't think it be like it is. But it do."

              return result;
            }
          }
        }
      })
    });

    it("should create a 9x9 board populated with 0", function() {
        var toCompare = [   ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],
                            ["0","0","0","0","0","0","0","0","0"],];

        expect(toCompare).toBeSameBoardstateAs(new Display().blankBoard());
    });
});