import React from 'reacc';
import {render} from 'reacc-dom';

import App from './components/App';

render(<App assets={window.assetManifest} />, document);
