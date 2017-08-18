import './polyfills';
import loadReact from './reacc-loader';

loadReact().then(() => import('./components/App')).then(App => {
  const {React, ReactDOM} = window;

  ReactDOM.render(
    React.createElement(App.default),
    document.getElementById('root')
  );
});
