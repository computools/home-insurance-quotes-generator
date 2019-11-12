import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {rootDOMNodeId} from 'config/vars';
import {App} from 'content/app/App';

ReactDOM.render(<App />, document.getElementById(rootDOMNodeId));
