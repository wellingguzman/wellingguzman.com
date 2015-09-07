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
      var randomIndex = getRandomInt(0, words.length, false);
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
      'Web-Entwickler',
      'Does nothing',
      'Taco',
      'Pokemon',
      'JavaScript',
      'PHP',
      'Objective-C',
      'C/C++',
      'Backbone.js',
      'Pillow',
      'Beer',
      'Green Socks',
      'CSS',
      'Diaper'
    ];
  }

  function addJay() {
    var head = document.getElementsByTagName('head')[0];
    var style = document.getElementById('style');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/js/g.js?v=' + SITE_VERSION;
    head.appendChild(script);

    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = '/css/g.css?v=' + SITE_VERSION;
    head.appendChild(link);

    head.removeChild(style);
  }

  function getRandomInt(min, max, maxIncluded) {
    var includeMax = 1;
    if (maxIncluded === false) {
      includeMax = 0;
    }
    return Math.floor(Math.random() * (max - min + includeMax)) + min;
  }

  setDescription(4);
  if (getRandomInt(0, 100) === 1) {
    addJay();
  }
})();
