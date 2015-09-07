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
      'Desarrollador Web',
      'Web Developer',
      'Web-Entwickler'
    ];
  }

  function addJay() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/js/g.js?v=' + SITE_VERSION;
    document.getElementsByTagName('head')[0].appendChild(script);

    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = '/css/g.css?v=' + SITE_VERSION;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  setDescription();
  addJay();
})();
