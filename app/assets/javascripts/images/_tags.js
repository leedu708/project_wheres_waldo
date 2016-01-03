var WALDO = WALDO || {}

WALDO.Tags = ( function() {

  var tags;

  function setTags(array) {
    tags = array;
  };

  function addSavedTag(tag) {
    tags.push(tag);
    _render(tag);
    WALDO.Characters.removeAvailable(tag.character.name);
  };

  function getCharIDs() {
    return tags.map( function(tag) { return tag.character_id } );
  };

  function renderAllTags() {
    tags.forEach ( _render );
  };

  function _render(tag) {
    var $imageArea = $('.game-wrapper');
    var charName = WALDO.Characters.getNameByID(tag.character_id);

    var tagX = tag.x * $imageArea.width() + $imageArea.offset().left - 24;
    var tagY = tag.y * $imageArea.height() + $imageArea.offset().top - 24;

    $("<div class='tag' data-tag-id='" + tag.id + "'>" + charName + "</div>").appendTo($imageArea).css('left', tagX).css('top', tagY);
  };

  function getTags() {
    return tags;
  };

  return {
    getTags: getTags,
    setTags: setTags,
    addSavedTag: addSavedTag,
    renderAllTags: renderAllTags,
    getCharIDs: getCharIDs
  };

})();