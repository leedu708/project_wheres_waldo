var WALDO = WALDO || {};

WALDO.Timer = ( function() {

  var _timer,
      $_timer,
      _lastTick,
      _timeInterval

  function startTimer() {
    $_timer = $('.timer');
    _timer = 0;
    _lastTick = Date.now();
    _timeInterval = setInterval(_tick, 1000);
  };

  function _tick() {
    var currentTick = Date.now();
    var dif = currentTick - _lastTick;
    _timer += (dif / 1000);
    _lastTick = currentTick;
    _renderTimer();
  };

  function stopTimer() {
    clearInterval(_timeInterval);
  };

  function _renderTimer() {
    $_timer.text('Time: ' + Math.round(_timer) );
  };

  return {
    startTimer: startTimer,
    stopTimer: stopTimer
  };

})();