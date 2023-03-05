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

const Board = (function() {
  // private properties
  let _board = [];

  //private functions
  function _initialize() {
    _board = [];
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
  function getBoard() {
    return _board;
  }

  // initialization
  _initialize();

  return{
    toString,
    getBoard
  }
})();

const Screen = (function() {
  // public functions
  function _buildCell(cell) {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.addEventListener("click", () => cell);
    return cellElement;
  }
  function buildBoard(board) {
    const boardElement = document.querySelector('.board');
    boardElement.childNodes.forEach(cell => cell.remove());
    board.forEach(row => {
      row.forEach(cell => {
        boardElement.append(_buildCell(cell));
      })
    })
  }

  return {
    buildBoard
  }
})();

const Game = (function() {
  // private functions
  function _filterCells(values, cells) {
    return cells.filter(cell =>
      values.find(value => 
        cell.toString() === value
      )
    );
  }

  // public functions
  function start() {
    Screen.buildBoard(Board.getBoard());
    const playerOne = Player("villiam");
    console.log(playerOne.getName());
  }
  function isWinner(player) {
    const cells = player.getCells();
    
    // check horizontal/vertical streaks
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

    //check diagonal streaks
    const bwdValues = ["1-1", "2-2", "3-3"];
    const bwdMatches = _filterCells(bwdValues, cells);
    const fwdValues = ["3-1", "2-2", "1-3"];
    const fwdMatches = _filterCells(fwdValues, cells);
    if (bwdMatches.length === 3 || fwdMatches.length === 3) return true;

    return false; 
  }

  return {
    start,
    isWinner
  }
})();

Game.start();