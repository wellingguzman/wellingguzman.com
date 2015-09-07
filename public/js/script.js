'use strict';

(function() {
  function setDescription(quantity) {
    quantity = quantity || 3;
    var words = getWords();
    var message = [];

    if (!words) {
      return;
    }

    for (var i = 0; i < quantity; i++) {
      var randomIndex = getRandomInt(0, words.length);
      message.push(words[randomIndex]);
      words.splice(randomIndex, 1);
      if (words.length == 0) {
        break;
      }
    }

    var description = document.getElementById('description');
    if (description) {
      description.innerHTML = message.join(' | ');
    }
  }

  function getWords() {
    return [
      // list of random words here
    ];
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  setDescription();
})();
