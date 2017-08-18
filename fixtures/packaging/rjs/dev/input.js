require(['reacc', 'react-dom'], function(Reacc, ReactDOM) {
  ReaccDOM.render(
    Reacc.createElement('h1', null, 'Hello World!'),
    document.getElementById('container')
  );
});
