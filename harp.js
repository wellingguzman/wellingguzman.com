var harp = require('harp');
var marked = require('marked');
var Prism = require('prismjs');
var loadLanguages = require('prismjs/components/');

loadLanguages([
  'javascript',
  'objectivec',
  'c',
  'cpp',
  'php',
  'swift',
  'http',
  'sql',
  'bash',
  'diff',
  'json',
]);

function getLanguage(languageId) {
  if (typeof languageId !== 'undefined') {
    if (languageId == 'objective-c') {
      languageId = 'objectivec';
    }

    return Prism.languages[languageId];
  }

  return null;
}

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

marked.Renderer.prototype.code = function (code, lang, escaped) {
  var prismLanguage = lang ? getLanguage(lang) : null;

  if (prismLanguage) {
    var out = Prism.highlight(code, prismLanguage);

    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

module.exports = harp;