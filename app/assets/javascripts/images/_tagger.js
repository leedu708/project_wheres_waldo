var WALDO = WALDO || {};

WALDO.Tagger = ( function() {

  var $_imageArea;
  var tagger;

  function init() {
    $_imageArea = $('.game-wrapper');
    _enable();
  };

  function _enable() {
    $_imageArea.on('click', '.game-image', _toggleTagger );
    $_imageArea.on('click', '.dropdown li', _saveTag );
    $_imageArea.on('click', '.tag', _confirmDelete );
    $_imageArea.on('mouseenter', _showTags );
    $_imageArea.on('mouseleave', _hideTags );
  };

  function disable() {
    $_imageArea.off('click');
  };

  function _showTags() {
    $('.tag').show();
  };

  function _hideTags() {
    $('.tag').hide();
  };

  function _toggleTagger() {
    var tagger = $('.tagger');
    if (!tagger.length) {
      _buildTagger()
    } else {
      tagger.remove();
    };
  };

  function _buildTagger() {
    var x = event.offsetX / $_imageArea.width();
    var y = event.offsetY / $_imageArea.height();
    tagger = new Tag(x, y);

    tagger.render();
    tagger.showDropdown();
  };

  function Tag(x, y) {
    this.x = x;
    this.y = y;
  };

  Tag.prototype.render = function() {
    var tagX = this.x * $_imageArea.width() + $_imageArea.offset().left - 24;
    var tagY = this.y * $_imageArea.height() + $_imageArea.offset().top - 24;

    $("<div class='tagger'></div>").appendTo($_imageArea).css('left', tagX).css('top', tagY);
  };

  Tag.prototype.showDropdown = function() {
    var $characterList = _buildCharacterList();

    var $tagger = $('.tagger');
    $characterList.appendTo($tagger).hide().slideDown();

    this.setDropdownCoordinates();
  };

  Tag.prototype.setDropdownCoordinates = function() {
    if ( this.x > 0.8) {
      $('.dropdown').css('right', 42);
    } else {
      $('.dropdown').css('left', 18);
    };
  };

  function _buildCharacterList() {
    var $characterList = $("<ul class='dropdown'></ul>");

    WALDO.Characters.getAvailableNames().forEach( function(name) {
      var $listItem = $("<li>" + name + "</li>");
      $characterList.append($listItem);
    });

    return $characterList;
  };

  function _saveTag() {
    tagger['character'] = event.target.innerHTML;

    WALDO.Show.saveTag(tagger);

    $('.dropdown').remove();
    $('.tagger').remove();
  };

  function _confirmDelete() {
    var $tag = $(event.target);
    $tag.addClass('confirm-delete');

    if ( confirm('Delete this tag?') ) {
      WALDO.Show.deleteTag($tag.attr('data-tag-id'));
    } else {
      $tag.removeClass('confirm-delete');
    };
  };

  function deleteTag(id) {
    $tagDiv = $("div[data-tag-id='" + id + "']");
    WALDO.Characters.addAvailable($tagDiv.text());
    $tagDiv.remove();
  };

  return {
    init: init,
    disable: disable,
    deleteTag: deleteTag
  };

})();