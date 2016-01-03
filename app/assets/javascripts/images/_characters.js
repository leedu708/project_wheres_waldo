var WALDO = WALDO || {};

WALDO.Characters = ( function() {

  var characters;
  var availableChars;

  function setChars(array) {
    characters = array;
  };

  function getNameByID(id) {
    return findChar(id).name;
  };

  function findChar(id) {
    var results = $.grep( characters, function(c) { return (c.id === id) } );
    return results[0];
  };

  function findByName(name) {
    var results = $.grep( characters, function(c) { return (c.name === name) } );
    return results[0];
  };

  function setAvailableChars(taggedIDs) {
    availableChars = $.grep(characters, function(c) {
      return (taggedIDs.indexOf(c.id) === -1)
    });
    return availableChars;
  };

  function removeAvailable(name) {
    var search = findByName(name);
    availableChars.splice(availableChars.indexOf(search), 1);

    if (!availableChars.length) {
      WALDO.Show.gameOver();
    };
  };

  function addAvailable(name) {
    var character = findByName(name);
    if (availableChars.indexOf(character) === -1) {
      availableChars.push(character);
    };
  };

  function getChars() {
    return characters;
  };

  function getAvailableChars() {
    return availableChars;
  };

  function getAvailableNames() {
    return availableChars.map( function(element) { return element.name } );
  };

  return {
    getChars: getChars,
    setChars: setChars,
    getAvailableChars: getAvailableChars,
    setAvailableChars: setAvailableChars,
    removeAvailable: removeAvailable,
    addAvailable: addAvailable,
    getNameByID: getNameByID,
    getAvailableNames: getAvailableNames
  };

})();