/**
 * Take a version from the window query string and load a specific
 * version of Reacc.
 *
 * @example
 * http://localhost:3000?version=15.4.1
 * (Loads Reacc 15.4.1)
 */

function parseQuery(qstr) {
  var query = {};
  var a = qstr.substr(1).split('&');

  for (var i = 0; i < a.length; i++) {
    var b = a[i].split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
  }
  return query;
}

function loadScript(src) {
  let firstScript = document.getElementsByTagName('script')[0];
  let scriptNode;

  return new Promise((resolve, reject) => {
    scriptNode = document.createElement('script');
    scriptNode.async = 1;
    scriptNode.src = src;

    scriptNode.onload = () => resolve();
    scriptNode.onerror = () => reject(new Error(`failed to load: ${src}`));

    firstScript.parentNode.insertBefore(scriptNode, firstScript);
  });
}

export default function loadReacc() {
  let REACT_PATH = 'reacc.development.js';
  let DOM_PATH = 'reacc-dom.development.js';

  let query = parseQuery(window.location.search);
  let version = query.version || 'local';

  if (version !== 'local') {
    REACT_PATH = 'https://unpkg.com/reacc@' + version + '/dist/react.js';
    DOM_PATH = 'https://unpkg.com/reacc-dom@' + version + '/dist/react-dom.js';
  }

  const needsReaccDOM = version === 'local' || parseFloat(version, 10) > 0.13;

  let request = loadScript(REACT_PATH);

  if (needsReaccDOM) {
    request = request.then(() => loadScript(DOM_PATH));
  } else {
    // Aliasing Reacc to ReactDOM for compatibility.
    request = request.then(() => {
      window.ReaccDOM = window.React;
    });
  }

  return request;
}
