var WALDO = WALDO || {};

WALDO.Show = ( function() {

  var game_id;

  function init() {
    game_id = $('section').data('game-id');
    _getImageData();
  };

  function _getImageData() {
    $.ajax( {
      url: game_id + ".json",
      method: 'get',

      success: _initVariables
    });
  };

  function _initVariables(data) {
    WALDO.Characters.setChars(data.characters);
    WALDO.Tags.setTags(data.tags);

    var taggedIDs = WALDO.Tags.getCharIDs();
    WALDO.Characters.setAvailableChars(taggedIDs);

    WALDO.Tagger.init();
    WALDO.Tags.renderAllTags();

    WALDO.Timer.startTimer();
  };

  function saveTag(tagger) {
    $.ajax( {
      url: game_id + '/tags.json',
      method: 'post',
      data: JSON.stringify(tagger),
      dataType: 'json',
      contentType: 'application/json',

      success: WALDO.Tags.addSavedTag,
      error: function() { console.log('error!') }
    });
  };

  function deleteTag(id) {
    $.ajax ( {
      url: game_id + "/tags/" + id + ".json",
      method: 'delete',

      success: WALDO.Tagger.deleteTag,
      error: function() { console.log('error!') }
    });
  };

  function gameOver() {
    var game = { id: game_id };

    $.ajax( {
      url: game_id + ".json",
      method: 'patch',
      data: JSON.stringify(game),
      dataType: 'json',
      contentType: 'application/json',

      success: _showResults,
      error: function() { console.log('error!') }
    });
  };

  function _showResults(game) {
    WALDO.Timer.stopTimer();
    WALDO.Tagger.disable();
    WALDO.Scores.getHighScores(game.image_id);
  };

  function getGameID() {
    return game_id;
  };

  return {
    init: init,
    getGameID: getGameID,
    saveTag: saveTag,
    deleteTag: deleteTag,
    gameOver: gameOver
  };

})();

$( document ).ready( function() {
  WALDO.Show.init();
})