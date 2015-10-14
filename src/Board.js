// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    hasRowConflictAt: function(rowIndex) {
      var row = this.attributes[rowIndex];
      var pieceCount = 0;
        for(var j = 0; j < row.length; j++){
          if(row[j] === 1){
        // console.log('this attributes row', this.attributes);
            pieceCount++;
          }
        }      
      if (pieceCount > 1){
        return true;
      } else {
        return false; 
     }
// fixme
    },
            //then return true, b/c a conflict exists
            //If theres more than one piece. Greater than one.

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for(var prop in this.attributes){
        if(this.hasRowConflictAt(prop)){
          return true;
        }
      }
      // console.log('this attributes', this.attributes);
        return false; // fixme        
      

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var pieceCount = 0;
      //for each row check the value at the input column index
      for(var key in this.attributes){
        var column = this.attributes[key][colIndex];
        if(column === 1){
          pieceCount++;
        }
      }
      
      if(pieceCount > 1){
        return true;
      } else {
        return false;
      }
    },
      //declare a count for pieces in a column
      //Loop through each row
        //Define what a column is to get the value;
        //if value is 1 add to the pieceCount
      //if pieceCount greater than 1
        //return true;
      //return false;

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for(var key in this.attributes){
        if(this.hasColConflictAt(key)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var pieceCount = 0;
      //declare a variable to count pieces in a row
    
      
      //loop through the object's keys to get access to each row
      //changed col to majordiagonalcolumnindex from 0;
      //changed for var in attributes to a iteration by integer count. 
        for (var col = majorDiagonalColumnIndexAtFirstRow, row = 0; col < this.attributes.n, row < this.attributes.n; col++, row++){
          debugger;
          if (this.attributes[row][col] === 1) {
            debugger;
            pieceCount++;            

          }
          // console.log('piece', attributes[row * 1 + 1][col + 1]);
        //loop through each row to get access to each piece
        //If the row index........next row index + 1 and if row-col = row-col.
        //variable starting row. increase row and col
        // var piece = row - col;
        //   if(piece === piece){
           
        }
        console.log('pieceCount: ', pieceCount);
        if (pieceCount > 1){
          return true;
        } else {
          return false;
        }
      },

          
          //add pieces that have a specific position(over 1, down 1) to a variable that defines the diagonal
      

    // test if any major diagonals on the board contain conflicts
      //loop through the board object keys(this.attributes[row])
        //loop through each row to access each square
          //if the value is 1(there's a piece)
            //if you find a piece, add it to the count
      //if the pieceCount is greater than 1
        //return true
      //else
        //return false

    hasAnyMajorDiagonalConflicts: function() {
      for(var i = -(this.attributes.n); i < this.attributes.n; i++){
        debugger;
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        } 
      }
      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    //makeEmptyMatrix is a function that takes in a number
    return _(_.range(n)).map(function() {//rows
    //It returns the value of generating a range of numbers from the 'n' paramater. Returns an array of results of the functions running on each element in the array.
      return _(_.range(n)).map(function() {//pieces
        return 0;
      });
    });
  };

}());
