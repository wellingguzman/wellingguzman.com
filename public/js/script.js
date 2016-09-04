(function() {

  'use strict';

  function setDisguise(name) {
    var THIRTY_DAYS = 2592000;
    window.sessionStorage.setItem('disguise_expiration', (new Date().getTime() + THIRTY_DAYS));
    window.sessionStorage.setItem('disguise_name', name);
  }

  function addJay() {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/js/g-min.js?v=' + SITE_VERSION;
    head.appendChild(script);

    switchStyle('g');
  }

  function switchStyle(name) {
    var style = document.getElementById('baseStyle');
    style.href = '/css/'+name+'.css?v=' + SITE_VERSION;
  }

  function addBef() {
    switchStyle('clean');
  }

  function addQueen() {
    switchStyle('queen');
  }

  function addLand() {
    switchStyle('land');
  }

  function addOne() {
    switchStyle('style');
  }

  function getRandomInt(min, max, maxIncluded) {
    var includeMax = 1;
    if (maxIncluded === false) {
      includeMax = 0;
    }
    return Math.floor(Math.random() * (max - min + includeMax)) + min;
  }

  var disguiseExpiration = window.sessionStorage.getItem('disguise_expiration');
  var disguiseName = window.sessionStorage.getItem('disguise_name');
  var disguises = ['jay', 'one', 'land', 'bef', 'queen'];

  if (parseInt(disguiseExpiration, 10) < (new Date()).getTime() || disguises.indexOf(disguiseName) < 0) {
    window.sessionStorage.removeItem('disguise_expiration');
    window.sessionStorage.removeItem('disguise_name');
    var randomNumber = getRandomInt(0, 100);
    var disguiseName = '';
    if (randomNumber === 34) {
      disguiseName = 'jay';
    } else if (randomNumber === 1) {
      disguiseName = 'land';
    } else if (randomNumber === 0) {
      disguiseName = 'one';
    } else if (randomNumber === 29) {
      disguiseName = 'bef';
    } else if (randomNumber === 44) {
      disguiseName = 'queen';
    }

    setDisguise(disguiseName);
  }

  // switch(disguiseName) {
  //   case 'jay':
  //     addJay();
  //     break;
  //   case 'bef':
  //     addBef();
  //     break;
  //   case 'land':
  //     addLand();
  //     break;
  //   case 'one':
  //     addOne();
  //     break;
  //   case 'queen':
  //     addQueen();
  //     break;
  // }

function anchorClickHandler(event) {
  event = event || window.event;
  var  target = event.target || event.srcElement;

  if (target.tagName == 'A') {
    var hosts = ['localhost', 'wellingguzman.com', 'welli.ng'];
    if (hosts.indexOf(target.hostname) == -1) {
      target.setAttribute('target', '_blank');
    }
  }

}
document.documentElement.addEventListener('click', anchorClickHandler, false);
})();
