(function() {
  
  'use strict';
  
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
      'Taco Eater',
      'Pokemon Trainer',
      'JavaScript Developer',
      'PHP Developer',
      'Has Objective-C skills',
      'C/C++ iskill',
      'Backbone.js Developer',
      'Pillow Tester',
      'Beer Drinker',
      'Green Socks',
      'CSS Styler',
      'Diaper Changer'
    ];
  }

  function addJay() {
    var head = document.getElementsByTagName('head')[0];
    var baseStyle = document.getElementById('baseStyle');
    var extendStyle = document.getElementById('extendStyle');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/js/g.js?v=' + SITE_VERSION;
    head.appendChild(script);

    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = '/css/g.css?v=' + SITE_VERSION;
    head.appendChild(link);

    head.removeChild(extendStyle);
    head.removeChild(baseStyle);

    window.sessionStorage.setItem('disguise_expiration', (new Date().getTime() + 3600));
    window.sessionStorage.setItem('disguise_name', 'jay');
  }

  function addOne() {
    var head = document.getElementsByTagName('head')[0];
    var style = document.getElementById('extendStyle');
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
  var disguiseExpiration = window.sessionStorage.getItem('disguise_expiration');
  var disguiseName = window.sessionStorage.getItem('disguise_name');
  var disguises = ['jay', 'one'];

  if (parseInt(disguiseExpiration, 10) < (new Date()).getTime() || disguises.indexOf(disguiseName) < 0) {
    window.sessionStorage.removeItem('disguise_expiration');
    window.sessionStorage.removeItem('disguise_name');
    var randomNumber = getRandomInt(0, 100);
    var disguiseName = '';
    if (randomNumber === 34) {
      disguiseName = 'jay';
    } else if (randomNumber === 1) {
      disguiseName = 'one';
    }
    window.sessionStorage.setItem('disguise_expiration', (new Date().getTime() + 3600000));
    window.sessionStorage.setItem('disguise_name', disguiseName);
  }
  switch(disguiseName) {
    case 'jay':
      addJay();
      break;
    case 'one':
      addOne();
      break;
  }
})();
