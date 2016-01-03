WALDO = WALDO || {}

WALDO.Scores = ( function () {

  var _player_id;
  var $_scoreList;

  function getHighScores(this_image_id) {
    $.ajax( {
      url: "/games.json",
      method: 'get',
      data: { image_id: this_image_id },
      dataType: 'json',
      contentType: 'application/json',

      success: _renderHighScores
    });
  };

  function _renderHighScores(scores) {
    _buildScoreBoard()
    _fillScoreBoard(scores)

    if (_player_id) {
      var name = prompt("New high score! Enter your name: ");
      _setNewName(name);
    };
  };

  function _buildScoreBoard() {
    var $scoreboard = $("<div class='high-scores'></div>")
    $("<h4>High Scores</h4>").appendTo($scoreboard);

    $_scoreList = $("<ol class='score-list'></ol>");
    $_scoreList.appendTo($scoreboard);

    $scoreboard.appendTo($('.game-wrapper'));
  };

  function _fillScoreBoard(scores) {
    var this_game_id = WALDO.Show.getGameID();

    scores.forEach( function(score) {
      var $listItem = $("<li data-game-id='" + score.game_id + "'></li>");
      $listItem.text( score.name + ": " + score.time ).appendTo($_scoreList);

      _highlightCurrentScore(score, this_game_id);
    });
  };

  function _highlightCurrentScore(score, this_game_id) {
    if (score.game_id === this_game_id) {
      $("li[data-game-id='" + this_game_id + "']").addClass('current');
      _player_id = score.player_id;
    };
  };

  function _setNewName(name) {
    console.log(name);

    var player = { id: _player_id, name: name };

    $.ajax( {
      url: "/players/" + _player_id + ".json",
      method: 'patch',
      data: JSON.stringify( { name: name } ),
      dataType: 'json',
      contentType: 'application/json',

      success: _renderNewName,
      error: function() { console.log('error!') }
    });
  };

  function _renderNewName(player) {
    var $current = $('.current');
    var text = $current.text().replace('Player', player.name);
    $current.text(text);
  };

  return {
    getHighScores: getHighScores
  };

})();