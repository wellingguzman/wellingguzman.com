#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const tagsPath = path.resolve(__dirname + '/../public/tags');

exports.createTag = function (name, title) {
  if (!fs.existsSync(tagsPath + '/' + name + '.jade')) {
    fs.writeFileSync(
      tagsPath + '/' + name + '.jade',
      "!= partial('../_shared/tag')",
      'utf8'
    );
  }
  
  var data = JSON.parse(fs.readFileSync(tagsPath + '/_data.json'));
  var tag = data[name] || {};

  data[name] = {
    title: title || tag.title || name
  };
  
  var newData = {};
  Object.keys(data).sort().forEach(function (key) {
    newData[key] = data[key];
  });
  
  fs.writeFileSync(
    tagsPath + '/_data.json',
    JSON.stringify(newData, null, 2),
    'utf8'
  )
}
