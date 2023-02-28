const Player = function(name) {
  const _name = name;
  const cells = [];
  let _score = 0;
  
  function getName() {
    return _name;
  }
  function getScore() {
    return _score;
  }
  function addCell(cell) {
    cells.push(cell);
  }
  function getCells() {
    return cells;
  }
  
  return {
    getName,
    getScore,
    addCell,
    getCells
  }
}

const Cell = function(row, column) {
  // private properties
  const _row = row;
  const _column = column;
  let _player = null;
  
  // public functions
  function toString() {
    return `${_row}-${_column}`;
  }
  function getRow() {
    return _row;
  }
  function getColumn() {
    return _column;
  }
  function setPlayer(player) {
    if (!_player) _player = player;
  }
  function getPlayer() {
    return _player;
  }

  return {
    toString,
    getRow,
    getColumn,
    setPlayer,
    getPlayer
  }
}

const Screen = (function() {

})();

const Board = (function() {
  // private properties
  const _board = [];

  //private functions
  function _buildBoard() {
    for(let i = 1; i < 4; i++) {
      let row = [];
      for(let j = 1; j < 4; j++) {
        const cell = Cell(i, j);
        row.push(cell);
      }
      _board.push(row);
    }
  }
  
  // public functions
  function toString() {
    let boardStr = '';
    _board.forEach(row => {
      let rowStr = '';
      row.forEach(cell => {
        rowStr += `${cell.toString()} `;
      });
      boardStr += `${rowStr}\n`;
    });
    return boardStr;
  }

  // initialization
  _buildBoard();

  return{
    toString
  }
})();

const Game = (function() {
  function start() {
    const playerOne = Player("villiam");
    console.log(playerOne.getName());
  }
  function isWinner(player) {
    const cells = player.getCells();
    for(let i = 1; i < 4; i++) {
      let rowMatch = 0;
      let colMatch = 0;
      cells.forEach(cell => {
        const row = cell.getRow();
        const col = cell.getColumn();
        if (row === i) rowMatch++;
        if (col === i) colMatch++;
      });
      if (rowMatch === 3 || colMatch === 3) return true;
    }
    return false; 
  }

  return {
    start,
    isWinner
  }
})();

Game.start();
