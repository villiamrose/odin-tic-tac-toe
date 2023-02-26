const Player = function(name) {
  let _name = name;
  let _score = 0;
  
  function getName() {
    return _name;
  }
  function getScore() {
    return _score;
  }
  
  return {
    getName,
    getScore
  }
}

const Screen = (function() {

})();

const Board = (function() {

})();

const Game = (function() {
  function start() {
    const playerOne = Player("villiam");
    console.log(playerOne.getName());
  }

  return {start}
})();

Game.start();