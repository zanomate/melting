import {Counter} from './Counter'
import {Store} from './store'
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Store>
        <Counter/>
    </Store>,
    document.getElementById('root')
);
