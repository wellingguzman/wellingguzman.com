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

marked.Renderer.prototype.image = function (href, title, text) {
  // Snippet copied from marked cleanUrl function
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return text;
  }

  var out = '';
  if (title) {
    out += '<figure>';
  }

  out += '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + escape(title) + '"';
  }

  out += this.options.xhtml ? '/>' : '>';

  if (title) {
    out += '<figcaption>' + title + '</figcaption>';
    out += '</figure>';
  }

  return out;
};

marked.Renderer.prototype.link = function (href, title, text) {
  // Snippet copied from marked cleanUrl function
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return text;
  }

  if (href === null) {
    return text;
  }
  var out = '<a href="' + escape(href) + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  if (href.substring(0, 4) === 'http') {
    out += ' rel="noopener" target="_blank"';
  }
  out += '>' + text + '</a>';
  return out;
};

const origParserTok = marked.Parser.prototype.tok;
marked.Parser.prototype.tok = function () {
  if (this.token.type === 'heading') {
    return heading.call(
      this.renderer,
      this.inline.output(this.token.text),
      this.token.depth,
      unescape(this.inlineText.output(this.token.text)),
      this.slugger
    );
  }

  return origParserTok.call(this);
};

function heading(text, level, raw, slugger) {
  const hId = this.options.headerPrefix + slugger.slug(raw);
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + hId
      + '">'
      + text
      + '<a href="#'
      + hId + '">#</a>'
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

const origOutputLink = marked.InlineLexer.prototype.outputLink;
marked.InlineLexer.prototype.outputLink = function(cap, link) {
  if (cap[0].charAt(0) === '!' && link.title) {
    // No escaping the title to use it as caption without escaping
    this.renderer.image(link.href, link.title, escape(cap[1]))
  }

  return origOutputLink.call(this, cap, link);
};

module.exports = harp;
