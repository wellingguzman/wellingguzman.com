(function(){

  function wrapElement(whichElement, withElement) {
    whichElement.parentNode.insertBefore(withElement, whichElement);
    withElement.appendChild(whichElement);
  }

  var name = document.getElementById('name');
  if (name) {
    wrapElement(name, document.createElement('blink'));
    var img = document.createElement('img');
    img.src = '/images/buttons/USA-hot-ani.gif';
    document.getElementById('sitebar').appendChild(img);
  }
  var description = document.getElementById('description');
  if (description) {
    wrapElement(description, document.createElement('marquee'));
  }

  // APPEND SUPPORTS
  var supports = [
    'netnow3.gif',
    'ie_animated.gif',
    'noExists.bmp',
    'gc_icon.gif',
    'macmade-wht.gif',
    'get_shockwave.gif',
    'nein.jpg',
    'dlbutton.gif'
  ];

  var body = document.getElementsByTagName('body')[0];
  body.appendChild(document.createElement('hr'));

  for(var image in supports) {
    var img = document.createElement('img');
    img.src = '/images/buttons/' + supports[image];
    body.appendChild(img);
  }

  body.appendChild(document.createElement('hr'));
  var img = document.createElement('img');
  img.src = '/images/buttons/tripod.jpg';
  body.appendChild(img);
})();